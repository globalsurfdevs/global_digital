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

export async function generateMetadata(
  props: {
    params: Promise<{
      companyName: string
    }>
  }
): Promise<Metadata> {
  const params = await props.params;
  const slug = formatLinkForPortfolio(params.companyName)

  const data: Data = await apiService.get(`/api/portfolio?slug=${slug}`)

  const metadataTitle = data.portfolio.metaTitle == "null" || !data.portfolio.metaTitle ? "Global Surf Digital" : data.portfolio.metaTitle;
  const metadataDescription = data.portfolio.metaDescription == "null" || !data.portfolio.metaTitle ? "Global Surf Digital" : data.portfolio.metaDescription;
  const canonicalUrl = `https://www.globalsurf.ae/portfolio/${slug}`

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const page = async ({ params }: { params: Promise<{ companyName: string }> }) => {

  const companyName = (await params).companyName;
  const response = await fetch(
    `${process.env.BASE_URL}/api/portfolio?slug=${companyName}`,
    { next: { revalidate: 60 } }
  );

  const data = await response.json();

  return (
    <>
      <PortfolioDetails data={data} />
    </>
  )
}

export default page