import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Expertise from "../../components/PermormanceMarketing/Expertise";
import Boost from "../../components/PermormanceMarketing/Boost";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Industries from "../../components/PermormanceMarketing/Industries";
import Ourportfolio from "../../components/PermormanceMarketing/Ourportfolio";
import Partner from "../../components/PermormanceMarketing/Partner";
import Testimonials from "../../components/HomePage/Testimonials";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import {WebDesignDevelopmentSchema} from "../../components/Schema/OfferCatalog";

import { BannerSection } from "../../data/services/web-design-development/herosection";
import { AreaExpertise } from "../../data/services/web-design-development/area-of-expertise";
import { boostEngage } from "../../data/services/web-design-development/boost-engage";
import { OurServices } from "../../data/services/web-design-development/our-services";
import { Frameworkdata } from "../../data/services/web-design-development/framework";
import { partnerData } from "../../data/partnerData";
import { Cta } from "../../data/services/web-design-development/cta";
import { Faq } from "../../data/services/web-design-development/faq";

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
    title:
      "Custom Website Design & Development Dubai | Web Solutions",
    description:
      "Top web design & development agency in Dubai. We build fast, responsive, SEO-friendly websites that look stunning & convert. Request your free consultation.",
    alternates: {
      canonical: "https://www.globalsurf.ae/web-design-and-development",
    },
  };
}
const page = () => {
  return (
    <div>
      <WebDesignDevelopmentSchema />
      <HeroSection Bannerdata={BannerSection} order={"04"} maxchwidth={18} />
      <Expertise title={AreaExpertise.title} data={AreaExpertise.data} />
      <Boost title={boostEngage.title} data={boostEngage.data} />
      <Services title={OurServices.title} data={OurServices.data} />
      <Framework title={Frameworkdata.title} data={Frameworkdata.data} />
      <Industries />
      <Ourportfolio />
      <Partner data={partnerData} />
      <Testimonials />
      <GetInTouch data={Cta} ctabbutton={"LET'S TALK GROWTH"} />
      <FAQ data={Faq} />
    </div>
  );
};

export default page;
