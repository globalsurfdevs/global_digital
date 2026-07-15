import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import Contentone from "../../../components/BlogSocialMedia/ContentSectionOne";
import ContentSectionStaic from "../../../components/BlogSocialMedia/ContentSectionStatic"
import SocialShare from "../../../components/BlogSocialMedia/SocialShare";
import { OneBillionFollowersSchema } from "../../../components/Schema/OfferCatalog";



import {
  BannerSection, videoProductionData, platformCheatSheetData, Faq, videoGuideSteps, videoTips,
  troubleshootingData, listingSectionData, contentSectionsData,
  videoProductionsocialData, videocountData, scrollSectionsData, authors

} from "../../../data/blogdatas/globalsurfBlogData";
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

};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Rethinking Influence | Global Surf at the 1 Billion Followers Summit",
    description:
      "GS Digital reflects on key insights from the 1 Billion Followers Summit, exploring how influence is shifting from scale to strategic impact. ",
    alternates: {
      canonical: "https://www.globalsurf.ae/blogs/global-surf-at-1billion-followers-summit",
    },
    robots: "index, follow",

  };
}
export const dynamic = 'force-dynamic';

// async function getAuthor(authorId: string) {
//   const baseUrl = "https://www.globalsurf.ae";
//   const url = `${baseUrl}/api/authors?id=${authorId}`;
//   try {
//     // const res = await fetch(url, { next: { revalidate: 3600, tags: [`author-${authorId}`] } });
//     const res = await fetch(url);
//     console.log("getAuthor status:", res.status, res.headers.get("content-type"));
//     if (!res.ok) {
//       const text = await res.text();
//       console.error("getAuthor bad response:", text.slice(0, 300));
//       return null;
//     }
//     const data = await res.json();
//     return data.author ?? null;
//   } catch (err) {
//     console.error("getAuthor threw:", err);
//     return null;
//   }
// }



const page = async () => {
  const author = await getAuthorById("6a4b912e480d65685cc374f5");
  console.log("Author data:", author);


  return (
    <div className="relative">
      <OneBillionFollowersSchema />
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={27} />
      <Contentone sections={contentSectionsData} />
      <Contentone sections={videoProductionsocialData} />
      <ContentSectionStaic />
      {author && <AuthorBioCard data={author} />}
    </div>
  );
};

export default page;