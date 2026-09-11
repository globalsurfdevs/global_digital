 
import AdminSubServiceDetails from "@/app/components/AdminSubService/AdminSubServiceDetails";
import { Suspense } from "react";

const ServicePage = () => {
//   const params = useParams<{ id: string }>();
//   const slug = params?.id;
  return (
    <Suspense fallback={"Loading"}>
     <AdminSubServiceDetails/>
    </Suspense>
  );
};

export default ServicePage;
