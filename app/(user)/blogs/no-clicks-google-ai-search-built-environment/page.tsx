import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import ContentSectionrefOne from "../../../components/BlogSocialMedia/ContentSectionrefOne"; 
import SocialShare from "../../../components/BlogSocialMedia/SocialShare";
import {OneClickSchema} from "../../../components/Schema/OfferCatalog";
import ClicksGoogle from "../../../components/BlogSocialMedia/NoClicksGoogle";


import { BannerSection ,contentSectionsData,
  videoProductionsocialData,

} from "../../../data/blogdatas/NoClicksGoogleBlogData";


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
<ClicksGoogle />
    </div>
  );
};

export default page;