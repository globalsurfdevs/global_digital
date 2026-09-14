import { Metadata } from "next";
import { SeoFormValues } from "@/app/types/seo";

interface SeoSource {
  name: string;
  slug: string;
  seo: SeoFormValues;
}

interface BuildMetadataOptions {
  noIndex?: boolean;
}

export function buildMetadata(
  source: SeoSource,
  options: BuildMetadataOptions = {}
): Metadata {
  const seo = source.seo;
  const canonicalUrl = `https://www.globalsurf.ae/${source.slug}`;

  const noIndex = options.noIndex ?? false;

  return {
    title: seo?.metaTitle ?? source.name,
    description: seo?.metaDescription ?? "",

    robots: {
      index: !noIndex,
      follow: true,
      nocache: noIndex,
      googleBot: {
        index: !noIndex,
        follow: true,
      },
    },

    alternates: {
      canonical: canonicalUrl,
    },

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
      description:
        seo?.twitterDescription ?? seo?.metaDescription ?? "",
      images: seo?.twitterImage ? [seo.twitterImage] : undefined,
    },
  };
}