
import { Suspense } from "react";
import AdminSubServiceList from "@/app/components/AdminSubService/AdminSubServiceList";

const ServicePage = () => {
  return (
    <Suspense fallback={"Loading"}>
      <AdminSubServiceList />
    </Suspense>
  );
};

export default ServicePage;
