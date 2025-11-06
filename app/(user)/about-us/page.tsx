import React from "react";
import Script from "next/script";
import HeroSection from "../../components/AboutUs/HeroSection";
import SectionTwo from "../../components/AboutUs/SectionTwo";
import SectionThree from "../../components/AboutUs/SectionThree";
import SectionFour from "../../components/AboutUs/SectionFour";
import SectionFive from "../../components/AboutUs/SectionFive";

interface Canonicals {
  canonical: string;
} 
 

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Digital Growth Partner to Leading Brands in the UAE | GS.Digital",
    description:
      "Unlock your brand’s potential with Global Surf Digital Media, the trusted digital growth partner for UAE’s top brands. Elevate your success with tailored marketing strategies.",
    alternates: {
      canonical: "https://www.globalsurf.ae/about-us",
    },
  };
}

const page = () => {
  return (
    <>
    <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "WebSite",
                  "@id": "https://www.globalsurf.ae/",
                  "name": "Home",
                },
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "WebPage",
                  "@id": "https://www.globalsurf.ae/about-us",
                  "name": "About Us",
                },
              },
            ],
          }),
        }}
      />
      <HeroSection />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
    </>
  );
};

export default page;
