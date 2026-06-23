import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminBlogForm from "@/app/components/AdminBlog/AdminBlogForm";

export const metadata: Metadata = {
  title: "Add Blog",
  description: "Create a new blog post",
};

const AddBlogPage = () => {
  return (
    <DefaultLayout>
      <AdminBlogForm />
    </DefaultLayout>
  );
};

export default AddBlogPage;