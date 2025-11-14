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
    title: "Social Media Video Production: 2026 Guide for TikTok, Reels & Shorts | Global Surf ",
    description:
      "Master social media video production in 2026: step-by-step guide for TikTok, Instagram Reels, YouTube Shorts & LinkedIn. Free cheat sheets, tips & more. ",
    alternates: {
      canonical: "https://www.globalsurf.ae/blogs/social-media-video-production-tips",
    },
    robots: "index, follow",
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
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Social Media Video Production: 2026 Guide for TikTok, Reels & Shorts",
    "author": {
      "@type": "Person",
      "name": "Ashna Ganeeva"
    },
    "datePublished": "2025-09-15",
    "dateModified": "2026-03-01",
    "publisher": {
      "@type": "Organization",
      "name": "Global Surf Digital",
      "logo": "https://www.globalsurf.ae/logo.png"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.globalsurf.ae/blogs/social-media-video-production-tips"
    }
  };
  return (
    <div className="relative">
       {/* ARTICLE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What does a social media video production company do?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "A social media video production company handles everything from content planning and scripting to filming, editing, and publishing. They specialize in creating videos tailored to social platforms and often help with strategy, platform optimization, and performance tracking.",
                },
              },
              {
                "@type": "Question",
                "name": "Should I work with a social media video production agency?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "If you're scaling your content or want consistent, high-quality output, working with a social media video production company or agency can save time and improve results. Agencies often offer editing, strategy, and platform optimization as a package.",
                },
              },
              {
                "@type": "Question",
                "name": "How can I measure video performance on social media?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Track metrics like views, engagement rate (likes, comments, shares), watch time, reach, and click-through rates. On platforms like Instagram or YouTube, you can also use Insights/Analytics tools for deeper reporting.",
                },
              },
              {
                "@type": "Question",
                "name": "What makes a social media video effective?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "An effective social video grabs attention within the first few seconds, tells a compelling story, is optimized for mobile viewing, includes captions, and ends with a strong call-to-action (CTA). It should also align with your brand voice and appeal to your target audience.",
                },
              },
            ],
          }),
        }}
      />

      {/* HOW-TO SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Create a Viral Social Media Video",
            "description":
              "Step-by-step guide to producing engaging short-form videos for TikTok, Reels, and YouTube Shorts.",
            "image":
              "https://www.globalsurf.ae/_next/static/media/prepro3.528c655d.png",
            "totalTime": "PT2H",
            "supply": [
              { "@type": "HowToSupply", "name": "Smartphone or camera" },
              { "@type": "HowToSupply", "name": "Editing software or app" },
            ],
            "tool": [
              { "@type": "HowToTool", "name": "Ring light" },
              { "@type": "HowToTool", "name": "Tripod" },
            ],
            "step": [
              {
                "@type": "HowToStep",
                "text":
                  "Plan your video concept and identify the target platform.",
              },
              {
                "@type": "HowToStep",
                "text":
                  "Record the video with clear visuals and strong lighting.",
              },
              {
                "@type": "HowToStep",
                "text":
                  "Edit the footage using trending sounds, captions, and effects.",
              },
              {
                "@type": "HowToStep",
                "text":
                  "Upload with an optimized caption, hashtags, and thumbnail.",
              },
              {
                "@type": "HowToStep",
                "text":
                  "Monitor performance and adjust content strategy accordingly.",
              },
            ],
          }),
        }}
      />
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