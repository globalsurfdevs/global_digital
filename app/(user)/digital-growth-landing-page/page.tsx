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
import CheckItem from "@/app/components/DigitalGrowth/Sections/CheckItem";
import Testimonials from "@/app/components/DigitalGrowth/Sections/Testimonials";
import { Faq } from "../../data/services/performance-marketing/faq";
import { Metadata } from "next";
import { serviceData } from "@/app/components/DigitalGrowth/data";
import PricingComparison from "@/app/components/DigitalGrowth/Sections/PricingComparison";



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
            { _id: "1", badge: "Weeks 1–2", description: "Written Baseline, Signed" },
            { _id: "2", badge: "Day 7", description: "First Deliverable Live"},
            { _id: "3", badge: "Monthly", description: "Executive Report & Senior Call" },
            { _id: "4", badge: "Quarterly", description: "Strategic Roadmap & Three Audits" },
            { _id: "5", badge: "Month 3", description: "Accountability Checkpoint" },
          ],
        }}
      />
      <FullFunnelChannels
        data={{
          title: "Eliminate reporting guesswork across every channel",
          description: "Full-Funnel visibility, 100% Client-Owned data architecture",
        }}
      />
      <PricingComparison
        data={{
          title: "Find the structure that fits\nyour roadmap",
          description:
            "Both senior-led. Both measured against a baseline signed in week two. The difference is coverage, not who works on your account.",
        }}
      />
      <Testimonials
        topTitle={serviceData.Testimonials.topTitle}
        data={
          {
            ...serviceData.Testimonials,
            items: serviceData.Testimonials.items.map((item) => ({
              ...item,
              image: typeof item.image === "string" ? item.image : item.image.src,
            })),
          } as typeof serviceData.Testimonials & {
            items: Array<(typeof serviceData.Testimonials.items)[number] & { image: string }>
          }
        }
        page="service"
      />
      <FAQ data={Faq} defActive="2" fullSpace={false} py="90" />
      <CheckItem data={{
        title: "Make Sure they like\nwhat they find.",
        description:
          "20 minutes with someone senior. No deck, no pitch. Q3 onboarding is capped — if this isn't the right fit, we'll tell you on the call, not after three follow-up emails.",
      }} />
    </div>
  );
};

export default page;
