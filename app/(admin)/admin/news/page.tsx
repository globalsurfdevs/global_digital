import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import Team from "@/app/components/Team/Team";
import News from "@/app/components/News/News";


export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const NewsPage = () => {
  return (
    <DefaultLayout>
        <News/>
    </DefaultLayout>
  );
};

export default NewsPage;