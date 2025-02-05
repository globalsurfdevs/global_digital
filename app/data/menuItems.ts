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
        item: "Performance Marketing",
        svg: assets.sem,
        url: "/performance-marketing",
      },
      {
        item: "Search Engine Optimization",
        svg: assets.seo,
        url: "/seo",
      },
      {
        item: "Social Media Service",
        svg: assets.socialMedia,
        url: "/social-media",
      },
      {
        item: "Website Design And Development",
        svg: assets.websiteD,
        url: "/web-design-development",
      },
      {
        item: "Branding And Creatives",
        svg: assets.branding,
        url: "/branding-creative",
      },
      {
        item: "Marketing Intelligence",
        svg: assets.strategy,
        url: "/marketing-intelligence",
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
    children:[
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
