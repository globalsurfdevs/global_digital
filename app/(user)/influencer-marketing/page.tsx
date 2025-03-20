import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Results from "../../components/SocialMediaMarketingDubai/Results";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import FAQ from "../../components/PermormanceMarketing/FAQ";


import { ResultsData } from "../../data/services/influencer-marketing/results";
import { BannerSection } from "../../data/services/influencer-marketing/herosection";
import { OurServices } from "../../data/services/influencer-marketing/our-services";
import { Frameworkdata } from "../../data/services/influencer-marketing/framework";
import { relatedservices } from "../../data/services/influencer-marketing/relatedservices";
import { Wecanhelp } from "../../data/services/influencer-marketing/wecanhelp";
import { Platformsdata } from "../../data/services/influencer-marketing/platforms";
import { Cta } from "../../data/services/influencer-marketing/cta";
import { Faq } from "../../data/services/influencer-marketing/faq";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import CtaBox from "@/app/components/PermormanceMarketing/CtaBox";

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
    title: "Social Media Agency Dubai | Social Media Services | G.S Digital",
    description:
      "Dubai's trusted SMM agency, Global Surf Digital, provides expert social media marketing services to help you dominate the digital landscape. Contact us now!",
    alternates: {
      canonical: "https://www.globalsurf.ae/",
    },
     robots: "noindex, nofollow",
  };
}

const page = () => {
  return (
    <div>
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={26} />
      <Platforms title={Wecanhelp.title} data={Wecanhelp.data} icontitle={true} hiddentitle={true} leftzero={true} colcount={4} />
      <Services title={OurServices.title} data={OurServices.data}  colcount={5} />
      <Framework title={Frameworkdata.title} data={Frameworkdata.data}  />
      <section className="pt-[50px]   lg:pt-[140px] lg:pb-[70px]">
      <Platforms title={Platformsdata.title} data={Platformsdata.data}   />
      </section>
      <div className="container">
        <div className=" pt-[50px] lg:pt-[70px]"><hr></hr></div>
      </div>
      <Results title={ResultsData.title} description={ResultsData.description} data={ResultsData.data}   />

      <div className=" pt-[50px] lg:pt-[140px]">
      <RelatedServices
        title={relatedservices.title}
        data={relatedservices.data}
        bgcolor="black"
        text="white"
        colcount={3}
        />
        </div>

        <CtaBox
        data={Cta}
        redlast={true}
        ctabbutton={"LET’S TALK GROWTH "}
        link={"/lets-talk"}
      />
      <FAQ data={Faq} />
    </div>
  );
};

export default page;
