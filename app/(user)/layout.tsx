import type { Metadata } from "next";
import "../../app/globals.css";
import HeaderSwitcher from "@/app/components/HomePage/HeaderSwitcher";
import { getNavServices } from "@/app/lib/services/get-nav-services";

import Breadcrumb from "../components/HomePage/BreadcrumbSchema";
import { Space_Grotesk } from "next/font/google";
import Footer from "@/app/components/HomePage/Footer";
import Script from "next/script";
import { usePathname } from "next/navigation";
import ZohoChat from "../components/common/ZohoChat";
import { siteMetadata } from "../seo/metadata";
import { organizationSchema } from "../seo/schemas";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// export const dynamic = "force-dynamic";

export const metadata = siteMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = await getNavServices();
  const OPENAI_PIXEL_ID = "8WbMm1MBuRkNWvVvEV8toy";

  return (
    <div className={spaceGrotesk.className}>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-TVWCC3XC"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      {/* Google Tag Manager Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TVWCC3XC');`,
        }}
      />
      {/* OpenAi Pixel_Id */}
      <Script
        id="openai-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function (w, d, s, u) {
  if (w.oaiq) return;
  var q = function () { q.q.push(arguments); };
  q.q = [];
  w.oaiq = q;
  var js = d.createElement(s);
  js.async = true;
  js.src = u;
  var f = d.getElementsByTagName(s)[0];
  f.parentNode.insertBefore(js, f);
})(window, document, "script", "https://bzrcdn.openai.com/sdk/oaiq.min.js");
oaiq("init", { pixelId: "${OPENAI_PIXEL_ID}" });`,
        }}
      />
      {/* <Script>
  (function (w, d, s, u) {
    if (w.oaiq) return;
    var q = function () {
      q.q.push(arguments);
    };
    q.q = [];
    w.oaiq = q;
    var js = d.createElement(s);
    js.async = true;
    js.src = u;
    var f = d.getElementsByTagName(s)[0];
    f.parentNode.insertBefore(js, f);
  })(window, document, "script", "https://bzrcdn.openai.com/sdk/oaiq.min.js");

  oaiq("init", {
    pixelId: ,
  });
 </Script> */}
      {/* <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        /> */}
      {/* <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        /> */}
      <script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <HeaderSwitcher navigation={navigation} />
      <div className="mbcs-63">{children}</div>
      <Footer />
      <Breadcrumb />
      {/* <Script
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
        ></Script> */}

      <ZohoChat />
    </div>
  );
}
