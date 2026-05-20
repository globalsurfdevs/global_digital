import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionBlogSocial";
import Contentone from "../../../components/BlogSocialMedia/ContentSecBlog2";
import Contenttwo from "../../../components/BlogSocialMedia/WhyVisibleLlm";
import ThreeColumnTable from "../../../components/BlogSocialMedia/ThreeColumnTable";
import VideoGuide from "../../../components/BlogSocialMedia/VideoGuide";
import LlmWorks from "../../../components/BlogSocialMedia/LlmWorks";
import ScrollSection from "../../../components/BlogSocialMedia/ScrollsSec";
import Detailsauthor from "../../../components/BlogSocialMedia/Author";
import BlogFaq from "../../../components/common/BlogFaq";
import LeftSideScrollBar from "@/app/components/BlogSocialMedia/LeftSideFixedTabs";
import NewRules from "../../../components/BlogSocialMedia/NewRules";



import {
  BannerSection, videoProductionData, Faq, videoGuideSteps,
  contentSectionsData,
  videoProductionsocialData, videocountData, scrollSectionsData, authors, llmColumnTitles,
  llmTableData, visibilitysec, rulesData, takeaway, tableOfContents

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
    title: "Why Your Brand Isn’t Visible in LLMs (And What to Do About it) ",
    description:
      "If your brand isn’t visible in LLMs like ChatGPT, Claude, or Gemini, you’re missing out on a huge opportunity to connect with customers. Learn why this happens and how to fix it.",
    alternates: {
      canonical: "https://www.globalsurf.ae/blogs/how-to-visible-in-llm",
    },
    robots: "index, follow",
  };
  
}
const page = () => {

  const videoProductionTitles = ['Feature ', 'Search Engine ', 'LLM (ChatGPT/ Claude/ Gemini) '];
  

  return (
    <div className="relative">
      {/* FAQ SCHEMA */}
     
      <div id="hero-section">
        <HeroSection
          Bannerdata={BannerSection}
          hideslider={true}
          maxchwidth={27}
        />
      </div>
      {/* <LeftSideScrollBar /> */}
      <Contentone sections={tableOfContents} />
      <div id="silent-shift">
        <Contentone sections={contentSectionsData} /></div>
      <Contentone sections={videoProductionsocialData} />
      <div id="how-llms-work"><LlmWorks

        title="How LLMs Work (In Simple Terms)"

        columnTitles={llmColumnTitles}
        data={llmTableData}
      /></div>
      <Contentone sections={visibilitysec} />
      <div id="invisible-llms"> <Contenttwo /></div>
      <div id="ai-visibility-framework"><ThreeColumnTable
        title="The 5-Step AI Visibility Framework by GS Digital"
paddingBottom="pb-0"
        data={videoProductionData}
        columnTitles={videoProductionTitles} // Corrected: passing the array of strings
      /></div>
      <div id="content-llms-read">
        <Contentone sections={videocountData} /></div>
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
      <div id="brand-visibility" >
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
      <div id="faq-section" className="mt-[50px] lg:mt-[100px]">
        {/* <Detailsauthor data={authors} /> */}

        <BlogFaq data={Faq}  />
      </div>
    </div>
  );
};

export default page;