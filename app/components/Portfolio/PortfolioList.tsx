"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Portfolio } from "@/app/types/Portfolio";
import { filterTags } from "@/app/data/filterTags";
import Link from "next/link";

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await fetch(`/api/portfolio`);
        if (response.ok) {
          const data = await response.json();
          console.log(data.portfolio);
          setPortfolios(data.portfolio);
        } else {
          console.error("Failed to fetch portfolio data");
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchPortfolios();
  }, []);

  const [filter, setFilter] = useState("all");

  const [originalPortfolio,setOriginalPortfolio] = useState<Portfolio[]>([])

  useEffect(() => {
    if (originalPortfolio.length === 0 && portfolios.length > 0) {
      setOriginalPortfolio(portfolios); // Initialize the original portfolio only once
    }
  }, [portfolios]);
  
  const handleFiltering = (filter: string) => {
    setFilter(filter);
  
    if (filter === "all") {
      // If the filter is "all", reset to the original portfolio
      setPortfolios(originalPortfolio);
    } else {
      // Filter the original portfolio
      setPortfolios(
        originalPortfolio.filter((portfolio) =>
          portfolio.categories.some((category) => category.name === filter)
        )
      );
    }
  };

  return (
    <>
      <div className="container mx-auto py-4">
        <motion.div
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
          <div className="portfolio pb-[50px] pt-[50px] lg:pb-[130px] lg:pt-[130px] ">
            {/* Filter Tabs */}
            <div className="border-b  mb-[30px] md:mb-[50px] filterbtn no-scrollbar">

            <div className="filter-tabs  flex space-x-4  w-full gap-[15px] md:gap-[30px] ">
              {filterTags.map((item,index)=>(
                <div key={index} className={`pb-1 md:pb-4 mb-[0px] md:mb-[-1px] whitespace-nowrap divro ${
                  filter === item.filter ? "border-b border-black text-black" : "text-gray1"
                }`}><span  onClick={() => handleFiltering(item.filter)}>{item.tag}</span></div>
              ))}
            </div>
            </div>

            {/* Portfolio Items */}
            <div className="flex flex-col items-center gap-8  lg:grid  lg:grid-cols-2 lg:gap-8 lg:gap-y-12 ">
              {portfolios.map((item, index) => (
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
                    <div className="card-img relative h-[300px] overflow-hidden rounded-md md:h-[500px]">
                      <Image
                        src={item.bannerImage}
                        alt="image"
                        className="h-full w-full object-cover"
                        fill
                      />
                      <div className="absolute left-3 top-3 cursor-pointer rounded-3xl bg-gray1 px-4 py-2 duration-200 duration-300 ease-in-out ease-in-out   group-hover:z-[1] group-hover:-translate-x-[-3px] group-hover:bg-primary  group-hover:shadow-lg  md:left-5 md:top-5">
                        <div className="uppercase text-white">
                          <p className="text-font14 text-white">{item.tag}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 md:mt-4">
                      <h3 className="text-30 mb-1 duration-200 ease-in-out group-hover:text-primary md:mb-2">
                        {item.companyName}
                      </h3>
                      <p className="text-19 text-gray1">{item.description}</p>
                    </div>
                    <Link href={`/portfolio-details/${item.id}`}
                  className="absolute top-0 z-[1] h-full w-full"
                ></Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        {/* <div className="flex flex-col items-center gap-8 border-b pb-10 pt-[50px] lg:grid  lg:grid-cols-2 lg:gap-8 lg:gap-y-12 lg:pt-[130px] ">
          {portfolios.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
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

                <div className="card-img relative h-[500px] overflow-hidden rounded-md">
                  <img
                    src={item.bannerImage}
                    alt="image"
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="absolute left-3 top-3 cursor-pointer rounded-3xl bg-gray1 px-4 py-2 duration-200 duration-300 ease-in-out ease-in-out   group-hover:z-[1] group-hover:-translate-x-[-3px] group-hover:bg-primary  group-hover:shadow-lg  md:left-5 md:top-5"
                  >
                    <div className="uppercase text-white">
                      <p className="text-font14 text-white">{"SAAS"}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 md:mt-4">
                  <h3 className="text-30 mb-1 duration-200 ease-in-out group-hover:text-primary md:mb-2">
                    {item.companyName}
                  </h3>
                  <p className="text-19 text-gray1">{"item.description"}</p>
                </div>
                <Link
                  href={`/portfolio-details/${item.id}`}
                  className="absolute top-0 z-[1] h-full w-full"
                ></Link>
              </div>
            </motion.div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default PortfolioList;
