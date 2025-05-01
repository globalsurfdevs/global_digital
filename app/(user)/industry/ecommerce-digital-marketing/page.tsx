import React from "react";
import HeroSection from "../../../components/BannerSectionBC/HeroWithBc";
import DigitalMarketing from "../../../components/IndConstruction/DigitalConstruction";
import FAQ from "../../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../../components/EcomIndustry/GetInTouch";
import Expertise from "../../../components/EcomIndustry/Expertise";
import Framework from "../../../components/PermormanceMarketing/Framework";
import SuccessStories from "../../../components/IndConstruction/SucessStories";

import Head from "next/head";
import { BannerSection } from "../../../data/services/e-com-industry/herosection";
import { AreaExpertise } from "../../../data/services/e-com-industry/digitaconstructions";
import { IndustriesWeServe } from "../../../data/services/e-com-industry/industries-we-serve";
import { Clientsformsdata } from "../../../data/services/e-com-industry/clientsdetails";
import { Frameworkdata } from "../../../data/services/e-com-industry/framework";
import { Cta } from "../../../data/services/e-com-industry/cta";
import { Faq } from "../../../data/services/e-com-industry/faq";

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
        "https://www.globalsurf.ae/industry/ecommerce-digital-marketing",
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
          content="Boost E-Commerce Sales with Expert Digital Marketing | Global Surf"
        />
        <meta property="og:site_name" content="Global Surf Digital Media" />
        <meta
          property="og:url"
          content="https://www.globalsurf.ae/industry/ecommerce-digital-marketing"
        />
        <meta
          property="og:description"
          content="Drive traffic, increase conversions, and scale your e-commerce business with data-driven digital marketing strategies from Global Surf. Let’s grow together!"
        />
      </Head>
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        bannerlogp={false}
        maxchwidth={100}
      />

      <Framework
        title={Frameworkdata.title}
        title1={Frameworkdata.title1}
        data={Frameworkdata.data}
        bgcolor={"white"}
        colcount={3}
        maxchwidth={52}
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
        ctabbutton={"GET A FREE CONSULTATION"}
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
