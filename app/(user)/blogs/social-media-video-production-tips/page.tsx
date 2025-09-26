import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionBlog";
import Contentone from "../../../components/BlogSocialMedia/ContentSectionOne";
import Contenttwo from "../../../components/BlogSocialMedia/ContentSectiontwo";
import ThreeColumnTable from "../../../components/BlogSocialMedia/ThreeColumnTable";
import VideoGuide from "../../../components/BlogSocialMedia/VideoGuide";
import EssentialTips from "../../../components/BlogSocialMedia/EssentialTips";
import Troubleshooting from "../../../components/BlogSocialMedia/Troubleshooting";
import ListingSection from "../../../components/BlogSocialMedia/ListingSection";
import ScrollSection from "../../../components/BlogSocialMedia/ScrollsSec";
import Detailsauthor from "../../../components/BlogSocialMedia/Author";
import SocialShare from "../../../components/BlogSocialMedia/SocialShare";
import FAQ from "../../../components/PermormanceMarketing/FAQ";



import { BannerSection ,videoProductionData,platformCheatSheetData,Faq,videoGuideSteps,videoTips,
  troubleshootingData,listingSectionData,contentSectionsData,
  videoProductionsocialData,videocountData,scrollSectionsData,authors

} from "../../../data/blogdatas/data";


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
    title: "Social Media Video Production Guide | Global Surf Blog",
    description:
      "Learn how to create engaging social media videos. Discover strategies, tools, and tips to boost visibility, connect with your audience, and drive results.",
    alternates: {
      canonical: "https://www.globalsurf.ae/blogs/social-media-video-production-tips",
    },
    robots: "noindex, nofollow",
    openGraph: {
      title: "Social Media Video Production Tips & Strategies | Global Surf Blog",
      site_name: "Global Surf Digital",
      url: "https://www.globalsurf.ae/blogs/social-media-video-production-tips",
      description:
        "Master the art of social media video creation. Explore tools, strategies, and tips to engage your audience, boost visibility, and drive results.",
      type: "article", // keep it optional
    },
    images: [
      {
        url: "https://www.globalsurf.ae/_next/static/media/blog_2.1356d3b6.png",
        alt: "Social Media Video Production Tips",
      },
    ],
    authors: [
      {
        name: "Ashna Ganeeva",
        url: "https://www.linkedin.com/in/ashna-ganeeva/",
      },
    ],
  };
}

const page = () => {
  
  const videoProductionTitles = ['Phase', 'Key Actions', 'Tools'];
  const platformCheatSheetTitles = ['Platform', 'Length', 'Format', 'Best Time', 'Key Features'];
  
  return (
    <div className="relative">
  {/* Fixed social icons */}
<SocialShare/>
      
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        maxchwidth={27}
      />
     
     <Contentone sections={contentSectionsData} />
     <Contentone sections={videoProductionsocialData}  />
   
      <Contenttwo  />
      <ThreeColumnTable
        title="The 3 Phases of Social Media Video Production"
        subtitle="Understanding the video process helps you execute efficiently even on a tight budget."
        data={videoProductionData}
        columnTitles={videoProductionTitles} // Corrected: passing the array of strings
      />

      {/* Second Table: Platform-Specific Cheat Sheet */}
      <ThreeColumnTable
        title="Platform-Specific Cheat Sheet"
        data={platformCheatSheetData}
        columnTitles={platformCheatSheetTitles} // Corrected: passing the array of strings
      />
       <VideoGuide
 maintitle="Step-by-Step to Make Your First Video Count"
 subtitle="Scenario: Announcing a new product on TikTok"
 videoGuideSteps={videoGuideSteps}  // Corrected: changed 'data' to 'videoGuideSteps'
 />
 <EssentialTips tipsData={videoTips} title="Essential Tips for Creating Engaging Video Content"/>
 <Troubleshooting title="Troubleshooting Common Issues"   gridCols={troubleshootingData.gridCols} issues={troubleshootingData.issues}/>
     <ListingSection data={listingSectionData}/>
    <Contentone sections={videocountData}  />
    {scrollSectionsData.map((section, idx) => (
        <ScrollSection
          key={idx}
          title={section.title}
          paragraphs={section.paragraphs}
          image={section.image}
          imageAlt={section.imageAlt}
          
        />
      ))}
     <Detailsauthor data={authors} />
      <FAQ data={Faq} bgcolor="#F2F2F2"/>
    </div>
  );
};

export default page;