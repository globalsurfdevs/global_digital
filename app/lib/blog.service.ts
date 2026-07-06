import { unstable_cache } from "next/cache";
import connectDB from "@/lib/mongodb";
import Blog from "@/app/models/Blog";
import '@/app/models/Author'

export const getAllBlogs = unstable_cache(
  async () => {
    await connectDB();
    const blogs = await Blog.find({ isHidden: false })
      .sort({ createdAt: -1 })
      .populate("author").lean();
    return JSON.parse(JSON.stringify(blogs));
  },
  ["all-blogs"],
  { tags: ["blogs"] }
);

export const getBlogBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      await connectDB();
      const blog = await Blog.findOne({ slug, isHidden: false }).populate("author").lean();
      if (!blog) return null;
      return JSON.parse(JSON.stringify(blog));
    },
    [`blog-by-slug-${slug}`],
    { tags: ["blogs", `blog-${slug}`] }
  )();