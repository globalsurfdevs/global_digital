import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminCaseStudy from "@/app/components/AdminCaseStudy/AdminCaseStudy";



const CaseStudyPage = () => {
  return (
    <DefaultLayout>
        <AdminCaseStudy/>
    </DefaultLayout>
  );
};

export default CaseStudyPage;