import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import { Suspense } from "react";
import AdminLinkedIn from "@/app/components/AdminLinkedIn/AdminLinkedIn";

const EnquiryPage = () => {
  return (
    <Suspense fallback={"Loading"}>
      <AdminLinkedIn />
    </Suspense>
  );
};

export default EnquiryPage;
