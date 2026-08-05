import React from "react";
// import Script from "next/script";
import HeroSection from "../../components/BrandingAndPositioning/HeroSection";
import Testimonials from "../../components/HomePage/Testimonials";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import { Cta } from "../../data/services/performance-marketing/cta";
import { Faq } from "../../data/services/performance-marketing/faq";
import TitleDesc from "../../components/BrandingAndPositioning/TitleDesc";
import ImgDesc from "../../components/BrandingAndPositioning/ImgDesc";
import GrayParaSec from "../../components/BrandingAndPositioning/GrayParaSec";
import ServicesSec from "../../components/BrandingAndPositioning/ServicesSec";
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service: ServiceItem | null = await getService(slug);

  if (!service) {
    return {
      title: "Not Found",
      description: "",
      alternates: { canonical: "https://www.globalsurf.ae/" },
    };
  }

  const seo = service.seo;
  const canonicalUrl = `https://www.globalsurf.ae/${service.slug}`;

  return {
    title: seo?.metaTitle ?? service.name,
    description: seo?.metaDescription ?? "",
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo?.ogTitle ?? seo?.metaTitle ?? service.name,
      description: seo?.ogDescription ?? seo?.metaDescription ?? "",
      url: canonicalUrl,
      images: seo?.ogImage ? [{ url: seo.ogImage }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitterTitle ?? seo?.metaTitle ?? service.name,
      description: seo?.twitterDescription ?? seo?.metaDescription ?? "",
      images: seo?.twitterImage ? [seo.twitterImage] : undefined,
    },
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const service: ServiceItem = await getService(slug);

  const testimonials = await getTestimonials();

  const servicesData = {
    title: service.fifthSection.title,
    subtitle: service.fifthSection.subTitle,
    items: service.fifthSection.items.map((item, index) => ({
      id: index.toString(),
      icon: item.image,
      ...item,
    })),
  };

  const whatYouGetData = {
    title: service.eighthSection.title,
    subTitle: service.eighthSection.subTitle,
    data: service.eighthSection.items.map((item, index) => ({
      id: index + 1,
      dec: item.description,
      ...item,
    })),
  };

  const capabilitiesData = {
    tag: service.ninethSection.title,
    title: service.ninethSection.subTitle,

    items: service.ninethSection.items.map((item, index) => ({
      id: index + 1,
      icon: item.image,
      ...item,
    })),
  };

  const whyChooseData = {
    tag: service.eleventhSection.title,
    title: service.eleventhSection.subTitle,
    description: service.eleventhSection.description,
    items: service.eleventhSection.items.map((item, index) => ({
      id: index + 1,
      value: item.number,
      label: item.value,
    })),
  };

  const caseStudiesData = {
    tag: service.caseStudySection.title,
    title: service.caseStudySection.subTitle,
    items: service.caseStudySection.items.map((item, index) => ({
      id: index + 1,
      client: item.project.companyName,
      logo: item.project.logo,
      href: `/case-study/${item.project.slug}`,
      ...item,
    })),
  };

  const Cta = [
    {
      textred: service.ctaSection.titleRed,
      text: service.ctaSection.title,
      subhead: service.ctaSection.description,
    },
  ];

  const Faq = [
    ...service.faqSection.items.map((item) => ({
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
      {service.seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: service.seo.schema }}
        />
      )}
      <HeroSection data={service.firstSection} />
      <TitleDesc data={service.secondSection} />
      <ImgDesc data={service.thirdSection} />
      <GrayParaSec data={service.fourthSection} />
      <ServicesSec
        title={servicesData.title}
        description={servicesData.subtitle}
        items={servicesData.items}
      />
      <ProcessSlider data={service.sixthSection} />
      <BECS data={service.seventhSection} />
      <BlackInfoGrid
        title={whatYouGetData.title}
        subTitle={whatYouGetData.subTitle}
        data={whatYouGetData.data}
        bgcolor="bg-black"
        maxchwidth={50}
        colcount={4}
      />
      {capabilitiesData.items.length > 0 && <RelatedCapabilities data={capabilitiesData} />}
      <section className={`mb-8 xl:mb-12 2xl:mb-16 3xl:mb-[120px] ${capabilitiesData.items.length < 1 ? "mt-8 xl:mt-12 2xl:mt-16 3xl:mt-[120px]" : ""} `}>
        <ButtonSlider data={service.tenthSection} />
      </section>
      <WhyChoose data={whyChooseData} />
      {caseStudiesData.items.length > 0 && (
        <CaseSudiesSec data={caseStudiesData} />
      )}
      <Testimonials
        topTitle="Testimonials"
        data={testimonials.testimonialSection}
        bottomText={false}
        reviews={false}
      />
      <GetInTouch
        data={Cta}
        ctabbutton={service.ctaSection.buttonText}
        redlast
      />
      <FAQ data={Faq} initialCount={3} />
    </div>
  );
};

export default page;
