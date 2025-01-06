import React from 'react'
import PortfolioDetails from '@/app/components/Portfolio-details'
import apiService from '@/app/lib/apiService'
import { formatLinkForPortfolio } from '@/app/helpers/formatLink'
import { Metadata } from 'next'
import { Portfolio } from '@/app/types/Portfolio'

type Data = {
  portfolio:{
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
  const slug = formatLinkForPortfolio(params.companyName)

  const data:Data = await apiService.get(`/api/portfolio?slug=${slug}`)

  const metadataTitle = data.portfolio[0].metaTitle=="null" || !data.portfolio[0].metaTitle ? "Global Surf Digital" : data.portfolio[0].metaTitle;
  const metadataDescription = data.portfolio[0].metaDescription=="null" || !data.portfolio[0].metaTitle ? "Global Surf Digital" : data.portfolio[0].metaDescription;

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}

const page = ()=>{

  return (
    <>
        <PortfolioDetails/>
    </>
  )
}

export default page