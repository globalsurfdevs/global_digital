import HeroSection from "../../BrandingAndPositioning/HeroSection";
import Testimonials from "../../HomePage/Testimonials";
import FAQ from "../../PermormanceMarketing/FAQ";
import GetInTouch from "../../PermormanceMarketing/GetInTouch";
import { getService } from "../../../lib/services.service";
import { getTestimonials } from "../../../lib/testimonials";
import { notFound } from "next/navigation";
// import type { Service,  } from "./serviceDetails.type"; 
import TitleDesc from "../../BrandingAndPositioning/TitleDesc";
import ImgDesc from "../../BrandingAndPositioning/ImgDesc";
import GrayParaSec from "../../BrandingAndPositioning/GrayParaSec";
import ProcessSlider from "../../BrandingAndPositioning/ProcessSlider";
import BlackInfoGrid from "../../BrandingAndPositioning/BlackInfoGrid";
import BECS from "../../BrandingAndPositioning/BECS";
// import WorkIn from "../../HomePage/WorkIn";
import ServicesSec from "../../BrandingAndPositioning/ServicesSec";
import ButtonSlider from "../../BrandingAndPositioning/ButtonSlider";
import WhyChoose from "../../BrandingAndPositioning/WhyChoose";


import type { ServiceItem } from "./serviceDetails.type";
import WorkIn from "../../common/WorkIn";
import { SubServiceData } from "@/app/(user)/[slug]/type";

interface Props {
  service: ServiceItem|SubServiceData;
  slug: string;
}

