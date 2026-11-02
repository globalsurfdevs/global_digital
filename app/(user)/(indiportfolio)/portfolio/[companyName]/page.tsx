import React from "react";
import PortfolioDetails from "@/app/components/Portfolio-details";
import { formatLinkForPortfolio } from "@/app/helpers/formatLink";
import { Metadata } from "next";
import {
  getCaseStudyOrPortfolio,
  getSuccessStoriesPortfolios,
} from "@/app/actions/getCaseStudy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ companyName: string }>;
}): Promise<Metadata> {
  const { companyName } = await params;
  const slug = formatLinkForPortfolio(companyName);
  const data = await getCaseStudyOrPortfolio(companyName, "portfolio");
  const portfolio = data?.portfolio;
  const seo = portfolio?.seo;
  const defaultTitle = "Global Surf Digital";
  const title =
    (seo?.metaTitle || portfolio?.metaTitle) &&
    (seo?.metaTitle || portfolio?.metaTitle) !== "null"
      ? seo?.metaTitle || portfolio?.metaTitle
      : defaultTitle;
  const description =
    (seo?.metaDescription || portfolio?.metaDescription) &&
    (seo?.metaDescription || portfolio?.metaDescription) !== "null"
      ? seo?.metaDescription || portfolio?.metaDescription
      : defaultTitle;
  const ogTitle = seo?.ogTitle || portfolio?.ogTitle || title;
  const ogDescription =
    seo?.ogDescription || portfolio?.ogDescription || description;
  const twitterTitle = seo?.twitterTitle || portfolio?.twitterTitle || ogTitle;
  const twitterDescription =
    seo?.twitterDescription || portfolio?.twitterDescription || ogDescription;
  const url = `https://www.globalsurf.ae/portfolio/${slug}`;
  const openGraphImages = seo?.ogImage
    ? [seo.ogImage]
    : portfolio?.bannerImage
      ? [portfolio.bannerImage]
      : undefined;
  const twitterImages = seo?.twitterImage
    ? [seo.twitterImage]
    : openGraphImages;
  const isV2Page = slug.toLowerCase().includes("v2");
  return {
    title,
    description,
    alternates: { canonical: url },

    robots: isV2Page
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },

    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      type: "website",
      images: openGraphImages,
    },

    twitter: {
      card: twitterImages ? "summary_large_image" : "summary",
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImages,
    },
  };
}

const page = async ({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) => {
  const { companyName } = await params;
  const endpoint =
    companyName === "sobha-constructions-v2"
      ? "sobha-constructions"
      : companyName;

  const data = await getCaseStudyOrPortfolio(endpoint, "portfolio");

  console.log("Endpoint:", companyName);
  if (!data) {
    return <div>Portfolio not found</div>;
  }
  const successStories = await getSuccessStoriesPortfolios({
    companyId: data.portfolio._id,
    slug: companyName,
    relatedPortfolioIds: data.portfolio.relatedPortfolios?.portfolio,
  });

  return (
    <>
      <PortfolioDetails
        data={data}
        endpoint={companyName}
        successStories={successStories}
      />
    </>
  );
};

export default page;
