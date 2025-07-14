import React from "react";
import HeroSection from "../../../components/BannerSectionBC/HeroWithBc";
import KeyDigital from "../../../components/IndConstruction/KeyDigital";
import DigitalMarketing from "../../../components/IndConstruction/DigitalConstruction";
import FAQ from "../../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../../components/IndConstruction/GetInTouch";
import Expertise from "../../../components/PermormanceMarketing/Expertise";
import SuccessStories from "../../../components/IndConstruction/SucessStories";

import { KeyDigitalData } from "../../../data/services/ind-constructions/keyDigital";
import { BannerSection } from "../../../data/services/ind-constructions/herosection";
import { AreaExpertise } from "../../../data/services/ind-constructions/digitaconstructions";
import { IndustriesWeServe } from "../../../data/services/ind-constructions/industries-we-serve";
import { Clientsformsdata } from "../../../data/services/ind-constructions/clientsdetails";
import { Cta } from "../../../data/services/ind-constructions/cta";
import { Faq } from "../../../data/services/ind-constructions/faq";
import Testimonials from "@/app/components/HomePage/Testimonials";
import SliderInd from "@/app/components/IndConstruction/SliderInd";
import { Platformsdata } from "../../../data/services/ind-constructions/clientslogo";

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
      canonical: "https://www.globalsurf.ae/industry/construction",
    },
    robots: "index, follow",
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
      <KeyDigital
        title={KeyDigitalData.title}
        data={KeyDigitalData.data}
        colcount={6}
      />
      <DigitalMarketing
        title={AreaExpertise.title}
        data={AreaExpertise.data}
        subtitle="How We Help Construction Companies Grow"
      />
      <SuccessStories
        Clientsformsdata={Clientsformsdata}
        title1="Success Stories <br>That Speak for Themselves"
      />

      <div className="container">
        <div className="border-t border-[#B6B2B2] lg:mt-[141px]"></div>
      </div>
      <section className="pb-[50px]  lg:pb-[140px]">
        <SliderInd Platformsdata={Platformsdata} />
      </section>

      <Testimonials bgcolor={"#F2F2F2"} />
      <FAQ data={Faq} />
      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"Lets talk growth"}
        
      />
      <Expertise
        title={IndustriesWeServe.title}
        data={IndustriesWeServe.data}
      />
    </div>
  );
};

export default page;
