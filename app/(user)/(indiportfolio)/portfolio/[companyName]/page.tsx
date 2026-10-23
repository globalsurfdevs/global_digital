import React from "react";
import PortfolioDetails from "@/app/components/Portfolio-details";
import { formatLinkForPortfolio } from "@/app/helpers/formatLink";
import { Metadata } from "next";
import { getCaseStudyOrPortfolio } from "@/app/actions/getCaseStudy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ companyName: string }>;
}): Promise<Metadata> {
  const { companyName } = await params;
  const slug = formatLinkForPortfolio(companyName);
  const data = await getCaseStudyOrPortfolio(companyName, "portfolio");
  const portfolio = data?.portfolio;
  const defaultTitle = "Global Surf Digital";
  const title =
    portfolio?.metaTitle && portfolio.metaTitle !== "null"
      ? portfolio.metaTitle
      : defaultTitle;
  const description =
    portfolio?.metaDescription && portfolio.metaDescription !== "null"
      ? portfolio.metaDescription
      : defaultTitle;
  const ogTitle = portfolio?.ogTitle || title;
  const ogDescription = portfolio?.ogDescription || description;
  const twitterTitle = portfolio?.twitterTitle || ogTitle;
  const twitterDescription = portfolio?.twitterDescription || ogDescription;
  const url = `https://www.globalsurf.ae/portfolio/${slug}`;
  const images = portfolio?.bannerImage ? [portfolio.bannerImage] : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      type: "website",
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: twitterTitle,
      description: twitterDescription,
      images,
    },
  };
}

const page = async ({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) => {
  const data = await getCaseStudyOrPortfolio(
    (await params).companyName,
    "portfolio",
  );

  if (!data) {
    return <div>Portfolio not found</div>;
  }
  return (
    <>
      <PortfolioDetails data={data} />
    </>
  );
};

export default page;
