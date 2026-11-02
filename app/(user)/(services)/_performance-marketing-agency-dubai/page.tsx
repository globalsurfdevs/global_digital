import React from "react";
import Script from "next/script";
import HeroSection from "../../../components/PerformanceMarketing/HeroSection";
import Expertise from "../../../components/PerformanceMarketing/Expertise";
import Boost from "../../../components/PerformanceMarketing/Boost";
import Services from "../../../components/PerformanceMarketing/Services";
import Framework from "../../../components/PerformanceMarketing/Framework";
import Industries from "../../../components/PerformanceMarketing/Industries";
import Results from "../../../components/PerformanceMarketing/Results";
import Platforms from "../../../components/PerformanceMarketing/Platforms";
import Partner from "../../../components/PerformanceMarketing/Partner";
import Testimonials from "../../../components/HomePage/Testimonials";
import FAQ from "../../../components/PerformanceMarketing/FAQ";
import GetInTouch from "../../../components/PerformanceMarketing/GetInTouch";

import { BannerSection } from "../../../data/services/performance-marketing/herosection";
import { AreaExpertise } from "../../../data/services/performance-marketing/area-of-expertise";
import { boostEngage } from "../../../data/services/performance-marketing/boost-engage";
import { OurServices } from "../../../data/services/performance-marketing/our-services";
import { Frameworkdata } from "../../../data/services/performance-marketing/framework";
import { ResultsData } from "../../../data/services/performance-marketing/results";
import { Platformsdata } from "../../../data/services/performance-marketing/platforms";
import { partnerData } from "../../../data/partnerData";
import { Cta } from "../../../data/services/performance-marketing/cta";
import { Faq } from "../../../data/services/performance-marketing/faq";

import FaqSchema from "../../../components/Schema/FaqSchemad";
import {
  PerformanceMarketingSchema,
  PerformanceMarketingBreadcrumb,
} from "../../../components/Schema/ServiceSchema";

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
    title: "ROI-Driven Performance Marketing Agency in Dubai | GS Digital",
    description:
      "Drive Measurable Results. Our performance-based approach aligns bespoke strategies with your brand's objectives. Contact us today for a free consultation.",
    alternates: {
      canonical: "https://www.globalsurf.ae/performance-marketing-agency-dubai",
    },
  };
}
const page = () => {
  return (
    <div>
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PerformanceMarketingSchema),
        }}
      />

      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PerformanceMarketingBreadcrumb),
        }}
      />
      <FaqSchema faq={Faq} />
      <section className="hidegslider">
        <HeroSection
          Bannerdata={BannerSection}
          bannerlogp={true}
          maxchwidth={60}
        />
      </section>
      <Expertise title={AreaExpertise.title} data={AreaExpertise.data} />
      <Boost title={boostEngage.title} data={boostEngage.data} />
      <Services title={OurServices.title} data={OurServices.data} />
      <Framework title={Frameworkdata.title} data={Frameworkdata.data} />
      <Industries />
      <Results title={ResultsData.title} data={ResultsData.data} />
      <Platforms title={Platformsdata.title} data={Platformsdata.data} />
      <Partner data={partnerData} />
      <Testimonials />
      <GetInTouch data={Cta} ctabbutton={"LET'S TALK GROWTH"} />
      <FAQ data={Faq} />
    </div>
  );
};

export default page;
