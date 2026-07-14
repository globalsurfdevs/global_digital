import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import ContentSectionrefOne from "../../../components/BlogSocialMedia/ContentSectionrefOne";
import SocialShare from "../../../components/BlogSocialMedia/SocialShare";
import { TechnicalSEOSchema } from "../../../components/Schema/OfferCatalog";
import TechnicalSeoEssentials from "../../../components/BlogSocialMedia/TechnicalSeoEssentials ";


import {
  BannerSection, contentSectionsData,
  videoProductionsocialData,

} from "../../../data/blogdatas/TechnicalSeo";

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
    title: "Technical SEO Essentials for AEC Websites in 2026 | Global Surf",
    description:
      "A practical technical SEO guide for architecture, engineering, & construction websites. Fix crawl issues, improve speed, and optimize for AI. Checklist included.",
    alternates: {
      canonical: "https://www.globalsurf.ae/blogs/technical-seo-for-built-environment-websites-2026",
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
  const author = await getAuthor("6a4ca398c0f7cb5455693c8a");

  return (
    <div className="relative">
      <TechnicalSEOSchema />
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        maxchwidth={27}
      />
      <ContentSectionrefOne sections={contentSectionsData} />
      <TechnicalSeoEssentials />
      <div className="pt-[50px] lg:pt-[100px]">
      {author && <AuthorBioCard data={author} />}
      </div>
    </div>
  );
};

export default page;