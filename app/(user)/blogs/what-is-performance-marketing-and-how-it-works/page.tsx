import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import Contentone from "../../../components/BlogSocialMedia/ContentSecBlog3";
import { PerformanceMarketingSchema } from "../../../components/Schema/OfferCatalog";

import { BannerSection, contentSectionsData, Faq} from "../../../data/blogdatas/whatIsPerformanceMarketing";
import PerformanceContent from "../../../components/Blog-details/WhatIsPerformanceContent";
import BlogFaq from "@/app/components/common/BlogFaq";
import Cta from "../../../components/BlogSocialMedia/BlogCta";


import FaqSchema from "../../../components/Schema/FaqSchemad";

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
    title: "Performance Marketing UAE: How It Works & What It Costs | GS Digital",
    description: "Understand performance marketing for UAE businesses — channels, costs in AED, what results to expect, and how to choose the right agency.",
    alternates: { canonical: "https://www.globalsurf.ae/blogs/what-is-performance-marketing-and-how-it-works", },
    robots: "index, follow",
    openGraph: {
      title: "Performance Marketing UAE: How It Works & What It Costs",
      site_name: "Global Surf",
      url: "https://www.globalsurf.ae/blogs/what-is-performance-marketing-and-how-it-works",
      description: "Understand performance marketing for UAE businesses — channels, costs in AED, what results to expect, and how to choose the right agency in Dubai or Abu Dhabi.",
    },
  };
}

const page = () => {


  return (
    <div className="relative">
      <FaqSchema faq={Faq} />
      <PerformanceMarketingSchema />
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={27} />
      <Contentone sections={contentSectionsData} />
      <PerformanceContent />
      <div id="section9">
      <BlogFaq data={Faq}  />
      </div>
      <div id="section10" >

        <Cta />

      </div>
    </div>
  );
};

export default page;
