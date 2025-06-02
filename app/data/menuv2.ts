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
   
      url: "/performance-marketing-agency-dubai",
      children: [
        {
          item: "Branding",
          url: "",
        },
        {
          item: "Logo Design",
          url: "",
        },
        {
          item: "Graphic Design",
          url: "",
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
        svg: assets.seo,
        url: "",
        children: [
          {
            item: "Web Development",
            url: "",
          },
          {
            item: "Website Design",
            url: "",
          },
          {
            item: "Mobile App",
            url: "",
          },
          {
            item: "Web Apps",
            url: "",
          },
          {
            item: "Ecommerce Development",
            url: "",
          },
        ],
      },
      {
        item: "DIGITAL MARKETING",
        
        url: "/social-media-agency-dubai",
        children: [
          {
            item: "Performance Marketing",
            url: "",
          },
          {
            item: "Search Engine Optimisation",
            url: "",
          },
          {
            item: "Social Media Services",
            url: "",
          },
          {
            item: "Content Marketing",
            url: "",
          },
          {
            item: "Marketing Automation",
            url: "",
          },
        ],
      },
      {
        item: "Marketing intelligence",
       
        url: "",
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
