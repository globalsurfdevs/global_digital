import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import About from "@/app/components/About/About";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const AboutPage = () => {
  return (
    <DefaultLayout>
        <About/>
    </DefaultLayout>
  );
};

export default AboutPage;
