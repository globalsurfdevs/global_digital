import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminBlogForm from "@/app/components/AdminBlog/AdminBlogForm";
import AdminPortfolioAuthor from "@/app/components/AdminAuthor/AdminAuthor";
import AdminAuthorForm from "@/app/components/AdminAuthor/AddAuthor";


const EditBlogPage = () => {
  return (
    <DefaultLayout>
      <AdminAuthorForm/>
    </DefaultLayout>
  );
};

export default EditBlogPage;