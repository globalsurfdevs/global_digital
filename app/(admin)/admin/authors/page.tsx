import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminBlogForm from "@/app/components/AdminBlog/AdminBlogForm";
import AdminPortfolioAuthor from "@/app/components/AdminAuthor/AdminAuthor";


const EditBlogPage = () => {
  return (
    <DefaultLayout>
      <AdminPortfolioAuthor/>
    </DefaultLayout>
  );
};

export default EditBlogPage;