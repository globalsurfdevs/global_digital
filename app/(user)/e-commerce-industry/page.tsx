import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import KeyDigital from "../../components/IndConstruction/KeyDigital";
import DigitalMarketing from "../../components/IndConstruction/DigitalConstruction";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/EcomIndustry/GetInTouch";
import Expertise from "../../components/EcomIndustry/Expertise";
import Framework from "../../components/PermormanceMarketing/Framework";
import SuccessStories from "../../components/IndConstruction/SucessStories";

import { KeyDigitalData } from "../../data/services/e-com-industry/keyDigital";
import { BannerSection } from "../../data/services/e-com-industry/herosection";
import { AreaExpertise } from "../../data/services/e-com-industry/digitaconstructions";
import { IndustriesWeServe } from "../../data/services/e-com-industry/industries-we-serve";
import { Clientsformsdata } from "../../data/services/e-com-industry/clientsdetails";
import { Frameworkdata } from "../../data/services/e-com-industry/framework";
import { Cta } from "../../data/services/e-com-industry/cta";
import { Faq } from "../../data/services/e-com-industry/faq";
import Testimonials from "@/app/components/HomePage/Testimonials";
import SliderInd from "@/app/components/IndConstruction/SliderInd";
import { Platformsdata } from "../../data/services/e-com-industry/clientslogo";

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
      />

      <Framework
        title={Frameworkdata.title}
        title1={Frameworkdata.title1}
        data={Frameworkdata.data}
        bgcolor={"white"}
        colcount={3}
      />
      <DigitalMarketing title={AreaExpertise.title} data={AreaExpertise.data} />
      <SuccessStories
        Clientsformsdata={Clientsformsdata}
        title1="Success Stories <br>That Speak for Themselves"
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
