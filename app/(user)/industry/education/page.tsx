import React from "react";
import HeroSection from "../../../components/PermormanceMarketing/HeroSection";
import DigitalMarketing from "../../../components/IndConstruction/DigitalConstruction";
import FAQ from "../../../components/PermormanceMarketing/FAQ";
import SuccessStories from "../../../components/IndConstruction/SucessStories";

import { BannerSection,Frameworkdata,AreaExpertise,IndustriesWeServe,Clientsformsdata ,Faq} from "../../../components/Education/data";
import Framework from "@/app/components/PermormanceMarketing/Framework";
import Expertise from "@/app/components/EcomIndustry/Expertise";

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
        maxchwidth={89}
      />

      <Framework title={Frameworkdata.title} data={Frameworkdata.data} colcount={3} bgcolor="white"/>

      <DigitalMarketing
        title={AreaExpertise.title}
        data={AreaExpertise.data}
      />
      <SuccessStories
        Clientsformsdata={Clientsformsdata}
        title1="Success Stories <br>That Speak for Themselves"
      />

      <section className="pt-[50px] lg:pt-[140px] ">
      <FAQ data={Faq} title="Frequently Asked Questions"subp="Got Questions? We’ve Got Answers!" bgcolor="#F2F2F2"/>
      </section>

      <Expertise
        title={IndustriesWeServe.title}
        data={IndustriesWeServe.data}
      />
    </div>
  );
};

export default page;
