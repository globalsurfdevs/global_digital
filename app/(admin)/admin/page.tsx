import AdminDashboard from "@/app/components/Dashboard/AdminDashboard";
import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Backend Console - GS Digital",
  description: "Backend Console - GS Digital",
};

export default function Home() {
  return (
    <>
      <AdminDashboard />
    </>
  );
}
