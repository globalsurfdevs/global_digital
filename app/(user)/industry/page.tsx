import React from "react";
import HeroSection from "../../components/BannerSectionBC/HeroWithBc";
import Head from "next/head";

import { BannerSection,Cta } from "../../components/industry/data";
import IndustryList from "@/app/components/industry/IndustryList";
import GetInTouch from "@/app/components/PermormanceMarketing/GetInTouch";


interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
  robots: string;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "B2B Digital Marketing Services in Dubai | Global Surf Digita ",
    description:
      "Partner with Dubai's top-tier B2B digital marketing agency to attract qualified leads, nurture relationships, and boost long-term growth. Get a quote now!",
    alternates: {
      canonical: "https://www.globalsurf.ae/industry/b2b-digital-marketing-services",
    },
    robots: "noindex, nofollow",
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
      <IndustryList />
      <GetInTouch data={Cta} redlast={false} bgcolor ="#F2F2F2" ctabbutton={"LET'S GET STARTED TODAY!"}  />
    </div>
  );
};

export default page;
