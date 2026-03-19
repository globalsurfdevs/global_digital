import React from 'react'
import PortfolioDetails from '@/app/components/Portfolio-details'
import apiService from '@/app/lib/apiService'
import { formatLinkForPortfolio } from '@/app/helpers/formatLink'
import { Metadata } from 'next'
import { Portfolio } from '@/app/types/Portfolio'

type Data = {
  portfolio: {
    metaTitle: string;
    metaDescription: string;

  }
}

// export async function generateMetadata(
//   props: {
//     params: Promise<{
//       companyName: string
//     }>
//   }
// ): Promise<Metadata> {
//   const params = await props.params;
//   const slug = formatLinkForPortfolio(params.companyName)

//   const data: Data = await apiService.get(`/api/portfolio?slug=${slug}`)

//   const metadataTitle = data.portfolio.metaTitle == "null" || !data.portfolio.metaTitle ? "Global Surf Digital" : data.portfolio.metaTitle;
//   const metadataDescription = data.portfolio.metaDescription == "null" || !data.portfolio.metaTitle ? "Global Surf Digital" : data.portfolio.metaDescription;
//   const canonicalUrl = `https://www.globalsurf.ae/portfolio/${slug}`

//   return {
//     title: metadataTitle,
//     description: metadataDescription,
//     alternates: {
//       canonical: canonicalUrl,
//     },
//   };
// }


import { getCaseStudyOrPortfolio } from "@/app/actions/getCaseStudy";


const page = async ({ params }: { params: Promise<{ companyName: string }> }) => {

  const data = await getCaseStudyOrPortfolio((await params).companyName, "portfolio");

  if (!data) {
    return <div>Portfolio not found</div>;
  }
  return (
    <>
      <PortfolioDetails data={data} />
    </>
  )
}

export default page