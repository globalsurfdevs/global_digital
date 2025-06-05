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
      item: "CREATIVE SERVICES",
   
      url: "/creative-agency-dubai",
      children: [
        {
          item: "Branding",
          url: "/branding-agency-dubai",
        },
        {
          item: "Logo Design",
          url: "/logo-design-agency-dubai",
        },
        {
          item: "Graphic Design",
          url: "/graphic-design-agency-dubai",
        },
        {
          item: "Copywriting",
          url: "",
        },
        {
          item: "Content Production",
          url: "",
        },  
      ],
    },
      {
        item: "Web Design & Development",
    
        url: "/web-design-and-development",
        children: [
          {
            item: "Web Development",
            url: "/web-development-agency-dubai",
          },
          {
            item: "Website Design",
            url: "/web-design-agency-dubai",
          },
          {
            item: "Mobile App",
            url: "/mobile-app-development-company-dubai",
          },
          {
            item: "Web Apps",
            url: "/web-app-dev-agency",
          },
          {
            item: "Ecommerce Development",
            url: "/e-commerce-web-development-company",
          },
        ],
      },
      {
        item: "DIGITAL MARKETING",
        
        url: "",
        children: [
          {
            item: "Performance Marketing",
            url: "/performance-marketing-agency-dubai",
          },
          {
            item: "Search Engine Optimisation",
            url: "/seo-agency-dubai",
          },
          {
            item: "Social Media Services",
            url: "/social-media-agency-dubai",
          }
          
        ],
      },
      {
        item: "Marketing intelligence",
       
        url: "/marketing-intelligence-agency-dubai ",
        children: [
          {
            item: "Data & Analytics",
            url: "",
          },
          {
            item: "Strategy Consulting",
            url: "",
          },
          {
            item: "Conversion Rate Optimization (CRO)",
            url: "",
          },
          {
            item: "Marketing Automation",
            url: "",
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
