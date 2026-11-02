import React from "react";
import HeroSection from "../../components/PerformanceMarketing/HeroSection";
import Services from "../../components/PerformanceMarketing/Services";
import FAQ from "../../components/PerformanceMarketing/FAQ";
import GetInTouch from "../../components/PerformanceMarketing/GetInTouch";

import {
  logosdatas,
  BannerSection,
  Wecanhelp,
  OurServices,
  Frameworkdata,
  Platformsecomdata,
  Cta,
  Faq,
  relatedservices,
} from "../../components/MiDataAnalytics/data";

import Platformserver from "@/app/components/e-commerce-wdd/Platformserver";
import Framework from "@/app/components/PerformanceMarketing/Framework";
import Platforms from "@/app/components/PerformanceMarketing/Platforms";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import LogoSwiper from "@/app/components/DigitalMarketingService/LogoSwiper";

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
    title: "Data Analytics Consulting Services Company | GS Digital ",
    description:
      "Unlock smarter decisions with expert data analytics consulting in Dubai. GS Digital delivers tailored data solutions to fuel business growth. Check now! ",
    alternates: {
      canonical: "https://www.globalsurf.ae/data-analytics-services-dubai",
    },
    robots: "index, follow",
  };
}

const page = () => {
  return (
    <div>
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        maxchwidth={34}
      />

      <Platforms
        title={Wecanhelp.title}
        data={Wecanhelp.data}
        icontitle={true}
        hiddentitle={true}
        leftzero={true}
        colcount={3}
      />

      <Framework
        title={Frameworkdata.title}
        data={Frameworkdata.data}
        bgcolor="white"
        colcount={3}
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
        {/* <LogoSwiper mtslogo={Matslogo[0]} /> */}
        <LogoSwiper
          logosdata={logosdatas}
          slidesPerView={7}
          title1="Our Data Analytics Technology Stack"
        />
      </div>

      <section className="pb-[50px] lg:pb-[150px]">
        <Platformserver
          title={Platformsecomdata.title}
          desc={Platformsecomdata.desc}
          data={Platformsecomdata.data}
        />
      </section>

      <GetInTouch data={Cta} redlast={true} ctabbutton={"LET’S CHAT!"} />
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
