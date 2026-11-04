import { unstable_cache } from "next/cache";
import connectDB from "@/lib/mongodb";
import Blog from "@/app/models/Blog";
import "@/app/models/Author";

export const getAllBlogs = unstable_cache(
  async () => {
    await connectDB();
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("author")
      .lean();


      // const blog=blogs.map((blog) => {
      //   return {
      //    sluf: blog.slug,
      //     title: blog.heading,
      //     thumbnail: blog.thumbnail,
      //   }})
      //   console.log('blogs : ',blog);
      //   console.log('blogs : ',blogs.length);
    return JSON.parse(JSON.stringify(blogs));
  },
  ["all-blogs"],
  { tags: ["blogs"] },

);

export const getBlogBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      await connectDB();
      // const blog = await Blog.findOne({ slug, isHidden: false })
      const blog = await Blog.findOne({ slug })
        .populate("author")
        .lean();
      if (!blog) return null;
      // console.log('blogs : ',blog);
      return JSON.parse(JSON.stringify(blog));
    },
    [`blog-by-slug-${slug}`],
    { tags: ["blogs", `blog-${slug}`] },
  )();
