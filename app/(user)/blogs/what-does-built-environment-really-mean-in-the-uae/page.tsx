import React from "react";
import HeroSection from "../../../components/BlogSocialMedia/HeroSectionDynamic";
import Contentone from "../../../components/BlogSocialMedia/ContentSecBlog3";
import ContentSectionStaic from "../../../components/BlogSocialMedia/ContentSectionStatic"
import SocialShare from "../../../components/BlogSocialMedia/SocialShare";
import { BuiltEnvironmentSchema } from "../../../components/Schema/OfferCatalog";



import {
    BannerSection, videoProductionData, Faq, contentSectionsData, UAEBuiltEnvironmentData,
    videoProductionsocialData, builtEnvironmentData, trendsData, keySectorsData, contractorMarketingData,
    digitalTechnologyData, understandingBuiltEnvironmentData

} from "../../../data/blogdatas/BuiltEnvironmentData";

import ThreeColumnTable from "../../../components/BlogSocialMedia/ThreeColumnTable";
import FAQ from "../../../components/PermormanceMarketing/FAQ";


interface Canonicals {
    canonical: string;
}

type Metadata = {
    title: string;
    description: string;
    alternates: Canonicals;
    robots: string;
    openGraph: {
        title: string;
        site_name: string;
        url: string;
        description: string;
        type?: string; // keep it optional
    };
    images?: { url: string; alt: string }[];
};

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "What Is the Built Environment in UAE? A Practical Guide | Global Surf Digital ",
        description:
            "The built environment in the UAE covers buildings, infrastructure, and smart cities. Learn what it means, what makes the UAE unique, and why it matters for construction businesses. ",
        alternates: {
            canonical: "https://www.globalsurf.ae/blogs/what-does-built-environment-really-mean-in-the-uae",
        },
        robots: "index, follow",
        openGraph: {
            title: "What Is the Built Environment in UAE? A Practical Guide",
            site_name: "Global Surf Digital",
            url: "https://www.globalsurf.ae/blogs/social-media-video-production-tips",
            description:
                "From the Burj Khalifa to Masdar City — what the built environment really means in the UAE, and why construction and development businesses need to understand it",
            type: "article", // keep it optional
        },
        images: [
            {
                url: "https://www.globalsurf.ae/_next/static/media/envblog1.22e3bfb5.jpg",
                alt: "What Is the Built Environment in UAE? A Practical Guide",
            },
        ],

    };
}

const page = () => {
    const videoProductionTitles = ['Authority', 'Scope'];

    return (
        <div className="relative">

            <BuiltEnvironmentSchema />
            <SocialShare />
            <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={27} />
            <Contentone sections={contentSectionsData} />
            <Contentone sections={videoProductionsocialData} />
            <Contentone sections={UAEBuiltEnvironmentData} />
            <Contentone sections={builtEnvironmentData} />
            <Contentone sections={keySectorsData} />
            <Contentone sections={trendsData} />

            <section className="pt-[50px] lg:pt-[140px]" id="navigating-uaes-built-environment-regulations">
                <ThreeColumnTable
                    title="Navigating UAE's built environment regulations"
                    subtitle="The UAE’s regulatory framework varies across emirates but follows a structured approach."
                    data={videoProductionData}
                    columnTitles={videoProductionTitles} // Corrected: passing the array of strings
                    paddingBottom="pb-0"
                    paragraph="Recent regulatory developments include updates to Dubai's Building Code incorporating new sustainability thresholds, expanded Estidama Pearl Rating requirements in Abu Dhabi, and increasing federal-level focus on environmental impact reporting for major infrastructure projects. "
                />
            </section>
            <Contentone sections={digitalTechnologyData} />
            <Contentone sections={contractorMarketingData} />
            <Contentone sections={understandingBuiltEnvironmentData} />

            <section id="faq" className="mt-[50px] lg:mt-[140px]">
                {/* <Contentone sections={contractorMarketingData} /> */}
                <FAQ data={Faq} bgcolor="#F2F2F2" />
            </section>
        </div>
    );
};

export default page;