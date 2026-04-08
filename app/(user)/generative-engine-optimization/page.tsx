import React from "react";
import HeroSectionType2 from "../../components/PermormanceMarketing/HeroSectionType2";
import Services from "../../components/Geo/RightSideBulletsPoints";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import GeoLogoSwiper from "@/app/components/Geo/GeoLogoSwiper";
import NumberCardGrid from "@/app/components/Geo/NumberCardGrid";
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
  logosdatas, AreaExpertise, Wehelp, IndustriesWeServe, WhyBrands,
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
    title: "Generative Engine Optimization (GEO) Services Dubai | Global Surf Digital",
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
        <meta property="og:title"
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
      <HeroSectionType2 Bannerdata={BannerSection} hideslider={true} maxchwidth={24} />
      <div className="py-10 md:py-24 xl:py-140">
        <GeoLogoSwiper logosdata={logosdata} slidesPerView={5.6} title1="Platforms We Optimize For " subcontent="Ensure your brand appears across all major AI search engines " />
        <GeoLogoSwiper logosdata={logosdatas} slidesPerView={5.6} direction="reverse" />
      </div>
      <div className="bg-black py-140">
        <NumberCardGrid
          title={Wecanhelp.title}
          data={Wecanhelp.data}
          leftzero={true}
          colcount={4}
        />
      </div>

      <div className="">
        <Framework
          title={Frameworkdata.title}
          data={Frameworkdata.data}
          colcount={3}
        />
      </div>
      <Services />
      <Expertise title={AreaExpertise.title} subttle={AreaExpertise.subttle} data={AreaExpertise.data} colnum={3} />
      <IconlineTitle title={Wehelp.title}
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
        titlemb="mb-5 xl:mb-10"
        data={WhyBrands.data}
        subtitle="We position your brand within AI-generated answers, not just traditional search results."
        colcount={3} />


      <GetInTouch data={Cta} redlast={true} ctabbutton={"Book Now"} />
      <FAQ data={Faq} defActive="2" />

    </div>
  );
};

export default page;

