import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminBlog from "@/app/components/AdminBlog/AdminBlog";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const BlogsPage = () => {
  return (
    <DefaultLayout>
        <AdminBlog/>
    </DefaultLayout>
  );
};

export default BlogsPage;