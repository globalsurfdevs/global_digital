import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminIndiBlog from "@/app/components/AdminIndiBlog/AdminIndiBlog";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const BlogsPage = () => {
  return (
    <DefaultLayout>
        <AdminIndiBlog editMode/>
    </DefaultLayout>
  );
};

export default BlogsPage;