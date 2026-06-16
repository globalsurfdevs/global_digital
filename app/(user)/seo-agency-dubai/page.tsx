import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Expertise from "../../components/PermormanceMarketing/Expertise";
import Boost from "../../components/PermormanceMarketing/Boost";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Industries from "../../components/PermormanceMarketing/Industries";
import Results from "../../components/PermormanceMarketing/Results";
import Partner from "../../components/PermormanceMarketing/Partner";
import Testimonials from "../../components/HomePage/Testimonials";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import Standards from "../../components/PermormanceMarketing/Standards";

import { BannerSection } from "../../data/services/seo/herosection";
import { AreaExpertise } from "../../data/services/seo/area-of-expertise";
import { boostEngage } from "../../data/services/seo/boost-engage";
import { OurServices } from "../../data/services/seo/our-services";
import { Frameworkdata } from "../../data/services/seo/framework";
import { ResultsData } from "../../data/services/seo/results";
import { partnerData } from "../../data/partnerData";
import { Cta } from "../../data/services/seo/cta";
import { Faq } from "../../data/services/seo/faq";

interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does it take to see results from SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Search engine optimization is a long-term strategy, and results typically begin to show within 3 to 6 months. However, the timeline depends on factors such as the competitiveness of your industry, the quality of your website, and the strategies implemented."
      }
    },
    {
      "@type": "Question",
      name: "What's the difference between on-page and off-page SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On-page SEO focuses on optimizing elements within your website, such as content, metadata, and site structure. Off-page SEO, on the other hand, involves external factors like backlinks, social media presence, and other activities that increase your site's authority."
      }
    },
    {
      "@type": "Question",
      name: "How does Google's algorithm update affect SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Google's algorithm updates can impact rankings, as they continuously improve how websites are evaluated. Keeping your search engine optimization strategy up-to-date with these changes ensures your website stays competitive and continues to rank well in search results."
      }
    },
    {
      "@type": "Question",
      name: "What role does mobile optimization play in Search engine optimization?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mobile optimization is crucial for SEO because Google uses mobile-first indexing, meaning it evaluates your website based on the mobile version. If your site isn't mobile-friendly, it could impact your rankings, especially with the growing use of mobile devices for search."
      }
    },
    {
      "@type": "Question",
      name: "Is local SEO important for my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, local SEO is vital for businesses that rely on local customers. By optimizing your website for local search terms and listing your business on Google My Business, you can increase visibility among potential customers in your area and drive foot traffic to your store."
      }
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "SEO Services",
  name: "SEO Services Agency in Dubai",
  description:
    "Enhancing Search Engine Visibility with Advanced Optimization Strategies to Boost Traffic and Rankings. Our data-driven SEO strategies attract high-quality leads by optimizing your website to rank higher on Google. We target decision-makers and buyers, turning cold leads into warm prospects.",
  url: "https://www.globalsurf.ae/seo-agency-dubai",

  provider: {
    "@type": "Organization",
    name: "GS Digital",
    url: "https://www.globalsurf.ae",
    telephone: "+97145821133",
    email: "hello@globalsurf.ae",
    address: {
      "@type": "PostalAddress",
      streetAddress: "901 - SIT Tower, Dubai Silicon Oasis",
      addressLocality: "Dubai",
      addressCountry: "AE",
      postalCode: "13653",
    },
  },

  areaServed: {
    "@type": "Country",
    name: "United Arab Emirates",
  },

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "SEO Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Comprehensive Website Audit and Analysis",
          description:
            "An in-depth audit of your website to identify opportunities and develop a customized SEO strategy tailored to your goals.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Keyword Research and Optimization",
          description:
            "Targeted keyword research to identify and optimize for the terms your decision-makers and buyers are searching for.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "On-Page SEO Strategy and Implementation",
          description:
            "Refinement of your website's content, layout, and user experience to improve search rankings and engagement.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Content Optimization and Creation",
          description:
            "Strategic content optimization and creation to improve search visibility and drive high-quality organic traffic.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Technical SEO and Website Performance Improvement",
          description:
            "Strengthening your site's technical performance to ensure it is easily indexed and ranked by search engines.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Link Building and Backlink Strategy",
          description:
            "Building high-quality backlinks to boost your website's authority and improve search engine rankings.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "GEO",
          description:
            "Optimizing content for AI engines to boost citations in generative answers and increase visibility in AI-powered search.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Local SEO Optimization and Google Business Profile Setup",
          description:
            "Optimizing your website for local search terms and setting up Google Business Profile to increase visibility among local customers.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ongoing SEO Monitoring and Reporting",
          description:
            "Consistent tracking and detailed performance insights to analyze results and continuously refine SEO strategies.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "B2B SEO",
          url: "https://www.globalsurf.ae/b2b-seo-agency-dubai",
          description:
            "B2B SEO connects your business with key decision-makers, driving targeted traffic and generating high-value leads.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-commerce SEO",
          url: "https://www.globalsurf.ae/ecommerce-seo-dubai",
          description:
            "E-commerce SEO boosts your online store's visibility, helping you attract more customers and drive seamless purchases.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Local SEO",
          url: "https://www.globalsurf.ae/local-seo-agency-dubai",
          description:
            "Local SEO ensures your business stands out in nearby searches, making it easy for local customers to find you.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Technical SEO",
          description:
            "Technical SEO ensures your site is easily indexed and ranked by search engines.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "International SEO",
          description:
            "International SEO optimizes your website for global audiences, helping you reach customers across languages and regions.",
        },
      },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "SEO Agency in Dubai | SEO Services for Organic Growth | GS Digital",
    description:
      "GS Digital, your trusted SEO agency in Dubai. We help businesses achieve measurable growth through tailored SEO services. Get in touch with our team!",
    alternates: {
      canonical: "https://www.globalsurf.ae/seo-agency-dubai",
    },
  };
}
const page = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
     <main>
        <HeroSection Bannerdata={BannerSection} order={"02"} maxchwidth={40} />
        <Expertise title={AreaExpertise.title} data={AreaExpertise.data} />
        <Boost title={boostEngage.title} data={boostEngage.data} />
        <Services title={OurServices.title} data={OurServices.data} />
        <Framework title={Frameworkdata.title} data={Frameworkdata.data} />
        <Industries />
        <Results title={ResultsData.title} data={ResultsData.data} />
        <Standards />
        <Partner data={partnerData} />
        <Testimonials />
        <GetInTouch data={Cta} ctabbutton={"LET'S TALK GROWTH"} />
        <FAQ data={Faq} />
     </main>
    </>
  );
};

export default page;
