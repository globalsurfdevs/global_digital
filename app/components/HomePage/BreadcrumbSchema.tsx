"use client";

import { usePathname } from "next/navigation";
import React from "react";

const BreadcrumbSchema = () => {
  const pathname = usePathname();

  // Skip home page + performance marketing page
  const excludedPaths = ["/", "/performance-marketing-agency-dubai"];

  // Obsolete /old-service/* copies canonicalise to the real service pages, and
  // /old-service itself is a 404, so an auto trail there would link to a 404.
  const excludedPrefixes = ["/old-service/"];

  if (
    excludedPaths.includes(pathname) ||
    excludedPrefixes.some((prefix) => pathname.startsWith(prefix))
  )
    return null;

  const baseUrl = "https://www.globalsurf.ae";

  // Split the URL path (remove empty strings)
  const segments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items dynamically
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "WebSite",
        "@id": `${baseUrl}/`,
        name: "Home",
      },
    },
    ...segments.map((segment, index) => {
      const name = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "); // e.g. "web-development" -> "Web Development"

      const url = `${baseUrl}/${segments.slice(0, index + 1).join("/")}`;

      return {
        "@type": "ListItem",
        position: index + 2,
        item: {
          "@type": "WebPage",
          "@id": url,
          name: name,
        },
      };
    }),
  ];

  const schemaData = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  // Plain <script> so the JSON-LD is in the server-rendered HTML for every
  // crawler; next/script "afterInteractive" only injected it after hydration.
  // "<" is escaped so a crafted URL can't close the script tag.
  return (
    <script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData).replace(/</g, "\\u003c"),
      }}
    />
  );
};

export default BreadcrumbSchema;
