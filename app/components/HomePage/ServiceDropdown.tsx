"use client";
import React, { useState } from "react";
import { assets } from "@/public/assets/assets";
import menuright from "@/public/assets/menurightarrow.svg";
import Image from "next/image";

type ServiceItem = { text: string; url?: string };
type ServiceCategory = {
  titleurl?: string;
  [serviceName: string]: ServiceItem | string | undefined;
};
type ServiceData = {
  [category: string]: ServiceCategory;
};

const serviceData: ServiceData = {
  "Creative Services": {
    titleurl: "/creative-agency-dubai",
    Branding: {
      text: 'Shape perceptions<span class="text-[#E43D30]">.</span><br> Build premium trust',
      url: "/branding-agency-dubai",
    },
    "Logo Design": {
      text: "Iconic marks for market leaders",
      url: "/logo-design-agency-dubai",
    },
    "Graphic Design": {
      text: "Visuals that sell your story",
      url: "/graphic-design-agency-dubai",
    },
    Copywriting: {
      text: "Words that compel, convince, convert",
    },
    "Content Production": {
      text: "Strategic content with luxury appeal",
    },
  },
  "Web Design & Development": {
    titleurl: "/web-design-and-development",
    "Web Development": {
      text: "Engineered to perform and impress",
      url: "/web-development-agency-dubai",
    },
    "Website Design": {
      text: "Sleek, intuitive, brand-rich experiences",
      url: "/web-design-agency-dubai",
    },
    "Mobile App": {
      text: 'Powerful apps<span class="text-[#E43D30]">.</span> Premium user journeys',
      url: "/mobile-app-development-company-dubai",
    },
    "Web Apps": {
      text: "Custom tools built for growth",
      url: "/web-app-dev-agency",
    },
    "Ecommerce Development": {
      text: 'Sell smarter<span class="text-[#E43D30]">.</span><br> Scale elegantly online',
      url: "/e-commerce-web-development-company",
    },
  },
  "Digital Marketing": {
   
    "Performance Marketing": {
      text: 'Precision-driven campaigns<span class="text-[#E43D30]">.</span> Measurable returns',
      url: "/performance-marketing-agency-dubai",
    },
    "Search Engine Optimisation": {
      text: 'Rank higher<span class="text-[#E43D30]">.</span> Attract better leads',
      url: "/seo-agency-dubai",
    },
    "Social Media Services": {
      text: 'Engage audiences<span class="text-[#E43D30]">.</span> Grow influence daily',
      url: "/social-media-agency-dubai",
    },
    "Content Marketing": {
      text: "Authority content that builds demand",
    },
  },
  "Marketing Intelligence": {
    titleurl: "/marketing-intelligence-agency-dubai ",
    "Data & Analytics": {
      text: "Insights that sharpen every decision",
    },
    "Strategy Consulting": {
      text: 'Big-picture clarity<span class="text-[#E43D30]">.</span> Scalable solutions',
    },
    "Conversion Rate Optimization (CRO)": {
      text: "Turn traffic into loyal clients",
    },
    "Marketing Automation": {
      text: "Smart systems that drive growth",
    },
  },
};

const ServicesMegaMenu = () => {
  const defaultCategory = "Creative Services";
  const defaultTitle = "Logo Design";

  const [activeItem, setActiveItem] = useState<[string, string]>([
    defaultCategory,
    defaultTitle,
  ]);

  const handleHover = (category: string, title: string) => {
    setActiveItem([category, title]);
  };

  const getActiveText = () => {
    const [category, title] = activeItem;
    const item = serviceData[category]?.[title] as ServiceItem | undefined;
    return item?.text ?? "";
  };

  return (
    <div className="relative group inline-block">
      {/* Mega Menu Dropdown */}
      <div className="absolute left-0 right-0 z-50 w-screen bg-black text-white">
        <div className="w-full mx-auto px-8 xxl:py-[80px] py-[30px] flex justify-between items-center xxl:pl-[150px] lg:pl-[50px]">
          {/* Header Section */}
          <div className="w-1/3">
            <h2
              className="xxl:text-[48px] lg:text-[35px] xxl:leading-[60px] lg:leading-[50px] mb-4 transition-all duration-300"
              dangerouslySetInnerHTML={{
                __html: getActiveText() + '<span class="text-[#E43D30]">.</span>',
              }}
            />
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-3 xxl:gap-10 gap-6 w-full pl-[130px]">
            {Object.entries(serviceData).map(([category, items]) => {
              const { titleurl, ...services } = items;
              return (
                <div key={category} className="group w-full">
                  <div className="flex items-center xxl:mb-[30px] mb-[20px]">
                    <h4
                      className={`font-[400] uppercase xxl:text-font19 text-[15px] pr-[16px] ${
                        activeItem[0] === category ? "text-[#E43D30]" : "text-white"
                      }`}
                    >
                      {titleurl ? (
                        <a href={titleurl}>{category}</a>
                      ) : (
                        category
                      )}
                    </h4>
                    <Image
                      src={menuright}
                      alt="arrow"
                      className="m-0 p-0"
                      style={{
                        filter:
                          activeItem[0] === category
                            ? "invert(36%) sepia(92%) saturate(7492%) hue-rotate(349deg) brightness(97%) contrast(97%)"
                            : "",
                      }}
                    />
                  </div>
                  <ul className="space-y-2">
                    {Object.entries(services).map(([title, data]) => {
                      const item = data as ServiceItem;
                      const isActive =
                        activeItem[0] === category && activeItem[1] === title;
                      return (
                        <li
                          key={title}
                          onMouseEnter={() => handleHover(category, title)}
                          className={`cursor-pointer xxl:text-font19 text-[14px] transition-opacity duration-200 ${
                            isActive
                              ? "text-white opacity-100"
                              : "text-white opacity-60 hover:opacity-100"
                          }`}
                        >
                          <a href={item.url}>{title}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesMegaMenu;
