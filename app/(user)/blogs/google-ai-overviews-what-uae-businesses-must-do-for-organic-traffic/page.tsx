import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import Contentone from "../../../components/BlogSocialMedia/ContentSecBlog3";
import { GoogleAiOverviewSchema } from "../../../components/Schema/OfferCatalog";


import FaqSchema from "../../../components/Schema/FaqSchemad";


import {
  BannerSection, Faq, contentSectionsData, UAEBuiltEnvironmentData,
  videoProductionsocialData, GeoData, GeoAppData

} from "../../../data/blogdatas/googleAiOverviewData";

import Blogfaq from "../../../components/common/BlogFaq";
import ThreeColumnTable from "@/app/components/BlogSocialMedia/AiThreecolsTable";
import Twosecblog from "@/app/components/BlogSocialMedia/TwoHsec";
import AuthorBioCard from "../../../components/Blog-details/AuthorBioCard";
import { getAuthorById } from "@/lib/authors";

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



const page = async () => {
  const author = await getAuthorById("6a4ca398c0f7cb5455693c8a");

  return (
    <div className="relative">
<GoogleAiOverviewSchema />
      <FaqSchema faq={Faq} />
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
        {author && <AuthorBioCard data={author} />}
      </div>
    </div>
  );
};

export default page;