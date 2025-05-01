import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import DigitalServ from "@/app/components/DigitalMarketingService/DigitalSer";
import Boost from "../../components/PermormanceMarketing/Boost";
import SuccessStories from "../../components/DigitalMarketingService/SuccessStories";
import Expertises from "../../components/EcomIndustry/Expertise";
import LogoSwiper from "../../components/DigitalMarketingService/LogoSwiper";
import Head from "next/head";

import {
  BannerSection,
  DigitalServdata,
  boostEngage,
  OurServices,
  Frameworkdata,
  Platformsecomdata,
  Cta,
  Faq,
  IndustriesWeServe,
  logosdata,
  logosdatas,
  Clientsformsdata,
} from "../../data/services/digital-marketing-services/data";

import Platformserver from "@/app/components/e-commerce-wdd/Platformserver";
import Framework from "@/app/components/PermormanceMarketing/Framework";

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
    title: "Digital Marketing Services in Dubai | Global Surf Digital",
    description:
      "Achieve your business goals with our top-tier digital marketing services in Dubai.  We create customized strategies to drive long-term success. Get a quote now!",
    alternates: {
      canonical: "https://www.globalsurf.ae/digital-marketing-services",
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
          content="Comprehensive Digital Marketing Services in Dubai | Maximize Impact"
        />
        <meta property="og:site_name" content="Global Surf Digital Media" />
        <meta
          property="og:url"
          content="https://www.globalsurf.ae/digital-marketing-services"
        />
        <meta
          property="og:description"
          content="From SEO to analytics, our digital marketing services in Dubai are designed to enhance your brand’s impact, engagement, and conversions. Partner with Global Surf today."
        />
      </Head>
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        maxchwidth={34}
      />
      <DigitalServ
        title={DigitalServdata.title}
        btntitle={DigitalServdata.btntitle}
        btnurl={DigitalServdata.btnurl}
        desc={DigitalServdata.desc}
        data={DigitalServdata.data}
      />
      <Boost title={boostEngage.title} data={boostEngage.data} />
      <div className="gtdr">
        <Framework
          title={Frameworkdata.title}
          data={Frameworkdata.data}
          bgcolor="white"
          colcount={3}
        />
      </div>
      <SuccessStories
        title1="Featured Projects "
        Clientsformsdata={Clientsformsdata}
      />
      <Services
        title={OurServices.title}
        data={OurServices.data}
        colcount={5}
        bgcolor="bg-black"
        bgtt1="text-white"
        bgtt3="text-white"
        hrcontent={true}
      />
      <div className="pb-[50px] pt-[50px] lg:pb-[130px] lg:pt-[130px]">
        <LogoSwiper
          logosdata={logosdata}
          slidesPerView={7.5}
          title1="Tools and Platforms"
        />
        <LogoSwiper logosdata={logosdatas} slidesPerView={7} />
      </div>

      <section className="">
        <Platformserver
          title={Platformsecomdata.title}
          data={Platformsecomdata.data}
        />
      </section>
      <Expertises
        colnum={3}
        title={IndustriesWeServe.title}
        data={IndustriesWeServe.data}
      />
      <GetInTouch data={Cta} redlast={true} ctabbutton={"LET’S CONNECT!"} />
      <FAQ data={Faq} />
    </div>
  );
};

export default page;
