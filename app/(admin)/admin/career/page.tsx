import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminCareer from "@/app/components/AdminCareer/AdminCareer";



const EnquiryPage = () => {
    return (
        <DefaultLayout>
            <AdminCareer />
        </DefaultLayout>
    );
};

export default EnquiryPage;