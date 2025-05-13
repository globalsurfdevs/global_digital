import React from "react";
import HeroSection from "../../../components/BannerSectionBC/HeroWithBc";
import DigitalMarketing from "../../../components/IndConstruction/DigitalConstruction";
import FAQ from "../../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../../components/EcomIndustry/GetInTouch2";
import Expertise from "../../../components/EcomIndustry/Expertise";
import Framework from "../../../components/Hospitality/RightAlignedSection";
import SuccessStories from "../../../components/IndConstruction/SucessStories";
import {
  BannerSection,
  AreaExpertise,
  IndustriesWeServe,
  Clientsformsdata,
  Frameworkdata,
  Cta,
  Faq,

} from "../../../data/hospitality/datas";


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
    title: "E-Commerce Digital Marketing Agency Dubai | Global Surf Digital",
    description:
      "Scale your e-commerce brand with data-driven digital marketing strategies. From SEO to performance marketing, we help you attract buyers and grow. Call us! ",
    alternates: {
      canonical:
        "https://www.globalsurf.ae",
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
        colcount={2}
        maxchwidth={52}
      />
      <DigitalMarketing title={AreaExpertise.title} data={AreaExpertise.data} />
      {/* <SuccessStories
        Clientsformsdata={Clientsformsdata}
        title1="Success Stories <br>That Speak for Themselves"
      /> */}

      <FAQ data={Faq} subp="Got Questions? We’ve Got Answers!" />
      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"GET A FREE CONSULTATION"}
        
      />
      <Expertise
        title={IndustriesWeServe.title}
        data={IndustriesWeServe.data}
      />
    </div>
  );
};

export default page;
