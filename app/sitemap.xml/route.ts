// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Sitemap from "@/app/models/Sitemap";

// Without this the handler only ran at build time, so the sitemap stayed
// frozen until the next deploy. Re-read it from the DB at most hourly;
// admin uploads also refresh it immediately via revalidatePath.
export const revalidate = 3600;

export async function GET() {
  try {
    await connectDB();
    const doc = await Sitemap.findOne({}).lean();

    if (!doc) {
      return new NextResponse("Sitemap not found", { status: 404 });
    }

    return new NextResponse(doc.content, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600", // cache 1hr, adjust as needed
      },
    });
  } catch (error) {
    console.error("Sitemap fetch error:", error);
    // A returned 500 would be cached as the sitemap until the next refresh.
    // Throwing during a runtime refresh keeps serving the last good copy;
    // at build time keep returning 500 so a DB hiccup can't fail the build.
    if (process.env.NEXT_PHASE !== "phase-production-build") throw error;
    return new NextResponse("Error serving sitemap", { status: 500 });
  }
}
