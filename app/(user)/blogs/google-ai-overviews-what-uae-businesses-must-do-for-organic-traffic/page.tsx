import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import Contentone from "../../../components/BlogSocialMedia/ContentSecBlog3";
import { BafcoCaseStudySchema } from "../../../components/Schema/OfferCatalog";
import NewRules from "../../../components/BlogSocialMedia/NewRules";
import Contenttwo from "../../../components/BlogSocialMedia/IconContentPara";




import {
  BannerSection, Faq, contentSectionsData, UAEBuiltEnvironmentData,
  videoProductionsocialData, GeoData, GeoAppData

} from "../../../data/blogdatas/googleAiOverviewData";

import Blogfaq from "../../../components/common/BlogFaq";
import { videoProductionData } from "@/app/data/blogdatas/llmdata";
import ThreeColumnTable from "@/app/components/BlogSocialMedia/AiThreecolsTable";
import Twosecblog from "@/app/components/BlogSocialMedia/TwoHsec";


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
    title: "Google AI Overviews UAE: How to Protect Your Organic Traffic | GS Digital ",
    description:
      "Google AI Overviews have arrived in the UAE & organic traffic is already shifting. Find out which industries are most exposed & how businesses can adapt now.",
    alternates: {
      canonical: "https://www.globalsurf.ae/blogs/google-ai-overviews-what-uae-businesses-must-do-for-organic-traffic",
    },
    robots: "index, follow",
    openGraph: {
      title: "Google AI Overviews UAE: Protect Your Organic Traffic",
      site_name: "GS Digital",
      url: "https://www.globalsurf.ae/blogs/google-ai-overviews-what-uae-businesses-must-do-for-organic-traffic",
      description:
        "Google AI Overviews have arrived in the UAE & organic traffic is already shifting. Find out which industries are most exposed & how businesses can adapt now..",
      type: "article", // keep it optional
    },
    images: [
      {
        url: "https://www.globalsurf.ae/_next/static/media/envblog1.22e3bfb5.jpg",
        alt: 'Google AI Overviews UAE: How to Protect Your Organic Traffic ',
      },
    ],

  };
}


const page = () => {
  const videoProductionTitles = ['Authority', 'Scope'];

  return (
    <div className="relative">

      <BafcoCaseStudySchema />
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={27} />
     
      <Contentone sections={contentSectionsData} />
    
      <div id="section1">
      <Contentone sections={videoProductionsocialData} />
      </div>
      <ThreeColumnTable />
    
      <div id="section3">
      <Contentone sections={UAEBuiltEnvironmentData} />
      </div>
      <div id="section4">
        <Contentone sections={GeoData} />
      </div>
      <div id="section5">
        <Contentone sections={GeoAppData} />
      </div>
      <div id="section5">
        <Twosecblog />
      </div>
      
<div id="section8">
      <section  className="mt-[50px] lg:mt-[100px]">
        {/* <Contentone sections={contractorMarketingData} /> */}
        <Blogfaq data={Faq}  />
      </section>
      </div>
    </div>
  );
};

export default page;