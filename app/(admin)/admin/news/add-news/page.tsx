import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AddNews from "@/app/components/AddNews/AddNews";


export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const NewsPage = () => {
  return (
    <DefaultLayout>
        <AddNews/>
    </DefaultLayout>
  );
};

export default NewsPage;