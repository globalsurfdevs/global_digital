import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import { Suspense } from "react";
import IndiServicePage from "@/app/components/AdminServices/IndiService";

const ServicePage = () => {
  return (
    <Suspense fallback={"Loading"}>
      <IndiServicePage />
    </Suspense>
  );
};

export default ServicePage;
