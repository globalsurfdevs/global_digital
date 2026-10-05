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
        destination: "/performance-marketing-agency-dubai", // updated
        permanent: true,
      },
      {
        source: "/seo", 
        destination: "/seo-agency-dubai", // updated
        permanent: true, 
      },
      {
        source: "/social-media", 
        destination: "/social-media-marketing-agency-dubai", // updated
        permanent: true, 
      },
      {
        source: "/branding-creative", 
        destination: "/branding-content-production-agency-dubai", // updated
        permanent: true, 
      },
      {
        source: "/marketing-intelligence", 
        destination: "/ai-data-intelligence-agency-dubai", // updated
        permanent: true, 
      },
      {
        source: "/portfolio/telal", 
        destination: "/portfolio", // updated
        permanent: true, 
      },
      {
        source: "/portfolio/icatch", 
        destination: "/portfolio/icatch-graphics", 
        permanent: true, 
      },
      {
        source: "/portfolio/qieco", 
        destination: "/portfolio/qiecosmart", // updated
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
        destination: "/portfolio/ayka-property-and-facility-management", // updated
        permanent: true, 
      },
      {
        source: "/portfolio/telal-engineering-&-contracting", 
        destination: "/portfolio", // updated
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
        destination: "/industries", // updated
        permanent: true,
      },
      {
        source: "/industry/ecommerce",
        destination: "/industries/lifestyle-retail-digital-marketing", // updated
        permanent: true,
      },
      {
        source: "/industry/ecommerce-digital-marketing",
        destination: "/industries/lifestyle-retail-digital-marketing", // updated
        permanent: true,
      },
      {
        source: "/industry/construction",
        destination: "/industries/construction-digital-marketing", // updated
        permanent: true,
      },
      {
        source: "/industry/b2b",
        destination: "/industries", // updated
        permanent: true,
      },
      {
        source: "/industry/digital-marketing-services",
        destination: "/digital-marketing-services-dubai",// updated
        permanent: true,
      },
      {
        source: "/industry/b2b-digital-marketing-services",
        destination: "/industries", // updated
        permanent: true,
      },
      {
        source: "/industry/digital-marketing-agency-for-hospitality",
        destination: "/industries", // updated
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
        destination: "/digital-marketing-services-dubai", // updated
        permanent: true,
      },
      {
        source: "/digital-development",
        destination: "/web-design-development-agency-dubai", // updated
        permanent: true,
      },
      {
        source: "/content-and-branding",
        destination: "/branding-content-production-agency-dubai", // updated
        permanent: true,
      },
      {
        source: "/blogs/digital-marketing-services",
        destination: "/digital-marketing-services-dubai", // updated
        permanent: true,
      },
      {
        source: "/instagram-marketing-dubai",
        destination: "/social-media-marketing-dubai", // updated
        permanent: true,
      },
      {
        source: "/google-business-profile-dubai",
        destination: "/local-seo-services-dubai", // updated
        permanent: true,
      },
      {
        source: "/generative-engine-optimization",
        destination: "/generative-engine-optimization-dubai", // updated
        permanent: true,
      },
      {
        source: "/marketing-strategy-consulting",
        destination: "/marketing-automation-agency-dubai", // updated
        permanent: true,
      },
      {
        source: "/web-development-agency-dubai",
        destination: "/web-design-development-agency-dubai",
        permanent: true,
      },
      {
        source: "/web-app-dev-agency",
        destination: "/web-app-development-agency-dubai", // updated
        permanent: true,
      },
      {
        source: "/e-commerce-web-development-company",
        destination: "/e-commerce-web-development-company-dubai", // updated
        permanent: true,
      },
      {
        source: "/web-design-agency-dubai",
        destination: "/web-design-development-agency-dubai",// updated
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
        destination: "/web-design-development-agency-dubai",//updated
        permanent: true,
      },
      {
        source: "/web-design-and-development-agency",
        destination: "/web-design-development-agency-dubai",//updated
        permanent: true,
      },
      {
        source: "/creative-agency-dubai",
        destination: "/branding-content-production-agency-dubai", //updated
        permanent: true,
      },
      {
        source: "/marketing-intelligence-agency-dubai",
        destination: "/ai-data-intelligence-agency-dubai", // updated
        permanent: true,
      },
      // =================================== Sub Services =============================================================================
      {
        source: "/ecommerce-seo-dubai",
        destination: "/ecommerce-seo-services-dubai", // updated
        permanent: true,
      },
      {
        source: "/influencer-marketing-agency",
        destination: "/influencer-marketing-agency-dubai", // updated
        permanent: true,
      },
      {
        source: "/local-seo-agency-dubai",
        destination: "/local-seo-services-dubai", // updated
        permanent: true,
      },
      {
        source: "/social-media-management-services",
        destination: "/social-media-management-agency",
        permanent: true,
      },
      {
        source: "/branding-agency-dubai",
        destination: "/branding-and-positioning-agency-dubai", // updated
        permanent: true,
      },
      {
        source: "/graphic-design-agency-dubai",
        destination: "/branding-content-production-agency-dubai", // updated
        permanent: true,
      },
      {
        source: "/digital-marketing-service-kuwait",
        destination: "/digital-marketing-services-dubai", // updated
        permanent: true,
      },
      {
        source: "/engineering-and-infrastructure",
        destination: "/industries/engineering-infrastructure-digital-marketing", // updated
        permanent: true,
      },
      {
        source: "/free-digital-marketing-audit",
        destination: "/", // updated
        permanent: true,
      },
      {
        source: "/logo-design-agency-dubai",
        destination: "/branding-and-positioning-agency-dubai", // updated
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
