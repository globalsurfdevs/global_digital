import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";  
import LogoSwiper from "../../components/DigitalMarketingService/LogoSwiper";
import Platforms from "@/app/components/PermormanceMarketing/Platforms";
import Head from "next/head";

import {
  BannerSection, 
  OurServices,
  Frameworkdata,
  Wecanhelp,
  Platformsecomdata,
  Cta,
  Faq,
  relatedservices,
  logosdata,
  logosdatas, 
} from "../../data/services/marketing-strategy-consulting/data";

import PlatformMarketing from "@/app/components/marketing-strategy-consulting/Platform-marketing";
import Framework from "@/app/components/PermormanceMarketing/Framework";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices"; 

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
    title: "Digital Marketing Services Agency in Dubai | Global Surf Digital",
    description:
      "Achieve your business goals with our top-tier digital marketing services in Dubai. Our digital company crafts custom strategies for long-term success. Start Now!",
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
        maxchwidth={24} 
      />
      <div className="innerwhite">
      <Platforms
        title={Wecanhelp.title}
        data={Wecanhelp.data}
        icontitle={true}
        hiddentitle={true}
        leftzero={true}
        colcount={3}
      />
      </div> 
      <div className="mnstsaq bg-black text-white">
        <Framework
          title={Frameworkdata.title}
          data={Frameworkdata.data}
          bgcolor="bg-black"
          colcount={3}
        /> 
      </div>       
     
     
      <Services
        title={OurServices.title}
        data={OurServices.data}
        colcount={5}
         bgcolor="bg-dgray"
        // bgtt1="text-white"
        // bgtt3="text-white"
        hrcontent={true}
      />
      <div className="pb-[50px] pt-[50px] lg:pb-[130px] lg:pt-[130px]">
        <LogoSwiper
          logosdata={logosdata}
          slidesPerView={7.5}
          title1="Our Strategy & Marketing Technology Stack"
        />
        <LogoSwiper logosdata={logosdatas} slidesPerView={7} />
      </div>

      <section className="">
        <PlatformMarketing
          title={Platformsecomdata.title}
          data={Platformsecomdata.data}
          desc={Platformsecomdata.desc}
        />
      </section>
     
     <div className="pb-[50px] pt-[50px] lg:pb-[130px] lg:pt-[130px]">
      <GetInTouch data={Cta} redlast={false} ctabbutton={"CONTACT US TODAY!"} />
      </div>
      <FAQ data={Faq} />
      <RelatedServices
        title={relatedservices.title}
        data={relatedservices.data}
        colcount={3}
      />
    </div>
  );
};

export default page;
