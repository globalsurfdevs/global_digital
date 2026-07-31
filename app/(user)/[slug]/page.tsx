import React from "react";
// import Script from "next/script";
import HeroSection from "../../components/BrandingAndPositioning/HeroSection";
import TitleDescSec from "../../components/BrandingAndPositioning/TitleDesc";
import Expertise from "../../components/PermormanceMarketing/Expertise";
import Boost from "../../components/PermormanceMarketing/Boost";
// import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Industries from "../../components/PermormanceMarketing/Industries";
import Results from "../../components/PermormanceMarketing/Results";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import Partner from "../../components/PermormanceMarketing/Partner";
import Testimonials from "../../components/HomePage/Testimonials";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";


import { AreaExpertise } from "../../data/services/performance-marketing/area-of-expertise";
import { boostEngage } from "../../data/services/performance-marketing/boost-engage";
import { OurServices } from "../../data/services/performance-marketing/our-services";
import { Frameworkdata } from "../../data/services/performance-marketing/framework";
import { ResultsData } from "../../data/services/performance-marketing/results";
import { Platformsdata } from "../../data/services/performance-marketing/platforms";
import { partnerData } from "../../data/partnerData";
import { Cta } from "../../data/services/performance-marketing/cta";
import { Faq } from "../../data/services/performance-marketing/faq";
import TitleDesc from "../../components/BrandingAndPositioning/TitleDesc";
import ImgDesc from "../../components/BrandingAndPositioning/ImgDesc";
import GrayParaSec from "../../components/BrandingAndPositioning/GrayParaSec";
import ServicesSec from "../../components/BrandingAndPositioning/ServicesSec";
import { servicesData, whatYouGetData, capabilitiesData, caseStudiesData } from "../../data/services/branding-and-positioning-agency-in-dubai/data";
import ProcessSlider from "@/app/components/BrandingAndPositioning/ProcessSlider";
import BECS from "@/app/components/BrandingAndPositioning/BECS";
import BlackInfoGrid from "@/app/components/BrandingAndPositioning/BlackInfoGrid";
import RelatedCapabilities from "@/app/components/BrandingAndPositioning/RelatedCapabilities";
import RelatedCapabili from "@/app/components/BrandingAndPositioning/RelatedCapabilities";
import ButtonSlider from "@/app/components/BrandingAndPositioning/ButtonSlider";
import WhyChoose from "@/app/components/BrandingAndPositioning/WhyChoose";
import { whyChooseData } from "../../data/services/branding-and-positioning-agency-in-dubai/data";
import CaseSudiesSec from "@/app/components/BrandingAndPositioning/CaseSudiesSec";
import { getService } from "@/app/lib/services.service";
import { data } from "@/app/data/llmWorksData";





// import FaqSchema from "../../components/Schema/FaqSchemad";
// import {
//   PerformanceMarketingSchema,
//   PerformanceMarketingBreadcrumb  } from "../../components/Schema/ServiceSchema";

interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "",
    description:
      "",
    alternates: {
      canonical: "https://www.globalsurf.ae/branding-and-positioning-agency-in-dubai",
    },
  };
}
const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const service = await getService(slug);

  const servicesData = {
    title: service.fifthSection.title,
    subtitle: service.fifthSection.subTitle,
    items: service.fifthSection.items.map((item, index) => (
      {
        id: index,
        icon: item.image,
        ...item
      }
    ))
  };

  const whatYouGetData = {
    title: service.eighthSection.title,
    subTitle: service.eighthSection.subTitle,
    data: service.eighthSection.items.map((item, index) => (
      {
        id: index + 1,
        dec: item.description,
        ...item
      }
    ))
  };

  const capabilitiesData = {
    tag: service.ninethSection.title,
    title: service.ninethSection.subTitle,

    items: service.ninethSection.items.map((item, index) => (
      {
        id: index + 1,
        icon: item.image,
        ...item
      }
    ))
  }

  const whyChooseData = {
    tag: service.eleventhSection.title,
    title: service.eleventhSection.subTitle,
    description: service.eleventhSection.description,
    items: service.eleventhSection.items.map((item, index) => (
      {
        id: index + 1,
        value: item.number,
        label: item.value
      }
    ))
  };

  console.log(service.caseStudySection.items)

  const caseStudiesData = {
    tag: service.caseStudySection.title,
    title: service.caseStudySection.subTitle,
    items: service.caseStudySection.items.map((item,index)=>(
      {
        id:index+1,
        client:item.project.companyName,
        logo:item.project.logo,
        href:`/case-studies/${item.project.slug}`,
        ...item
      }
    ))
    // items: [
    //   {
    //     id: 1,
    //     client: "ASGC Construction",
    //     logo: "assets/images/branding-positioning/logos/logo-1.png",
    //     title: "SEO Overhaul Boosts Visibility and User Engagement",
    //     description:
    //       "Explore The Garden Concept’s SEO strategy for boosting organic traffic and enhancing user experience through a redesigned website.",
    //     href: "/case-studies/asgc-construction",
    //   },
    //   {
    //     id: 2,
    //     client: "ASGC Construction",
    //     logo: "assets/images/branding-positioning/logos/logo-1.png",
    //     title: "SEO Overhaul Boosts Visibility and User Engagement",
    //     description:
    //       "Explore The Garden Concept’s SEO strategy for boosting organic traffic and enhancing user experience through a redesigned website.",
    //     href: "/case-studies/asgc-construction",
    //   },
    //   {
    //     id: 3,
    //     client: "ASGC Construction",
    //     logo: "assets/images/branding-positioning/logos/logo-1.png",
    //     title: "SEO Overhaul Boosts Visibility and User Engagement",
    //     description:
    //       "Explore The Garden Concept’s SEO strategy for boosting organic traffic and enhancing user experience through a redesigned website.",
    //     href: "/case-studies/asgc-construction",
    //   },
    // ]
  };

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
      <HeroSection data={service.firstSection} />
      <TitleDesc data={service.secondSection} />
      <ImgDesc data={service.thirdSection} />
      <GrayParaSec data={service.fourthSection} />
      <ServicesSec title={servicesData.title} description={servicesData.subtitle} items={servicesData.items} />
      <ProcessSlider data={service.sixthSection} />
      <BECS data={service.seventhSection} />
      <BlackInfoGrid title={whatYouGetData.title} subTitle={whatYouGetData.subTitle} data={whatYouGetData.data} bgcolor="bg-black" maxchwidth={50} colcount={4} />
      <RelatedCapabilities data={capabilitiesData} />
      <section className="mb-8 xl:mb-12 2xl:mb-16 3xl:mb-[120px]">
        <ButtonSlider data={service.tenthSection} />
      </section>
      <WhyChoose data={whyChooseData} />
      <CaseSudiesSec data={caseStudiesData} />
      {/* <Expertise title={AreaExpertise.title} data={AreaExpertise.data} />
      <Boost title={boostEngage.title} data={boostEngage.data} />
      <Services title={OurServices.title} data={OurServices.data} />
      <Framework title={Frameworkdata.title} data={Frameworkdata.data} />
      <Industries />
      <Results title={ResultsData.title} data={ResultsData.data} />
      <Platforms title={Platformsdata.title} data={Platformsdata.data} />
      <Partner data={partnerData} /> */}
      <Testimonials />
      <GetInTouch data={Cta} ctabbutton={"LET'S TALK GROWTH"} />
      <FAQ data={Faq} />
    </div>
  );
};

export default page;
