import React from "react";
import HeroSection from "../../../components/BannerSectionBC/HeroWithBc";
import Head from "next/head";
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
    title: "B2B Digital Marketing Services in Dubai | Global Surf Digita ",
    description:
      "Partner with Dubai's top-tier B2B digital marketing agency to attract qualified leads, nurture relationships, and boost long-term growth. Get a quote now!",
    alternates: {
      canonical: "https://www.globalsurf.ae/industry/b2b-digital-marketing-services",
    },
    robots: "index, follow",
  };
}
const page = () => {
  return (
    <div>
       <Head>
        <meta
          property="og:title"
          content="B2B Digital Marketing Services | Drive Growth & Maximize ROI"
        />
        <meta property="og:site_name" content="Global Surf Digital Media" />
        <meta
          property="og:url"
          content="https://www.globalsurf.ae/industry/b2b-digital-marketing-services"
        />
        <meta
          property="og:description"
          content="Transform your B2B business with tailored digital marketing strategies. From lead generation to branding, we help you optimize conversions and build trust. Partner with Global Surf today!"
        />
      </Head>
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        bannerlogp={false}
        maxchwidth={30}
      />

      <Framework
        title={Frameworkdata.title}
        data={Frameworkdata.data}
        bgcolor={"white"}
        colcount={3}
        maxchwidth={58}
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
