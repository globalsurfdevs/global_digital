import React from "react";
// import Script from "next/script";
import HeroSection from "../../../components/ServicePillar/sections/HeroSection";
import Testimonials from "../../../components/HomePage/Testimonials";
import FAQ from "../../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../../components/PermormanceMarketing/GetInTouch";
// import { Cta } from "../../data/services/performance-marketing/cta";
import { Faq } from "../../../data/services/performance-marketing/faq";
import TitleDesc from "../../../components/BrandingAndPositioning/TitleDesc";
import ImgDesc from "../../../components/BrandingAndPositioning/ImgDesc";
import GrayParaSec from "../../../components/BrandingAndPositioning/GrayParaSec";
import ServicesSec from "../../../components/BrandingAndPositioning/ServicesSec";
import {
  servicesData,
  whatYouGetData,
  capabilitiesData,
  caseStudiesData,
} from "../../../data/services/branding-and-positioning-agency-in-dubai/data";
import ProcessSlider from "@/app/components/BrandingAndPositioning/ProcessSlider";
import BECS, { BECSData } from "@/app/components/BrandingAndPositioning/BECS";
import BlackInfoGrid from "@/app/components/BrandingAndPositioning/BlackInfoGrid";
import RelatedCapabilities from "@/app/components/BrandingAndPositioning/RelatedCapabilities";
import ButtonSlider from "@/app/components/BrandingAndPositioning/ButtonSlider";
import WhyChoose, {
  WhyChooseData,
} from "@/app/components/BrandingAndPositioning/WhyChoose";
import { whyChooseData } from "../../../data/services/branding-and-positioning-agency-in-dubai/data";
import CaseSudiesSec from "@/app/components/BrandingAndPositioning/CaseSudiesSec";
import { getService } from "@/app/lib/services.service";
import { getTestimonials } from "@/app/lib/testimonials";
import { Metadata } from "next";
import WorkIn from "@/app/components/common/WorkIn";
import CaseStudyNew from "@/app/components/BrandingAndPositioning/CaseStudyNew";
import { assets } from "@/public/assets/assets";
import { notFound } from "next/navigation";
import { data } from "@/app/components/ServicePillar/data";
import Approach from "@/app/components/ServicePillar/sections/Approach";
import WhyMatters from "@/app/components/ServicePillar/sections/WhyMatters";
import InfoGrid, {
  FrameworkItem,
} from "@/app/components/ServicePillar/sections/Expertise";
import WhatsIncluded from "@/app/components/ServicePillar/sections/WhatsIncluded";
import Tours from "@/app/components/HomePage/Tours";
import { getIndustries } from "@/app/lib/industries.service";
import {
  getIndustriesData,
  getServicePillar,
} from "@/app/lib/servicePillar.service";

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

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const { slug } = await params;
//   const service: ServiceItem | null = await getService(slug);

//   if (!service) {
//     return {
//       title: "Not Found",
//       description: "",
//       alternates: { canonical: "https://www.globalsurf.ae/" },
//     };
//   }

//   const seo = service.seo;
//   const canonicalUrl = `https://www.globalsurf.ae/${service.slug}`;

//   return {
//     title: seo?.metaTitle ?? service.name,
//     description: seo?.metaDescription ?? "",
//     robots: {
//       index: true,
//       follow: true,
//       nocache: true,
//       googleBot: {
//         index: true,
//         follow: true,
//       },
//     },
//     alternates: {
//       canonical: canonicalUrl,
//     },
//     openGraph: {
//       title: seo?.ogTitle ?? seo?.metaTitle ?? service.name,
//       description: seo?.ogDescription ?? seo?.metaDescription ?? "",
//       url: canonicalUrl,
//       images: seo?.ogImage ? [{ url: seo.ogImage }] : undefined,
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: seo?.twitterTitle ?? seo?.metaTitle ?? service.name,
//       description: seo?.twitterDescription ?? seo?.metaDescription ?? "",
//       images: seo?.twitterImage ? [seo.twitterImage] : undefined,
//     },
//   };
// }
import { SeoFormValues } from "@/app/types/seo";
import { getAllIndustry } from "@/app/lib/industry.service";
import { userRoutes } from "@/app/const/routes/user.routes";

