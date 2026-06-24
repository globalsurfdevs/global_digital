import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import connectDB from "@/lib/mongodb";
import Blog from "@/app/models/Blog";

export async function PATCH(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const blog = await Blog.findById(id);
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });

  blog.isHidden = !blog.isHidden;
  await blog.save();
  revalidateTag("blogs");
  revalidateTag(`blog-${blog.slug}`);

  return NextResponse.json({
    message: "Visibility toggled",
    isHidden: blog.isHidden,
  });
}
