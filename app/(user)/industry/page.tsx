import React from "react";
import HeroSection from "../../components/BannerSectionBC/HeroWithBc";
import Head from "next/head";

import {
  BannerSection,
  Cta,
  IndustriesWeServe,
} from "../../components/industry/data";
import GetInTouch from "@/app/components/PermormanceMarketing/GetInTouch";
import Industydetail from "@/app/components/industry/Industydetail";

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
      "GS Digital delivers tailored digital marketing solutions for industries including construction, eCommerce, B2B, and more. Drive growth with strategies built for your sector.",
    alternates: {
      canonical: "https://www.globalsurf.ae/industry",
    },
    robots: "noindex, nofollow",
    openGraph: {
      title: "Digital Marketing for Key Industries | GS Digital Solutions",
      siteName: "Global Surf Digital",
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
  return (
    <div>
      <Head>
        <meta
          property="og:title"
          content="B2B Digital Marketing Services | Drive Growth & Maximize ROI"
        />
        <meta property="og:site_name" content="Global Surf Digital Media" />
        <meta
          property="og:url"
          content="https://www.globalsurf.ae/industry/b2b-digital-marketing-services"
        />
        <meta
          property="og:description"
          content="Transform your B2B business with tailored digital marketing strategies. From lead generation to branding, we help you optimize conversions and build trust. Partner with Global Surf today!"
        />
      </Head>
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        bannerlogp={false}
        maxchwidth={28}
      />
      <Industydetail
        title={IndustriesWeServe.title}
        data={IndustriesWeServe.data}
      />
      <GetInTouch
        data={Cta}
        redlast={false}
        bgcolor="#F2F2F2"
        ctabbutton={"LET'S GET STARTED TODAY!"}
      />
    </div>
  );
};

export default page;
