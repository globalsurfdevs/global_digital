"use client";

import Image from "next/image";
import gd1 from "../../../public/images/GraphicDesign/gdicon1.svg";
import gd2 from "../../../public/images/GraphicDesign/gdicon2.svg";
import gd3 from "../../../public/images/GraphicDesign/gdicon3.svg";
import gd4 from "../../../public/images/GraphicDesign/gdicon4.svg";
import gd5 from "../../../public/images/GraphicDesign/gdicon5.svg";
import gd6 from "../../../public/images/GraphicDesign/gdicon6.svg";
import gd7 from "../../../public/images/GraphicDesign/gdicon7.svg";
import gd8 from "../../../public/images/GraphicDesign/gdicon8.svg";
import { useState, useEffect } from "react";

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };

    // Set on initial load
    checkMobile();

    // Add event listener for resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const tabContent = [
    {
      title: "Brochure Design",
      icon: gd1,
      description:
        "Whether it's a sleek corporate brochure or a bold product catalog, we create pieces that demand attention. Designed to inform, persuade, and leave a lasting impression, our brochures are more than just pages—they're powerful sales tools.",
    },
    {
      title: "Packaging Design",
      icon: gd2,
      description:
        "Your packaging is your first handshake with the customer. It needs to excite, entice, and sell—before a single word is read. We design packaging that doesn't just sit on shelves but leaps off them, making your product the obvious choice.",
    },
    {
      title: "Brand Identity & Logo Design",
      icon: gd3,
      description:
        "Your brand is more than a logo—but it starts there. We craft logos and brand assets that are distinctive, memorable, and built to stand the test of time. Clean, bold, and unmistakably you.",
    },
    {
      title: "Social Media Creatives",
      icon: gd4,
      description:
        "Scroll-stopping visuals that get noticed. From Instagram carousels to LinkedIn graphics, we create social media designs that spark engagement and get people talking about your brand.",
    },
    {
      title: "Advertising & Marketing Collateral",
      icon: gd5,
      description:
        "Billboards, posters, banners, digital ads—whatever the medium, we design marketing assets that don’t just blend in. They grab, they persuade, they convert. ",
    },
    {
      title: "Presentation & Pitch Decks",
      icon: gd6,
      description:
        "Whether it’s a high-stakes investor pitch or an internal company deck, we design presentations that captivate, clarify, and convince. No more boring slides—just persuasive storytelling.",
    },
    {
      title: "Graphics & Signage",
      icon: gd7,
      description:
        "From in-store displays to outdoor billboards, we design graphics that command attention. Whether it’s shopfront signage, event branding, or vehicle wraps, our designs ensure your message is seen, remembered, and acted upon. ",
    },
    {
      title: "Stationery Design",
      icon: gd8,
      description:
        "Business cards, letterheads, envelopes—small details that make a big difference. We design elegant, cohesive stationery that reinforces your brand at every touchpoint. Because first impressions don’t just happen in meetings—they happen on paper, too. ",
    },
  ];

  // Mobile accordion view
  if (isMobile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="my-10 flex flex-col space-y-4">
          {tabContent.map((tab, index) => (
            <div key={index} className="overflow-hidden rounded-lg border">
              <div
                className={`flex cursor-pointer items-center justify-between p-4 ${
                  activeTab === index ? "bg-red-600 text-white" : "bg-white"
                }`}
                onClick={() => setActiveTab(activeTab === index ? null : index)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 ${
                      activeTab === index ? "bg-white" : "bg-primary"
                    }`}
                  >
                    <Image
                      src={tab.icon || ""}
                      alt={tab.title}
                      width={24}
                      height={24}
                      className="h-6 w-6"
                      style={{
                        filter:
                          activeTab === index
                            ? "brightness(1) invert(0)"
                            : "brightness(0) invert(1)",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-medium">{tab.title}</h3>
                </div>
                <svg
                  className={`h-5 w-5 transform transition-transform ${
                    activeTab === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div
                className={`transition-max-height overflow-hidden duration-300 ease-in-out ${
                  activeTab === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div
                  className={`p-4 ${activeTab === index ? "bg-red-600 text-white" : "bg-gray-50"}`}
                >
                  <p>{tab.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop view with hover effect
  return (
    <div className="container mx-auto overflow-hidden">
      {/* Added custom scrollbar styles */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>

      <div className="w-full md:flex md:flex-wrap">
        {tabContent.map((tab, index) => (
          <div
            key={index}
            className={`relative flex cursor-pointer flex-col border transition-all duration-500 ease-in-out ${
              activeTab === index ? "z-10 bg-red-600" : "bg-white"
            }`}
            style={{
              minHeight: "200px",
              height: activeTab === index ? "auto" : "540px",
              width:
                activeTab === index
                  ? "clamp(300px, 40%, 560px)"
                  : activeTab === null
                    ? `calc(100% / ${tabContent.length})`
                    : `calc((100% - 40%) / ${tabContent.length - 1})`,
              flex:
                activeTab === index
                  ? "1 0 auto"
                  : `1 1 ${
                      activeTab === null
                        ? `calc(100% / ${tabContent.length})`
                        : `calc((100% - 560px) / ${tabContent.length - 1})`
                    }`,
              overflow: activeTab === index ? "visible" : "hidden",
              position: "relative",
            }}
            onMouseEnter={() => setActiveTab(index)}
            onMouseLeave={() => setActiveTab(null)}
          >
            {/* Container for all content with left alignment */}
            <div className="flex h-full w-full flex-col items-start">
              {/* Icon at the top - now left aligned with padding */}
              <div className="w-full pl-[40px] pt-[40px]">
                <div
                  className={`p-2 transition-all duration-500 ${
                    activeTab === index ? "bg-white" : "bg-primary"
                  }`}
                  style={{ display: "inline-block" }}
                >
                  <Image
                    src={tab.icon || ""}
                    alt={tab.title}
                    className={`transition-all duration-500`}
                    style={{
                      filter:
                        activeTab === index
                          ? "brightness(1) invert(0)"
                          : "brightness(0) invert(1)",
                    }}
                  />
                </div>
              </div>

              {/* Title text - different styling based on active state */}
              {activeTab === index ? (
                <div className="w-full pl-[40px] lg:pt-[150px]">
                  <h3 className="text-left font-medium text-white lg:text-[30px]">
                    {tab.title}
                  </h3>
                </div>
              ) : (
                <div className="flex h-1/2 w-full items-end justify-center">
                  <h3 className="origin-center -rotate-90 transform whitespace-nowrap text-[18px] text-black md:text-[22px]">
                    {tab.title}
                  </h3>
                </div>
              )}

              {/* Description paragraph appears on hover - with hidden scrollbar and left alignment */}
              <div
                className={`no-scrollbar p-[40px] pt-4 text-left transition-all duration-500 ease-in-out ${
                  activeTab === index
                    ? "max-h-96 overflow-y-auto opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-19 pb-0 text-white">{tab.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabComponent;
