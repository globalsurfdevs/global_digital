import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import ContentSectionrefOne from "../../../components/BlogSocialMedia/ContentSectionrefOne";
import { HowDigitalMarketingWinsSchema, HowDigitalMarketingWinsFaqSchema, HowDigitalMarketingWinsHowToSchema } from "../../../components/Schema/OfferCatalog";

import { BannerSection, contentSectionsData, Faq} from "../../../data/blogdatas/how-digital-marketing-wins-projects-for-construction-companies-in-uae";
import HowDigitalMarketingWinsContent from "../../../components/Blog-details/HowDigitalMarketingWinsContent";
import BlogFaq from "@/app/components/common/BlogFaq";

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



const page = async () => {
  const author = await getAuthorById("6a4ca2d7c0f7cb5455693c84");


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
