import React from "react";
import HeroSection from "../../components/IndustryNew/sections/HeroSection";
import Head from "next/head";


import Industydetail from "@/app/components/industry/Industydetail";
import { data } from "@/app/components/IndustryNew/data";
import OurApproach from "@/app/components/IndustryNew/sections/OurApproach";
import SectorsWeWorkWith from "@/app/components/IndustryNew/sections/Sectors";
import Results from "@/app/components/IndustryNew/sections/Results";
import Service from "@/app/components/IndustryNew/sections/Services";
import { assets } from "@/public/assets/assets";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";

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
        siteName: string;
        url: string;
        description: string;
        type: string;
        images?: {
            url: string;
            width: number;
            height: number;
            alt: string;
        }[];
    };
};

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: " Industry Specific Marketing | Industries We Serve | Global Surf ",
        description:
            "GS Digital provides tailored digital marketing solutions for industries like construction, e-commerce, B2B, and more. Helping with strategies that fit your sector!",
        alternates: {
            canonical: "https://www.globalsurf.ae/industry",
        },
        robots: "index, follow",
        openGraph: {
            title: "Digital Marketing for Key Industries | GS Digital Solutions",
            siteName: "GS Digital",
            url: "https://www.globalsurf.ae/industry",
            description:
                "From construction to eCommerce, GS Digital crafts industry-specific marketing strategies that fuel growth and performance. Explore solutions tailored to your sector.",
            type: "website",
            images: [
                {
                    url: "https://www.globalsurf.ae/_next/static/media/inbanner.7bb1aebc.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Industry-Specific Marketing Services Dubai",
                },
            ],
        },
    };
}
const page = () => {

    const Clientsformsdata = [
        {
            id: 1,
            image: assets.slider1,
            title: "How Assent steel achieved 2X traffic growth ",
            btntext: "Read the Full Case Study",
            btnurl: "https://www.globalsurf.ae/case-study/assent-steel",
        },
        {
            id: 2,
            image: assets.slider2,
            title: "Strategic Website Revamp for Innovo group",
            btntext: "Check portfolio page",
            btnurl: "https://www.globalsurf.ae/portfolio/innovo-group",
        },
        {
            id: 3,
            image: assets.slider3,
            title: "Digital Launchpad: New Website for Shoba Construction",
            btntext: "Check portfolio page",
            btnurl: "https://www.globalsurf.ae/portfolio/sobha-constructions",
        },
        {
            id: 4,
            image: assets.slider4,
            title: "Full-Funnel Growth: Digital Marketing for ASGC Group",
            btntext: "Check portfolio page",
            btnurl: "https://www.globalsurf.ae/portfolio/asgc",
        },
        {
            id: 5,
            image: assets.slider5,
            title: "SEO-Driven Growth: 90% Organic Traffic Boost for BEC Arabia",
            btntext: "Check portfolio page",
            btnurl: "https://www.globalsurf.ae/portfolio/bec-arabia",
        },
    ];

    const servicesData = {
        title: "Services",
        subtitle: "CONNECTED SOLUTIONS",
        items: [
            {
                id: "1",
                icon: "/images/industry_new/service1.svg",
                title: "Digital Marketing",
                description: "SEO, performance marketing, social, and content — all under one accountable plan.",
                link: "#"
            },
            {
                id: "2",
                icon: "/images/industry_new/service2.svg",
                title: "Web & App Development ",
                description: "Custom websites, e-commerce, mobile apps, and web applications.",
                link: "#"
            },
            {
                id: "3",
                icon: "/images/industry_new/service3.svg",
                title: "AI, Data & Intelligence",
                description: "Strategy consulting, analytics, CRO, and marketing automation.",
                link: "#"
            },
            {
                id: "4",
                icon: "/images/industry_new/service4.svg",
                title: "Branding & Content Production",
                description: "Brand identity, copywriting, photography, and video.",
                link: "#"
            }
        ]
    };

    const Faq = [
        {
            title:"What if my sector isn't one of the seven listed? ",
            description:"One agency, seven sectors — the same 50+ specialists work across all of them, but the strategy, channels, and creative are built specifically around how your sector's buyers actually behave, not a copy-paste of what worked for a different industry."
        },
        {
            title:"Do I get a dedicated team for my sector, or the same generalist team as everyone else?",
            description:"One agency, seven sectors — the same 50+ specialists work across all of them, but the strategy, channels, and creative are built specifically around how your sector's buyers actually behave, not a copy-paste of what worked for a different industry."
        }
    ];

      const Cta = [
    {
      textred: "Tell us about your business",
      text: "and we'll show you how we'd approach it.",
      subhead: "",
    },
  ];

    return (
        <div>
            <Head>
                <meta
                    property="og:title"
                    content="B2B Digital Marketing Services | Drive Growth & Maximize ROI"
                />
                <meta property="og:site_name" content="GS Digital Media" />
                <meta
                    property="og:url"
                    content="https://www.globalsurf.ae/industry/b2b-digital-marketing-services"
                />
                <meta
                    property="og:description"
                    content="Transform your B2B business with tailored digital marketing strategies. From lead generation to branding, we help you optimize conversions and build trust. Partner with Global Surf today!"
                />
            </Head>
            <HeroSection data={data.firstSection} />
            <OurApproach data={data.secondSection} />
            <SectorsWeWorkWith data={data.thirdSection} />
            <Results Clientsformsdata={Clientsformsdata} title1="Proof, not just a promise." title="RESULTS BY SECTOR" />
            <Service title={servicesData.title} description={servicesData.subtitle} items={servicesData.items} />
            <GetInTouch
                data={Cta}
                ctabbutton={"Start the conversation"}
                redfirst
                page="service"
            />
            <FAQ data={Faq} initialCount={3} page="service" title={"FAQ"} />
        </div>
    );
};

export default page;
