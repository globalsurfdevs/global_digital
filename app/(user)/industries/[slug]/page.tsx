import React from "react";
import HeroSection from "../../../components/EngineeringInfrastructure/HeroSection";
import FAQ from "@/app/components/PerformanceMarketing/FAQ";
import GetInTouch from "@/app/components/PerformanceMarketing/GetInTouch";
import TitleDesc from "../../../components/EngineeringInfrastructure/TitleDesc";
import ServicesListSec from "../../../components/EngineeringInfrastructure/ServicesListSec";
import BlackInfoGrid from "@/app/components/BrandingAndPositioning/BlackInfoGrid";
import WhyChoose from "@/app/components/BrandingAndPositioning/WhyChoose";
import ExperienceResult from "@/app/components/EngineeringInfrastructure/ExperienceResult";
import IndustriesSec from "@/app/components/EngineeringInfrastructure/IndustriesSec";
import {
  getAllIndustry,
  getIndustry,
} from "@/app/lib/services/industry.service";
import { IndustryItem } from "./type";
import { Metadata } from "next";
import WhoWeWork from "@/app/components/BrandingAndPositioning/WhoWeWork";
import HowWeDo from "@/app/components/EngineeringInfrastructure/HowWeDo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry: IndustryItem | null = await getIndustry(slug);

  if (!industry) {
    return {
      title: "Not Found",
      description: "",
      alternates: { canonical: "https://www.globalsurf.ae/" },
    };
  }

  const seo = industry.seo;
  const canonicalUrl = `https://www.globalsurf.ae/industries/${industry.slug}`;

  return {
    title: seo?.metaTitle ?? industry.name,
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
      title: seo?.ogTitle ?? seo?.metaTitle ?? industry.name,
      description: seo?.ogDescription ?? seo?.metaDescription ?? "",
      url: canonicalUrl,
      images: seo?.ogImage ? [{ url: seo.ogImage }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitterTitle ?? seo?.metaTitle ?? industry.name,
      description: seo?.twitterDescription ?? seo?.metaDescription ?? "",
      images: seo?.twitterImage ? [seo.twitterImage] : undefined,
    },
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const industryData: IndustryItem = await getIndustry(slug);
  // console.log("industryData", industryData);
  const allIndustryData: IndustryItem[] = (await getAllIndustry()) || [];

  // Guard: if the primary data fetch failed/returned nothing, don't crash on the rest.
  if (!industryData) {
    return null; // or render a fallback/error/notFound() component here
  }

  const servicesData = {
    title: industryData?.thirdSection?.title,
    subtitle: industryData?.thirdSection?.subTitle,
    items: (industryData?.thirdSection?.items || []).map((item, index) => ({
      id: index.toString(),
      icon: item?.image,
      ...item,
    })),
  };

  const whatYouGetData = {
    title: industryData?.fourthSection?.title,
    subTitle: industryData?.fourthSection?.subTitle,
    description: industryData?.fourthSection?.description,
    data: (industryData?.fourthSection?.items || []).map((item, index) => ({
      id: index + 1,
      dec: item?.description,
      ...item,
    })),
  };

  const howWeDo = {
    subTitle: industryData?.fifthSection?.subTitle,
    title: industryData?.fifthSection?.title,
    description: industryData?.fifthSection?.description,
    items: (industryData?.fifthSection?.items || []).map((item, index) => ({
      ...item,
    })),
  };
 

  const whyChooseData = {
    tag: industryData?.sixthSection?.title,
    title: industryData?.sixthSection?.subTitle,
    description: industryData?.sixthSection?.description,
    items: (industryData?.sixthSection?.items || []).map((item, index) => ({
      id: index + 1,
      value: item?.number,
      label: item?.value,
    })),
  };

  const whoWeWorkData = {
    tag: industryData?.seventhSection?.title,
    title: industryData?.seventhSection?.subTitle,
    items: (industryData?.seventhSection?.items || []).map((item, index) => ({
      id: index + 1,
      label: item?.title,
      icon: item?.image,
      description: item?.description,
    })),
  };

  const industryExperienceResultsData = {
    title: industryData?.eighthSection?.title,
    items: (industryData?.eighthSection?.items || []).map((item) => ({
      id: item?._id, // or String(item.id)
      topTitle: item?.company,
      stat: item?.number,
      statLabel: item?.value,
      title: item?.title,
      description: item?.description,
      accent: item?.isPrimary ? "primary" : "dark",
    })),
  };

  const industriesData = {
    title: industryData?.ninethSection?.title,
    subTitle: industryData?.ninethSection?.subTitle,
    items: allIndustryData
      .filter((item) => item.slug !== industryData?.slug)
      .map((item) => ({
        _id: item?._id,
        title: item?.name,
        icon: item?.ninethSection?.logo,
        iconAlt: item?.ninethSection?.logoAlt,
        slug: item?.slug,
      })),
  };


  const Cta = [
    {
      textred: industryData?.ctaSection?.titleRed,
      text: industryData?.ctaSection?.title,
      subhead: industryData?.ctaSection?.description,
    },
  ];

  const Faq = [
    ...(industryData?.faqSection?.items || []).map((item) => ({
      title: item?.question,
      description: item?.answer,
    })),
  ];

  return (
    <div>
      {industryData.seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: industryData.seo.schema }}
        />
      )}
      {industryData?.firstSection &&
        industryData.firstSection.showSection !== false && (
          <HeroSection data={industryData.firstSection} />
        )}
      {industryData?.secondSection &&
        industryData.secondSection.showSection !== false && (
          <TitleDesc data={industryData.secondSection} />
        )}
      
      {industryData?.thirdSection?.showSection !== false &&
        servicesData.items.length > 0 && (
          <ServicesListSec
            title={servicesData.title}
            description={servicesData.subtitle}
            items={servicesData.items}
          />
        )}
   
      {industryData?.fourthSection?.showSection !== false &&
        whatYouGetData.data.length > 0 && (
          <BlackInfoGrid
            title={whatYouGetData.title}
            subTitle={whatYouGetData.subTitle}
            description={whatYouGetData.description}
            data={whatYouGetData.data}
            bgcolor="bg-black"
            maxchwidth={50}
            colcount={3}
          />
        )}
      {industryData?.fifthSection?.showSection !== false &&
        howWeDo.items.length > 0 && <HowWeDo data={howWeDo} />}
      {industryData?.sixthSection?.showSection !== false &&
        whyChooseData.items.length > 0 && <WhyChoose data={whyChooseData} />}
      {industryData?.seventhSection?.showSection !== false &&
        whoWeWorkData.items.length > 0 && <WhoWeWork data={whoWeWorkData} />}
      {/* {industryExperienceResultsData.items.length > 0 && (
                <ExperienceResult data={industryExperienceResultsData} />
            )} */}
      {industryData?.ninethSection?.showSection !== false &&
        industriesData.items.length > 0 && (
          <IndustriesSec data={industriesData} />
        )}
      {industryData?.ctaSection &&
        industryData.ctaSection.showSection !== false && (
          <GetInTouch
            data={Cta}
            ctabbutton={industryData.ctaSection.buttonText}
            redlast
            buttonLink={industryData.ctaSection.buttonLink}
          />
        )}
      {industryData?.faqSection?.showSection !== false && Faq.length > 0 && (
        <FAQ
          data={Faq}
          initialCount={3}
          defActive="2"
          fullSpace={true}
          page="service"
        />
      )}
    </div>
  );
};

export default page;
