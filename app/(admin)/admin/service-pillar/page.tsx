import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminEnquiry from "@/app/components/AdminEnquiry/AdminEnquiry";
import { Suspense } from "react";
import AdminServicePillarList from "@/app/components/AdminServicePillars/ServicePillarList";

const ServicePage = () => {
  return (
    <Suspense fallback={"Loading"}>
      <AdminServicePillarList />
    </Suspense>
  );
};

export default ServicePage;
