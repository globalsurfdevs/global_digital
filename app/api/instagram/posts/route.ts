import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import InstagramConnection from "@/app/models/InstagramConnection";
import {
  fetchConnectionPosts,
  type StoredConnection,
} from "@/app/lib/integrations/instagram/getInstagramFeed";

// Admin-only: the newest posts for the post picker (cached for an hour).
export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const portfolioId = new URL(req.url).searchParams.get("portfolioId");
  if (!portfolioId || !mongoose.Types.ObjectId.isValid(portfolioId)) {
    return NextResponse.json({ error: "Invalid portfolio id" }, { status: 400 });
  }

  await connectDB();
  const connection = await InstagramConnection.findOne({
    portfolio: portfolioId,
  }).lean<StoredConnection>();
  if (!connection) {
    return NextResponse.json({ error: "Not connected" }, { status: 404 });
  }

  try {
    const posts = await fetchConnectionPosts(connection, portfolioId);
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Instagram post list failed:", error);
    return NextResponse.json(
      { error: "Could not load posts from Instagram" },
      { status: 502 },
    );
  }
}