export type ServicePillarData = {
  _id: string;
  name: string;
  slug: string;
  seo: SeoFormValues;

  firstSection: {
    image: string;
    imageAlt: string;
    title: string;
    description: string;
  };

  secondSection: {
    title: string;
    description: string;
  };

  thirdSection: {
    title: string;
    subTitle: string;
    description: string;
    image: string;
    imageAlt: string;
    buttonText: string;
    buttonLink: string;
  };

  fourthSection: {
    title: string;
    subTitle: string;
    description: string;
  };

  fifthSection: {
    title: string;
    subTitle: string;
    description: string;
    items: {
      _id: string;
      image: string;
      imageAlt: string;
      title: string;
      description: string;
      link?: string;
    }[];
  };

  sixthSection: BECSData;

  seventhSection: {
    title: string;
    subTitle: string;
    items: {
      _id: string;
      title: string;
      image: string;
      imageAlt: string;
      link: string;
    }[];
  };

  eighthSection: {
    title: string;
    subTitle: string;
    items: {
      _id: string;
      title: string;
      description: string;
    }[];
  };
  ninthSection: {
    title: string;
    serviceIndustries: {
      _id: string;
      image: string;
      imageAlt: string;
      title: string;
      page: string | null;
    }[];
  };
  tenthSection: {
    tag: string;
    title: string;
    description: string;
    items: {
      id: number;
      value: string;
      label: string;
    }[];
  };

  eleventhSection: {
    title: string;
    description: string;
    items: {
      id: string;
      title: string;
      description: string;
      image: string;
      imageAlt: string;
      link: string;
    }[];
  };

  ctaSection: {
    titleRed: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };

  faqSection: {
    title: string;
    data: {
      id: string;
      title: string;
      description: string;
    }[];
  };
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data: ServicePillarData | null = await getServicePillar(slug);

  if (!data) {
    return {
      title: "Not Found",
      description: "",
      alternates: { canonical: "https://www.globalsurf.ae/" },
    };
  }

  const seo = data.seo;
  const canonicalUrl = `https://www.globalsurf.ae${userRoutes.servicePillar.detail(data.slug)}`;

  return {
    title: seo?.metaTitle ?? data.name,
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
      title: seo?.ogTitle ?? seo?.metaTitle ?? data.name,
      description: seo?.ogDescription ?? seo?.metaDescription ?? "",
      url: canonicalUrl,
      images: seo?.ogImage ? [{ url: seo.ogImage }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitterTitle ?? seo?.metaTitle ?? data.name,
      description: seo?.twitterDescription ?? seo?.metaDescription ?? "",
      images: seo?.twitterImage ? [seo.twitterImage] : undefined,
    },
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const testimonials = await getTestimonials();
  const data: ServicePillarData | null = await getServicePillar(slug);

  // console.log('industires :',data);
  if (!data) {
    notFound();
  }

  const Cta = [
    {
      textred: data.ctaSection.titleRed,
      text: data.ctaSection.title,
      subhead: data.ctaSection.description,
    },
  ];

  //   const Cta = [
  //   {
  //     textred: data.ctaSection.titleRed,
  //     text: data.ctaSection.title,
  //     subhead: data.ctaSection.description,
  //   },
  // ];
  //  const industries = await getIndustries();

  //   const { slug } = await params;
  //   const service: ServiceItem | null = await getService(slug);

  //   const servicesData = {
  //     title: service?.fifthSection?.title,
  //     subtitle: service?.fifthSection?.subTitle,
  //     items: service?.fifthSection?.items.map((item, index) => ({
  //       id: index.toString(),
  //       icon: item.image,
  //       ...item,
  //     })),
  //   };

  // const whatYouGetData = {
  //   title: service?.eighthSection?.title,
  //   subTitle: service?.eighthSection?.subTitle,
  //   data: service?.eighthSection?.items.map((item, index) => ({
  //     id: index + 1,
  //     dec: item.description,
  //     ...item,
  //   })),
  // };

  // const capabilitiesData = {
  //   tag: service?.ninethSection?.title,
  //   title: service?.ninethSection?.subTitle,

  //   items: service?.ninethSection?.items.map((item, index) => ({
  //     id: index + 1,
  //     icon: item.image,
  //     ...item,
  //   })),
  // };

  // const whyChooseData = {
  //   tag: service?.eleventhSection?.title,
  //   title: service?.eleventhSection?.subTitle,
  //   description: service?.eleventhSection?.description,
  //   items: service?.eleventhSection?.items.map((item, index) => ({
  //     id: index + 1,
  //     value: item.number,
  //     label: item.value,
  //   })),
  // };

  // const caseStudiesData = {
  //   tag: service?.caseStudySection?.title,
  //   title: service?.caseStudySection?.subTitle,
  //   items: service?.caseStudySection?.items.map((item, index) => ({
  //     id: index + 1,
  //     client: item.project.companyName,
  //     logo: item.project.logo,
  //     href: `/case-study/${item.project.slug}`,
  //     ...item,
  //   })),
  // };

  // const Cta = [
  //   {
  //     textred: service?.ctaSection?.titleRed,
  //     text: service?.ctaSection?.title,
  //     subhead: service?.ctaSection?.description,
  //   },
  // ];

  // const Faq = [
  //   ...service?.faqSection?.items.map((item) => ({
  //     title: item.question,
  //     description: item.answer,
  //   })),
  // ];

  // const workSvgsData = [
  //   {
  //     icon: "../assets/services/wdd-custom-web-development/tech1.svg",
  //     alt: "React js",
  //     text: "React js",
  //     width: "26",
  //     height: "26",
  //   },
  //   {
  //     icon: "../assets/services/wdd-custom-web-development/tech2.svg",
  //     alt: "icNext.json",
  //     text: "Next.js",
  //     width: "21",
  //     height: "28",
  //   },
  //   {
  //     icon: "../assets/services/wdd-custom-web-development/tech3.svg",
  //     alt: "Angular.js",
  //     text: "Angular.js",
  //     width: "36",
  //     height: "28",
  //   },
  //   {
  //     icon: "../assets/services/wdd-custom-web-development/tech4.svg",
  //     alt: "vue.js",
  //     text: "vue.js",
  //     width: "28",
  //     height: "28",
  //   },
  //   {
  //     icon: "../assets/services/wdd-custom-web-development/tech5.svg",
  //     alt: "Python",
  //     text: "Python",
  //     width: "27",
  //     height: "28",
  //   },
  //   {
  //     icon: "../assets/services/wdd-custom-web-development/tech6.svg",
  //     alt: "node.js",
  //     text: "node.js",
  //     width: "28",
  //     height: "28",
  //   },
  //   {
  //     icon: "../assets/services/wdd-custom-web-development/tech7.svg",
  //     alt: "icon",
  //     text: "php",
  //     width: "28",
  //     height: "28",
  //   },
  //   {
  //     icon: "../assets/services/wdd-custom-web-development/tech8.svg",
  //     alt: "icon",
  //     text: "Laravel",
  //     width: "28",
  //     height: "28",
  //   },
  //   {
  //     icon: "../assets/services/wdd-custom-web-development/tech9.svg",
  //     alt: "icon",
  //     text: "Mongo db",
  //     width: "28",
  //     height: "28",
  //   },
  //   {
  //     icon: "../assets/services/wdd-custom-web-development/tech10.svg",
  //     alt: "icon",
  //     text: "mysql",
  //     width: "28",
  //     height: "28",
  //   },
  //   {
  //     icon: "../assets/services/wdd-custom-web-development/tech11.svg",
  //     alt: "icon",
  //     text: "Strapi",
  //     width: "28",
  //     height: "28",
  //   },
  //   {
  //     icon: "../assets/services/wdd-custom-web-development/tech12.svg",
  //     alt: "icon",
  //     text: "WordPress",
  //     width: "28",
  //     height: "28",
  //   },
  //   {
  //     icon: "../assets/services/wdd-custom-web-development/tech13.svg",
  //     alt: "icon",
  //     text: "Drupal",
  //     width: "28",
  //     height: "28",
  //   },
  //   {
  //     icon: "../assets/services/wdd-custom-web-development/tech14.svg",
  //     alt: "icon",
  //     text: "Joomla",
  //     width: "28",
  //     height: "28",
  //   },
  // ];

  const infoGridData: FrameworkItem[] = data.fifthSection.items.map(
    (item, index) => ({
      id: index,
      icon: item.image,
      title: item.title,
      dec: item.description,
    }),
  );

  const relatedServiceData = data.eleventhSection.items.map((data) => {
    return {
      title: data.title,
      description: data.description,
      id: data.id,
      icon: data.image,
      link: userRoutes.servicePillar.detail(data.link),
    };
  });
// console.log("related service :",relatedServiceData)
  return (
    <div>
      {data.seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: data.seo.schema }}
        />
      )}
      <HeroSection data={data.firstSection} />
      <TitleDesc data={data.secondSection} />
      <Approach data={data.thirdSection} />
      <WhyMatters data={data.fourthSection} />
      <InfoGrid
        title={data.fifthSection.title}
        subTitle={data.fifthSection.subTitle}
        description={data.fifthSection.description}
        colcount={4}
        data={infoGridData}
      />
      <BECS data={data.sixthSection} page="service-pillar" />
      {data.seventhSection.items.length&&(

      <WhatsIncluded
        title={data.seventhSection.title}
        description={data.seventhSection.subTitle}
        items={data.seventhSection.items}
      />
      )}
      {data.eighthSection.items.length > 0 && (
        <ProcessSlider data={data.eighthSection} variant="dark" />
      )}

      <section className="py-120">
        <ButtonSlider data={data.ninthSection} />
      </section>

      <WhyChoose data={data.tenthSection} page="service-pillar" />
      {/*<GrayParaSec data={service.fourthSection} />
      
      {slug === "web-design-and-development-v2" && (
        <section className="bg-black  pb-[50px]   pt-[50px] text-white lg:pb-[200px] lg:pt-[140px]">
          <WorkIn workSvgsData={workSvgsData} page="service" />
        </section>
      )}
      
      
      <BlackInfoGrid
        title={whatYouGetData.title}
        subTitle={whatYouGetData.subTitle}
        data={whatYouGetData.data}
        bgcolor="bg-black"
        maxchwidth={50}
        colcount={4}
        page="service"
      />
      {capabilitiesData.items.length > 0 && (
        <RelatedCapabilities data={capabilitiesData} />
      )}
      <section
        className={`mb-8 xl:mb-12 2xl:mb-16 3xl:mb-[120px] ${capabilitiesData.items.length < 1 ? "mt-8 xl:mt-12 2xl:mt-16 3xl:mt-[120px]" : ""} `}
      >
        
      </section>
      <WhyChoose data={whyChooseData} page="service" /> */}
      {/* {caseStudiesData.items.length > 0 && (
        <CaseSudiesSec data={caseStudiesData} />
      )} */}
      {/* {Clientsformsdata.length > 0 && <CaseStudyNew Clientsformsdata={Clientsformsdata} title1={service.caseStudySection?.title} />} */}
      <Tours title="Featured works" showViewAll={false} />
      <Testimonials
        topTitle="Testimonials"
        data={testimonials}
        bottomText={false}
        reviews={false}
        page="service"
      />
      <ServicesSec
        description={data.eleventhSection.description}
        title={data.eleventhSection.title}
        items={relatedServiceData}
      />
      <GetInTouch
        data={Cta}
        ctabbutton={data.ctaSection.buttonText}
        redlast
        buttonLink={data.ctaSection.buttonLink}
        page="service"
      />
      <FAQ
        data={data.faqSection.data}
        initialCount={data.faqSection.data.length}
        page="service"
        title={data.faqSection.title}
      />
    </div>
  );
};

export default page;
