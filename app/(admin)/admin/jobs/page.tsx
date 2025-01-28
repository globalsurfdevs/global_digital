import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminJobs from "@/app/components/AdminJobs/AdminJobs";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const JobsPage = () => {
  return (
    <DefaultLayout>
        <AdminJobs/>
    </DefaultLayout>
  );
};

export default JobsPage;