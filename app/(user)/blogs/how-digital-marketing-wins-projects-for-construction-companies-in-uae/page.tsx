import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import ContentSectionrefOne from "../../../components/BlogSocialMedia/ContentSectionrefOne";
import { HowDigitalMarketingWinsSchema, HowDigitalMarketingWinsFaqSchema, HowDigitalMarketingWinsHowToSchema } from "../../../components/Schema/OfferCatalog";

import { BannerSection, contentSectionsData, Faq} from "../../../data/blogdatas/how-digital-marketing-wins-projects-for-construction-companies-in-uae";
import HowDigitalMarketingWinsContent from "../../../components/Blog-details/HowDigitalMarketingWinsContent";
import BlogFaq from "@/app/components/common/BlogFaq";

import AuthorBioCard from "../../../components/Blog-details/AuthorBioCard";

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
  authors?: { name: string; url?: string }[];
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "How Digital Marketing Wins Projects for Construction Companies in the UAE | Global Surf",
    description: "Why do many contractor websites fail to generate enquiries? Explore how SEO, LinkedIn, and content marketing impact project acquisition in the UAE.",
    alternates: { canonical: "https://www.globalsurf.ae/blogs/how-digital-marketing-wins-projects-for-construction-companies-in-uae", },
    robots: "index, follow",
    openGraph: {
      title: "How Digital Marketing Wins Projects for Construction Companies in the UAE | Global Surf",
      site_name: "Global Surf",
      url: "https://www.globalsurf.ae/blogs/how-digital-marketing-wins-projects-for-construction-companies-in-uae",
      description: "Why do many contractor websites fail to generate enquiries? Explore how SEO, LinkedIn, and content marketing impact project acquisition in the UAE.",
    },
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
  const author = await getAuthor("6a4ca2d7c0f7cb5455693c84");


  return (
    <div className="relative">
      <HowDigitalMarketingWinsSchema />
      <HowDigitalMarketingWinsFaqSchema />
      <HowDigitalMarketingWinsHowToSchema />
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={27} />
      <ContentSectionrefOne sections={contentSectionsData} />
      <HowDigitalMarketingWinsContent />
      <BlogFaq data={Faq}  />
       {author && <AuthorBioCard data={author} />}
    </div>
  );
};

export default page;
