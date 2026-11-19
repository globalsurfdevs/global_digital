import React from "react";
import PortfolioDetails from "@/app/components/Portfolio-details";
import { formatLinkForPortfolio } from "@/app/helpers/formatLink";
import type { Metadata } from "next";
import {
  getOldPortfolioBySlug,
  getOldPortfolioSuccessStories,
  resolvePortfolioBySlug,
} from "@/app/lib/services/portfolio.service";
import { getNewPortfolioPageData } from "@/app/lib/services/newPortfolio.service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ companyName: string }>;
}): Promise<Metadata> {
  const { companyName } = await params;
  const isV2Preview = companyName.toLowerCase().endsWith("-v2");
  const slug = isV2Preview ? companyName.slice(0, -3) : companyName;

  const resolved = isV2Preview ? null : await resolvePortfolioBySlug(slug);
  const previewNewData = isV2Preview
    ? await getNewPortfolioPageData(slug, "listed")
    : null;
  const portfolio =
    resolved?.data.portfolio ||
    previewNewData?.portfolio;
  const seo = resolved?.source === "new"
    ? resolved.data.seo
    : previewNewData?.seo || portfolio?.seo;

  const defaultTitle = "Global Surf Digital";
  const title = seo?.metaTitle || portfolio?.metaTitle || defaultTitle;
  const description =
    seo?.metaDescription || portfolio?.metaDescription || defaultTitle;
  const ogTitle = seo?.ogTitle || portfolio?.ogTitle || title;
  const ogDescription =
    seo?.ogDescription || portfolio?.ogDescription || description;
  const twitterTitle = seo?.twitterTitle || portfolio?.twitterTitle || ogTitle;
  const twitterDescription =
    seo?.twitterDescription || portfolio?.twitterDescription || ogDescription;
  const bannerImage =
    (resolved?.source === "new" ? resolved.data.portfolio.newBannerImage : undefined) ||
    portfolio?.bannerImage ||
    portfolio?.newBannerImage;
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
    alternates: {
      canonical: `https://www.globalsurf.ae/portfolio/${formatLinkForPortfolio(slug)}`,
    },
    robots: isV2Preview
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `https://www.globalsurf.ae/portfolio/${formatLinkForPortfolio(slug)}`,
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

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) {
  const { companyName } = await params;
  const isV2Preview = companyName.toLowerCase().endsWith("-v2");
  const slug = isV2Preview ? companyName.slice(0, -3) : companyName;

  if (isV2Preview) {
    const newData = await getNewPortfolioPageData(slug, "listed");
    if (!newData) return <div>Portfolio not found</div>;
    return (
      <PortfolioDetails
        data={newData}
        endpoint={slug}
        hidePrimaryCta
        isV2Preview
        successStories={newData.successStories}
      />
    );
  }

  const resolved = await resolvePortfolioBySlug(slug);
  if (!resolved) return <div>Portfolio not found</div>;

  const successStories = resolved.source === "new"
    ? resolved.data.successStories
    : await getOldPortfolioSuccessStories({
        companyId: resolved.data.portfolio._id,
        slug,
        relatedPortfolioIds: resolved.data.portfolio.relatedPortfolios?.portfolio,
      });

  return (
    <PortfolioDetails
      data={resolved.data}
      endpoint={slug}
      hidePrimaryCta
      successStories={successStories}
    />
  );
}
