import React from "react";
import HeroSection from "../../../components/PermormanceMarketing/HeroSection";
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
    title: "Industry Construction",
    description:
      "Looking for a pay per click advertising agency in Dubai? Our expert PPC services deliver targeted campaigns to maximize ROI. Contact us today! ",
    alternates: {
      canonical: "https://www.globalsurf.ae",
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
      <KeyDigital
        title={KeyDigitalData.title}
        data={KeyDigitalData.data}
        colcount={6}
      />
      <DigitalMarketing title={AreaExpertise.title} data={AreaExpertise.data} />
      <SuccessStories Clientsformsdata={Clientsformsdata} />

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
        link={"/lets-talk"}
      />
      <Expertise
        title={IndustriesWeServe.title}
        data={IndustriesWeServe.data}
      />
    </div>
  );
};

export default page;
