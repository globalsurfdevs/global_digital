import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import ContentSectionrefOne from "../../../components/BlogSocialMedia/ContentSectionrefOne"; 
import SocialShare from "../../../components/BlogSocialMedia/SocialShare";
import {OneClickSchema} from "../../../components/Schema/OfferCatalog";
import WhyEmailMarketing from "../../../components/BlogSocialMedia/WhyEmailMarketing";


import { BannerSection ,contentSectionsData,
  videoProductionsocialData,

} from "../../../data/blogdatas/WhyEmailMarketingStillQuietlyDrivesData";

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
    title: "Why Email Marketing Still Drives B2B Growth in UAE",
    description:
      "In 2026, email remains key to B2B success in the UAE. Learn how it influences buying committees, builds trust, and drives high-value conversions.",
    alternates: {
      canonical: "https://www.globalsurf.ae/blogs/why-email-marketing-still-quietly-drives",
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
      <OneClickSchema />
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        maxchwidth={27}
      /> 
     <ContentSectionrefOne sections={contentSectionsData} />  
<WhyEmailMarketing />
{author && <AuthorBioCard data={author} />}
    </div>
  );
};

export default page;