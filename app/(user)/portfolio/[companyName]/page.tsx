import React from "react";
import PortfolioDetails from "@/app/components/Portfolio-details";
import { formatLinkForPortfolio } from "@/app/helpers/formatLink";
import { Metadata } from "next";
import {
  getCaseStudyOrPortfolio,
  getSuccessStoriesPortfolios,
} from "@/app/actions/getCaseStudy";
import { getNewPortfolioPageData } from "@/app/actions/getNewPortfolio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ companyName: string }>;
}): Promise<Metadata> {
  const { companyName } = await params;
  const isV2Preview = companyName.toLowerCase().endsWith("-v2");
  const portfolioSlug = isV2Preview
    ? companyName.slice(0, -3)
    : companyName;
  const slug = formatLinkForPortfolio(portfolioSlug);
  const newData = await getNewPortfolioPageData(portfolioSlug);
  const data = newData && (isV2Preview || newData.isPublished)
    ? newData
    : await getCaseStudyOrPortfolio(portfolioSlug, "portfolio");
  const portfolio = data?.portfolio;
  const seo = newData && (isV2Preview || newData.isPublished)
    ? newData.seo
    : portfolio?.seo;
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
  const bannerImage = newData && (isV2Preview || newData.isPublished)
    ? newData.portfolio.newBannerImage || newData.portfolio.bannerImage
    : portfolio?.bannerImage;
  const openGraphImages = seo?.ogImage
    ? [seo.ogImage]
    : bannerImage
      ? [bannerImage]
      : undefined;
  const twitterImages = seo?.twitterImage
    ? [seo.twitterImage]
    : openGraphImages;
  return {
    title,
    description,
    alternates: { canonical: url },

    robots: isV2Preview
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

  const isV2Preview = companyName.toLowerCase().endsWith("-v2");
 
  const portfolioSlug = isV2Preview
    ? companyName.slice(0, -3)
    : companyName;
  const endpoint = portfolioSlug;

  const newData = await getNewPortfolioPageData(endpoint);
  if (isV2Preview) {
    if (newData) {
      return (
        <PortfolioDetails
          data={newData}
          endpoint={endpoint}
          hidePrimaryCta
          isV2Preview
          successStories={newData.successStories}
        />
      );
    }
    const legacyData = await getCaseStudyOrPortfolio(endpoint, "portfolio");
    if (!legacyData) return <div>Portfolio not found</div>;
    const legacySuccessStories = await getSuccessStoriesPortfolios({
      companyId: legacyData.portfolio._id,
      slug: endpoint,
      relatedPortfolioIds: legacyData.portfolio.relatedPortfolios?.portfolio,
    });
    return (
      <PortfolioDetails
        data={legacyData}
        endpoint={endpoint}
        hidePrimaryCta
        isV2Preview
        successStories={legacySuccessStories}
      />
    );
  }
  if (newData?.isPublished) {
    return (
      <PortfolioDetails
        data={newData}
        endpoint={endpoint}
        hidePrimaryCta
        successStories={newData.successStories}
      />
    );
  }

  const data = await getCaseStudyOrPortfolio(endpoint, "portfolio");
 
  if (!data) {
    return <div>Portfolio not found</div>;
  }
  const successStories = await getSuccessStoriesPortfolios({
    companyId: data.portfolio._id,
    slug:
      companyName === "sobha-constructions-v2"
        ? companyName
        : portfolioSlug,
    relatedPortfolioIds: data.portfolio.relatedPortfolios?.portfolio,
  });

  return (
    <>
      <PortfolioDetails
        data={data}
        endpoint={endpoint}
        hidePrimaryCta
        isV2Preview={isV2Preview}
        successStories={successStories}
      />
    </>
  );
};

export default page;
