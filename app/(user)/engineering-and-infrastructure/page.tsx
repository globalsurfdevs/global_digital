import React from "react";
// import Script from "next/script";
import HeroSection from "../../components/BrandingAndPositioning/HeroSection";
import Testimonials from "../../components/HomePage/Testimonials";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import { Cta } from "../../data/services/performance-marketing/cta";
import { Faq } from "../../data/services/performance-marketing/faq";
import TitleDesc from "../../components/EngineeringInfrastructure/TitleDesc";
import ImgDesc from "../../components/BrandingAndPositioning/ImgDesc";
import GrayParaSec from "../../components/BrandingAndPositioning/GrayParaSec";
import ServicesListSec from "../../components/EngineeringInfrastructure/ServicesListSec";
import {
  servicesData,
  whatYouGetData,
  capabilitiesData,
  caseStudiesData,
} from "../../data/services/branding-and-positioning-agency-in-dubai/data";
import ProcessSlider from "@/app/components/BrandingAndPositioning/ProcessSlider";
import BECS from "@/app/components/BrandingAndPositioning/BECS";
import BlackInfoGrid from "@/app/components/BrandingAndPositioning/BlackInfoGrid";
import RelatedCapabilities from "@/app/components/BrandingAndPositioning/RelatedCapabilities";
import ButtonSlider from "@/app/components/BrandingAndPositioning/ButtonSlider";
import WhyChoose from "@/app/components/BrandingAndPositioning/WhyChoose";
import { whyChooseData } from "../../data/services/branding-and-positioning-agency-in-dubai/data";
import CaseSudiesSec from "@/app/components/BrandingAndPositioning/CaseSudiesSec";
import { getService } from "@/app/lib/services.service";
import { data } from "@/app/data/llmWorksData";
import { getTestimonials } from "@/app/lib/testimonials";
import { ServiceItem } from "./type";
import { Metadata } from "next";
import { serviceData } from "@/app/components/EngineeringInfrastructure/data";
import SuccessStories from "@/app/components/EngineeringInfrastructure/SuccessStories";
import ExperienceResult from "@/app/components/EngineeringInfrastructure/ExperienceResult";
import IndustriesSec from "@/app/components/EngineeringInfrastructure/IndustriesSec";

// import FaqSchema from "../../components/Schema/FaqSchemad";
// import {
//   PerformanceMarketingSchema,
//   PerformanceMarketingBreadcrumb  } from "../../components/Schema/ServiceSchema";

interface Canonicals {
  canonical: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}



const page = async ({ params }: PageProps) => {




  const servicesData = {
    title: serviceData.fifthSection.title,
    subtitle: serviceData.fifthSection.subTitle,
    items: serviceData.fifthSection.items.map((item, index) => ({
      id: index.toString(),
      icon: item.image,
      ...item,
    })),
  };

  const whatYouGetData = {
    title: serviceData.eighthSection.title,
    subTitle: serviceData.eighthSection.subTitle,
    data: serviceData.eighthSection.items.map((item, index) => ({
      id: index + 1,
      dec: item.description,
      ...item,
    })),
  };

  // const capabilitiesData = {
  //   tag: serviceData.ninethSection.title,
  //   title: serviceData.ninethSection.subTitle,

  //   items: serviceData.ninethSection.items.map((item, index) => ({
  //     id: index + 1,
  //     icon: item.image,
  //     ...item,
  //   })),
  // };

  const whyChooseData = {
    tag: serviceData.eleventhSection.title,
    title: serviceData.eleventhSection.subTitle,
    description: serviceData.eleventhSection.description,
    items: serviceData.eleventhSection.items.map((item, index) => ({
      id: index + 1,
      value: item.number,
      label: item.value,
    })),
  };

  const industryExperienceResultsData = {
    title: serviceData.industryExperienceResults.title,
    items: serviceData.industryExperienceResults.items.map((item) => ({
      id: item.id, // or String(item.id)
      topTitle: item.topTitle,
      stat: item.stat,
      statLabel: item.statLabel,
      title: item.title,
      description: item.description,
      logo: item.logo,
      image: item.image,
      slug: item.slug,
      accent: item.accent as "primary" | "dark",
    })),
  };
  
  const industriesData = {
    title: serviceData.industries.title,
    subTitle: serviceData.industries.subTitle,
    items: serviceData.industries.items.map((item) => ({
      _id: item.id,
      title: item.title,
      icon: item.icon,
      iconAlt: item.iconAlt,
      slug: item.slug,
      active: item.active,
    })),
  };

  // const caseStudiesData = {
  //   tag: serviceData.caseStudySection.title,
  //   title: serviceData.caseStudySection.subTitle,
  //   items: serviceData.caseStudySection.items.map((item, index) => ({
  //     id: index + 1,
  //     client: item.project.companyName,
  //     logo: item.project.logo,
  //     href: `/case-study/${item.project.slug}`,
  //     ...item,
  //   })),
  // };

  const Cta = [
    {
      textred: serviceData.ctaSection.titleRed,
      text: serviceData.ctaSection.title,
      subhead: serviceData.ctaSection.description,
    },
  ];

  const Faq = [
    ...serviceData.faqSection.items.map((item) => ({
      title: item.question,
      description: item.answer,
    })),
  ];

  return (
    <div>
      {/* <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PerformanceMarketingSchema),
        }}
      />

      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PerformanceMarketingBreadcrumb),
        }}
      />
      <FaqSchema faq={Faq} /> */}
      {/* <section className="hidegslider">
        <HeroSection
          Bannerdata={BannerSection}
          bannerlogp={true}
          maxchwidth={60}
        />
      </section> */}
      {/* {serviceData.seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serviceData.seo.schema }}
        />
      )} */}
      <HeroSection data={serviceData.firstSection} />
      <TitleDesc data={serviceData.secondSection} />
      {/* <ImgDesc data={serviceData.thirdSection} /> */}
      {/* <GrayParaSec data={serviceData.fourthSection} /> */}
      <ServicesListSec
        title={servicesData.title}
        description={servicesData.subtitle}
        items={servicesData.items}
      />
      {/* <ProcessSlider data={serviceData.sixthSection} />
      <BECS data={serviceData.seventhSection} /> */}
      <BlackInfoGrid
        title={whatYouGetData.title}
        subTitle={whatYouGetData.subTitle}
        data={whatYouGetData.data}
        bgcolor="bg-black"
        maxchwidth={50}
        colcount={3}
      />
      {/* {capabilitiesData.items.length > 0 && <RelatedCapabilities data={capabilitiesData} />}
      <section className={`mb-8 xl:mb-12 2xl:mb-16 3xl:mb-[120px] ${capabilitiesData.items.length < 1 ? "mt-8 xl:mt-12 2xl:mt-16 3xl:mt-[120px]" : ""} `}>
        <ButtonSlider data={serviceData.tenthSection} />
      </section> */}
      <WhyChoose data={whyChooseData} />
      <ExperienceResult data={industryExperienceResultsData} />
      <IndustriesSec data={industriesData} />
      {/* {caseStudiesData.items.length > 0 && (
        <CaseSudiesSec data={caseStudiesData} />
      )} */}
      {/* <Testimonials
        topTitle="Testimonials"
        data={testimonials.testimonialSection}
        bottomText={false}
        reviews={false}
      /> */}
      <GetInTouch
        data={Cta}
        ctabbutton={serviceData.ctaSection.buttonText}
        redlast
      />
      <FAQ data={Faq} initialCount={5} defActive="2" fullSpace={true} />
    </div>
  );
};

export default page;
