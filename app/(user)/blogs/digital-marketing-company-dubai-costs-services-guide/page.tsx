import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import Contentone from "../../../components/BlogSocialMedia/ContentSecBlog3";
import { DigitalMarketingCompanyDubaiSchema } from "../../../components/Schema/OfferCatalog";

import {
  BannerSection,
  contentSectionsData,
  Faq,
  ctaData,
} from "../../../data/blogdatas/DigitalMarketingData";
import DigitalMarketingContent from "../../../components/Blog-details/DigitalMarketingContent";
import BlogFaq from "@/app/components/common/BlogFaq";
import Cta from "../../../components/BlogSocialMedia/DynamicBlogCta";

import FaqSchema from "../../../components/Schema/FaqSchemad";

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
    type?: string;
  };
  images?: { url: string; alt: string }[];
  authors?: { name: string; url?: string }[];
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Digital Marketing Company in Dubai Costs, Services, and How to Choose the Right Agency",
    description:
      "Compare digital marketing agency costs in Dubai, freelancer vs agency options, key services, pricing models, and contract lengths to choose the right partner for growth",
    alternates: {
      canonical:
        "https://www.globalsurf.ae/blogs/digital-marketing-company-dubai-costs-services-guide",
    },
    robots: "index, follow",
    openGraph: {
      title:
        "Digital Marketing Company in Dubai: Costs, Services & How to Choose",
      site_name: "Global Surf",
      url: "https://www.globalsurf.ae/blogs/digital-marketing-company-dubai-costs-services-guide",
      description:
        "A practical guide to digital marketing agencies in Dubai – costs, services, pricing models, and how to pick a reliable partner for long - term growth.",
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
  const author = await getAuthor("6a4ca154c0f7cb5455693c77");

  return (
    <div className="relative">
      <FaqSchema faq={Faq} />
      <DigitalMarketingCompanyDubaiSchema />
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        maxchwidth={27}
      />
      <Contentone sections={contentSectionsData} />
      <DigitalMarketingContent />
      <div id="section10">
        <BlogFaq data={Faq} />
      </div>

      <Cta
        title={ctaData.title}
        description={ctaData.description}
        buttonText={ctaData.buttonText}
        buttonLink={ctaData.buttonLink}
      />
      {author && <AuthorBioCard data={author} />}
    </div>
  );
};

export default page;