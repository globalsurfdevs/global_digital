// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Author from "@/app/models/Author";
import Blog from "@/app/models/Blog";
import Industries from "@/app/models/Industries";
import Portfolio from "@/app/models/Portfolio";
import ServicePillar from "../models/ServicePiller";
import SubService from "../models/SubService";
import Service from "../models/Service";
import SitemapBackup from "@/app/models/SitemapBackup";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.globalsurf.ae"
).replace(/\/+$/, "");

const STATIC_PATHS = [
  "/",
  "/about-us",
  "/blogs",
  "/careers",
  "/case-study",
  "/contact-us",
  "/cookie-policy",
  "/industries",
  "/legal",
  "/modern-slavery-statement",
  "/portfolio",
  "/privacy-policy",

  // static blogs
  "/blogs/why-email-marketing-still-quietly-drives",
  "/blogs/what-is-performance-marketing-and-how-it-works",
  "/blogs/what-does-built-environment-really-mean-in-the-uae",
  "/blogs/technical-seo-for-built-environment-websites-2026",
  "/blogs/social-media-video-production-tips",
  "/blogs/no-clicks-google-ai-search-built-environment",
  "/blogs/how-to-visible-in-llm",
  "/blogs/how-digital-marketing-wins-projects-for-construction-companies-in-uae",
  "/blogs/how-construction-brands-uae-rank-high-intent-b2b-keywords",
  "/blogs/google-ai-overviews-what-uae-businesses-must-do-for-organic-traffic",
  "/blogs/google-ads-vs-meta-ads-for-uae-lead-generation",
  "/blogs/global-surf-at-1billion-followers-summit",
  "/blogs/digital-marketing-company-dubai-costs-services-guide",
  "/blogs/digital-credibility-uae-construction-contractors-tender-success",
  "/blogs/bafco-performance-marketing-case-study-dubai",
];

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const toLastModified = (value?: Date | string | null) => {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

// Rebuild at most hourly so content changes reach search engines without
// querying MongoDB for every sitemap request.
export const revalidate = 3600;

export async function GET() {
  try {
    await connectDB();

    const [
      blogs,
      industryDocuments,
      portfolioItems,
      servicePillars,
      subServices,
      services,
    ] = await Promise.all([
      Blog.find({ isHidden: false, slug: { $type: "string", $ne: "" } })
        .select("slug publishedAt updatedAt")
        .lean(),
      Industries.find({ "items.slug": { $type: "string", $ne: "" } })
        .select("items.slug items.updatedAt")
        .lean(),
      Portfolio.find({ slug: { $type: "string", $ne: "" } })
        .select("slug section updatedAt")
        .lean(),
      ServicePillar.find({ slug: { $type: "string", $ne: "" } })
        .select("slug updatedAt")
        .lean(),
      SubService.find({ slug: { $type: "string", $ne: "" } })
        .select("slug updatedAt")
        .lean(),
      Service.find({ "items.slug": { $type: "string", $ne: "" } })
        .select("items.slug items.updatedAt")
        .lean(),
    ]);

    const urls = new Map<string, string | undefined>();
    const addUrl = (path: string, lastModified?: string) => {
      const url = new URL(path, SITE_URL).toString();
      urls.set(url, lastModified ?? urls.get(url));
    };

    STATIC_PATHS.forEach((path) => addUrl(path));

    blogs.forEach((blog) => {
      addUrl(
        `/blogs/${encodeURIComponent(blog.slug)}`,
        toLastModified(blog.publishedAt ?? blog.updatedAt),
      );
    });

    industryDocuments.forEach((document) => {
      document.items?.forEach((item: { slug?: string; updatedAt?: string }) => {
        if (item.slug)
          addUrl(
            `/industries/${encodeURIComponent(item.slug)}`,
            toLastModified(item.updatedAt),
          );
      });
    });
    servicePillars.forEach((pillar) => {
      addUrl(
        `/${encodeURIComponent(pillar.slug)}`,
        toLastModified(pillar.updatedAt),
      );
    });
    subServices.forEach((subService) => {
      addUrl(
        `/${encodeURIComponent(subService.slug)}`,
        toLastModified(subService.updatedAt),
      );
    });
    services.forEach((serviceDocument) => {
      serviceDocument.items?.forEach(
        (service: { slug?: string; updatedAt?: string }) => {
          if (service.slug)
            addUrl(
              `/${encodeURIComponent(service.slug)}`,
              toLastModified(service.updatedAt),
            );
        },
      );
    });

    portfolioItems.forEach((item) => {
      if (!item.slug) return;
      const isCaseStudy = ["case study", "case study new"].includes(
        item.section,
      );
      const pathPrefix = isCaseStudy ? "/case-study" : "/portfolio";
      addUrl(
        `${pathPrefix}/${encodeURIComponent(item.slug)}`,
        toLastModified(item.updatedAt),
      );
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Array.from(
      urls,
      ([url, lastModified]) =>
        `  <url><loc>${escapeXml(url)}</loc>${lastModified ? `<lastmod>${lastModified}</lastmod>` : ""}</url>`,
    ).join("\n")}\n</urlset>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Sitemap fetch error:", error);

    // try {
    //   await connectDB();
    //   const backup = await SitemapBackup.findOne({}).lean();

    //   if (backup?.content) {
    //     return new NextResponse(backup.content, {
    //       status: 200,
    //       headers: {
    //         "Content-Type": "application/xml",
    //         "Cache-Control": "public, max-age=300",
    //         "X-Sitemap-Source": "backup",
    //       },
    //     });
    //   }
    // } catch (backupError) {
    //   console.error("Sitemap backup fallback error:", backupError);
    // }

    // if (process.env.NEXT_PHASE !== "phase-production-build") throw error;
    return new NextResponse("Error serving sitemap", { status: 500 });
  }
}
