import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminEnquiry from "@/app/components/AdminEnquiry/AdminEnquiry";
import { Suspense } from "react";
import AdminServiceList from "@/app/components/AdminServices/AdminServices";



const ServicePage = () => {
    return (
        <DefaultLayout>
            <Suspense fallback={"Loading"}>
            <AdminServiceList />
            </Suspense>
        </DefaultLayout>
    );
};

export default ServicePage;