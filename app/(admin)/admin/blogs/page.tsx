import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminBlogList from "@/app/components/AdminBlog/AdminBlogList";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Manage blog posts",
};

const BlogsPage = () => {
  return (
    <DefaultLayout>
      <AdminBlogList />
    </DefaultLayout>
  );
};

export default BlogsPage;
