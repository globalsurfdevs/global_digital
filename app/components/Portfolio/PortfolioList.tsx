"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Portfolio } from "@/app/types/Portfolio";
import { filterTags } from "@/app/data/filterTags";
import Link from "next/link";
import {
  formatLinkForPortfolio,
  formatLinkForCaseStudy,
} from "@/app/helpers/formatLink";
import { usePathname, useRouter } from "next/navigation";
const PortfolioList = ({ data }: { data: Portfolio[] }) => {
  // const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [portfolios, setPortfolios] = useState<Portfolio[]>(data)
  const pathname = usePathname();
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

  const [originalPortfolio, setOriginalPortfolio] = useState<Portfolio[]>([]);

  const router = useRouter();

  // useEffect(() => {
  //   if (originalPortfolio.length === 0 && portfolios.length > 0) {
  //     setOriginalPortfolio(portfolios); // Initialize the original portfolio only once
  //   }
  // }, [portfolios]);

  const handleFiltering = (filter: string, link: string) => {
    console.log(filter);

    if (link) {
      window.history.replaceState(null, "", `/portfolio${link}`);
    }

    setFilter(filter);

    if (filter === "all") {
      // If the filter is "all", reset to the original portfolio
      setPortfolios(data);
    } else {
      // Filter the original portfolio
      setPortfolios(
        data.filter((portfolio: Portfolio) =>
          portfolio.categories.some((category) => category.name === filter),
        ),
      );
    }
  };

  const [newFilterTags, setNewFilterTags] = useState<
    { name: string; link: string }[]
  >([]);

  useEffect(() => {
    if (!pathname || newFilterTags.length === 0) return;

    // remove "/portfolio"
    const currentPath = pathname.replace("/portfolio", "");
    console.log(currentPath);

    // if root portfolio page
    if (currentPath === "") {
      setFilter("all");
      setPortfolios(data);
      return;
    }

    const matchedCategory = newFilterTags.find(
      (item) => item.link === currentPath,
    );

    if (matchedCategory) {
      setFilter(matchedCategory.name);

      setPortfolios(
        data.filter((portfolio: Portfolio) =>
          portfolio.categories.some(
            (category) => category.name === matchedCategory.name,
          ),
        ),
      );
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
          <div className="portfolio pb-[50px] pt-[50px] lg:pb-[130px] lg:pt-[130px] ">
            {/* Filter Tabs */}
            <div className="filterbtn  no-scrollbar mb-[30px] border-b md:mb-[50px]">
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
                            {item?.channels && item.channels.length > 0 && item.channels.map((channel, index) => (
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
