import React from "react";
// import Script from "next/script";
import HeroSection from "../../components/BrandingAndPositioning/HeroSection";
import TitleDescSec from "../../components/BrandingAndPositioning/TitleDesc";
import Expertise from "../../components/PermormanceMarketing/Expertise";
import Boost from "../../components/PermormanceMarketing/Boost";
// import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Industries from "../../components/PermormanceMarketing/Industries";
import Results from "../../components/PermormanceMarketing/Results";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import Partner from "../../components/PermormanceMarketing/Partner";
import Testimonials from "../../components/HomePage/Testimonials";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";


import { AreaExpertise } from "../../data/services/performance-marketing/area-of-expertise";
import { boostEngage } from "../../data/services/performance-marketing/boost-engage";
import { OurServices } from "../../data/services/performance-marketing/our-services";
import { Frameworkdata } from "../../data/services/performance-marketing/framework";
import { ResultsData } from "../../data/services/performance-marketing/results";
import { Platformsdata } from "../../data/services/performance-marketing/platforms";
import { partnerData } from "../../data/partnerData";
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
import RelatedCapabili from "@/app/components/BrandingAndPositioning/RelatedCapabilities";
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
      {/* <Expertise title={AreaExpertise.title} data={AreaExpertise.data} />
      <Boost title={boostEngage.title} data={boostEngage.data} />
      <Services title={OurServices.title} data={OurServices.data} />
      <Framework title={Frameworkdata.title} data={Frameworkdata.data} />
      <Industries />
      <Results title={ResultsData.title} data={ResultsData.data} />
      <Platforms title={Platformsdata.title} data={Platformsdata.data} />
      <Partner data={partnerData} /> */}
      <Testimonials />
      <GetInTouch data={Cta} ctabbutton={"LET'S TALK GROWTH"} />
      <FAQ data={Faq} />
    </div>
  );
};

export default page;
