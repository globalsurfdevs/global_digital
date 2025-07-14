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
   openGraph: {
    title: string;
    siteName: string;
    url: string;
    description: string;
  };
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hospitality Digital Marketing Agency in Dubai | GS Digital",
    description:
      "Drive direct bookings and engage high-intent travellers with result-driven digital marketing strategies tailored for the hospitality industry. Get a free consultation! ",
    alternates: {
      canonical:
        "https://www.globalsurf.ae/industry/digital-marketing-agency-for-hospitality",
    },
    robots: "index, follow",
     openGraph: {
      title:
        "Hospitality Digital Marketing Agency | Global Surf Digital | 25+ Experts, 11+ Years",
      siteName: "Global Surf Digital",
      url: "https://www.globalsurf.ae/industry/digital-marketing-agency-for-hospitality",
      description:
        "Get more bookings and reach high-intent travelers with expert hospitality SEO, PPC, and digital branding services. From resorts to boutique stays, we help hospitality brands grow with tailored digital marketing. Get a quote today!",
    },
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
      subtitle={Frameworkdata.subtitle}
        data={Frameworkdata.data}
        bgcolor={"white"}
        colcount={2}
        maxchwidth={52}
      />
      <DigitalMarketing title={AreaExpertise.title} data={AreaExpertise.data}  />
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
