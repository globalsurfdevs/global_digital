import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import connectDB from "@/lib/mongodb";
import Author from "@/app/models/Author";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const author = await Author.findById(id).lean();
    if (!author)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ author });
  }

  const authors = await Author.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ data: authors });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  const author = await Author.create(body);

  revalidateTag("authors"); // ✅ bust listing + detail cache on create
  return NextResponse.json(
    { message: "Author created", author },
    { status: 201 },
  );
}

export async function PATCH(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const body = await req.json();
  const author = await Author.findByIdAndUpdate(id, body, { new: true });
  if (!author) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidateTag("authors");
  revalidateTag(`author-${author._id}`);
  revalidateTag(`author-${author.slug}`);
  return NextResponse.json({ message: "Author updated", author });
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const author = await Author.findByIdAndDelete(id);

  revalidateTag("authors");
  if (author?._id) revalidateTag(`author-${author._id}`);
  return NextResponse.json({ message: "Author deleted" });
}