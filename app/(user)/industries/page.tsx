import React from "react";
import HeroSection from "../../components/IndustryNew/sections/HeroSection";
import Head from "next/head";

import Industydetail from "@/app/components/industry/Industydetail";
// import { data } from "@/app/components/IndustryNew/data";
import OurApproach from "@/app/components/IndustryNew/sections/OurApproach";
import SectorsWeWorkWith from "@/app/components/IndustryNew/sections/Sectors";
import Results from "@/app/components/IndustryNew/sections/Results";
import Service from "@/app/components/IndustryNew/sections/Services";
import { assets } from "@/public/assets/assets";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import { getIndustryLandingPage } from "@/app/lib/industryLanding.service";
import { getAllIndustry } from "@/app/lib/industry.service";
import { IndustryLandingPageType } from "@/app/components/IndustryNew/type";
import { Metadata } from "next";
import { userRoutes } from "@/app/const/routes/user.routes";

interface Canonicals {
  canonical: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const industry: IndustryLandingPageType = await getIndustryLandingPage();

  if (!industry) {
    return {
      title: "Not Found",
      description: "",
      alternates: { canonical: "https://www.globalsurf.ae/" },
    };
  }

  const seo = industry.seo;
  const canonicalUrl = `https://www.globalsurf.ae/industries`;

  return {
    title: seo?.metaTitle ?? industry.firstSection.title,
    description: seo?.metaDescription ?? "",
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo?.ogTitle ?? seo?.metaTitle ?? industry.firstSection.title,
      description: seo?.ogDescription ?? seo?.metaDescription ?? "",
      url: canonicalUrl,
      images: seo?.ogImage ? [{ url: seo.ogImage }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitterTitle ?? seo?.metaTitle ?? industry.firstSection.title,
      description: seo?.twitterDescription ?? seo?.metaDescription ?? "",
      images: seo?.twitterImage ? [seo.twitterImage] : undefined,
    },
  };
}
const page = async () => {
  const industry: IndustryLandingPageType = await getIndustryLandingPage();

  const allIndustry = await getAllIndustry();

  // const Clientsformsdata = industry.caseStudySection?.items.map((item, index) => (
  //     {
  //         id: index + 1,
  //         image: item.image,
  //         title: item.title,
  //         btntext: item.project.section == "case study" || item.project.section == "case study new" ? "Read the Full Case Study" : "Check portfolio page",
  //         btnurl: item.project.section == "case study" || item.project.section == "case study new" ? `https://www.globalsurf.ae/case-study/${item.project.slug}` : `https://www.globalsurf.ae/portfolio/${item.project.slug}`,
  //     }
  // ))

  const servicesData = {
    title: industry.servicesSection.title,
    subtitle: industry.servicesSection.subTitle,

    items: industry.servicesSection.items.map((item, index) => ({
      id: (index + 1).toString(),

      icon: item.service?.icon,
      link:userRoutes.servicePillar.detail(item.service?.slug),

      title: item.service?.name,
      description: item.description,
    })),
  };
  
  const Faq = [
    ...industry?.faqSection?.items.map((item) => ({
      title: item.question,
      description: item.answer,
    })),
  ];
//   console.log("servicesData:",servicesData)
  const Cta = [
    {
      textred: industry?.ctaSection?.titleRed,
      text: industry?.ctaSection?.title,
      subhead: industry?.ctaSection?.description,
    },
  ];

  return (
    <div>
      <HeroSection data={industry.firstSection} />
      <OurApproach data={industry.secondSection} />
      <SectorsWeWorkWith
        data={industry.thirdSection}
        allIndustry={allIndustry}
      />
      {/* <Results Clientsformsdata={Clientsformsdata} title1={industry.caseStudySection.subTitle} title={industry.caseStudySection.title} /> */}
      <Service
        title={servicesData.title}
        description={servicesData.subtitle}
        items={servicesData.items}
      />
      <GetInTouch
        data={Cta}
        ctabbutton={industry?.ctaSection.buttonText}
        buttonLink={industry?.ctaSection.buttonLink}
        redfirst
        page="service"
      />
      <FAQ data={Faq} initialCount={3} page="service" title={"FAQ"} />
    </div>
  );
};

export default page;
