import React from "react";
import HeroSection from "../../../components/PerformanceMarketing/HeroSection";
import Expertise from "../../../components/PerformanceMarketing/Expertise";
import Boost from "../../../components/PerformanceMarketing/Boost";
import Services from "../../../components/PerformanceMarketing/Services";
import Framework from "../../../components/PerformanceMarketing/Framework";
import Industries from "../../../components/PerformanceMarketing/Industries";
import OurWorks from "../../../components/PerformanceMarketing/Ourworks";
import Partner from "../../../components/PerformanceMarketing/Partner";
import Testimonials from "../../../components/HomePage/Testimonials";
import FAQ from "../../../components/PerformanceMarketing/FAQ";
import GetInTouch from "../../../components/PerformanceMarketing/GetInTouch";

import { BannerSection } from "../../../data/services/social-media/herosection";
import { AreaExpertise } from "../../../data/services/social-media/area-of-expertise";
import { boostEngage } from "../../../data/services/social-media/boost-engage";
import { OurServices } from "../../../data/services/social-media/our-services";
import { Frameworkdata } from "../../../data/services/social-media/framework";
import { partnerData } from "../../../data/partnerData";
import { Cta } from "../../../data/services/social-media/cta";
import { Faq } from "../../../data/services/social-media/faq";

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
    title: "Social Media Services That Delivers Results | GS Digital",
    description:
      "Captivate Audiences. Our human-first approach combines strategy & creativity for meaningful social media results.Contact us today for a free consultation.",
    alternates: {
      canonical: "https://www.globalsurf.ae/social-media-agency-dubai",
    },
  };
}
const page = () => {
  return (
    <div>
      <HeroSection Bannerdata={BannerSection} order={"03"} maxchwidth={25} />
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
