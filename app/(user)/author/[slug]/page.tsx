import Index from "@/app/components/Author-details/Index";
import { getAuthorBySlug } from "@/app/lib/services/author.service";
import { getAllBlogs } from "@/app/lib/services/blog.service";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const dbBlogs = await getAllBlogs();
  const author = await getAuthorBySlug(slug);

  console.log(author);

  return (
    <>
      <Index dbBlogs={dbBlogs} author={author} />
    </>
  );
}
