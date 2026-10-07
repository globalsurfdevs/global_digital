import React from "react";
import { Metadata } from "next";
import LandingCaseStudy from "@/app/components/LandingCaseStudy";
import { getCaseStudies } from "@/app/lib/services/case-study.service";
import { getIndustries } from "@/app/lib/services/industries.service";

type Data = {
  caseStudy: {
    metaTitle: string;
    metaDescription: string;
  }[];
};
interface Canonicals {
  canonical: string;
}
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Case Studies | Performance & Creative Results | GS Digital",
    description:
      "Explore case studies showing ROI-driven results across SEO, PPC, social and web development for Dubai clients. See measurable outcomes and approaches.",
    alternates: {
      canonical: "https://www.globalsurf.ae/case-study",
    },
  };
}

const page = async () => {
  const caseStudy = await getCaseStudies();
  const industries = await getIndustries();

  return <LandingCaseStudy data={caseStudy} industries={industries ?? []} />;
};

export default page;
