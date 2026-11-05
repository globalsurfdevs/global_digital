import React from "react";
import HeroSection from "../../../components/PerformanceMarketing/HeroSection";
import Boost from "../../../components/PerformanceMarketing/Boost";
import Services from "../../../components/PerformanceMarketing/Services";
import Framework from "../../../components/PerformanceMarketing/Framework";
import Industries from "../../../components/PerformanceMarketing/Industries";
import Partner from "../../../components/PerformanceMarketing/Partner";
import Testimonials from "../../../components/HomePage/Testimonials";
import FAQ from "../../../components/PerformanceMarketing/FAQ";
import GetInTouch from "../../../components/PerformanceMarketing/GetInTouch";
import OurWorks from "@/backup/components/service-pillars/creative-agency/Branding/OurworksB";
import Expertise from "../../../components/PerformanceMarketing/Expertise";
import { CreativeOfferSchema } from "../../../components/Schema/OfferCatalog";

import { BannerSection } from "@/backup/data/service-pillars/creative-agency/herosection";
import { AreaExpertise } from "@/backup/data/service-pillars/creative-agency/area-of-expertise";
import { boostEngage } from "@/backup/data/service-pillars/creative-agency/boost-engage";
import { OurServices } from "@/backup/data/service-pillars/creative-agency/our-services";
import { Frameworkdata } from "@/backup/data/service-pillars/creative-agency/framework";
import { partnerData } from "../../../data/partnerData";
import { Cta } from "@/backup/data/service-pillars/creative-agency/cta";
import { Faq } from "@/backup/data/service-pillars/creative-agency/faq";
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
    title: "Creative Agency in Dubai | Creative Marketing Solutions",
    description:
      "We are a leading creative design agency in Dubai, delivering innovative branding, graphic design, and visual content that captivates and drives business growth.",
    alternates: {
      canonical: "https://www.globalsurf.ae/creative-agency-dubai",
    },
  };
}
const page = () => {
  return (
    <div>
      <CreativeOfferSchema />
      <HeroSection Bannerdata={BannerSection} order={"05"} maxchwidth={22} />
      <Expertise title={AreaExpertise.title} data={AreaExpertise.data} />
      <Boost title={boostEngage.title} data={boostEngage.data} />
      <Services title={OurServices.title} data={OurServices.data} />
      <Framework title={Frameworkdata.title} data={Frameworkdata.data} />
      <Industries />
      <OurWorks />

      <Partner data={partnerData} />
      <Testimonials />
      <GetInTouch data={Cta} ctabbutton={"LET'S TALK GROWTH"} />
      <FAQ data={Faq} />
    </div>
  );
};

export default page;
