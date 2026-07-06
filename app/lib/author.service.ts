import { unstable_cache } from "next/cache";
import connectDB from "@/lib/mongodb";
import Blog from "@/app/models/Blog";
import '@/app/models/Author'
import Author from "@/app/models/Author";


export const getAuthorBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      await connectDB();
      const author = await Author.findOne({ slug }).lean();
      if (!author) return null;
      return JSON.parse(JSON.stringify(author));
    },
    [`author-by-slug-${slug}`],
    { tags: ["authors", `author-${slug}`] }
  )();