import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import LogoSwiper from "../../components/MarketingAutomation/AutomationSwiper";

import {Matslogo,
  BannerSection,
  Wecanhelp,
  OurServices,
  Frameworkdata,
  Platformsecomdata,
  Cta,
  Faq,
  relatedservices,
} from "../../components/MarketingAutomation/data";

import Platformserver from "@/app/components/e-commerce-wdd/Platformserver";
import Framework from "@/app/components/PermormanceMarketing/Framework";
import Platforms from "@/app/components/PermormanceMarketing/Platforms";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";

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
    type: string;
   
  };
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Marketing Automation Agency in Dubai | GS Digital ",
    description:
      "Partner with Dubai’s trusted marketing automation agency. With 10+ years of experience, we deliver customized solutions that drive real results. Contact now!",
    alternates: {
      canonical: "https://www.globalsurf.ae/marketing-automation-agency-dubai",
    },
    robots: "index, follow",
    openGraph: {
      title: "Dubai’s #1 Marketing Automation Agency | Streamline & Succeed",
      siteName: "Global Surf Digital ",
      url: "https://www.globalsurf.ae/marketing-automation-agency-dubai",
      description:
        "Nurture leads, segment audiences, and refine touchpoints effortlessly. GS Digital offers top-tier marketing automation services in Dubai. Get a quote today!",
      type: "website",
      
    },
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
        colcount={4}
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
      <LogoSwiper mtslogo={Matslogo[0]}   />
      </div>

      <section className="pb-[50px] lg:pb-[150px]">
        <Platformserver
          title={Platformsecomdata.title}
          desc={Platformsecomdata.desc}
          data={Platformsecomdata.data}
        />
      </section>

      <GetInTouch data={Cta} redlast={true} ctabbutton={"Let’s Connect!"} />
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
