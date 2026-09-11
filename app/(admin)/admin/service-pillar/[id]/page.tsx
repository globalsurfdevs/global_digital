 
import ServicePillarPage from "@/app/components/AdminServicePillars/ServicePillars";
import { useParams } from "next/navigation";
import { Suspense } from "react";

const ServicePage = () => {
//   const params = useParams<{ id: string }>();
//   const slug = params?.id;
  return (
    <Suspense fallback={"Loading"}>
     <ServicePillarPage/>
    </Suspense>
  );
};

export default ServicePage;
