"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

// Add any path you want the chat widget hidden on.
const EXCLUDED_PATHS = ["/digital-growth-landing-page","/growth-partnership"];

export default function ZohoChat() {
  const pathname = usePathname();

  const isExcluded = EXCLUDED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isExcluded) return null;

  return (
    <>
      <Script
        id="zoho-salesiq"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.$zoho=window.$zoho || {};
            $zoho.salesiq = $zoho.salesiq || {
              ready: function() {}
            };
          `,
        }}
      />

      <Script
        id="zsiqscript"
        strategy="lazyOnload"
        src="https://salesiq.zohopublic.com/widget?wc=siqd36091b63288ec869166f3cf467a881309d2a521f748c31baf5dcb110565240345bcd627f6be5997ac154cc2af1056c5"
        defer
      ></Script>
    </>
  );
}