"use client";
import React, { useState } from "react";

type ServiceItem = { text: string };
type ServiceCategory = {
  [serviceName: string]: ServiceItem;
};
type ServiceData = {
  [category: string]: ServiceCategory;
};

const serviceData: ServiceData = {
  "Creative Services": {
    Branding: {
      text: 'Shape perceptions<span class="text-[#E43D30]">.</span><br> Build premium trust',
    },
    "Logo Design": {
      text: "Iconic marks for market leaders",
    },
    "Graphic Design": {
      text: "Visuals that sell your story",
    },
    Copywriting: {
      text: "Words that compel, convince, convert",
    },
    "Content Production": {
      text: "Strategic content with luxury appeal",
    },
  },
  "Web Design & Development": {
    "Web Development": {
      text: "Engineered to perform and impress",
    },
    "Website Design": {
      text: "Sleek, intuitive, brand-rich experiences",
    },
    "Mobile App": {
      text: 'Powerful apps<span class="text-[#E43D30]">.</span> Premium user journeys',
    },
    "Web Apps": {
      text: "Custom tools built for growth",
    },
    "Ecommerce Development": {
      text: 'Sell smarter<span class="text-[#E43D30]">.</span><br> Scale elegantly online',
    },
  },
  "Digital Marketing": {
    "Performance Marketing": {
      text: 'Precision-driven campaigns<span class="text-[#E43D30]">.</span> Measurable returns',
    },
    "Search Engine Optimisation": {
      text: 'Rank higher<span class="text-[#E43D30]">.</span> Attract better leads',
    },
    "Social Media Services": {
      text: 'Engage audiences<span class="text-[#E43D30]">.</span> Grow influence daily',
    },
    "Content Marketing": {
      text: "Authority content that builds demand",
    },
    "Marketing Automation": {
      text: 'Nurture leads<span class="text-[#E43D30]">.</span><br> Win effortlessly',
    },
    "Data & Analytics": {
      text: "Metrics that uncover real opportunities",
    },
  },
  "Marketing Intelligence": {
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
    return serviceData[category]?.[title]?.text ?? "";
  };

  return (
    <div className="relative group inline-block">
      {/* Mega Menu Dropdown */}
      <div className="absolute left-0 right-0 top-full z-50 h-[690px] w-screen bg-black text-white mt-2">
        <div className="w-full mx-auto px-8 py-[80px] flex justify-between items-center xxl:pl-[150px] lg:pl-[50px]">
          {/* Header Section */}
          <div className="mb-12 w-1/3">
            <h2
              className="xxl:text-[48px] lg:text-[35px] xxl:leading-[60px] lg:leading-[50px] mb-4 transition-all duration-300"
              dangerouslySetInnerHTML={{
                __html: getActiveText() + '<span class="text-[#E43D30]">.</span>',
              }}
            />
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-3 gap-10 w-full pl-[130px]">
            {Object.entries(serviceData).map(([category, items]) => (
              <div key={category} className="group w-full">
                <h4
                  className={`font-[400] uppercase text-font19 mb-4 transition-colors duration-200 ${
                    activeItem[0] === category ? "text-[#E43D30]" : "text-white"
                  }`}
                >
                  {category}
                </h4>
                <ul className="space-y-2">
                  {Object.entries(items).map(([title, { text }]) => {
                    const isActive =
                      activeItem[0] === category && activeItem[1] === title;
                    return (
                      <li
                        key={title}
                        onMouseEnter={() => handleHover(category, title)}
                        className={`cursor-pointer text-font19 transition-opacity duration-200 ${
                          isActive
                            ? "text-white opacity-100"
                            : "text-white opacity-60 hover:opacity-100"
                        }`}
                      >
                        {title}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesMegaMenu;
