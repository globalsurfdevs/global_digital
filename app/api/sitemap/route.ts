// app/api/sitemap/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Sitemap from "@/app/models/Sitemap";

export async function GET() {
  try {
    await connectDB();
    const doc = await Sitemap.findOne({}).lean();

    if (!doc) {
      return NextResponse.json({ data: null });
    }

    const urlCount = (doc.content.match(/<url>/g) || []).length;

    return NextResponse.json({
      data: {
        content: doc.content,
        updatedAt: doc.updatedAt,
        urlCount,
      },
    });
  } catch (error) {
    console.error("Sitemap fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch sitemap info" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 },
      );
    }

    if (!file.name.endsWith(".xml")) {
      return NextResponse.json(
        { message: "File must be .xml" },
        { status: 400 },
      );
    }

    const content = await file.text();

    // Basic sanity check it's actually XML before storing
    if (!content.trim().startsWith("<?xml")) {
      return NextResponse.json(
        { message: "Invalid XML file" },
        { status: 400 },
      );
    }

    await connectDB();
    await Sitemap.findOneAndUpdate(
      {},
      { content },
      { upsert: true, new: true },
    );

    return NextResponse.json({ message: "Sitemap updated successfully" });
  } catch (error) {
    console.error("Sitemap upload error:", error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await connectDB();
    await Sitemap.deleteMany({});

    return NextResponse.json({ message: "Sitemap removed successfully" });
  } catch (error) {
    console.error("Sitemap delete error:", error);
    return NextResponse.json(
      { message: "Failed to remove sitemap" },
      { status: 500 },
    );
  }
}
