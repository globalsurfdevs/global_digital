import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import InstagramConnection from "@/app/models/InstagramConnection";
import { revalidateTag } from "next/cache";
import {
  fetchBusinessDiscoveryPosts,
  fetchInstagramUsername,
  getAgencyCredentials,
  instagramCacheTag,
  isValidInstagramUsername,
} from "@/app/lib/integrations/instagram/instagram";

const LONG_LIVED_TOKEN_DAYS = 60;

function getPortfolioId(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("portfolioId");
  return id && mongoose.Types.ObjectId.isValid(id) ? id : null;
}

// Connection status for the admin panel. Never returns the token itself.
export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const portfolioId = getPortfolioId(req);
  if (!portfolioId) {
    return NextResponse.json({ error: "Invalid portfolio id" }, { status: 400 });
  }

  await connectDB();
  const connection = await InstagramConnection.findOne({
    portfolio: portfolioId,
  })
    .select(
      "username discoveryUsername tokenExpiresAt lastRefreshedAt selectedPostIds",
    )
    .lean();

  return NextResponse.json({ connection });
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // "Public posts by username": no client login, read with the agency account.
  if (typeof body.username === "string") {
    return connectByUsername(body.portfolioId, body.username);
  }

  const { portfolioId, accessToken, igUserId } = body;
  if (
    typeof portfolioId !== "string" ||
    !mongoose.Types.ObjectId.isValid(portfolioId) ||
    typeof accessToken !== "string" ||
    !accessToken.trim()
  ) {
    return NextResponse.json(
      { error: "portfolioId and accessToken are required" },
      { status: 400 },
    );
  }

  const token = accessToken.trim();
  const userId =
    typeof igUserId === "string" && igUserId.trim() ? igUserId.trim() : undefined;
  if (userId && !/^\d+$/.test(userId)) {
    return NextResponse.json(
      { error: "Instagram account ID must be numeric" },
      { status: 400 },
    );
  }

  let username: string;
  try {
    username = await fetchInstagramUsername({
      accessToken: token,
      igUserId: userId,
    });
  } catch {
    return NextResponse.json(
      { error: "Instagram rejected this token. Generate a new one and retry." },
      { status: 400 },
    );
  }

  await connectDB();
  const now = new Date();
  await InstagramConnection.findOneAndUpdate(
    { portfolio: portfolioId },
    {
      accessToken: token,
      igUserId: userId,
      username,
      lastRefreshedAt: now,
      // Facebook Page tokens don't expire; Instagram Login tokens last 60 days.
      tokenExpiresAt: userId
        ? undefined
        : new Date(now.getTime() + LONG_LIVED_TOKEN_DAYS * 24 * 60 * 60 * 1000),
      // A token takes over from any earlier "by username" setup.
      $unset: { discoveryUsername: "" },
    },
    { upsert: true, new: true },
  );

  revalidateTag(instagramCacheTag(portfolioId));
  return NextResponse.json({ message: "Instagram connected", username });
}

async function connectByUsername(portfolioId: unknown, rawUsername: string) {
  const username = rawUsername.trim().replace(/^@/, "");
  if (
    typeof portfolioId !== "string" ||
    !mongoose.Types.ObjectId.isValid(portfolioId) ||
    !isValidInstagramUsername(username)
  ) {
    return NextResponse.json(
      { error: "Enter the Instagram username without spaces, e.g. fayizz.ch" },
      { status: 400 },
    );
  }

  const agency = getAgencyCredentials();
  if (!agency) {
    return NextResponse.json(
      {
        error:
          "The agency Instagram account isn't set up yet. Set INSTAGRAM_AGENCY_ACCESS_TOKEN and INSTAGRAM_AGENCY_IG_USER_ID in the environment.",
      },
      { status: 500 },
    );
  }

  // Check Meta can read this account before saving. The message comes from
  // Meta and never contains a token, so it's safe to show an admin.
  try {
    await fetchBusinessDiscoveryPosts(agency, username, { limit: 1 });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json(
      {
        error: `Couldn't read @${username}. It must be a public Business or Creator account. (${reason})`,
      },
      { status: 400 },
    );
  }

  await connectDB();
  await InstagramConnection.findOneAndUpdate(
    { portfolio: portfolioId },
    {
      discoveryUsername: username,
      username,
      lastRefreshedAt: new Date(),
      $unset: { accessToken: "", igUserId: "", tokenExpiresAt: "" },
    },
    { upsert: true, new: true },
  );

  revalidateTag(instagramCacheTag(portfolioId));
  return NextResponse.json({ message: "Instagram connected", username });
}

// Saves which posts to show, in display order. An empty list means "latest".
export async function PATCH(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { portfolioId, selectedPostIds } = await req.json();
  if (
    typeof portfolioId !== "string" ||
    !mongoose.Types.ObjectId.isValid(portfolioId) ||
    !Array.isArray(selectedPostIds) ||
    !selectedPostIds.every((id) => typeof id === "string" && /^\d+$/.test(id))
  ) {
    return NextResponse.json({ error: "Invalid selection" }, { status: 400 });
  }

  await connectDB();
  const updated = await InstagramConnection.findOneAndUpdate(
    { portfolio: portfolioId },
    { selectedPostIds: [...new Set(selectedPostIds)] },
  );
  if (!updated) {
    return NextResponse.json({ error: "Not connected" }, { status: 404 });
  }
  revalidateTag(instagramCacheTag(portfolioId));
  return NextResponse.json({ message: "Selection saved" });
}

export async function DELETE(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const portfolioId = getPortfolioId(req);
  if (!portfolioId) {
    return NextResponse.json({ error: "Invalid portfolio id" }, { status: 400 });
  }

  await connectDB();
  await InstagramConnection.deleteOne({ portfolio: portfolioId });
  revalidateTag(instagramCacheTag(portfolioId));
  return NextResponse.json({ message: "Instagram disconnected" });
}
