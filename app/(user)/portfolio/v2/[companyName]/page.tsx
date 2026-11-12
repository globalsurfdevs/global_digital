import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioDetails from "@/app/components/Portfolio-details";
import { formatLinkForPortfolio } from "@/app/helpers/formatLink";
import {
  getCaseStudyOrPortfolio,
  getSuccessStoriesPortfolios,
} from "@/app/actions/getCaseStudy";
import { getNewPortfolioPageData } from "@/app/actions/getNewPortfolio";

async function getPreviewData(slug: string) {
  const newData = await getNewPortfolioPageData(slug);
  if (newData) return newData;

  const legacyData = await getCaseStudyOrPortfolio(slug, "portfolio");
  if (!legacyData) return null;
  const successStories = await getSuccessStoriesPortfolios({
    companyId: legacyData.portfolio._id,
    slug,
    relatedPortfolioIds: legacyData.portfolio.relatedPortfolios?.portfolio,
  });
  return { ...legacyData, successStories };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ companyName: string }>;
}): Promise<Metadata> {
  const { companyName } = await params;
  const slug = formatLinkForPortfolio(companyName);
  const data = await getPreviewData(companyName);
  const portfolio = data?.portfolio;
  const seo = "seo" in (data || {}) ? data?.seo : portfolio?.seo;
  const title = seo?.metaTitle || portfolio?.metaTitle || "Global Surf Digital";
  const description =
    seo?.metaDescription || portfolio?.metaDescription || "Global Surf Digital";
  const bannerImage =
    portfolio?.newBannerImage || portfolio?.bannerImage || undefined;

  return {
    title,
    description,
    robots: { index: false, follow: false },
    alternates: { canonical: `https://www.globalsurf.ae/portfolio/${slug}` },
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      url: `https://www.globalsurf.ae/portfolio/${slug}`,
      type: "website",
      images: seo?.ogImage ? [seo.ogImage] : bannerImage ? [bannerImage] : undefined,
    },
    twitter: {
      card: seo?.twitterImage || bannerImage ? "summary_large_image" : "summary",
      title: seo?.twitterTitle || title,
      description: seo?.twitterDescription || description,
      images: seo?.twitterImage ? [seo.twitterImage] : bannerImage ? [bannerImage] : undefined,
    },
  };
}

export default async function PortfolioV2PreviewPage({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) {
  const { companyName } = await params;
  const data = await getPreviewData(companyName);
  if (!data) notFound();

  return (
    <PortfolioDetails
      data={data}
      endpoint={companyName}
      isV2Preview
      successStories={"successStories" in data ? data.successStories : []}
    />
  );
}
