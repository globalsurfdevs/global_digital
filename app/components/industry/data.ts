import { assets } from "@/public/assets/assets";
import { url } from "inspector";

export const BannerSection = [
  {
    id: 1,
    image: assets.inbanner,
    navigation: [
      { label: "Home", url: "/" },
      { label: "Industry",url: "/industry" },
    ],
    heroAlt: "Industry-Focused Digital Solutions ",

    title: "Digital Marketing Services for Key Industries in Dubai & the UAE",
    subtitle:
      "We help organisations across complex industries attract high-intent audiences, influence buying decisions, and convert digital demand into measurable revenue growth.",

    sub: [
      {
        stitle: "OUR APPROACH",
        buttonTitle :"Start Your Project",
        desc: "Every industry follows a different buying journey. At Global Surf Digital, we analyse how buyers in each sector search for solutions, evaluate suppliers and move toward final decisions.<br>From procurement led industries with long evaluation cycles to consumer markets with faster decision paths, our industry specific digital marketing approach aligns digital execution with real buying behaviour. This helps organisations generate qualified demand and convert digital engagement into revenue-generating leads, enquiries, and contracts. ",
      },
    ],
  },
];
export const services = [
  {
    id: "1",
    image: "/assets/industry/industry1.jpg",
    title: "Engineering",
    url: "",
    description:
      "From streamlined project management to integrated design workflows, our solutions keep your teams precise, connected, and always on track.",

  },
  {
    id: "2",
    image: "/assets/industry/industry2.jpg",
    title: "Education",
    url: "",
    description:
      "We partner with institutions to create intuitive digital tools from learning platforms to student portals that enhance access and engagement across every level.",

  },
  {
    id: "3",
    image: "/assets/industry/industry3.jpg",
    title: "Hospitality ",
    url: "",
    description:
      "Deliver seamless guest experiences with smarter booking systems, personalized journeys, and backend tools that elevate efficiency behind the scenes.",

  },
  {
    id: "4",
    image: "/assets/industry/industry4.jpg",
    title: "Construction",
    url: "",
    description:
      "Built for collaboration and control, our digital tools align teams, manage resources, and ensure on-time, on-budget project delivery.",

  },
  {
    id: "5",
    image: "/assets/industry/industry5.jpg",
    title: "E-commerce",
    url: "",
    description:
      "We craft high-performance platforms that make shopping effortless from discovery to checkout, while optimizing every step of the sales journey.",

  },
  {
    id: "6",
    image: "/assets/industry/industry6.jpg",
    title: "Fashion",
    url: "",
    description:
      "We help fashion brands go digital with sleek storefronts, customer insight tools, and marketing that keeps them ahead of the curve. ",

  },
  {
    id: "7",
    image: "/assets/industry/industry7.jpg",
    title: "Information Technology",
    url: "",
    description:
      "Our scalable, secure solutions from cloud to cybersecurity empower IT teams to move fast, innovate, and stay focused on what’s next.",

  },
  {
    id: "8",
    image: "/assets/industry/industry8.jpg",
    title: "Manufacturing",
    url: "",
    description:
      "Digitize production and simplify operations with smart systems that boost efficiency, reduce waste, and maintain momentum.",

  },
  {
    id: "9",
    image: "/assets/industry/industry9.jpg",
    title: "Retail",
    url: "",
    description:
      "Create seamless cross-channel experiences with integrated POS, inventory, and customer engagement tools online and in-store.",

  },
  {
    id: "10",
    image: "/assets/industry/industry10.jpg",
    title: "B2B",
    url: "",
    description:
      "We design tailored digital solutions that streamline complex workflows, support long sales cycles, and help you close with confidence.",

  },
];
export const Cta = [
  {
      textred: "Tell us about your business ",
      text:"and we'll show you how we'd approach it."
  }
]
export const IndustriesWeServe = {
  title: "Industries We Serve",
  subttle: "Our work spans multiple industries, each with distinct market dynamics and decision processes.",
  data: [
   
    {
      id: 1,
      icon: assets.ini4,
      title: "Construction",
      hoverImg: assets.inds4,
      desc: "Improve visibility during early tender research, influence procurement decisions, and generate high-value project enquiries.",
      url: "/industry/construction",
    },
    {
      id: 2,
      icon: assets.ini3,
      title: "Hospitality ",
      hoverImg: assets.inds3,
      desc: "Deliver seamless guest experiences with smarter booking systems, personalized journeys, and backend tools that elevate efficiency behind the scenes.  ",
      url: "/industry/digital-marketing-agency-for-hospitality",
    },
    {
      id: 3,
      icon: assets.ini5,
      title: "E-commerce   ",
      hoverImg: assets.inds5,
      desc: "We craft high-performance platforms that make shopping effortless from discovery to checkout, while optimizing every step of the sales journey.  ",
      url: "/industry/ecommerce-digital-marketing",
    },
    
    {
      id: 4,
      icon: assets.ini10,
      title: "B2B and Industrial",
      hoverImg: assets.inds10,
      desc: "Generate pipeline from decision-makers navigating complex procurement cycles and position your brand before the shortlist is made.",
      url: "/industry/b2b-digital-marketing-services",
    },
     {
      id: 5,
      icon: assets.ini1,
      title: "Engineering  ",
      hoverImg: assets.inds1,
      desc: "From streamlined project management to integrated design workflows, our solutions keep your teams precise, connected, and always on track. ",
      url: "",
    },
    {
      id: 6,
      icon: assets.ini2,
      title: "Education  ",
      hoverImg: assets.inds2,
      desc: " We partner with institutions to create intuitive digital tools from learning platforms to student portals that enhance access and engagement across every level. ",
      url: "",
    }, 
    {
      id: 7,
      icon: assets.ini6,
      title: "Fashion  ",
      hoverImg: assets.inds6,
      desc: "We help fashion brands go digital with sleek storefronts, customer insight tools, and marketing that keeps them ahead of the curve. ",
      url: "",
    },
    {
      id: 8,
      icon: assets.ini7,
      title: "Information Technology ",
      hoverImg: assets.inds7,
      desc: "Our scalable, secure solutions from cloud to cybersecurity empower IT teams to move fast, innovate, and stay focused on what’s next. ",
      url: "",
    },
    {
      id: 9,
      icon: assets.ini8,
      title: "Manufacturing  ",
      hoverImg: assets.inds8,
      desc: "Digitize production and simplify operations with smart systems that boost efficiency, reduce waste, and maintain momentum. ",
      url: "",
    },
    {
      id: 10,
      icon: assets.ini9,
      title: "Retail  ",
      hoverImg: assets.inds9,
      desc: "Create seamless cross-channel experiences with integrated POS, inventory, and customer engagement tools online and in-store. ",
      url: "",
    },
    {
      id: 11,
      icon: assets.ini12,
      title: "Real Estate",
      hoverImg: assets.realestate,
      desc: "Attract serious property buyers, improve enquiry quality, and strengthen sales conversion across competitive project launches and off-plan developments.",
      url: "",
    },
    {
      id: 12,
      icon: assets.ini13,
      title: "Corporate and Professional Services",
      hoverImg: assets.corporateservices,
      desc: "Build authority within your sector, strengthen thought leadership, and influence decision makers during extended evaluation stages.",
      url: "",
    },
  ],
};
