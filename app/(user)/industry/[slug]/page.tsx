import React from "react";
// import Script from "next/script";
import HeroSection from "../../../components/EngineeringInfrastructure/HeroSection";
import FAQ from "../../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../../components/PermormanceMarketing/GetInTouch";
import TitleDesc from "../../../components/EngineeringInfrastructure/TitleDesc";
import ServicesListSec from "../../../components/EngineeringInfrastructure/ServicesListSec";
import BlackInfoGrid from "@/app/components/BrandingAndPositioning/BlackInfoGrid";
import WhyChoose from "@/app/components/BrandingAndPositioning/WhyChoose";
// import { industryData } from "@/app/components/EngineeringInfrastructure/data";
import ExperienceResult from "@/app/components/EngineeringInfrastructure/ExperienceResult";
import IndustriesSec from "@/app/components/EngineeringInfrastructure/IndustriesSec";
import { getIndustry } from "@/app/lib/industry.service";
import { IndustryItem } from "./type";

// import FaqSchema from "../../components/Schema/FaqSchemad";
// import {
//   PerformanceMarketingSchema,
//   PerformanceMarketingBreadcrumb  } from "../../components/Schema/ServiceSchema";


interface PageProps {
    params: Promise<{ slug: string }>;
}



const page = async ({ params }: PageProps) => {
    const { slug } = await params;
    const industryData: IndustryItem = await getIndustry(slug)

    console.log(industryData)


    const servicesData = {
        title: industryData.thirdSection.title,
        subtitle: industryData.thirdSection.subTitle,
        items: industryData.thirdSection.items.map((item, index) => ({
            id: index.toString(),
            icon: item.image,
            ...item,
        })),
    };

    const whatYouGetData = {
        title: industryData.fourthSection.title,
        subTitle: industryData.fourthSection.subTitle,
        data: industryData.fourthSection.items.map((item, index) => ({
            id: index + 1,
            dec: item.description,
            ...item,
        })),
    };

    // const capabilitiesData = {
    //   tag: industryData.ninethSection.title,
    //   title: industryData.ninethSection.subTitle,

    //   items: industryData.ninethSection.items.map((item, index) => ({
    //     id: index + 1,
    //     icon: item.image,
    //     ...item,
    //   })),
    // };

    const whyChooseData = {
        tag: industryData.fifthSection.title,
        title: industryData.fifthSection.subTitle,
        description: industryData.fifthSection.description,
        items: industryData.fifthSection.items.map((item, index) => ({
            id: index + 1,
            value: item.number,
            label: item.value,
        })),
    };

    const industryExperienceResultsData = {
        title: industryData.sixthSection.title,
        items: industryData.sixthSection.items.map((item) => ({
            id: item._id, // or String(item.id)
            topTitle: item.company,
            stat: item.number,
            statLabel: item.value,
            title: item.title,
            description: item.description,
            accent: item.isPrimary ? "primary" : "dark",
        })),
    };

    // const industriesData = {
    //     title: industryData.industries.title,
    //     subTitle: industryData.industries.subTitle,
    //     items: industryData.industries.items.map((item) => ({
    //         _id: item.id,
    //         title: item.title,
    //         icon: item.icon,
    //         iconAlt: item.iconAlt,
    //         slug: item.slug,
    //         active: item.active,
    //     })),
    // };

    // const caseStudiesData = {
    //   tag: industryData.caseStudySection.title,
    //   title: industryData.caseStudySection.subTitle,
    //   items: industryData.caseStudySection.items.map((item, index) => ({
    //     id: index + 1,
    //     client: item.project.companyName,
    //     logo: item.project.logo,
    //     href: `/case-study/${item.project.slug}`,
    //     ...item,
    //   })),
    // };

    const Cta = [
        {
            textred: industryData.ctaSection.titleRed,
            text: industryData.ctaSection.title,
            subhead: industryData.ctaSection.description,
        },
    ];

    const Faq = [
        ...industryData.faqSection.items.map((item) => ({
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
            {/* {industryData.seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: industryData.seo.schema }}
        />
      )} */}
            <HeroSection data={industryData.firstSection} />
            <TitleDesc data={industryData.secondSection} />
            {/* <ImgDesc data={industryData.thirdSection} /> */}
            {/* <GrayParaSec data={industryData.fourthSection} /> */}
            <ServicesListSec
                title={servicesData.title}
                description={servicesData.subtitle}
                items={servicesData.items}
            />
            {/* <ProcessSlider data={industryData.sixthSection} />
      <BECS data={industryData.seventhSection} /> */}
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
        <ButtonSlider data={industryData.tenthSection} />
      </section> */}
            <WhyChoose data={whyChooseData} />
            <ExperienceResult data={industryExperienceResultsData} />
            {/* <IndustriesSec data={industriesData} /> */}
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
                ctabbutton={industryData.ctaSection.buttonText}
                redlast
            />
            <FAQ data={Faq} initialCount={5} defActive="2" fullSpace={true} />
        </div>
    );
};

export default page;
