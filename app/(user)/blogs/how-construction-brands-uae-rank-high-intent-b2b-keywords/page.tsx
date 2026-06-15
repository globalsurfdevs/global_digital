import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import Contentone from "../../../components/BlogSocialMedia/ContentSecBlog3"; 
import SectionTwo from "../../../components/BlogDigitalCredibilityUae/Keywordsstatic";
import NewRules from "../../../components/BlogSocialMedia/NewRules";
import Cta from "../../../components/BlogSocialMedia/SecCta";
import { DigitalStudySchema } from "../../../components/Schema/OfferCatalog";


import {
  BannerSection, Faq, contentSectionsData,
  builtEnvironmentData, rulesData, biggestkeywors, webrank, uaeresults, fivepoint

} from "../../../data/blogdatas//highIntentB2BKeywords";

import Blogfaq from "../../../components/common/BlogFaq";


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
    site_name: string;
    url: string;
    description: string;
    type?: string; // keep it optional
  };
  images?: { url: string; alt: string }[];
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "How UAE Construction Brands Rank for High-Intent Keywords",
    description:
      "Which searches actually win construction work in the UAE? The specific, high-intent ones. Here is how to rank for them, step by step. Read the guide.",
    alternates: {
      canonical: "https://www.globalsurf.ae/blogs/digital-credibility-uae-construction-contractors-tender-success",
    },
    robots: "index, follow",
    openGraph: {
      title: "How UAE Construction Brands Rank for High-Intent Keywords",
      site_name: "GS Digital",
      url: "https://www.globalsurf.ae/blogs/digital-credibility-uae-construction-contractors-tender-success",
      description:
        "Which searches actually win construction work in the UAE? The specific, high-intent ones. Here is how to rank for them, step by step. Read the guide.",
      type: "article", // keep it optional
    },
    images: [
      {
        url: "https://www.globalsurf.ae/_next/static/media/uae-construction-contractor-digital-credibility-hero.41a7a760.webp",
        alt: 'How UAE Construction Brands Rank for High-Intent Keywords',
      },
    ],

  };
}

const page = () => {
  const videoProductionTitles = ['Authority', 'Scope'];

  return (
    <div className="relative">

      <DigitalStudySchema />
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={27}  />
     
      <Contentone sections={contentSectionsData}  />
    <div id="section1">
      <Contentone sections={builtEnvironmentData}  />
      </div>
      <div id="section2">
        <NewRules rules={rulesData} pb="pb-0" />
      </div>
      <div id="section3">
        <Contentone sections={biggestkeywors} />
      </div>
      <div id="section4">
        <Contentone sections={webrank} />
      </div>
      <div id="section5">
      <SectionTwo  />
      </div>
      <div id="section6">
        <Contentone sections={uaeresults} />
      </div>
      <div id="section7">
        <Contentone sections={fivepoint} />
      </div>
      
      <div id="section8" className="pt-[50px] lg:pt-[100px]">
      <section>
        {/* <Contentone sections={contractorMarketingData} /> */}
        <Blogfaq data={Faq}  />
      </section>
      </div>
      <div id="section9" >
       
        <Cta />

      </div>
    </div>
  );
};

export default page;