"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Portfolio } from "@/app/types/Portfolio";
import Link from "next/link";
import {
  formatLinkForPortfolio,
  formatLinkForCaseStudy,
} from "@/app/helpers/formatLink";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

const PortfolioList = ({
  data,
  industries,
}: {
  data: Portfolio[];
  industries: { _id: string; name: string }[];
}) => {
  // const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>(data);
  const pathname = usePathname();
  const [industryOpen, setIndustryOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      el.style.cursor = "grabbing";
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      el.style.cursor = "grab";
    };

    const onMouseUp = () => {
      isDown = false;
      el.style.cursor = "grab";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mousemove", onMouseMove);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // update the toggle to calculate position
  const handleDropdownToggle = () => {
    if (!industryOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setIndustryOpen((prev) => !prev);
  };

  // const CACHE_DURATION = 10 * 60 * 1000;
  // useEffect(() => {
  //   const cachedData = localStorage.getItem('portfolios')
  //   const fetchPortfolios = async () => {
  //     try {
  //       const response = await fetch(`/api/portfolio`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log(data.portfolio);
  //         setPortfolios(data.portfolio);
  //         localStorage.setItem(
  //           'portfolios',
  //           JSON.stringify({
  //             timestamp: Date.now(),
  //             data: data.portfolio,
  //           })
  //         )
  //       } else {
  //         console.error("Failed to fetch portfolio data");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching portfolio data:", error);
  //     }
  //   };

  //   if (cachedData) {
  //     const { timestamp, data } = JSON.parse(cachedData);
  //     if (Date.now() - timestamp < CACHE_DURATION) {
  //       setPortfolios(data)
  //     } else {
  //       localStorage.removeItem('portfolios')
  //       fetchPortfolios();
  //     }
  //   } else {
  //     localStorage.removeItem('portfolios')
  //     fetchPortfolios();
  //   }

  // }, []);

  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     setPortfolios(data);
  //   }
  // }, [data]);

  const [filter, setFilter] = useState("all");

  // useEffect(() => {
  //   if (originalPortfolio.length === 0 && portfolios.length > 0) {
  //     setOriginalPortfolio(portfolios); // Initialize the original portfolio only once
  //   }
  // }, [portfolios]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        portalRef.current &&
        !portalRef.current.contains(e.target as Node)
      ) {
        setIndustryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const handleIndustrySelect = (industryName: string | null) => {
  //   setSelectedIndustry(industryName);
  //   setIndustryOpen(false);

  //   if (!industryName) {
  //     setPortfolios(data);
  //   } else {
  //     setPortfolios(
  //       data.filter((portfolio: Portfolio) => portfolio.industry === industryName)
  //     );
  //   }
  // };

  // const handleFiltering = (filter: string, link: string) => {
  //   console.log(filter);

  //   if (link) {
  //     window.history.replaceState(null, "", `/portfolio${link}`);
  //   }

  //   setFilter(filter);

  //   if (filter === "all") {
  //     // If the filter is "all", reset to the original portfolio
  //     setPortfolios(data);
  //   } else {
  //     // Filter the original portfolio
  //     setPortfolios(
  //       data.filter((portfolio: Portfolio) =>
  //         portfolio.categories.some((category) => category.name === filter),
  //       ),
  //     );
  //   }
  // };

  const applyFilters = (category: string, industry: string | null) => {
    let filtered = data;

    if (category !== "all") {
      filtered = filtered.filter((p: Portfolio) =>
        p.categories.some((c) => c.name === category),
      );
    }

    if (industry) {
      filtered = filtered.filter((p: Portfolio) => p.industry === industry);
    }

    setPortfolios(filtered);
  };

  const handleFiltering = (filterValue: string, link: string) => {
    if (link) window.history.replaceState(null, "", `/portfolio${link}`);
    setFilter(filterValue);
    applyFilters(filterValue, selectedIndustry); // selectedIndustry is fine here, it's not being set simultaneously
  };

  const handleIndustrySelect = (industryName: string | null) => {
    setSelectedIndustry(industryName);
    setIndustryOpen(false);
    applyFilters(filter, industryName); // pass industryName directly, not selectedIndustry state
  };

  const [newFilterTags, setNewFilterTags] = useState<
    { name: string; link: string }[]
  >([]);

  // useEffect(() => {
  //   if (!pathname || newFilterTags.length === 0) return;

  //   // remove "/portfolio"
  //   const currentPath = pathname.replace("/portfolio", "");
  //   // console.log(currentPath);

  //   // if root portfolio page
  //   if (currentPath === "") {
  //     setFilter("all");
  //     setPortfolios(data);
  //     return;
  //   }

  //   const matchedCategory = newFilterTags.find(
  //     (item) => item.link === currentPath,
  //   );

  //   if (matchedCategory) {
  //     setFilter(matchedCategory.name);

  //     setPortfolios(
  //       data.filter((portfolio: Portfolio) =>
  //         portfolio.categories.some(
  //           (category) => category.name === matchedCategory.name,
  //         ),
  //       ),
  //     );
  //   }
  // }, [pathname, newFilterTags, data]);

  useEffect(() => {
    if (!pathname || newFilterTags.length === 0) return;

    const currentPath = pathname.replace("/portfolio", "");

    if (currentPath === "") {
      setFilter("all");
      applyFilters("all", selectedIndustry); // ✅ was setPortfolios(data)
      return;
    }

    const matchedCategory = newFilterTags.find(
      (item) => item.link === currentPath,
    );

    if (matchedCategory) {
      setFilter(matchedCategory.name);
      applyFilters(matchedCategory.name, selectedIndustry); // ✅ was setPortfolios(data.filter(...))
    }
  }, [pathname, newFilterTags, data]);

  useEffect(() => {
    const allExistingCategories = data.flatMap((portfolio: Portfolio) =>
      portfolio.categories.map((category) => ({
        name: category.name,
        link: category.link,
      })),
    );

    // Remove duplicates using Map
    const uniqueCategories = Array.from(
      new Map(allExistingCategories.map((item) => [item.name, item])).values(),
    );

    setNewFilterTags(uniqueCategories);
  }, [data]);

  return (
    <>
      <div className="container mx-auto py-4">
        <div>
          <span className="hidden">{process.env.NEXT_PUBLIC_BASE_URL}</span>
          <div className="portfolio pb-[50px] md:pt-[50px] lg:pb-[130px] lg:pt-[130px] ">
            {/* Filter Tabs */}
            {/* <div className="filterbtn  no-scrollbar mb-[30px] border-b md:mb-[50px] flex justify-between items-center">
              <div className="filter-tabs  flex w-full  gap-[15px] space-x-4 md:gap-[30px] ">
                <div
                  className={`divro mb-[0px] whitespace-nowrap  pb-1 md:pb-4 ${
                    filter === "all"
                      ? "border-b-2 border-black text-black"
                      : "text-gray1"
                  }`}
                >
                  <span onClick={() => handleFiltering("all", "#")}>
                    View All
                  </span>
                </div>
                {newFilterTags.map((item, index) => (
                  <div
                    key={index}
                    className={`divro mb-[0px] whitespace-nowrap  pb-1 md:pb-4 ${
                      filter === item.name
                        ? "border-b-2 border-black text-black"
                        : "text-gray1"
                    }`}
                  >
                    <span onClick={() => handleFiltering(item.name, item.link)}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex w-full items-center justify-center">
                <button className="btn-primary">View More</button>
              </div>
            </div> */}

            <div className="filterbtn no-scrollbar mb-[30px] flex flex-wrap items-center justify-between gap-y-[15px] overflow-visible border-b pb-[20px] md:mb-[50px] md:flex-nowrap">
              {/* Left: Tab Filters */}
              <div
                ref={tabsRef}
                className="filter-tabs flex min-w-0 cursor-grab gap-[20px] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <button
                  onClick={() => handleFiltering("all", "#")}
                  className={`whitespace-nowrap rounded-[57px] px-[20px] py-[11.5px] text-[16px] leading-[1.5] transition-colors ${
                    filter === "all"
                      ? "bg-[#1A1A1A] text-white"
                      : "bg-[#F2F2F2] text-[#77787B]"
                  }`}
                >
                  View All
                </button>

                {newFilterTags.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleFiltering(item.name, item.link)}
                    className={`whitespace-nowrap rounded-[57px] px-[20px] py-[11.5px] text-[16px] leading-[1.5] transition-colors ${
                      filter === item.name
                        ? "bg-[#1A1A1A] text-white"
                        : "bg-[#F2F2F2] text-[#77787B]"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Right: Industries Dropdown */}
              <div
                className="relative ml-auto shrink-0 md:ml-[20px]"
                ref={dropdownRef}
              >
                <button
                  ref={triggerRef}
                  onClick={handleDropdownToggle}
                  className="flex w-[247px] max-w-[247px] items-center gap-[10px] rounded-[57px] border border-[#77787B] px-[20px] py-[11.5px] text-[16px] leading-[1.5] text-[#77787B]"
                >
                  <span className="flex-1 truncate text-left">
                    {selectedIndustry ?? "Industries"}
                  </span>
                  <img
                    src="/assets/drop-down-arrow.svg"
                    alt="dropdown icon"
                    className={`h-[8px] w-auto shrink-0 transition-transform duration-200 ${
                      industryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {industryOpen &&
                  typeof window !== "undefined" &&
                  createPortal(
                    <div
                      ref={portalRef}
                      style={{
                        position: "absolute",
                        top: dropdownPos.top,
                        left: dropdownPos.left,
                        width: dropdownPos.width,
                        zIndex: 9999,
                      }}
                      className="max-h-[220px] overflow-y-auto rounded-2xl border border-[#E5E5E5] bg-white shadow-lg md:max-h-[300px]"
                    >
                      <button
                        onClick={() => handleIndustrySelect(null)}
                        className={`w-full px-[20px] py-[11.5px] text-left text-[16px] leading-[1.5] transition-colors hover:bg-[#F2F2F2] ${
                          selectedIndustry === null
                            ? "font-medium text-black"
                            : "text-[#77787B]"
                        }`}
                      >
                        All Industries
                      </button>
                      {industries.map((item) => (
                        <button
                          key={item._id}
                          onClick={() => handleIndustrySelect(item.name)}
                          className={`w-full px-[20px] py-[11.5px] text-left text-[16px] leading-[1.5] transition-colors hover:bg-[#F2F2F2] ${
                            selectedIndustry === item.name
                              ? "font-medium text-black"
                              : "text-[#77787B]"
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>,
                    document.body,
                  )}
              </div>
            </div>

            {/* Portfolio Items */}
            <div className="flex flex-col items-center gap-8  lg:grid  lg:grid-cols-2 lg:gap-8 lg:gap-y-12 ">
              {portfolios.length > 0 &&
                portfolios.map((item, index) => (
                  <motion.div
                    key={index}
                    className="w-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1.3, ease: "easeOut" },
                      },
                    }}
                  >
                    <div className="portfolio-card group relative col-span-1">
                      <div className="card-img group relative h-[300px] overflow-hidden rounded-md md:h-[500px]">
                        <Image
                          src={item.bannerImage || item.coverImage}
                          alt="image"
                          className="h-full w-full object-cover"
                          fill
                        />
                        <div className="absolute left-3 top-3 cursor-pointer rounded-3xl bg-gray1 px-4 py-2 duration-200 duration-300 ease-in-out ease-in-out   group-hover:z-[1] group-hover:-translate-x-[-3px] group-hover:bg-primary  group-hover:shadow-lg  md:left-5 md:top-5">
                          <div className="uppercase text-white">
                            <p className="text-font14 text-white">
                              {item.industry}
                            </p>
                          </div>
                        </div>
                        <div className="absolute bottom-0 z-[1] mt-3 p-5 md:mt-4">
                          <h3 className="text-30 mb-1 text-white duration-200  duration-200 duration-300  ease-in-out ease-in-out ease-in-out md:mb-2 ">
                            {item.companyName}
                          </h3>
                          <div className="flex gap-1">
                            {item?.channels &&
                              item.channels.length > 0 &&
                              item.channels.map((channel, index) => (
                                <p
                                  key={index}
                                  className="text-19 text-gray1 text-white  duration-200 ease-in-out group-hover:-translate-x-[-3px] group-hover:text-primary"
                                >
                                  {index == item.channels.length - 1
                                    ? channel.channelName
                                    : channel.channelName + ", "}
                                </p>
                              ))}
                          </div>
                          {!item?.channels && (
                            <p className="text-19 text-gray1 text-white  duration-200 ease-in-out group-hover:-translate-x-[-3px] group-hover:text-primary">
                              {item.channelsUsed}
                            </p>
                          )}
                        </div>
                      </div>

                      <Link
                        href={
                          item.section == "case study" ||
                          item.section == "case study new"
                            ? `/case-study/${formatLinkForCaseStudy(item.companyName)}`
                            : `/portfolio/${formatLinkForPortfolio(item.companyName)}`
                        }
                        className="absolute top-0 z-[1] h-full w-full"
                      ></Link>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioList;
