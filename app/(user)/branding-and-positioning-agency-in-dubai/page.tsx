import React from "react";
// import Script from "next/script";
import HeroSection from "../../components/BrandingAndPositioning/HeroSection";
import Testimonials from "../../components/HomePage/Testimonials";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import { Cta } from "../../data/services/performance-marketing/cta";
import { Faq } from "../../data/services/performance-marketing/faq";
import TitleDesc from "../../components/BrandingAndPositioning/TitleDesc";
import ImgDesc from "../../components/BrandingAndPositioning/ImgDesc";
import GrayParaSec from "../../components/BrandingAndPositioning/GrayParaSec";
import ServicesSec from "../../components/BrandingAndPositioning/ServicesSec";
import { servicesData, whatYouGetData, capabilitiesData, caseStudiesData } from "../../data/services/branding-and-positioning-agency-in-dubai/data";
import ProcessSlider from "@/app/components/BrandingAndPositioning/ProcessSlider";
import BECS from "@/app/components/BrandingAndPositioning/BECS";
import BlackInfoGrid from "@/app/components/BrandingAndPositioning/BlackInfoGrid";
import RelatedCapabilities from "@/app/components/BrandingAndPositioning/RelatedCapabilities";
import ButtonSlider from "@/app/components/BrandingAndPositioning/ButtonSlider";
import WhyChoose from "@/app/components/BrandingAndPositioning/WhyChoose";
import { whyChooseData } from "../../data/services/branding-and-positioning-agency-in-dubai/data";
import CaseSudiesSec from "@/app/components/BrandingAndPositioning/CaseSudiesSec";


// import FaqSchema from "../../components/Schema/FaqSchemad";
// import {
//   PerformanceMarketingSchema,
//   PerformanceMarketingBreadcrumb  } from "../../components/Schema/ServiceSchema";

interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "",
    description:
      "",
    alternates: {
      canonical: "https://www.globalsurf.ae/branding-and-positioning-agency-in-dubai",
    },
  };
}
const page = () => {
  return (
    <div>
      {/* <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PerformanceMarketingSchema),
        }}
      />

      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PerformanceMarketingBreadcrumb),
        }}
      />
      <FaqSchema faq={Faq} /> */}
      {/* <section className="hidegslider">
        <HeroSection
          Bannerdata={BannerSection}
          bannerlogp={true}
          maxchwidth={60}
        />
      </section> */}
      <HeroSection />
      <TitleDesc />
      <ImgDesc />
      <GrayParaSec />
      <ServicesSec title={servicesData.title} description={servicesData.subtitle} items={servicesData.items} />
      <ProcessSlider />
      <BECS />
      <BlackInfoGrid title={whatYouGetData.title} data={whatYouGetData.data} bgcolor="bg-black" maxchwidth={50} colcount={4} />
      <RelatedCapabilities data={capabilitiesData} />
      <section className="mb-8 xl:mb-12 2xl:mb-16 3xl:mb-[120px]">
        <ButtonSlider />
      </section>
      <WhyChoose data={whyChooseData} />
      <CaseSudiesSec data={caseStudiesData} />
      <Testimonials topTitle="Testimonials" />
      <GetInTouch data={Cta} ctabbutton={"LET'S TALK GROWTH"} />
      <FAQ data={Faq} />
    </div>
  );
};

export default page;
