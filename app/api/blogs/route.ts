
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import connectDB from "@/lib/mongodb";
import Blog from "@/app/models/Blog";
import "@/app/models/Author";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const blog = await Blog.findById(id).populate("author").lean();
    if (!blog)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ blog });
  }

  const blogs = await Blog.find({})
    .sort({ createdAt: -1 })
    .populate("author")
    .lean();
  return NextResponse.json({ blogs });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  const blog = await Blog.create(body);

  revalidateTag("blogs"); // ✅ bust listing + detail cache on create
  return NextResponse.json({ message: "Blog created", blog }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const body = await req.json();
  const blog = await Blog.findByIdAndUpdate(id, body, { new: true });
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidateTag("blogs");
  revalidateTag(`blog-${blog.slug}`);
  return NextResponse.json({ message: "Blog updated", blog });
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const blog = await Blog.findByIdAndDelete(id);

  revalidateTag("blogs");
  if (blog?.slug) revalidateTag(`blog-${blog.slug}`);
  return NextResponse.json({ message: "Blog deleted" });
}
