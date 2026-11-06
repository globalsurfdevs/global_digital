import React from "react";
import type { Metadata } from "next";
import PortfolioDetails from "@/app/components/Portfolio-details";
import { formatLinkForPortfolio } from "@/app/helpers/formatLink";
import {
  getCaseStudyOrPortfolio,
  getSuccessStoriesPortfolios,
} from "@/app/actions/getCaseStudy";
import { getInstagramFeed } from "@/app/lib/integrations/instagram/getInstagramFeed";

// /portfolio/<slug>/v2: the same page as /portfolio/<slug>, with the Social
// Media section reading the client's live Instagram posts. The address without
// /v2 is untouched and keeps showing the uploaded images.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ companyName: string }>;
}): Promise<Metadata> {
  const { companyName } = await params;
  const slug = formatLinkForPortfolio(companyName);
  const data = await getCaseStudyOrPortfolio(companyName, "portfolio");
  const portfolio = data?.portfolio;
  const title =
    portfolio?.seo?.metaTitle || portfolio?.metaTitle;

  return {
    title: title && title !== "null" ? title : "Global Surf Digital",
    // A second copy of the page must not compete with the original in search.
    robots: { index: false, follow: false },
    alternates: { canonical: `https://www.globalsurf.ae/portfolio/${slug}` },
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
    />
  );
};

export default page;
