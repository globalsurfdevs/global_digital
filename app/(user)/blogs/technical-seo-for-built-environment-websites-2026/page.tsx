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

const page = () => {


  return (
    <div className="relative">
      <TechnicalSEOSchema />
      <SocialShare />

      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        maxchwidth={27}
      />
      <ContentSectionrefOne sections={contentSectionsData} />
      <TechnicalSeoEssentials />
    </div>
  );
};

export default page;