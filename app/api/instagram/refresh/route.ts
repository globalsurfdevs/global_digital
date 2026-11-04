import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { revalidateTag } from "next/cache";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { instagramCacheTag } from "@/app/lib/integrations/instagram/instagram";

// Admin-only: drops the cached Instagram response for one portfolio, so the
// next request fetches the latest posts instead of waiting out the hour.
export async function POST(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { portfolioId } = await req.json();
  if (
    typeof portfolioId !== "string" ||
    !mongoose.Types.ObjectId.isValid(portfolioId)
  ) {
    return NextResponse.json({ error: "Invalid portfolio id" }, { status: 400 });
  }

  revalidateTag(instagramCacheTag(portfolioId));
  return NextResponse.json({ message: "Instagram posts refreshed" });
}
