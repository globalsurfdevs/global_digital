import type { NextConfig } from "next";

console.log(process.env.NODE_ENV);

const nextConfig: NextConfig = {
  // htmlLimitedBots: /.*/,
  /* config options here */
  allowedDevOrigins: ["172.16.16.132:3000"],
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
        source: "/performance-marketing", 
        destination: "/performance-marketing-agency-dubai", 
        permanent: true,
      },
      {
        source: "/seo", 
        destination: "/seo-agency-dubai", 
        permanent: true, 
      },
      {
        source: "/social-media", 
        destination: "/social-media-marketing-agency-dubai", 
        permanent: true, 
      },
      {
        source: "/branding-creative", 
        destination: "/creative-agency-dubai", 
        permanent: true, 
      },
      {
        source: "/marketing-intelligence", 
        destination: "/marketing-intelligence-agency-dubai", 
        permanent: true, 
      },
      {
        source: "/portfolio/telal", 
        destination: "/portfolio/telal-engineering-&-contracting", 
        permanent: true, 
      },
      {
        source: "/portfolio/icatch", 
        destination: "/portfolio/icatch-graphics", 
        permanent: true, 
      },
      {
        source: "/portfolio/qieco", 
        destination: "/portfolio/qiecosmart", 
        permanent: true, 
      },
      // {
      //   source: "/social-media-marketing-agency-dubai", 
      //   destination: "/social-media-agency-dubai", 
      //   permanent: true, 
      // },
      // {
      //   source: "/contact-us", 
      //   destination: "/lets-talk", 
      //   permanent: true, 
      // },
      // {
      //   source: "/web-design-development", 
      //   destination: "/web-design-and-development", 
      //   permanent: true, 
      // },
      {
        source: "/portfolio/ayka-property-&-facility-management", 
        destination: "/portfolio/ayka-property-and-facility-management", 
        permanent: true, 
      },
      {
        source: "/portfolio/telal-engineering-&-contracting", 
        destination: "/portfolio", 
        permanent: true, 
      },
      {
        source: "/lets-talk", 
        destination: "/contact-us", 
        permanent: true, 
      },
      {
        source: "/branding", 
        destination: "/branding-agency-dubai", 
        permanent: true, 
      },

      // ================================== Industries ==============================================
      {
        source: "/industry",
        destination: "/industries",
        permanent: true,
      },
      {
        source: "/industry/ecommerce",
        destination: "/industries/lifestyle-retail-digital-marketing",
        permanent: true,
      },
      {
        source: "/industry/ecommerce-digital-marketing",
        destination: "/industries/lifestyle-retail-digital-marketing",
        permanent: true,
      },
      {
        source: "/industry/construction",
        destination: "/industries/construction-digital-marketing",
        permanent: true,
      },
      {
        source: "/industry/b2b",
        destination: "/industries",
        permanent: true,
      },
      {
        source: "/industry/digital-marketing-services",
        destination: "/digital-marketing-services",
        permanent: true,
      },
      {
        source: "/industry/b2b-digital-marketing-services",
        destination: "/industries",
        permanent: true,
      },
      {
        source: "/industry/digital-marketing-agency-for-hospitality",
        destination: "/industries",
        permanent: true,
      },
      // ===============================================================================================
      {
        source:
          "/blogs/poor-sales-try-our-website-redesign-services-for-results",
        destination: "/blogs",
        permanent: true,
      },
      {
        source:
          "/blogs/the-b2b-marketing-trends-to-follow-in-2024-to-overcome-your-b2b-challenges",
        destination: "/blogs",
        permanent: true,
      },
      {
        source:
          "/blogs/social-media-showdown-instagram-threads-vs-twitters-identity-crisis",
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
        destination: "/web-design-development-agency-dubai",
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
      {
        source: "/generative-engine-optimization",
        destination: "/generative-engine-optimization-dubai",
        permanent: true,
      },
      {
        source: "/marketing-strategy-consulting",
        destination: "/marketing-strategy-consulting-dubai",
        permanent: true,
      },
      {
        source: "/web-development-agency-dubai",
        destination: "/web-design-development-agency-dubai",
        permanent: true,
      },
      {
        source: "/web-app-dev-agency",
        destination: "/web-app-development-agency-dubai",
        permanent: true,
      },
      {
        source: "/e-commerce-web-development-company",
        destination: "/e-commerce-web-development-company-dubai",
        permanent: true,
      },
      // =================================== Service Pillar =============================================================================

      {
        source: "/digital-marketing-services",
        destination: "/digital-marketing-services-dubai",
        permanent: true,
      },
      {
        source: "/web-design-and-development",
        destination: "/web-and-app-development-dubai",
        permanent: true,
      },
      {
        source: "/web-design-and-development-agency",
        destination: "/web-and-app-development-dubai",
        permanent: true,
      },
      {
        source: "/creative-agency-dubai",
        destination: "/branding-content-production-agency-dubai",
        permanent: true,
      },
      {
        source: "/marketing-intelligence-agency-dubai",
        destination: "/ai-data-intelligence-agency-dubai",
        permanent: true,
      },
      // =================================== Sub Services =============================================================================
      {
        source: "/ecommerce-seo-dubai",
        destination: "/ecommerce-seo-services-dubai",
        permanent: true,
      },
      {
        source: "/influencer-marketing-agency",
        destination: "/influencer-marketing-agency-dubai",
        permanent: true,
      },
      {
        source: "/local-seo-agency-dubai",
        destination: "/local-seo-services-dubai",
        permanent: true,
      },
      {
        source: "/social-media-management-services",
        destination: "/social-media-management-agency",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
