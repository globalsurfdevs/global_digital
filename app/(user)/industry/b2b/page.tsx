import React from "react";
import HeroSection from "../../../components/BannerSectionBC/HeroWithBc";
import KeyDigital from "../../../components/IndConstruction/KeyDigital";
import DigitalMarketing from "../../../components/IndConstruction/DigitalConstruction";
import FAQ from "../../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../../components/BannerSectionBC/GetInTouch";
import Expertise from "../../../components/EcomIndustry/Expertise";
import Framework from "../../../components/PermormanceMarketing/Framework";
import SuccessStories from "../../../components/IndConstruction/SucessStories";

import { BannerSection } from "../../../data/services/ind-b2b/herosection";
import { AreaExpertise } from "../../../data/services/ind-b2b/digitaconstructions";
import { IndustriesWeServe } from "../../../data/services/ind-b2b/industries-we-serve";
import { Clientsformsdata } from "../../../data/services/ind-b2b/clientsdetails";
import { Frameworkdata } from "../../../data/services/ind-b2b/framework";
import { Cta } from "../../../data/services/ind-b2b/cta";
import { Faq } from "../../../data/services/ind-b2b/faq";
import Testimonials from "@/app/components/HomePage/Testimonials";
import SliderInd from "@/app/components/IndConstruction/SliderInd";

interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
  robots: string;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Digital Marketing for Construction Companies |  GS Digital ",
    description:
      "Boost your construction brand's visibility with tailored digital marketing strategies. From SEO to branding, we help firms attract high-value leads. Contact now!",
    alternates: {
      canonical: "https://www.globalsurf.ae/",
    },
    robots: "noindex, nofollow",
  };
}
const page = () => {
  return (
    <div>
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        bannerlogp={false}
        maxchwidth={100}
      />

      <Framework
        title={Frameworkdata.title}
        data={Frameworkdata.data}
        bgcolor={"white"}
        colcount={3}
      />
      <DigitalMarketing title={AreaExpertise.title} data={AreaExpertise.data} />
      <SuccessStories
        Clientsformsdata={Clientsformsdata}
        title1="Proven Success with B2B Brands "
      />

      <FAQ data={Faq} subp="Got Questions? We’ve Got Answers!" />
      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"Get a Free Consultation"}
        link={"https://www.globalsurf.ae/lets-talk"}
      />
      <Expertise
        title={IndustriesWeServe.title}
        data={IndustriesWeServe.data}
      />
    </div>
  );
};

export default page;
