import AboutGlobal from "@/app/components/HomePage/AboutGlobal";
import HeroSection from "@/app/components/HomePage/HeroSection";
import LogoSwiper from "@/app/components/HomePage/LogoSwiper";
import OurAchievements from "@/app/components/HomePage/OurAchievements";
import OurServices from "@/app/components/HomePage/OurServices";
import SuccessStories from "@/app/components/HomePage/SuccessStories";
import Clients from "@/app/components/HomePage/Clients";
import Testimonials from "@/app/components/HomePage/Testimonials";
import Tours from "@/app/components/HomePage/Tours";
// import WorkIn from "@/app/components/HomePage/WorkIn";
import FAQ from "@/app/components/PermormanceMarketing/FAQ";
import Cta from "@/app/components/HomePage/Cta";
import IndustriesweWork from "@/app/components/HomePage/IndustriesweWork";
import Script from "next/script";
import {
  Faq,
} from "@/app/components/HomePage/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full service Digital Marketing Agency Dubai | Global Surf Digital",
  description: "Full-service digital marketing agency in Dubai. From SEO to web development, we help 100+ brands dominate search & social. Start your growth journey today.",
  alternates: {
    canonical: "https://www.globalsurf.ae",
  },
  robots: "index, follow",
  openGraph: {
    title: "Strategic Digital Marketing Solutions in Dubai | GS.Digital",
    siteName: "Global Surf Digital", // ✅ siteName not site_name
    url: "https://www.globalsurf.ae/",
    description: "GS.Digital helps brands thrive with powerful SEO, paid ads, content strategies, and more, crafted by a team of Dubai-based marketing professionals. Discover your growth potential today.",
    images: [
      {
        url: "https://www.globalsurf.ae/gs-digital-logo.svg",
        alt: "Global Surf Digital Logo",
        type: "image/svg+xml",
      },
    ],
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Global Surf Digital",
            url: "https://www.globalsurf.ae",
          }),
        }}
      />
      <HeroSection />
      <LogoSwiper />
      <AboutGlobal />
      <OurServices />
      <OurAchievements />
      <IndustriesweWork />
      {/* <WorkIn /> */}
      <Tours />
      <SuccessStories />
      <Clients />
      <Testimonials />
      <FAQ data={Faq} />
      <Cta />
    </>
  );
}
