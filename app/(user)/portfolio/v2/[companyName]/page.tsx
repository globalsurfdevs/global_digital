import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioDetails from "@/app/components/Portfolio-details";
import { formatLinkForPortfolio } from "@/app/helpers/formatLink";
import { getNewPortfolioPageData } from "@/app/lib/services/newPortfolio.service";

async function getPreviewData(slug: string) {
  const portfolioSlug = slug.toLowerCase().endsWith("-v2")
    ? slug.slice(0, -3)
    : slug;

  const newData = await getNewPortfolioPageData(portfolioSlug, "listed");

  return newData;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ companyName: string }>;
}): Promise<Metadata> {
  const { companyName } = await params;
  const portfolioSlug = companyName.toLowerCase().endsWith("-v2")
    ? companyName.slice(0, -3)
    : companyName;
  const slug = formatLinkForPortfolio(portfolioSlug);
  const data = await getPreviewData(portfolioSlug);
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
      siteName: "GS Digital",
      locale: "en_AE",
      type: "website",
      images: seo?.ogImage || bannerImage
        ? [{ url: seo?.ogImage || bannerImage!, alt: seo?.ogImageAlt }]
        : undefined,
    },
    twitter: {
      card: seo?.twitterImage || bannerImage ? "summary_large_image" : "summary",
      site: "@GlobalSurf_D",
      title: seo?.twitterTitle || title,
      description: seo?.twitterDescription || description,
      images: seo?.twitterImage || bannerImage
        ? [{
            url: seo?.twitterImage || bannerImage!,
            alt: seo?.ogImageAlt,
          }]
        : undefined,
    },
  };
}

export default async function PortfolioV2PreviewPage({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) {
  const { companyName } = await params;

  const portfolioSlug = companyName.toLowerCase().endsWith("-v2")
    ? companyName.slice(0, -3)
    : companyName;

  const data = await getPreviewData(portfolioSlug);
  if (!data) notFound();
  return (
    <PortfolioDetails
      data={data}
      endpoint={portfolioSlug}
      isV2Preview
      successStories={"successStories" in data ? data.successStories : []}
    />
  );
}
