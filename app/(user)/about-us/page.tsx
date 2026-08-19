import React from "react";
import Script from "next/script";
import HeroSection from "../../components/AboutUs/HeroSection";
import SectionTwo from "../../components/AboutUs/SectionTwo";
import SectionThree from "../../components/AboutUs/SectionThree";
import SectionFour from "../../components/AboutUs/SectionFour";
import SectionFive from "../../components/AboutUs/SectionFive";
import { getAbout } from "@/app/lib/about.service";
import { data } from "@/app/data/llmWorksData";

interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About GS Digital | Digital Growth Partner to Leading Brands in UAE",
    description:
      "About GS Digital: Dubai-based full‑service digital agency specialising in SEO, performance, Web & creative for B2B and enterprise brands.",
    alternates: {
      canonical: "https://www.globalsurf.ae/about-us",
    },
  };
}

const page = async () => {
  const about = await getAbout();
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
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "WebSite",
                  "@id": "https://www.globalsurf.ae/",
                  name: "Home",
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "WebPage",
                  "@id": "https://www.globalsurf.ae/about-us",
                  name: "About Us",
                },
              },
            ],
          }),
        }}
      />
      <HeroSection data={about.firstSection} />
      <SectionTwo
        video={about.firstSection.video}
        title={about.secondSection.title}
        description={about.secondSection.description}
      />
      <SectionThree data={about.thirdSection} />
      <SectionFour data={about.fourthSection} />
      <SectionFive data={about.teamSection} lastSection={about.lastSection} />
    </>
  );
};

export default page;
