import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Expertise from "../../components/PermormanceMarketing/Expertise";
import Boost from "../../components/PermormanceMarketing/Boost";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Industries from "../../components/PermormanceMarketing/Industries";
import OurWorks from "../../components/PermormanceMarketing/Ourworks";
import Partner from "../../components/PermormanceMarketing/Partner";
import Testimonials from "../../components/HomePage/Testimonials";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";

import { BannerSection } from "../../data/services/social-media/herosection";
import { AreaExpertise } from "../../data/services/social-media/area-of-expertise";
import { boostEngage } from "../../data/services/social-media/boost-engage";
import { OurServices } from "../../data/services/social-media/our-services";
import { Frameworkdata } from "../../data/services/social-media/framework";
import { partnerData } from "../../data/partnerData";
import { Cta } from "../../data/services/social-media/cta";
import { Faq } from "../../data/services/social-media/faq";

interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Social Media Services That Delivers Results |GS.Digital",
    description:
      "Captivate Audiences. Our human-first approach combines strategy & creativity for meaningful social media results.Contact us today for a free consultation.",
    alternates: {
      canonical:
        "https://www.globalsurf.ae/social-media-marketing-agency-dubai",
    },
  };
}
const page = () => {
  return (
    <div>
      <HeroSection Bannerdata={BannerSection} order={"03"} />
      <Expertise title={AreaExpertise.title} data={AreaExpertise.data} />
      <Boost title={boostEngage.title} data={boostEngage.data} />
      <Services title={OurServices.title} data={OurServices.data} />
      <Framework title={Frameworkdata.title} data={Frameworkdata.data} />
      <Industries />
      <OurWorks />
      <Partner data={partnerData} />
      <Testimonials />
      <GetInTouch
        data={Cta}
        ctabbutton={"LET'S TALK GROWTH"}
        link={"/lets-talk"}
      />
      <FAQ data={Faq} />
    </div>
  );
};

export default page;
