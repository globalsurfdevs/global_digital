import connectDB from "@/lib/mongodb";
import Blog from "@/app/models/Blog";

export const getAllBlogs = async () => {
  await connectDB();
  const blogs = await Blog.find({ isHidden: false })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(blogs));
};

export const getBlogBySlug = async (slug: string) => {
  await connectDB();
  const blog = await Blog.findOne({ slug, isHidden: false }).lean();
  if (!blog) return null;
  return JSON.parse(JSON.stringify(blog));
};