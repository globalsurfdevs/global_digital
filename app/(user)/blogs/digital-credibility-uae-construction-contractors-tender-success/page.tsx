import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import Contentone from "../../../components/BlogSocialMedia/ContentSecBlog3";
import { BafcoCaseStudySchema } from "../../../components/Schema/OfferCatalog";
import NewRules from "../../../components/BlogSocialMedia/NewRules";
import Contenttwo from "../../../components/BlogSocialMedia/IconContentPara";
import TextUi from "../../../components/BlogDigitalCredibilityUae/TextUi"; 
import TitleImagecontent from "../../../components/BlogDigitalCredibilityUae/TitleImagecontent";
import SectionTwo from "../../../components/BlogDigitalCredibilityUae/SectionTwo";
import SectionThree from "../../../components/BlogDigitalCredibilityUae/SectionThree";
import SectionFour from "../../../components/BlogDigitalCredibilityUae/SectionFour";
import SectionFive from "../../../components/BlogDigitalCredibilityUae/SectionFive";
import SectionSix from "../../../components/BlogDigitalCredibilityUae/SectionSix";
import SectionSeven from "../../../components/BlogDigitalCredibilityUae/SectionSeven";
import SectionEight from "../../../components/BlogDigitalCredibilityUae/SectionEight";


import {
  BannerSection, Faq, contentSectionsData,
   builtEnvironmentData,

} from "../../../data/blogdatas/DigitalCredibilityUaeData";

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
    title: "BAFCO Case Study: 2X Leads at Half the Cost with Performance Marketing | GS Digital ",
    description:
      "How GS Digital helped BAFCO double leads & cut CPL by 56% in the same peak month through 12 months of strategic Meta & Google Ads optimization in the UAE",
    alternates: {
      canonical: "https://www.globalsurf.ae/blogs/bafco-performance-marketing-case-study-dubai",
    },
    robots: "index, follow",
    openGraph: {
      title: "BAFCO Case Study: 2X Leads at Half the Cost with Performance Marketing | GS Digital",
      site_name: "GS Digital",
      url: "https://www.globalsurf.ae/blogs/social-media-video-production-tips",
      description:
        "How GS Digital helped BAFCO double leads & cut CPL by 56% in the same peak month through 12 months of strategic Meta & Google Ads optimization in the UAE.",
      type: "article", // keep it optional
    },
    images: [
      {
        url: "https://www.globalsurf.ae/_next/static/media/envblog1.22e3bfb5.jpg",
        alt: 'BAFCO x GS Digital — Performance Marketing UAE Case Study',
      },
    ],

  };
}

const page = () => {
  const videoProductionTitles = ['Authority', 'Scope'];

  return (
    <div className="relative">

      <BafcoCaseStudySchema />
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={27}  />
     
      <Contentone sections={contentSectionsData}  />
    <div id="section1">
      <Contentone sections={builtEnvironmentData}  />
      </div>
      <TextUi />
      <div id="section2">
        <TitleImagecontent /> 
      </div>
      <div id="section3">
      <SectionTwo  />
      </div>
      <div id="section4">
      <SectionThree />
      </div>
      
      <div id="section5">
      <SectionFour />
      </div>
      <div id="section6">
        <SectionFive />
      </div>
      <div id="section7">
      <SectionSix />
      </div>
      <div id="section8">
      <SectionSeven />
     </div>
      <div id="section9">
      <SectionEight />
     </div>
<div id="section11">
      <section>
        {/* <Contentone sections={contractorMarketingData} /> */}
        <Blogfaq data={Faq}  />
      </section>
      </div>
    </div>
  );
};

export default page;