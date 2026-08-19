// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Sitemap from "@/app/models/Sitemap";

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
    return new NextResponse("Error serving sitemap", { status: 500 });
  }
}
