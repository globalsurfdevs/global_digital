import React from "react";
import DmHeroSection from "../../components/DigitalMarketingAudit/DmHeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Testimonials from "../../components/HomePage/Testimonials";
import RequestFreeAudit from "../../components/DigitalMarketingAudit/RequestFreeAudit";

import { BannerSection } from "../../data/services/digital-marketing-audit/herosection";
import { boostEngage } from "../../data/services/digital-marketing-audit/boost-engage";
import { OurServices } from "../../data/services/digital-marketing-audit/our-services";
import { Frameworkdata, IndustriesWeServe,tpcontent } from "../../data/services/digital-marketing-audit/framework";

import AuditSecTwo from "@/app/components/DigitalMarketingAudit/AuditSecTwo";
import Expertiseheimg from "@/app/components/EcomIndustry/Expertise";
import Expertise from "@/app/components/PermormanceMarketing/Expertise";


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
    title: "Free Digital Marketing Audit | Global Surf Digital",
    description:
      "Get a professional audit of your digital marketing strategy. Identify growth opportunities, reduce wasted ad spend, and boost your ROI today.",
    alternates: {
      canonical: "https://www.globalsurf.ae/free-digital-marketing-audit",
    },
    robots: "noindex, nofollow",
    openGraph: {
      title: "Free Digital Marketing Audit | Global Surf Digital",
      siteName: "Global Surf Digital",
      url: "https://www.globalsurf.ae/free-digital-marketing-audit",
      description:
        "Get a professional audit of your digital marketing strategy. Identify growth opportunities, reduce wasted ad spend, and boost your ROI today.",
      type: "website",
      images: [
        {
          url: "https://www.globalsurf.ae/_next/static/media/bannerse.13ce0087.jpg",
          width: 1200,
          height: 630,
          alt: "Digital Marketing Audit",
        },
      ],
    },
  };
}
const page = () => {
  return (
    <div>
      <style>
        {`
          header nav div:nth-last-child(-n+2) {
            display: none;
          }
            header nav button.border-primary{
              dispaly: none;}
              html {
  scroll-behavior: smooth;
}
        `}
      </style>
      <section className=" ">
        <DmHeroSection
          Bannerdata={BannerSection}
          bannerlogp={false}
          maxchwidth={28}
          points={BannerSection[0].points}
        />
      </section>
      <AuditSecTwo title={boostEngage.title} data={boostEngage.data} />
      <Services bgcolor ="bg-dgray" title={OurServices.title} hrcontent={true} description={OurServices.desc} data={OurServices.data} />
      <div className="mnstsaq bg-black text-white">
        <Framework
          title={Frameworkdata.title}
          data={Frameworkdata.data}
          bgcolor="bg-black"
          colcount={3}
        />
      </div>
      <Expertiseheimg
        title={tpcontent.title}
        data={tpcontent.data}
      />
      <Testimonials />
      <Expertise
        title={IndustriesWeServe.title}
        data={IndustriesWeServe.data}
        colnum={3}
      />
      <RequestFreeAudit  />
    </div>
  );
};

export default page;
