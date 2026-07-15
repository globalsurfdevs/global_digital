// lib/authors.ts
import connectDB from "@/lib/mongodb";
import Author from "@/app/models/Author";

export async function getAuthorById(id: string) {
  await connectDB();
  return Author.findById(id).lean();
}