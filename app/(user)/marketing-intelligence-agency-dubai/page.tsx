import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Expertise from "../../components/PermormanceMarketing/Expertise";
import Boost from "../../components/PermormanceMarketing/Boost";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Industries from "../../components/PermormanceMarketing/Industries";
import Results from "../../components/PermormanceMarketing/Results";
import Partner from "../../components/PermormanceMarketing/Partner";
import Testimonials from "../../components/HomePage/Testimonials";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";

import { BannerSection } from "../../data/services/marketing-intelligence/herosection";
import { AreaExpertise } from "../../data/services/marketing-intelligence/area-of-expertise";
import { boostEngage } from "../../data/services/marketing-intelligence/boost-engage";
import { OurServices } from "../../data/services/marketing-intelligence/our-services";
import { Frameworkdata } from "../../data/services/marketing-intelligence/framework";
import { ResultsData } from "../../data/services/marketing-intelligence/results";
import { partnerData } from "../../data/partnerData";
import { Cta } from "../../data/services/marketing-intelligence/cta";
import { Faq } from "../../data/services/marketing-intelligence/faq";

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
    title:
      "Marketing Intelligence Services in Dubai | Data-Driven Business Intelligence | GS.Digital",
    description:
      "Accelerate your business growth with our data-driven growth strategies. Leverage market insights, competitor analysis, and data-driven strategies to stay ahead in the market.",
    alternates: {
      canonical:
        "https://www.globalsurf.ae/marketing-intelligence-agency-dubai",
    },
  };
}
const page = () => {
  return (
    <div>
      <HeroSection Bannerdata={BannerSection} order={"05"} />
      <Expertise title={AreaExpertise.title} data={AreaExpertise.data} />
      <Boost title={boostEngage.title} data={boostEngage.data} />
      <Services title={OurServices.title} data={OurServices.data} />
      <Framework title={Frameworkdata.title} data={Frameworkdata.data} />
      <Industries />
      <Results title={ResultsData.title} data={ResultsData.data} />
      <Partner data={partnerData} />
      <Testimonials />
      <GetInTouch data={Cta} ctabbutton={"LET'S TALK GROWTH"} />
      <FAQ data={Faq} />
    </div>
  );
};

export default page;
