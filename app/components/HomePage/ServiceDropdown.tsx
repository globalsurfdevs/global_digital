"use client";
import React, { useState } from "react";
import { assets } from "@/public/assets/assets";
import menuright from "@/public/assets/menurightarrow.svg";
import Image from "next/image";

type ServiceItem = { text: string; url?: string };
type ServiceCategory = {
  titleurl?: string;
  categoryText?: string;
  [serviceName: string]: ServiceItem | string | undefined;
};
type ServiceData = {
  [category: string]: ServiceCategory;
};

const serviceData: ServiceData = {
  "Creative Services": {
    titleurl: "/creative-agency-dubai",
    categoryText: 'Crafting Brands, Creating Impact<span class="text-[#E43D30]">.</span>',
    Branding: {
      text: 'Know Your Voice<span class="text-[#E43D30]">.</span><br> Own Your Space<span class="text-[#E43D30]">.</span> ',
      url: "/branding-agency-dubai",
    },
    "Logo Design": {
      text: 'Recognize Instantly<span class="text-[#E43D30]">.</span><br>Remember Forever<span class="text-[#E43D30]">.</span>',
      url: "/logo-design-agency-dubai",
    },
    "Graphic Design": {
      text: 'Shape the Look<span class="text-[#E43D30]">.</span><br>Set the Tone<span class="text-[#E43D30]">.</span>',
      url: "/graphic-design-agency-dubai",
    },
    Copywriting: {
      text: 'Words that Win<span class="text-[#E43D30]">.</span><br>Stories that Stick<span class="text-[#E43D30]">.</span>',
      url: "/creative-copywriting-agency-dubai",
    },
    "Content Production": {
      text: 'Create Once<span class="text-[#E43D30]">.</span><br>Echo Everywhere<span class="text-[#E43D30]">.</span>',
      url: "/content-production-agency-dubai",
      
    },
  },
  "Web Design & Development": {
    titleurl: "/web-design-and-development",
    categoryText: 'Create the Experience<span class="text-[#E43D30]">.</span><br>Deliver the Result<span class="text-[#E43D30]">.</span>',
    "Web Development": {
      text: 'Solid foundations<span class="text-[#E43D30]">.</span><br> Scalable futures<span class="text-[#E43D30]">.</span>',
      url: "/web-development-agency-dubai",
    },
    "Website Design": {
      text: 'Crafted for users<span class="text-[#E43D30]">.</span><br> Styled for brands<span class="text-[#E43D30]">.</span>',
      url: "/web-design-agency-dubai",
    },
    "Mobile App": {
      text: 'Tap-worthy<span class="text-[#E43D30]">.</span><br> Tech-ready<span class="text-[#E43D30]">.</span>',
      url: "/mobile-app-development-company-dubai",
    },
    "Web Apps": {
      text: 'Complex needs<span class="text-[#E43D30]">.</span><br> Clean solutions<span class="text-[#E43D30]">.</span>',
      url: "/web-app-dev-agency",
    },
    "Ecommerce Development": {
      text: 'Seamless Carts<span class="text-[#E43D30]">.</span><br>Serious Results<span class="text-[#E43D30]">.</span>',
      url: "/e-commerce-web-development-company",
    },
  },
  "Digital Marketing": {
    categoryText: 'Crafted for Clarity<span class="text-[#E43D30]">.</span><br> Scaled for Success<span class="text-[#E43D30]">.</span>',
    "Performance Marketing": {
      text: 'Built to Scale<span class="text-[#E43D30]">.</span><br> Measured to Win<span class="text-[#E43D30]">.</span>',
      url: "/performance-marketing-agency-dubai",
    },
    "Search Engine Optimisation (SEO)": {
      text: 'Rank with Purpose<span class="text-[#E43D30]">.</span><br> Stay with Relevance<span class="text-[#E43D30]">.</span>',
      url: "/seo-agency-dubai",
    },
    "Social Media Services": {
      text: 'Real Voices<span class="text-[#E43D30]">.</span><br> Real Impact<span class="text-[#E43D30]">.</span>',
      url: "/social-media-agency-dubai",
    },
    "Content Marketing": {
      text: 'Words that Move<span class="text-[#E43D30]">.</span><br> Stories that Stay<span class="text-[#E43D30]">.</span>',
      url: "/content-marketing-agency-dubai",
    },
  },
  "Marketing Intelligence": {
    titleurl: "/marketing-intelligence-agency-dubai",
    categoryText: 'Driven by Insight<span class="text-[#E43D30]">.</span><br> Focused on Growth<span class="text-[#E43D30]">.</span>',
    "Data & Analytics": {
      text: 'Numbers that speak<span class="text-[#E43D30]">.</span><br> Insights that act<span class="text-[#E43D30]">.</span>',
      url: "/data-analytics-services-dubai",
    },
    "Strategy Consulting": {
      text: 'Built on Data<span class="text-[#E43D30]">.</span><br> Driven by Strategy<span class="text-[#E43D30]">.</span>',
    },
    "Conversion Rate Optimization (CRO)": {
      text: 'Optimized Paths<span class="text-[#E43D30]">.</span><br> Maximized Results<span class="text-[#E43D30]">.</span>',
      url: "/conversion-rate-optimization-agency-dubai",
    },
    "Marketing Automation": {
      text: 'Automated to Convert<span class="text-[#E43D30]">.</span><br> Designed to Engage<span class="text-[#E43D30]">.</span>',
      url:"/marketing-automation-agency-dubai",
    },
  },
};

const ServicesMegaMenu = () => {
  const defaultCategory = "Creative Services";

  const [activeItem, setActiveItem] = useState<[string, string]>([
    defaultCategory,
    "",
  ]);

  const handleHover = (category: string, title?: string) => {
    if (title) {
      setActiveItem([category, title]);
    } else {
      setActiveItem([category, ""]);
    }
  };

  const getActiveText = () => {
    const [category, title] = activeItem;
    const categoryData = serviceData[category];
    const item = categoryData?.[title] as ServiceItem | undefined;

    if (!item?.text && typeof categoryData?.categoryText === "string") {
      return categoryData.categoryText;
    }

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
                __html: getActiveText(),
              }}
            />
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-3 xxl:gap-10 gap-6 w-full pl-[130px]">
            {Object.entries(serviceData).map(([category, items]) => {
              const { titleurl, categoryText, ...services } = items;
              return (
                <div key={category} className="group w-full">
                    <div className="flex items-center xxl:mb-[30px] mb-[20px]">
                    <h4
                      onMouseEnter={() => handleHover(category)}
                      className={`font-[400] uppercase xxl:text-font19 text-[15px] pr-[16px] ${
                      activeItem[0] === category
                        ? "text-[#E43D30]"
                        : "text-white"
                      }`}
                      dangerouslySetInnerHTML={{
                      __html: titleurl
                        ? `<a href="${titleurl}">${category}</a>`
                        : category,
                      }}
                    />
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
