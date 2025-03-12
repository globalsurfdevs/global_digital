import Script from 'next/script';
import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Results from "../../components/SocialMediaMarketingDubai/Results";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import Platformsecom from "../../components/PpcAdvertisingAgencyDubai/Platformsecom";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";


import { ResultsData } from "../../data/services/social-media-marketing-dubai/results";
import { BannerSection } from "../../data/services/social-media-marketing-dubai/herosection";
import { OurServices } from "../../data/services/social-media-marketing-dubai/our-services";
import { Frameworkdata } from "../../data/services/social-media-marketing-dubai/framework";
import { relatedservices } from "../../data/services/social-media-marketing-dubai/relatedservices";
import { Wecanhelp } from "../../data/services/social-media-marketing-dubai/wecanhelp";
import { Platformsecomdata } from "../../data/services/social-media-marketing-dubai/platformsecom";
import { Platformsdata } from "../../data/services/social-media-marketing-dubai/platforms";
import { Cta } from "../../data/services/social-media-marketing-dubai/cta";
import { Faq } from "../../data/services/social-media-marketing-dubai/faq";
import Testimonials from "@/app/components/HomePage/Testimonials";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";

interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
  // robots: string;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Social Media Marketing Agency in Dubai | Global Surf Digital",
    description:
      "Dubai's trusted SMM agency, Global Surf Digital, provides expert social media marketing services to help you dominate the digital landscape. Contact us now!",
    alternates: {
      canonical: "https://www.globalsurf.ae/social-media-marketing-dubai",
    },
    // robots: "noindex, nofollow",
  };
}
<Script
id="faq-schema"
type="application/ld+json"
dangerouslySetInnerHTML={{
  __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is social media marketing, and how does it work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Social media marketing involves creating and sharing content on social media platforms to build brand awareness, engage with your audience, and drive traffic to your website. As a trusted social media marketing agency in Dubai, we help businesses develop strategies that engage their target audience and generate meaningful results."
        }
      },
      {
        "@type": "Question",
        "name": "How do I know if social media marketing is right for my business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Social media marketing is perfect for businesses looking to build their online presence, connect with customers, and drive sales. If you want to increase brand visibility, foster engagement, and grow your business, social media marketing can be highly effective. As a leading social media marketing agency, we work with you to assess your goals and craft a strategy that aligns with your needs."
        }
      },
      {
        "@type": "Question",
        "name": "What platforms do you manage for social media campaigns?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We manage social media campaigns across multiple platforms, including Facebook, Instagram, LinkedIn, Twitter, and more. Our team utilizes these platforms to create targeted campaigns that resonate with your audience. As a trusted social media ad agency, we ensure your ads reach the right people at the right time."
        }
      },
      {
        "@type": "Question",
        "name": "How do you optimize social media campaigns for better performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We use a data-driven approach to continuously optimize your social media campaigns. This includes refining targeting, testing different types of content, analyzing engagement, and adjusting strategies to improve performance. With our social media marketing services in Dubai, we focus on maximizing the impact of your social media presence for long-term success."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to see results from social media campaigns?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Social media campaigns can start generating engagement almost immediately, but it typically takes a few weeks to see fully optimized results. We continuously monitor and adjust campaigns to ensure they’re performing at their best. With our social media marketing services packages, we ensure your campaigns are driving sustained growth over time."
        }
      },
      {
        "@type": "Question",
        "name": "What makes GS Digital different from other social media marketing agencies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At GS Digital, we prioritize personalized strategies for each client. Our team of expert's crafts tailored social media campaigns across various platforms, delivering measurable results. We’re committed to transparency, communication, and helping your business grow sustainably through well-managed campaigns. As a leading social media marketing agency, we focus on your success."
        }
      },
      {
        "@type": "Question",
        "name": "Can you help me with both organic and paid social media campaigns?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We specialize in both organic content strategies and paid social media campaigns. Whether through social media marketing services or social media ad agency strategies, we help you maximize reach and engagement on platforms like Facebook, Instagram, LinkedIn, and more."
        }
      },
      {
        "@type": "Question",
        "name": "How do you track and measure social media campaign success?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We track social media performance using key metrics like engagement rate, click-through rate (CTR), conversion rate, and return on ad spend (ROAS). We continuously refine your campaigns based on these metrics to ensure they are achieving your goals. Our social media marketing services packages are designed to deliver measurable results for your brand."
        }
      },
      {
        "@type": "Question",
        "name": "How long will it take until I see significant results from your social media marketing efforts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The timeline depends on factors like whether you’re focusing on organic or paid growth, the maturity of your strategy, audience size, and engagement. New or disengaged channels may take over three months, while established ones can show results within two months. We continuously optimize campaigns to adapt to evolving algorithms and behaviors, ensuring steady, measurable progress. We'll monitor and adjust as needed to drive the best results for your brand."
        }
      },
    ]
  }),
}}
/>
const page = () => {
  return (
    <div>
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={26} />
      <Platforms title={Wecanhelp.title} data={Wecanhelp.data} icontitle={true} hiddentitle={true} leftzero={true} colcount={4} />
      <Services title={OurServices.title} data={OurServices.data}  colcount={5} />
      <Framework title={Frameworkdata.title} data={Frameworkdata.data}  />
      <section className="pt-[50px]   lg:pt-[140px] lg:pb-[70px]">
      <Platforms title={Platformsdata.title} data={Platformsdata.data}   />
      </section>
      <Results title={ResultsData.title} description={ResultsData.description} data={ResultsData.data}   />

      <Testimonials bgcolor={'white'} />
      <section className="pb-[50px]   lg:pb-[140px] ">
      <Platformsecom title={Platformsecomdata.title} desc={Platformsecomdata.desc} data={Platformsecomdata.data} />
      </section>

      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"CONTACT US TO GET STARTED!"}
        link={"/lets-talk"}
      />
      <FAQ data={Faq} />
      <RelatedServices title={relatedservices.title}   data={relatedservices.data} colcount={3} />
    </div>
  );
};

export default page;
