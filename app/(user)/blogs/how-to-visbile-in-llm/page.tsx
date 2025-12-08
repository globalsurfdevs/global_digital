
import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionBlogSocial";
import Contentone from "../../../components/BlogSocialMedia/ContentSecBlog2";
import Contenttwo from "../../../components/BlogSocialMedia/WhyVisibleLlm";
import ThreeColumnTable from "../../../components/BlogSocialMedia/ThreeColumnTable";
import VideoGuide from "../../../components/BlogSocialMedia/VideoGuide";
import LlmWorks from "../../../components/BlogSocialMedia/LlmWorks";
import ScrollSection from "../../../components/BlogSocialMedia/ScrollsSec";
import Detailsauthor from "../../../components/BlogSocialMedia/Author";
import FAQ from "../../../components/PermormanceMarketing/FAQ";
import LeftSideScrollBar from "@/app/components/BlogSocialMedia/LeftSideFixedTabs";
import NewRules from "../../../components/BlogSocialMedia/NewRules";



import { BannerSection ,videoProductionData,Faq,videoGuideSteps,
  contentSectionsData,
  videoProductionsocialData,videocountData,scrollSectionsData,authors,llmColumnTitles,
  llmTableData,visibilitysec,rulesData,takeaway

} from "../../../data/blogdatas/llmdata";


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
    title: "Social Media Video Production: 2026 Guide for TikTok, Reels & Shorts | Global Surf ",
    description:
      "Master social media video production in 2026: step-by-step guide for TikTok, Instagram Reels, YouTube Shorts & LinkedIn. Free cheat sheets, tips & more. ",
    alternates: {
      canonical: "",
    },
    robots: "noindex, nofollow",
  };
}

const page = () => {
  
  const videoProductionTitles = ['Feature ', 'Search Engine ', 'LLM (ChatGPT/ Claude/ Gemini) '];
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

      
     <div id="hero-section">
  <HeroSection
    Bannerdata={BannerSection}
    hideslider={true}
    maxchwidth={27}
  />
</div>
     <LeftSideScrollBar />
     <div id="silent-shift">
     <Contentone  sections={contentSectionsData} /></div>
     <Contentone sections={videoProductionsocialData}  />
     <div id="how-llms-work"><LlmWorks
  
  title="How LLMs Work (In Simple Terms)"
 
  columnTitles={llmColumnTitles}
  data={llmTableData}
/></div>
 <Contentone sections={visibilitysec} />
      <div id="invisible-llms"> <Contenttwo  /></div>
     <div id="ai-visibility-framework"><ThreeColumnTable
        title="The 5-Step AI Visibility Framework by Global Surf Digital"
        
        data={videoProductionData}
        columnTitles={videoProductionTitles} // Corrected: passing the array of strings
      /></div> 
      <div id="content-llms-read">
      <Contentone sections={videocountData}  /></div>
   <div id="rules-visibility">
    <NewRules rules={rulesData} />
  </div>
    <div id="impact-b2b-b2c">
    <VideoGuide
      maintitle="How This Impact B2B and B2C "
      videoGuideSteps={videoGuideSteps}
    />
  </div>
  <div id="takeaway">
    <Contentone sections={takeaway} />
  </div>
    <div id="brand-visibility">
    {scrollSectionsData.map((section, idx) => (
      <ScrollSection
        key={idx}
        title={section.title}
        paragraphs={section.paragraphs}
        image={section.image}
        imageAlt={section.imageAlt}
        cta={{
          label: "Get your complimentary audit at  ",
        }}
      />
    ))}
  </div>
     <Detailsauthor data={authors} />
     <div id="faq-section">
      <FAQ data={Faq} bgcolor="#F2F2F2"/>
      </div>
    </div>
  );
};

export default page;