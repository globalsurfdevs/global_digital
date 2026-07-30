import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import About from "@/app/components/About/About";
import SitemapPage from "@/app/components/AdminSitemap/AdminSitemap";



const AboutPage = () => {
  return (
    <DefaultLayout>
        <SitemapPage/>
    </DefaultLayout>
  );
};

export default AboutPage;