const ServiceDetail = async ({ service, slug }: Props) => {
  const testimonials = await getTestimonials();

  const servicesData = {
    title: service?.fifthSection?.title,
    subtitle: service?.fifthSection?.subTitle,
    items: service?.fifthSection?.items.map((item, index) => ({
      id: index.toString(),
      icon: item.image,
      ...item,
    })),
  };

  const whatYouGetData = {
    title: service?.eighthSection?.title,
    subTitle: service?.eighthSection?.subTitle,
    data: service?.eighthSection?.items.map((item, index) => ({
      id: index + 1,
      dec: item.description,
      ...item,
    })),
  };

  const capabilitiesData = {
    tag: service?.ninethSection?.title,
    title: service?.ninethSection?.subTitle,

    items: service?.ninethSection?.items.map((item, index) => ({
      id: index + 1,
      icon: item.image,
      ...item,
    })),
  };

  const whyChooseData = {
    tag: service?.eleventhSection?.title,
    title: service?.eleventhSection?.subTitle,
    description: service?.eleventhSection?.description,
    items: service?.eleventhSection?.items.map((item, index) => ({
      id: index + 1,
      value: item.number,
      label: item.value,
    })),
  };

  const caseStudiesData = {
    tag: service?.caseStudySection?.title,
    title: service?.caseStudySection?.subTitle,
    items: service?.caseStudySection?.items.map((item, index) => ({
      id: index + 1,
      client: item.project.companyName,
      logo: item.project.logo,
      href: `/case-study/${item.project.slug}`,
      ...item,
    })),
  };

  const Cta = [
    {
      textred: service?.ctaSection?.titleRed,
      text: service?.ctaSection?.title,
      subhead: service?.ctaSection?.description,
    },
  ];

  const Faq = [
    ...service?.faqSection?.items.map((item) => ({
      title: item.question,
      description: item.answer,
    })),
  ];

  const workSvgsData = [
    {
      icon: "../assets/services/wdd-custom-web-development/tech1.svg",
      alt: "React js",
      text: "React js",
      width: "26",
      height: "26",
    },
    {
      icon: "../assets/services/wdd-custom-web-development/tech2.svg",
      alt: "icNext.json",
      text: "Next.js",
      width: "21",
      height: "28",
    },
    {
      icon: "../assets/services/wdd-custom-web-development/tech3.svg",
      alt: "Angular.js",
      text: "Angular.js",
      width: "36",
      height: "28",
    },
    {
      icon: "../assets/services/wdd-custom-web-development/tech4.svg",
      alt: "vue.js",
      text: "vue.js",
      width: "28",
      height: "28",
    },
    {
      icon: "../assets/services/wdd-custom-web-development/tech5.svg",
      alt: "Python",
      text: "Python",
      width: "27",
      height: "28",
    },
    {
      icon: "../assets/services/wdd-custom-web-development/tech6.svg",
      alt: "node.js",
      text: "node.js",
      width: "28",
      height: "28",
    },
    {
      icon: "../assets/services/wdd-custom-web-development/tech7.svg",
      alt: "icon",
      text: "php",
      width: "28",
      height: "28",
    },
    {
      icon: "../assets/services/wdd-custom-web-development/tech8.svg",
      alt: "icon",
      text: "Laravel",
      width: "28",
      height: "28",
    },
    {
      icon: "../assets/services/wdd-custom-web-development/tech9.svg",
      alt: "icon",
      text: "Mongo db",
      width: "28",
      height: "28",
    },
    {
      icon: "../assets/services/wdd-custom-web-development/tech10.svg",
      alt: "icon",
      text: "mysql",
      width: "28",
      height: "28",
    },
    {
      icon: "../assets/services/wdd-custom-web-development/tech11.svg",
      alt: "icon",
      text: "Strapi",
      width: "28",
      height: "28",
    },
    {
      icon: "../assets/services/wdd-custom-web-development/tech12.svg",
      alt: "icon",
      text: "WordPress",
      width: "28",
      height: "28",
    },
    {
      icon: "../assets/services/wdd-custom-web-development/tech13.svg",
      alt: "icon",
      text: "Drupal",
      width: "28",
      height: "28",
    },
    {
      icon: "../assets/services/wdd-custom-web-development/tech14.svg",
      alt: "icon",
      text: "Joomla",
      width: "28",
      height: "28",
    },
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
      {slug === "web-design-development-agency-dubai" && (
        <section className="bg-black  pb-[50px]   pt-[50px] text-white lg:pb-[200px] lg:pt-[140px]">
          <WorkIn workSvgsData={workSvgsData} page="service" />
        </section>
      )}
      <ProcessSlider data={service.sixthSection} />
      <BECS data={service.seventhSection} />
      <BlackInfoGrid
        title={whatYouGetData.title}
        subTitle={whatYouGetData.subTitle}
        data={whatYouGetData.data}
        bgcolor="bg-black"
        maxchwidth={50}
        colcount={4}
        page="service"
      />
      {/* {capabilitiesData.items.length > 0 && (
        <RelatedCapabilities data={capabilitiesData} />
      )} */}
       {/* ${capabilitiesData.items.length < 1 ? "mt-8 xl:mt-12 2xl:mt-16 3xl:mt-[120px]" : "mt-8 xl:mt-12 2xl:mt-16 3xl:mt-[120px]"} */}
      <section
        className={`mb-8 xl:mb-12 2xl:mb-16 3xl:mb-[120px] mt-8 xl:mt-12 2xl:mt-16 3xl:mt-[120px]`}
      >
        <ButtonSlider data={service.tenthSection} />
      </section>
      <WhyChoose data={whyChooseData} page="service" />
      {/* {caseStudiesData.items.length > 0 && (
        <CaseSudiesSec data={caseStudiesData} />
      )} */}
      {/* {Clientsformsdata.length > 0 && <CaseStudyNew Clientsformsdata={Clientsformsdata} title1={service.caseStudySection?.title} />} */}
      <Testimonials
        topTitle="Testimonials"
        data={testimonials.testimonialSection}
        bottomText={false}
        reviews={false}
        page="service"
      />
      <GetInTouch
        data={Cta}
        ctabbutton={service.ctaSection.buttonText}
        redlast
        page="service"
      />
      <FAQ
        data={Faq}
        initialCount={3}
        page="service"
        title={service.faqSection?.title}
      />
    </div>
  );
};

export default ServiceDetail;
