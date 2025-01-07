import ECommerce from "@/app/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Backend Console - Global Surf Digital",
  description: "Backend Console - Global Surf Digital",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
          <ECommerce />
      </DefaultLayout>
    </>
  );
}
