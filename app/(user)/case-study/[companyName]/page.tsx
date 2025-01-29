import React from 'react'
import CaseStudyPage from './CaseStudy'
import { Metadata } from 'next';
import apiService from '@/app/lib/apiService';
import { formatLinkForCaseStudy } from '@/app/helpers/formatLink';

type Data = {
  caseStudy:{
    metaTitle:string;
    metaDescription:string;
  }[]
}
export async function generateMetadata({params}:{
  params:Promise<{
    companyName:string
  }>
}
): Promise<Metadata>{
    const {companyName} = await params
    
  const data:Data = await apiService.get(`/api/case-study?slug=${formatLinkForCaseStudy(companyName)}`)

  
  const metadataTitle = data.caseStudy[0].metaTitle=="null" || !data.caseStudy[0].metaTitle ? "Global Surf Digital" : data.caseStudy[0].metaTitle;
  const metadataDescription = data.caseStudy[0].metaDescription=="null" || !data.caseStudy[0].metaTitle ? "Global Surf Digital" : data.caseStudy[0].metaDescription;
    
  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}

const page = () => {
  return (
    <CaseStudyPage/>
  )
}

export default page