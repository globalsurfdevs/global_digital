import type { NextConfig } from "next";

console.log(process.env.NODE_ENV);

const nextConfig: NextConfig = {
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
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
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
      {
        source: "/contact-us", // The old URL path
        destination: "/lets-talk", // The new URL path
        permanent: true, // Set to true for 301 (permanent) redirect
      },
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
    ];
  },
};

export default nextConfig;
