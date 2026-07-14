import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import ContentSectionrefOne from "../../../components/BlogSocialMedia/ContentSectionrefOne"; 
import SocialShare from "../../../components/BlogSocialMedia/SocialShare";
import {OneClickSchema} from "../../../components/Schema/OfferCatalog";
import ClicksGoogle from "../../../components/BlogSocialMedia/NoClicksGoogle";


import { BannerSection ,contentSectionsData,
  videoProductionsocialData,

} from "../../../data/blogdatas/NoClicksGoogleBlogData";

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
    title: "No Clicks from Google? How Built Environment Brands Win AI Search Visibility",
    description:
      "Google AI Overviews are stealing clicks. Learn how built environment brands can stay visible, earn AI citations, and generate leads in zero-click search.",
    alternates: {
      canonical: "https://www.globalsurf.ae/blogs/no-clicks-google-ai-search-built-environment",
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
  const author = await getAuthor("6a4ca154c0f7cb5455693c77");



  return (
    <div className="relative">
      <OneClickSchema />
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        maxchwidth={27}
      /> 
     <ContentSectionrefOne sections={contentSectionsData} />  
<ClicksGoogle />
      <div className="mt-[50px] lg:mt-[100px]">
{author && <AuthorBioCard data={author} />}
</div>
    </div>
  );
};

export default page;