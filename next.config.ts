// next.config.ts
import type { NextConfig } from "next";

// ✅ FIX 1: Removed console.log from config — runs on every server start in prod

const nextConfig: NextConfig = {

  // ✅ FIX 2: Enable compression — was missing entirely
  compress: true,

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

    // ✅ FIX 3: CRITICAL — remove unoptimized: true
    // This was disabling ALL Next.js image optimization (WebP, AVIF, resizing)
    // for every single image on the site. This alone can cost 20+ points on mobile.
    // unoptimized: true,  ← DELETE THIS

    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment", // ✅ FIX 4: Required when allowing SVG — prevents XSS
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // ✅ FIX 5: Add modern formats — serves AVIF/WebP automatically
    formats: ["image/avif", "image/webp"],

    // ✅ FIX 6: Define device sizes to avoid unnecessary image variants
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],

    // ✅ FIX 7: Cache optimized images for 1 year
    minimumCacheTTL: 31536000,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // ✅ Already correct
  },

  // ✅ FIX 8: Tree-shake heavy packages — reduces JS bundle size
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
    ],
  },

  async headers() {
    return [
      // ✅ FIX 9: Static assets — 1 year cache (your current rule, kept)
      {
        source: "/:all*(svg|webp|avif|gif|ico|woff|woff2|ttf|otf|js|css|png|jpg|jpeg|mp4)",
        // ✅ Added png|jpg|jpeg|mp4 — these were missing from your original
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // ✅ FIX 10: HTML pages — no long cache (content changes)
      {
        source: "/((?!_next/static|_next/image|favicon.ico).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=300",
            // Serves cached HTML for 60s, revalidates in background for 5min
          },
        ],
      },

      // ✅ FIX 11: Security headers — improves Best Practices score in PageSpeed
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  // ✅ Redirects unchanged — already correct
  async redirects() {
    return [
      { source: "/performance-marketing", destination: "/performance-marketing-agency-dubai", permanent: true },
      { source: "/seo", destination: "/seo-agency-dubai", permanent: true },
      { source: "/social-media", destination: "/social-media-marketing-agency-dubai", permanent: true },
      { source: "/branding-creative", destination: "/creative-agency-dubai", permanent: true },
      { source: "/marketing-intelligence", destination: "/marketing-intelligence-agency-dubai", permanent: true },
      { source: "/portfolio/telal", destination: "/portfolio/telal-engineering-&-contracting", permanent: true },
      { source: "/portfolio/icatch", destination: "/portfolio/icatch-graphics", permanent: true },
      { source: "/portfolio/qieco", destination: "/portfolio/qiecosmart", permanent: true },
      { source: "/portfolio/ayka-property-&-facility-management", destination: "/portfolio/ayka-property-and-facility-management", permanent: true },
      { source: "/portfolio/telal-engineering-&-contracting", destination: "/portfolio/telal-engineering-and-contracting", permanent: true },
      { source: "/lets-talk", destination: "https://www.globalsurf.ae", permanent: true },
      { source: "/branding", destination: "/branding-agency-dubai", permanent: true },
      { source: "/blog/social-media-showdown-instagram-threads-vs-twitters-identity-crisis", destination: "/blogs/social-media-showdown-instagram-threads-vs-twitters-identity-crisis", permanent: true },
      { source: "/industry/ecommerce", destination: "/industry/ecommerce-digital-marketing", permanent: true },
      { source: "/industry/b2b", destination: "/industry/b2b-digital-marketing-services", permanent: true },
    ];
  },
};

export default nextConfig;