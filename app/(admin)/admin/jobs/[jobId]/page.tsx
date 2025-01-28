import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminIndiJobs from "@/app/components/AdminIndiJobs/AdminIndiJobs";


export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const JobsPage = () => {
  return (
    <DefaultLayout>
        <AdminIndiJobs editMode/>
    </DefaultLayout>
  );
};

export default JobsPage;