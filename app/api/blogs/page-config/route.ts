import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { BlogPage } from "@/app/models/Blog";

export async function GET() {
  await connectDB();
  // Always return the single doc (or empty defaults)
  const config = await BlogPage.findOne({}).lean();
  return NextResponse.json({ config: config ?? {} });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const config = await BlogPage.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });
  return NextResponse.json({ message: "Blog page updated", config });
}
