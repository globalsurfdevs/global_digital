import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminCareer from "@/app/components/AdminCareer/AdminCareer";

export const metadata: Metadata = {
    title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
    description:
        "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const EnquiryPage = () => {
    return (
        <DefaultLayout>
            <AdminCareer />
        </DefaultLayout>
    );
};

export default EnquiryPage;