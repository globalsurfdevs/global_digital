 
import IndiServicePage from "@/app/components/AdminSubService/AdminSubServiceDetails";
import AdminSubServiceDetails from "@/app/components/AdminSubService/AdminSubServiceDetails";
import { Suspense } from "react";

const ServicePage = () => {
//   const params = useParams<{ id: string }>();
//   const slug = params?.id;
  return (
    <Suspense fallback={"Loading"}>
     {/* <AdminSubServiceDetails/> */}
     <IndiServicePage/>
    </Suspense>
  );
};

export default ServicePage;
