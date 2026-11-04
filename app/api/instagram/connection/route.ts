import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import InstagramConnection from "@/app/models/InstagramConnection";
import { revalidateTag } from "next/cache";
import {
  fetchInstagramUsername,
  instagramCacheTag,
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
    .select("username tokenExpiresAt lastRefreshedAt selectedPostIds")
    .lean();

  return NextResponse.json({ connection });
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { portfolioId, accessToken, igUserId } = await req.json();
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
