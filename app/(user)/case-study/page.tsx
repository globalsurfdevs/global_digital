import React from 'react'
import CaseStudyPage from './[companyName]/page'
import { Metadata } from 'next';
import apiService from '@/app/lib/apiService';
import { formatLinkForCaseStudy } from '@/app/helpers/formatLink';
import LandingCaseStudy from '@/app/components/LandingCaseStudy';

type Data = {
  caseStudy:{
    metaTitle:string;
    metaDescription:string;
  }[]
}
interface Canonicals {
  canonical: string;
}
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Case Study | G.S Digital",
    description:
      "",
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

const page = () => {
  return (
    <LandingCaseStudy/>
  )
}

export default page