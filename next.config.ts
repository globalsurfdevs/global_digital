import type { NextConfig } from "next";

console.log(process.env.NODE_ENV);

const nextConfig: NextConfig = {
  // htmlLimitedBots: /.*/,
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        port: "",
        pathname: "/public/**",
      },
      {
        protocol: "https",
        hostname: "dl.dropboxusercontent.com",
        port: "",
        pathname: "/scl/**",
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // ✅ HEADERS (moved here)
  // async headers() {
  //   return [
  //     {
  //       source: "/:all*(svg|webp|avif|gif|ico|woff|woff2|ttf|otf|js|css)",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "public, max-age=31536000, immutable",
  //         },
  //       ],
  //     },
  //   ];
  // },
  async redirects() {
    return [
      {
        source: "/performance-marketing", // The old URL path
        destination: "/performance-marketing-agency-dubai", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
      {
        source: "/seo", // The old URL path
        destination: "/seo-agency-dubai", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
      {
        source: "/social-media", // The old URL path
        destination: "/social-media-marketing-agency-dubai", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
      {
        source: "/branding-creative", // The old URL path
        destination: "/creative-agency-dubai", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
      {
        source: "/marketing-intelligence", // The old URL path
        destination: "/marketing-intelligence-agency-dubai", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
      {
        source: "/portfolio/telal", // The old URL path
        destination: "/portfolio/telal-engineering-&-contracting", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
      {
        source: "/portfolio/icatch", // The old URL path
        destination: "/portfolio/icatch-graphics", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
      {
        source: "/portfolio/qieco", // The old URL path
        destination: "/portfolio/qiecosmart", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
      // {
      //   source: "/social-media-marketing-agency-dubai", // The old URL path
      //   destination: "/social-media-agency-dubai", // The new URL path
      //   permanent: true, // Set to true for 301 (permanent) redirect
      // },
      // {
      //   source: "/contact-us", // The old URL path
      //   destination: "/lets-talk", // The new URL path
      //   permanent: true, // Set to true for 301 (permanent) redirect
      // },
      // {
      //   source: "/web-design-development", // The old URL path
      //   destination: "/web-design-and-development", // The new URL path
      //   permanent: true, // Set to true for 301 (permanent) redirect
      // },
      {
        source: "/portfolio/ayka-property-&-facility-management", // The old URL path
        destination: "/portfolio/ayka-property-and-facility-management", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
      {
        source: "/portfolio/telal-engineering-&-contracting", // The old URL path
        destination: "/portfolio/telal-engineering-and-contracting", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
      {
        source: "/lets-talk", // The old URL path
        destination: "https://www.globalsurf.ae", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
      {
        source: "/branding", // The old URL path
        destination: "/branding-agency-dubai", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
      {
        source: "/industry/ecommerce", // The old URL path
        destination: "/industry/ecommerce-digital-marketing", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
      {
        source: "/industry/b2b", // The old URL path
        destination: "/industry/b2b-digital-marketing-services", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
      {
        source: "/industry/digital-marketing-services", // The old URL path
        destination: "/digital-marketing-services", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
      {
        source: "/blogs/poor-sales-try-our-website-redesign-services-for-results",
        destination: "/web-development-agency-dubai",
        permanent: true,
      },
      {
        source: "/blogs/the-b2b-marketing-trends-to-follow-in-2024-to-overcome-your-b2b-challenges",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blogs/social-media-showdown-instagram-threads-vs-twitters-identity-crisis",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/digital-marketing",
        destination: "/digital-marketing-services",
        permanent: true,
      },
      {
        source: "/digital-development",
        destination: "/web-development-agency-dubai",
        permanent: true,
      },
      {
        source: "/content-and-branding",
        destination: "/creative-agency-dubai",
        permanent: true,
      },
      {
        source: "/blogs/digital-marketing-services",
        destination: "/digital-marketing-services",
        permanent: true,
      },
      {
        source: "/instagram-marketing-dubai",
        destination: "/social-media-marketing-dubai",
        permanent: true,
      },
      {
        source: "/google-business-profile-dubai",
        destination: "/local-seo-agency-dubai",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
