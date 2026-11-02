import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminIndiJobs from "@/app/components/AdminIndiJobs/AdminIndiJobs";

const JobsPage = () => {
  return <AdminIndiJobs editMode />;
};

export default JobsPage;
