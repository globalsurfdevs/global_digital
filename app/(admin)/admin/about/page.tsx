import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import About from "@/app/components/About/About";



const AboutPage = () => {
  return (
    <DefaultLayout>
        <About/>
    </DefaultLayout>
  );
};

export default AboutPage;
