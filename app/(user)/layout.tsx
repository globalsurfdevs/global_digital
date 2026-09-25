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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "GS Digital",
    template: "%s | GS Digital", // page title will be: "Page Title | Global Surf Digital"
  },
  description: "Full-service digital marketing agency in Dubai.",
  other: {
    "linkedin-domain-verification": "cd0771a6-efa9-4299-a6d6-35ba3450f6e0",
  },
};

//  Old Organization Schema
// const organizationSchema = {
//   "@context": "https://schema.org",
//   "@type": "Organization",
//   name: "GS Digital",
//   url: "https://www.globalsurf.ae/",
//   logo: "https://www.globalsurf.ae/gs-digital-logo.svg",
//   description:
//     "GS Digital Media is a premium full-service digital marketing agency in Dubai, specializing in SEO, performance marketing, social media marketing, and web design and development.",
//   slogan: "Master Every Pixel of Your Digital Presence",
//   foundingDate: "2013",
//   address: {
//     "@type": "PostalAddress",
//     streetAddress: "P.O.Box 13653, 901 - SIT Tower, DSO",
//     addressLocality: "DSO",
//     addressRegion: "Dubai",
//     postalCode: "13653",
//     addressCountry: "AE",
//   },
//       "@type": "Country",
//       openingHoursSpecification: [
//         "Monday – Friday, 8:00 – 18:00",
//       ],
//       hasmap:
//       geo: {
//         "@type": "GeoCoordinates",
//         latitude: "25.1177885",
//       },
//     },
//   contactPoint: {
//     "@type": "ContactPoint",
//     contactType: "customer service",
//     areaServed: "AE",
//   },
//   aggregateRating: {
//     ratingValue: "5",
//     reviewCount: "6",
//   },
//   review: [
//       "@type": "Review",
//       author: {
//         name: "Karim El Shennawy",
//       },
//         "Global Surf proved to be talented group that delivered their project in excellent manner. They are responsive, and we trusted them day by day with more tasks and they continue to prove their capabilities.",
//       "@type": "Review",
//         "@type": "Person",
//         name: "Alissar Nasrallah",
//       description:
{
  process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID && (
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
oaiq("init", { pixelId: "${process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID}" });`,
      }}
    />
  );
}
//     },
//     {
//       "@type": "Review",
//       author: {
//         "@type": "Person",
//         name: "Hesham Abdeen",
//       },
//       description:
//         "Because of the way that Global Surf encourages collaboration, working with the team has been a pleasure. Their staff welcomes our input and fosters open communication, which has led to a website that reflects our brand and serves our particular demands. Global Surf offers a plethora of knowledge and creativity.",
//     },
//     {
//       "@type": "Review",
//       author: {
//         "@type": "Person",
//         name: "Omar M. Bin Dhaher Almheiri",
//       },
//       description:
//         "We have vary good relation and experience with your professional company Not to mention the extra care we get from your team We like this relationship to continue for the success of both of us",
//     },
//   ],
//   sameAs: [
//     "https://www.facebook.com/globalsurf.digital",
//     "https://www.instagram.com/globalsurf.digital/",
//     "https://x.com/GlobalSurf_D",
//     "https://www.linkedin.com/company/globalsurfdigital",
//     "https://www.tiktok.com/@globalsurf.digital",
//   ],
// };

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GS Digital",
  legalName: "Global Surf Digital Media L.L.C",
  url: "https://www.globalsurf.ae/",
  logo: "https://www.globalsurf.ae/gs-digital-logo.svg",
  description:
    "GS Digital Media is a premium full-service digital marketing agency in Dubai, specializing in SEO, performance marketing, social media marketing, and web design and development.",
  telephone: "+971-4-582-1133",
  email: "hello@globalsurf.ae",
  sameAs: [
    "https://www.facebook.com/globalsurf.digital/",
    "https://www.instagram.com/globalsurf.digital/",
    "https://x.com/GlobalSurf_D",
    "https://www.linkedin.com/company/globalsurfdigital",
    "https://www.tiktok.com/@globalsurf.digital",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "P.O. Box 13653, 901 - SIT Tower, Dubai Silicon Oasis",
    addressLocality: "Dubai",
    addressCountry: {
      "@type": "Country",
      name: "AE",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = await getNavServices();

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
      {process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID && (
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
oaiq("init", { pixelId: "8WbMm1MBuRkNWvVvEV8toy" });`,
          }}
        />
      )}
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
