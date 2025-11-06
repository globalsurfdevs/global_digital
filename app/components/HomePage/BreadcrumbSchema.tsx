"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import React from "react";

const BreadcrumbSchema = () => {
  const pathname = usePathname();

  // Skip home page
  if (pathname === "/") return null;

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
      const name =
        segment
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

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
};

export default BreadcrumbSchema;
