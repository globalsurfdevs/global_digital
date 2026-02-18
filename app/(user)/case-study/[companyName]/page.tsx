import React from 'react'
import CaseStudyDetails from '@/app/components/CaseStudy-details'
import apiService from '@/app/lib/apiService'
import { formatLinkForCaseStudy } from '@/app/helpers/formatLink'
import { Metadata } from 'next'
import { CaseStudy } from '@/app/types/CaseStudy'
type Data = {
  caseStudy:{
    metaTitle:string;
    metaDescription:string;
    
  }[]
}

export async function generateMetadata(
  props:{
    params: Promise<{
      companyName:string
    }>
  }
): Promise<Metadata> {
  const params = await props.params;
  const slug = formatLinkForCaseStudy(params.companyName)

  const data:Data = await apiService.get(`/api/case-study?slug=${slug}`)

  const metadataTitle = data.caseStudy[0].metaTitle=="null" || !data.caseStudy[0].metaTitle ? "Global Surf Digital" : data.caseStudy[0].metaTitle;
  const metadataDescription = data.caseStudy[0].metaDescription=="null" || !data.caseStudy[0].metaDescription ? "Global Surf Digital" : data.caseStudy[0].metaDescription;
  const canonicalUrl = `https://www.globalsurf.ae/case-study/${slug}`

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const page = ()=>{

  return (
    <>
        <CaseStudyDetails/>
    </>
  )
}

export default page