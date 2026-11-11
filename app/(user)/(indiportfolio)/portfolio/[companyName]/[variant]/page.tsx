import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioDetails from "@/app/components/Portfolio-details";
import { formatLinkForPortfolio } from "@/app/helpers/formatLink";
import {
  getCaseStudyOrPortfolio,
  getSuccessStoriesPortfolios,
} from "@/app/actions/getCaseStudy";
import { getInstagramFeed } from "@/app/lib/integrations/instagram/getInstagramFeed";


const VARIANTS = ["v2", "v3"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ companyName: string; variant: string }>;
}): Promise<Metadata> {
  const { companyName, variant } = await params;
  // A second copy of the page must not compete with the original in search.
  const robots = { index: false, follow: false };
  if (!VARIANTS.includes(variant)) return { robots };

  const slug = formatLinkForPortfolio(companyName);
  const data = await getCaseStudyOrPortfolio(companyName, "portfolio");
  const portfolio = data?.portfolio;
  const title = portfolio?.seo?.metaTitle || portfolio?.metaTitle;

  return {
    title: title && title !== "null" ? title : "Global Surf Digital",
    robots,
    alternates: { canonical: `https://www.globalsurf.ae/portfolio/${slug}` },
  };
}

const page = async ({
  params,
}: {
  params: Promise<{ companyName: string; variant: string }>;
}) => {
  const { companyName, variant } = await params;
  if (!VARIANTS.includes(variant)) notFound();

  const endpoint =
    companyName === "sobha-constructions-v2"
      ? "sobha-constructions"
      : companyName;

  const data = await getCaseStudyOrPortfolio(endpoint, "portfolio");

  if (!data) {
    return <div>Portfolio not found</div>;
  }
  const successStories = await getSuccessStoriesPortfolios({
    companyId: data.portfolio._id,
    slug: companyName,
    relatedPortfolioIds: data.portfolio.relatedPortfolios?.portfolio,
  });

  // Fetched on the server, so the feed is in the first HTML. Empty when
  // Instagram isn't connected, in which case the uploaded images are shown.
  const instagramPosts = await getInstagramFeed(String(data.portfolio._id));

  return (
    <PortfolioDetails
      data={data}
      endpoint={companyName}
      successStories={successStories}
      instagramPosts={instagramPosts}
      instagramFlush={variant === "v3"}
    />
  );
};


export default page;
