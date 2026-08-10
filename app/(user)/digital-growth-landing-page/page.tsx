import React from "react";
// import Script from "next/script";
import HeroSection from "../../components/EngineeringInfrastructure/HeroSection";
import FeatureStrip from "../../components/DigitalGrowth/Sections/Featurestrip";
import LogoSlider from "../../components/DigitalGrowth/Sections/LogoSlider";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import WhatWeHear from "@/app/components/DigitalGrowth/Sections/WhatWeHear";
import Whattheyfind from "@/app/components/DigitalGrowth/Sections/Whattheyfind";
import IndustriesSec from "@/app/components/DigitalGrowth/Sections/IndustriesSec";
import CredibilityStats from "@/app/components/DigitalGrowth/Sections/CredibilityStats";
import PackageChecklist from "@/app/components/DigitalGrowth/Sections/PackageChecklist";
import ExecutionRoadmap from "@/app/components/DigitalGrowth/Sections/ExecutionRoadmap";
import FullFunnelChannels from "@/app/components/DigitalGrowth/Sections/Fullfunnelchannels";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import { Cta } from "../../data/services/performance-marketing/cta";
import { Faq } from "../../data/services/performance-marketing/faq";
import { Metadata } from "next";
import { serviceData } from "@/app/components/DigitalGrowth/data";



interface Canonicals {
  canonical: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}



const page = async ({ params }: PageProps) => {

  return (
    <div>
      <HeroSection data={serviceData.firstSection} />
      <FeatureStrip data={serviceData.featureStrip} />
      <LogoSlider data={serviceData.trustedBy} />
      <WhatWeHear
        title={serviceData.whatWeHearData.title}
        description={serviceData.whatWeHearData.description}
        data={serviceData.whatWeHearData.data}

        colcount={6}
      />
      <Whattheyfind />
      <IndustriesSec
        data={serviceData.industriesData}
      />
      <CredibilityStats data={serviceData.credibilityStats} />
      <PackageChecklist data={serviceData.packageChecklist} />
      <ExecutionRoadmap
        data={{
          title: "The execution roadmap",
          items: [
            { _id: "1", badge: "Weeks 1–2", description: "Written baseline, signed" },
            { _id: "2", badge: "Weeks 1–2", description: "First deliverable live", highlighted: true },
            { _id: "3", badge: "Monthly", description: "Executive report & senior call" },
            { _id: "4", badge: "Quarterly", description: "Strategic roadmap & three audits" },
            { _id: "5", badge: "Month 3", description: "Accountability checkpoint" },
          ],
        }}
      />
      <FullFunnelChannels
        data={{
          title: "Eliminate reporting guesswork across every channel",
          description: "Full-Funnel visibility, 100% Client-Owned data architecture",
        }}
      />
      <GetInTouch
        data={Cta}
        ctabbutton={serviceData.ctaSection.buttonText}
        redlast
      />
      <FAQ data={Faq} initialCount={5} defActive="2" fullSpace={false} />
    </div>
  );
};

export default page;
