import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import Contentone from "../../../components/BlogSocialMedia/ContentSectionOne";
import ContentSectionStaic from "../../../components/BlogSocialMedia/ContentSectionStatic"
import SocialShare from "../../../components/BlogSocialMedia/SocialShare";




import { BannerSection ,videoProductionData,platformCheatSheetData,Faq,videoGuideSteps,videoTips,
  troubleshootingData,listingSectionData,contentSectionsData,
  videoProductionsocialData,videocountData,scrollSectionsData,authors

} from "../../../data/blogdatas/globalsurfBlogData";


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
      "Global Surf Digital reflects on key insights from the 1 Billion Followers Summit, exploring how influence is shifting from scale to strategic impact. ",
    alternates: {
      canonical: "https://www.globalsurf.ae/blogs/global-surf-at-1billion-followers-summit",
    },
    robots: "index, follow",

  };
}

const page = () => {
  

  return (
    <div className="relative">
<SocialShare/>
      
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        maxchwidth={27}
      />
     
     <Contentone sections={contentSectionsData} />
     <Contentone sections={videoProductionsocialData}  />
<ContentSectionStaic />
    </div>
  );
};

export default page;