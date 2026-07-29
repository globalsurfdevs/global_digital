import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminJobs from "@/app/components/AdminJobs/AdminJobs";



const JobsPage = () => {
  return (
    <DefaultLayout>
        <AdminJobs/>
    </DefaultLayout>
  );
};

export default JobsPage;