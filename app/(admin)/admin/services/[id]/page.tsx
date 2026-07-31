import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import { Suspense } from "react";
import IndiServicePage from "@/app/components/AdminServices/IndiService";



const ServicePage = () => {
    return (
        <DefaultLayout>
            <Suspense fallback={"Loading"}>
            <IndiServicePage />
            </Suspense>
        </DefaultLayout>
    );
};

export default ServicePage;