import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import ContentSectionrefOne from "../../../components/BlogSocialMedia/ContentSectionrefOne";
import SocialShare from "../../../components/BlogSocialMedia/SocialShare";
import { TechnicalSEOSchema } from "../../../components/Schema/OfferCatalog";
import TechnicalSeoEssentials from "../../../components/BlogSocialMedia/TechnicalSeoEssentials ";


import {
  BannerSection, contentSectionsData,
  videoProductionsocialData,

} from "../../../data/blogdatas/how-google-ads-meta-ads-works";


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
    title: "Google Ads vs Meta Ads for UAE Lead Generation | Global Surf ",
    description:
      "Find out whether Google Ads or Meta Ads wins for UAE lead generation. See how intent, cost, and conversion quality impact campaign performance. ",
    alternates: {
      canonical: "https://www.globalsurf.ae/blogs/google-ads-vs-meta-ads-for-uae-lead-generation",
    },
    robots: "noindex, nofollow",

  };
}

const page = () => {


  return (
    <div className="relative">
      <TechnicalSEOSchema />
      <SocialShare />
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={27} />
      <ContentSectionrefOne sections={contentSectionsData} />
      <TechnicalSeoEssentials />
    </div>
  );
};

export default page;