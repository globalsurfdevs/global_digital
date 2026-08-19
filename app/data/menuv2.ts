import { assets } from "@/public/assets/assets";

export const menuItems = [
  {
    item: "ABOUT",
    url: "/about-us",
  },
  {
    item: "SERVICES",
    children: [
      {
        item: "DIGITAL MARKETING",
        url: "/digital-marketing-services",
        children: [
          {
            item: "SEO",
            url: "/seo-agency-dubai",
          },
          {
            item: "AI Search Visibility (GEO)",
            url: "/generative-engine-optimization-dubai",
          },
          {
            item: "Performance Marketing",
            url: "/performance-marketing-agency-dubai",
          },
          {
            item: "Social Media",
            url: "/social-media-agency-dubai",
          },
          {
            item: "Content Marketing",
            url: "/content-marketing-agency-dubai",
          },
          {
            item: "Marketing Strategy Consulting",
            url: "/marketing-strategy-consulting-dubai",
          },
        ],
      },

      {
        item: "WEB & APP DEVELOPMENT",
        url: "",
        children: [
          {
            item: "Web Development",
            url: "/web-design-development-agency-dubai",
          },
          {
            item: "Mobile App Development",
            url: "/mobile-app-development-company-dubai",
          },
          {
            item: "Web App Development",
            url: "/web-app-development-agency-dubai",
          },
          {
            item: "E-Commerce Development",
            url: "/e-commerce-web-development-company-dubai",
          },
        ],
      },

      {
        item: "BRANDING & CONTENT PRODUCTION",
        url: "/creative-agency-dubai",
        children: [
          {
            item: "Copywriting & Messaging",
            url: "/creative-copywriting-agency-dubai",
          },
          {
            item: "Photography & Video Production",
            url: "/content-production-agency-dubai",
          },
          {
            item: "Branding and Positioning",
            url: "/branding-and-positioning-agency-dubai",
          },
        ],
      },

      {
        item: "AI, DATA & INTELLIGENCE",
        url: "/marketing-intelligence-agency-dubai",
        children: [
          {
            item: "Conversion Rate Optimization",
            url: "/conversion-rate-optimization-agency-dubai",
          },
          {
            item: "Data, Analytics & Performance Dashboards",
            url: "/data-analytics-services-dubai",
          },
          {
            item: "Marketing Automation & MarTech Consulting",
            url: "/marketing-automation-agency-dubai",
          },
        ],
      },
    ],
    url: "#",
  },
  {
    item: "PORTFOLIO",
    url: "/portfolio",
  },
  {
    item: "INSIGHT",
    children: [
      {
        item: "Blogs",
        svg: assets.blog,
        url: "/blogs",
      },
      {
        item: "Case Studies",
        svg: assets.casestudy,
        url: "/case-study",
      },
    ],
    url: "#",
  },
  {
    item: "CAREERS",
    url: "/careers",
  },
];
