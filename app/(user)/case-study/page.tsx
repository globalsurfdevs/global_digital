import React from 'react'
import CaseStudyPage from './[companyName]/page'
import { Metadata } from 'next';
import apiService from '@/app/lib/apiService';
import { formatLinkForCaseStudy } from '@/app/helpers/formatLink';
import LandingCaseStudy from '@/app/components/LandingCaseStudy';
import { getCaseStudies } from '@/app/lib/case-study.service';
import { getIndustries } from '@/app/lib/industries.service';

type Data = {
  caseStudy: {
    metaTitle: string;
    metaDescription: string;
  }[]
}
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
// ): Promise<Metadata>{
//     const {companyName} = await params

//   const data:Data = await apiService.get(`/api/case-study?slug=${formatLinkForCaseStudy(companyName)}`)


//   const metadataTitle = data.caseStudy[0].metaTitle=="null" || !data.caseStudy[0].metaTitle ? "Global Surf Digital" : data.caseStudy[0].metaTitle;
//   const metadataDescription = data.caseStudy[0].metaDescription=="null" || !data.caseStudy[0].metaTitle ? "Global Surf Digital" : data.caseStudy[0].metaDescription;

//   return {
//     title: metadataTitle,
//     description: metadataDescription,
//   };
// }

const page = async() => {
    const caseStudy = await getCaseStudies()
    const industries = await getIndustries();

  return (
    <LandingCaseStudy data={caseStudy} industries={industries ?? []}/>
  )
}

export default page