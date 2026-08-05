import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import { Suspense } from "react";
import IndiIndustryPage from "@/app/components/AdminIndustries/IndiIndustry";

const ServicePage = () => {
  return (
    <Suspense fallback={"Loading"}>
      <IndiIndustryPage />
    </Suspense>
  );
};

export default ServicePage;
