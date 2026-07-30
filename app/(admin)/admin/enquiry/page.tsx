import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminEnquiry from "@/app/components/AdminEnquiry/AdminEnquiry";
import { Suspense } from "react";



const EnquiryPage = () => {
    return (
        <DefaultLayout>
            <Suspense fallback={"Loading"}>
            <AdminEnquiry />
            </Suspense>
        </DefaultLayout>
    );
};

export default EnquiryPage;