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
import { getAllIndustry, getIndustry } from "@/app/lib/industry.service";
import { IndustryItem } from "./type";
import { Metadata } from "next";
import WhoWeWork from "@/app/components/BrandingAndPositioning/WhoWeWork";
import HowWeDo from "@/app/components/EngineeringInfrastructure/HowWeDo";
import { serviceData } from "@/app/components/EngineeringInfrastructure/data";

// import FaqSchema from "../../components/Schema/FaqSchemad";
// import {
//   PerformanceMarketingSchema,
//   PerformanceMarketingBreadcrumb  } from "../../components/Schema/ServiceSchema";


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
    const canonicalUrl = `https://www.globalsurf.ae/industry/${industry.slug}`;

    return {
        title: seo?.metaTitle ?? industry.name,
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

    // const capabilitiesData = {
    //   tag: industryData.ninethSection.title,
    //   title: industryData.ninethSection.subTitle,

    //   items: industryData.ninethSection.items.map((item, index) => ({
    //     id: index + 1,
    //     icon: item.image,
    //     ...item,
    //   })),
    // };

    const howWeDo = {
        subTitle:
            industryData?.fifthSection?.subTitle,
        title: industryData?.fifthSection?.title,
        description:
            industryData?.fifthSection?.description,
        items: (industryData?.fifthSection?.items || []).map((item, index) => ({
            ...item,
        })),
    };
    // items: [
    //     {
    //         _id: "1",
    //         title: "Search visibility for supplier discovery",
    //         description:
    //             "Most B2B buying journeys begin with a capability-specific search. Procurement teams look for manufacturers based on products, certifications, production expertise, and location. Ranking for these searches requires technical SEO built around the terminology and buying signals that manufacturing buyers actually use.",
    //         image: "assets/icons/how-we-do/i-1.svg",
    //         imageAlt: "Search visibility icon",
    //     },
    //     {
    //         _id: "2",
    //         title: "Technical content that builds supplier credibility",
    //         description:
    //             "Being found is only the first step. Buyers also need evidence that you can meet their requirements. Technical content covering certifications, manufacturing processes, production capacity, quality standards, export experience, and project case studies helps establish credibility before the first enquiry.",
    //         image: "assets/icons/how-we-do/i-2.svg",
    //         imageAlt: "Technical content icon",
    //     },
    //     {
    //         _id: "3",
    //         title: "Digital engagement with decision makers",
    //         description:
    //             "Procurement managers and distribution partners continue their research across professional channels such as LinkedIn. Consistent visibility through industry content, targeted campaigns, and thought leadership keeps your business in front of decision makers throughout lengthy B2B buying cycles.",
    //         image: "assets/icons/how-we-do/i-3.svg",
    //         imageAlt: "Digital engagement icon",
    //     },
    //     {
    //         _id: "4",
    //         title: "Export market visibility",
    //         description:
    //             "For manufacturers serving regional and international markets, digital visibility must extend beyond the UAE. Multilingual content, country specific search optimisation, and information addressing logistics, compliance, and export capability help attract qualified buyers from target markets across the GCC and beyond.",
    //         image: "assets/icons/how-we-do/i-4.svg",
    //         imageAlt: "Export market visibility icon",
    //     },
    // ],

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
        items: allIndustryData.filter((item)=>item.slug!==industryData?.slug).map((item) => ({
            _id: item?._id,
            title: item?.name,
            icon: item?.ninethSection?.logo,
            iconAlt: item?.ninethSection?.logoAlt,
            slug: item?.slug,
        })),
    };

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
            {industryData.seo?.schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: industryData.seo.schema }}
                />
            )}
            {industryData?.firstSection && <HeroSection data={industryData.firstSection} />}
            {industryData?.secondSection && <TitleDesc data={industryData.secondSection} />}
            {/* <ImgDesc data={industryData.thirdSection} /> */}
            {/* <GrayParaSec data={industryData.fourthSection} /> */}
            {servicesData.items.length > 0 && (
                <ServicesListSec
                    title={servicesData.title}
                    description={servicesData.subtitle}
                    items={servicesData.items}
                />
            )}
            {/* <ProcessSlider data={industryData.sixthSection} />
      <BECS data={industryData.seventhSection} /> */}
            {whatYouGetData.data.length > 0 && (
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
            {/* {capabilitiesData.items.length > 0 && <RelatedCapabilities data={capabilitiesData} />}
      <section className={`mb-8 xl:mb-12 2xl:mb-16 3xl:mb-[120px] ${capabilitiesData.items.length < 1 ? "mt-8 xl:mt-12 2xl:mt-16 3xl:mt-[120px]" : ""} `}>
        <ButtonSlider data={industryData.tenthSection} />
      </section> */}
            {howWeDo.items.length > 0 && <HowWeDo data={howWeDo} />}
            {whyChooseData.items.length > 0 && <WhyChoose data={whyChooseData} />}
            {whoWeWorkData.items.length > 0 && <WhoWeWork data={whoWeWorkData} />}
            {industryExperienceResultsData.items.length > 0 && (
                <ExperienceResult data={industryExperienceResultsData} />
            )}
            {industriesData.items.length > 0 && <IndustriesSec data={industriesData} />}
            {/* {caseStudiesData.items.length > 0 && (
        <CaseSudiesSec data={caseStudiesData} />
      )} */}
            {/* <Testimonials
        topTitle="Testimonials"
        data={testimonials.testimonialSection}
        bottomText={false}
        reviews={false}
      /> */}
            {industryData?.ctaSection && (
                <GetInTouch
                    data={Cta}
                    ctabbutton={industryData.ctaSection.buttonText}
                    redlast
                />
            )}
            {Faq.length > 0 && (
                <FAQ data={Faq} initialCount={3} defActive="2" fullSpace={true} />
            )}
        </div>
    );
};

export default page;