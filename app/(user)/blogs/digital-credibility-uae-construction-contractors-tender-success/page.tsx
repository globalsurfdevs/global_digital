import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import Contentone from "../../../components/BlogSocialMedia/ContentSecBlog3"; 
import TextUi from "../../../components/BlogDigitalCredibilityUae/TextUi"; 
import TitleImagecontent from "../../../components/BlogDigitalCredibilityUae/TitleImagecontent";
import SectionTwo from "../../../components/BlogDigitalCredibilityUae/SectionTwo";
import SectionThree from "../../../components/BlogDigitalCredibilityUae/SectionThree";
import SectionFour from "../../../components/BlogDigitalCredibilityUae/SectionFour";
import SectionFive from "../../../components/BlogDigitalCredibilityUae/SectionFive";
import SectionSix from "../../../components/BlogDigitalCredibilityUae/SectionSix";
import SectionSeven from "../../../components/BlogDigitalCredibilityUae/SectionSeven";
import SectionEight from "../../../components/BlogDigitalCredibilityUae/SectionEight";
import { DigitalStudySchema } from "../../../components/Schema/OfferCatalog";


import {
  BannerSection, Faq, contentSectionsData,
   builtEnvironmentData,

} from "../../../data/blogdatas/DigitalCredibilityUaeData";

import Blogfaq from "../../../components/common/BlogFaq";
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
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "How UAE Construction Contractors Win More Tenders with Digital Credibility | Global Surf Digital",
    description:
      "UAE construction contractors are losing tenders before evaluation begins. Learn how digital credibility directly influences pre-qualification and tender outcomes.",
    alternates: {
      canonical: "https://www.globalsurf.ae/blogs/digital-credibility-uae-construction-contractors-tender-success",
    },
    robots: "index, follow",
    openGraph: {
      title: "How UAE Construction Contractors Win More Tenders with Digital Credibility",
      site_name: "GS Digital",
      url: "https://www.globalsurf.ae/blogs/digital-credibility-uae-construction-contractors-tender-success",
      description:
        "UAE contractors lose tenders before evaluation begins. See how digital credibility — website, LinkedIn, and project portfolio — directly improves pre-qualification success and tender win rates.",
      type: "article", // keep it optional
    },
    images: [
      {
        url: "https://www.globalsurf.ae/_next/static/media/uae-construction-contractor-digital-credibility-hero.41a7a760.webp",
        alt: 'How UAE Construction Contractors Win More Tenders with Digital Credibility',
      },
    ],

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
  const videoProductionTitles = ['Authority', 'Scope'];
  const author = await getAuthor("6a4ca154c0f7cb5455693c77");

  return (
    <div className="relative">

      <DigitalStudySchema />
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={27}  />
     
      <Contentone sections={contentSectionsData}  />
    <div id="section1">
      <Contentone sections={builtEnvironmentData}  />
      </div>
      <TextUi />
      <div id="section2">
        <TitleImagecontent /> 
      </div>
      <div id="section3">
      <SectionTwo  />
      </div>
      <div id="section4">
      <SectionThree />
      </div>
      
      <div id="section5">
      <SectionFour />
      </div>
      <div id="section6">
        <SectionFive />
      </div>
      <div id="section7">
      <SectionSix />
      </div>
      <div id="section8">
      <SectionSeven />
     </div>
      <div id="section9">
      <SectionEight />
     </div>
<div id="section11">
      <section>
        {/* <Contentone sections={contractorMarketingData} /> */}
        <Blogfaq data={Faq}  />
      </section>
      </div>
      {author && <AuthorBioCard data={author} />}
    </div>
  );
};

export default page;