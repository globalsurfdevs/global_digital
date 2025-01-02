import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminCaseStudy from "@/app/components/AdminCaseStudy/AdminCaseStudy";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const CaseStudyPage = () => {
  return (
    <DefaultLayout>
        <AdminCaseStudy/>
    </DefaultLayout>
  );
};

export default CaseStudyPage;