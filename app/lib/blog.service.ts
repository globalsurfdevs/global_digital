import { unstable_cache } from "next/cache";
import connectDB from "@/lib/mongodb";
import Blog from "@/app/models/Blog";

export const getAllBlogs = unstable_cache(
  async () => {
    await connectDB();
    const blogs = await Blog.find({ isHidden: false })
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(blogs));
  },
  ["all-blogs"],
  { tags: ["blogs"] }
);

export const getBlogBySlug = unstable_cache(
  async (slug: string) => {
    await connectDB();
    const blog = await Blog.findOne({ slug, isHidden: false }).lean();
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog));
  },
  ["blog-by-slug"],
  { tags: ["blogs"] }
);