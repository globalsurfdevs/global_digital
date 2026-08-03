import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminEnquiry from "@/app/components/AdminEnquiry/AdminEnquiry";
import { Suspense } from "react";



const EnquiryPage = () => {
    return (
            <Suspense fallback={"Loading"}>
            <AdminEnquiry />
            </Suspense>
    );
};

export default EnquiryPage;