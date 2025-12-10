import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/Geo/RightSideBulletsPoints";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";  
import LogoSwiper from "../../components/DigitalMarketingService/LogoSwiper";
import Platforms from "@/app/components/Geo/NumberLineText";
import Expertise from "../../components/PermormanceMarketing/Expertise";
import IconlineTitle from "@/app/components/Geo/IconlineTtitle";
import Expertises from "../../components/Geo/NumberHovImg";
import GeoProcess from "../../components/PermormanceMarketing/Services";
import BottomLine from "@/app/components/Geo/BottomLine";
import Head from "next/head";

import {
  BannerSection, 
  OurServices,
  Frameworkdata,
  Wecanhelp,
  Cta,
  Faq,
  logosdata,
  logosdatas, AreaExpertise,Wehelp, IndustriesWeServe,WhyBrands,
} from "../../data/services/generative-engine-optimization/data";

import PlatformMarketing from "@/app/components/marketing-strategy-consulting/Platform-marketing";
import Framework from "@/app/components/Geo/IconsTopContentBelow";
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
    title: "Digital Marketing Consultants Dubai – Global Surf Digital",
    description:
      "Global Surf Digital is a top-rated digital marketing consulting agency in Dubai. We craft data-driven strategies across SEO, PPC, Social Media, and Performance Marketing to help ambitious brands grow sales, visibility, and market authority.",
    alternates: {
      canonical: "https://www.globalsurf.ae/marketing-strategy-consulting",
    },
    robots: "noindex, nofollow",
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
       <div className="pb-[50px] pt-[20px] lg:pb-[130px] lg:pt-[130px]">
        <LogoSwiper
          logosdata={logosdata}
          slidesPerView={6.5}
          title1="Platforms We Optimize For "
          subcontent="Where You Show Up "
        />
        <LogoSwiper logosdata={logosdatas} slidesPerView={6.5} />
      </div>
<div className="bg-[#F2F2F2]">
  <Platforms
    title={Wecanhelp.title}
    data={Wecanhelp.data}
    icontitle={false}
    hiddentitle={true}
    leftzero={true}
    colcount={4}
    hideIcon={true}      // hide icons
    showNumbers={true}   // show 01, 02, 03...
  />
</div>

      <div className="">
        <Framework
          title={Frameworkdata.title}
          data={Frameworkdata.data}
          colcount={3}
        /> 
      </div>       
     
     
      <Services
      />
      <Expertise title={AreaExpertise.title} subttle={AreaExpertise.subttle} data={AreaExpertise.data} colnum={3} />
<IconlineTitle  title={Wehelp.title}
          data={Wehelp.data}
  
          bgcolor="bg-black"
          colcount={3}
          />

          <Expertises colnum={3}
        title={IndustriesWeServe.title}
        data={IndustriesWeServe.data}
      />
       <GeoProcess
        title={OurServices.title}
        data={OurServices.data}
        bgcolor="bg-white"
        leftzero={true}
        colcount={5}
        hrcontent={true}
      />

    <BottomLine title={WhyBrands.title}
              data={WhyBrands.data}
             subtitle="We help your brand become part of the answer — not just another search result. "
              colcount={3} />
     
     
      <GetInTouch data={Cta} redlast={true} ctabbutton={"Book Now"} />
      <FAQ data={Faq} />
    
    </div>
  );
};

export default page;
