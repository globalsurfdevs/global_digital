import React from "react";
import HeroSection from "../../components/AboutUs/HeroSection";
import SectionTwo from "../../components/AboutUs/SectionTwo";
import SectionThree from "../../components/AboutUs/SectionThree";
import SectionFour from "../../components/AboutUs/SectionFour";
import SectionFive from "../../components/AboutUs/SectionFive";

interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Digital Growth Partner to Leading Brands in the UAE | GS.Digital",
    description:
      "Unlock your brand’s potential with Global Surf Digital Media, the trusted digital growth partner for UAE’s top brands. Elevate your success with tailored marketing strategies.",
    alternates: {
      canonical: "https://www.globalsurf.ae/about-us",
    },
  };
}

const page = () => {
  return (
    <>
      <HeroSection />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
    </>
  );
};

export default page;
