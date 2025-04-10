import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import Expertise from "../../components/PermormanceMarketing/Expertise";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import Platformsecom from "../../components/PpcAdvertisingAgencyDubai/Platformsecom";
import ProfileCard from "@/app/components/B2bSeo/ProfileCard";

import OurWorks from "../../components/Bc-logo/OurWorks";
import Typeslogo from "../../components/Bc-logo/TypesLogo";
import WhyChoose from "../../components/Bc-logo/WhyChoose";
import SeoService from "@/app/components/LocalSeo/SeoServices";
import SuccessStories from "../../components/IndConstruction/SucessStories";

import { BannerSection } from "../../data/services/local-seo-agency/herosection";
import { AreaExpertise } from "../../data/services/local-seo-agency/area-of-expertise";
import { Clientsformsdata } from "../../data/services/local-seo-agency/clientsdetails";
import { OurServices } from "../../data/services/local-seo-agency/our-servies";
import { Whychoosedata } from "../../data/services/local-seo-agency/whychoose";
import { Frameworkdata } from "../../data/services/local-seo-agency/framework";
import { Typelogodata } from "../../data/services/bc-logo-design/typesdesign";
import { relatedservices } from "../../data/services/local-seo-agency/relatedservices";
import { Wecanhelp } from "../../data/services/local-seo-agency/wecanhelp";
import { Platformsecomdata } from "../../data/services/b2b-seo/platformsecom";
import { Cta } from "../../data/services/local-seo-agency/cta";
import { Faq } from "../../data/services/local-seo-agency/faq";
import { Platformsdata } from "../../data/services/b2b-seo/platforms";
import Testimonials from "@/app/components/HomePage/Testimonials";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Slider from "@/app/components/PpcAdvertisingAgencyDubai/Slider";
import { log } from "console";

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
    title:
      "Local SEO Agency | Google Business Profile Service | GS Digital",
    description:
      "Drive more local traffic with expert Local SEO services. We optimize your Google Business Profile and help you rank higher on Google Maps and Search. ",
      alternates: {
        canonical: "https://www.globalsurf.ae/local-seo-agency-dubai",
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
        maxchwidth={23}
      />
      <Platforms
        title={Wecanhelp.title}
        data={Wecanhelp.data}
        icontitle={true}
        leftzero={true}
        colcount={3}
      />

      <Framework
        title={Frameworkdata.title}
        data={Frameworkdata.data}
        bgcolor={"#FFFFFF"}
      />
      <Services
        bgtt1="text-white"
        bgtt3="text-white"
        bgcolor="bg-black"
        title={OurServices.title}
        data={OurServices.data}
        colcount={5}
        hrcontent={true}
        hrcontent1={false}
      />
      <Expertise
        title={AreaExpertise.title}
        subttle={AreaExpertise.subttle}
        data={AreaExpertise.data}
      />

      <SuccessStories
        Clientsformsdata={Clientsformsdata.filter((item) => item !== undefined)}
        pt="pt-0"
        subdesc={
          "Take a look at our case study to see how our search engine optimization services have helped businesses like yours grow and connect with their audience in meaningful ways."
        }
      />
      <Testimonials bgcolor={"white"} />
      <WhyChoose
        title={Whychoosedata.title}
        desc={Whychoosedata.desc}
        data={Whychoosedata.data}
        pt="pt-0"
        colcount={4}
        pb="pb-[50px] md:pb-10 lg:pb-12 xl:pb-[138px]"
      />

      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"REACH OUT TO OUR TEAM!"}
        link={"/lets-talk"}
      />
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
