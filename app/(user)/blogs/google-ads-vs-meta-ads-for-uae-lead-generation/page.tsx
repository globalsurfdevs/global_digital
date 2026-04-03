import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import ContentSectionrefOne from "../../../components/BlogSocialMedia/ContentSectionrefOne";
import SocialShare from "../../../components/BlogSocialMedia/SocialShare";
import { GoogleAdsVsMetaAdsSchema } from "../../../components/Schema/OfferCatalog";
import GoogleAdsVsMetaAdsContent from "../../../components/Blog-details/GoogleAdsVsMetaAdsContent";


import {
  BannerSection, contentSectionsData,

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
    robots: "index, follow",

  };
}

const page = () => {


  return (
    <div className="relative">
      <GoogleAdsVsMetaAdsSchema />
      <SocialShare />
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={27} />
      <ContentSectionrefOne sections={contentSectionsData} />
      <GoogleAdsVsMetaAdsContent />
    </div>
  );
};

export default page;
