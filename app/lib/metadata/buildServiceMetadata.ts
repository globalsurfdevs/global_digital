// lib/metadata/buildMetadata.ts
import { Metadata } from "next";
import { SeoFormValues } from "@/app/types/seo";

interface SeoSource {
  name: string;
  slug: string;
  seo: SeoFormValues;
}

export function buildMetadata(source: SeoSource): Metadata {
  const seo = source.seo;
  const canonicalUrl = `https://www.globalsurf.ae/${source.slug}`;

  return {
    title: seo?.metaTitle ?? source.name,
    description: seo?.metaDescription ?? "",
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: { index: true, follow: true },
    },
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: seo?.ogTitle ?? seo?.metaTitle ?? source.name,
      description: seo?.ogDescription ?? seo?.metaDescription ?? "",
      url: canonicalUrl,
      images: seo?.ogImage ? [{ url: seo.ogImage }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitterTitle ?? seo?.metaTitle ?? source.name,
      description: seo?.twitterDescription ?? seo?.metaDescription ?? "",
      images: seo?.twitterImage ? [seo.twitterImage] : undefined,
    },
  };
}