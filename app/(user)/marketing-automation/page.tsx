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
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Digital Marketing Services",
    description:
      "Partner with a top web app development company in Dubai specializing in custom web applications. We build secure web apps tailored to your business. ",
    alternates: {
      canonical: "https://www.globalsurf.ae/",
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
