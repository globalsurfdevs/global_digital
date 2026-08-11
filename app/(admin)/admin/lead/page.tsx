import { Suspense } from "react";
import AdminLeads from "@/app/components/AdminLeads/AdminLeads";



const EnquiryPage = () => {
    return (
            <Suspense fallback={"Loading"}>
            <AdminLeads />
            </Suspense>
    );
};

export default EnquiryPage;