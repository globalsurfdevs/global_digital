import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import ContentSectionrefOne from "../../../components/BlogSocialMedia/ContentSectionrefOne";
import { GoogleAdsVsMetaAdsSchema } from "../../../components/Schema/OfferCatalog";
import GoogleAdsVsMetaAdsContent from "../../../components/Blog-details/HowDigitalMarketingWinsContent";


import {
  BannerSection, contentSectionsData,

} from "../../../data/blogdatas/how-google-ads-meta-ads-works";

import AuthorBioCard from "../../../components/Blog-details/AuthorBioCard";

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

async function getAuthor(authorId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.globalsurf.ae";
  try {
    const res = await fetch(`${baseUrl}/api/authors?id=${authorId}`, {
      next: { revalidate: 3600, tags: [`author-${authorId}`] },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.author ?? null;
  } catch {
    return null;
  }
}

const page = async () => {
  const author = await getAuthor("6a4ca35bc0f7cb5455693c87");


  return (
    <div className="relative">
      <GoogleAdsVsMetaAdsSchema />
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={27} />
      <ContentSectionrefOne sections={contentSectionsData} />
      <GoogleAdsVsMetaAdsContent />
      <div className="mt-[50px] lg:mt-[100px]">
      {author && <AuthorBioCard data={author} />}
      </div>
    </div>
  );
};

export default page;
