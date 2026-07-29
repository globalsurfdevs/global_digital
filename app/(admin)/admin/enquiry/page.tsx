import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminEnquiry from "@/app/components/AdminEnquiry/AdminEnquiry";



const EnquiryPage = () => {
    return (
        <DefaultLayout>
            <AdminEnquiry />
        </DefaultLayout>
    );
};

export default EnquiryPage;