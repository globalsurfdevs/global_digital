import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminBlogForm from "@/app/components/AdminBlog/AdminBlogForm";

export const metadata: Metadata = {
  title: "Edit Blog",
  description: "Edit blog post",
};

const EditBlogPage = () => {
  return (
    <DefaultLayout>
      <AdminBlogForm editMode />
    </DefaultLayout>
  );
};

export default EditBlogPage;