import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import ContentSectionrefOne from "../../../components/BlogSocialMedia/ContentSectionrefOne"; 
import SocialShare from "../../../components/BlogSocialMedia/SocialShare";
import {OneClickSchema} from "../../../components/Schema/OfferCatalog";
import WhyEmailMarketing from "../../../components/BlogSocialMedia/WhyEmailMarketing";


import { BannerSection ,contentSectionsData,
  videoProductionsocialData,

} from "../../../data/blogdatas/WhyEmailMarketingStillQuietlyDrivesData";


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

const page = () => {
  

  return (
    <div className="relative">
      <OneClickSchema />
<SocialShare/>
      
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        maxchwidth={27}
      /> 
     <ContentSectionrefOne sections={contentSectionsData} />  
<WhyEmailMarketing />
    </div>
  );
};

export default page;