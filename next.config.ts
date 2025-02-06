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
    ];
  },
};

export default nextConfig;
