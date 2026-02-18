"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Portfolio } from "@/app/types/Portfolio";
import { filterTags } from "@/app/data/filterTags";
import Link from "next/link";
import { formatLinkForPortfolio, formatLinkForCaseStudy } from "@/app/helpers/formatLink";
import { CaseStudy } from "@/app/types/CaseStudy";





const CaseStudyList = () => {

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);

  const CACHE_DURATION = 10 * 60 * 1000;

  useEffect(() => {

    const cachedData = localStorage.getItem('case-study')


    const fetchCaseStudies = async () => {
      try {
        const response = await fetch(`/api/case-study`);
        if (response.ok) {
          const data = await response.json();
          console.log(data.caseStudy);
          setCaseStudies(data.caseStudy);
          localStorage.setItem(
            'case-study',
            JSON.stringify({
              timestamp: Date.now(),
              data: data.caseStudy,
            })
          )
        } else {
          console.error("Failed to fetch case study data");
        }
      } catch (error) {
        console.error("Error fetching case study data:", error);
      }
    };

    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        setCaseStudies(data)
      } else {
        localStorage.removeItem('case-study')
        fetchCaseStudies();
      }
    } else {
      localStorage.removeItem('case-study')
      fetchCaseStudies();
    }

  }, []);


  const [filter, setFilter] = useState("all");

  const [originalCaseStudy, setOriginalCaseStudy] = useState<CaseStudy[]>([])

  useEffect(() => {
    if (originalCaseStudy.length === 0 && caseStudies.length > 0) {
      setOriginalCaseStudy(caseStudies); // Initialize the original portfolio only once
    }
  }, [caseStudies]);

  const handleFiltering = (filter: string) => {
    setFilter(filter);

    if (filter === "all") {
      // If the filter is "all", reset to the original portfolio
      setCaseStudies(originalCaseStudy);
    } else {
      // Filter the original portfolio
      setCaseStudies(
        originalCaseStudy.filter((casestudy) =>
          casestudy.categories.some((category) => category.name === filter)
        )
      );
    }
  };

  const [newFilterTags, setNewFilterTags] = useState<string[]>([])

  useEffect(() => {
    const allExistingCategories = caseStudies.map((item) => (
      item.categories.map((category) => (
        category.name
      ))
    ))

    console.log(allExistingCategories)

    if (allExistingCategories) {
      setNewFilterTags([...new Set(allExistingCategories.flat())])
    }

  }, [caseStudies])



  return (
    <>
      <div className="container mx-auto py-4">
        <div

        >
          <div className="portfolio pb-[50px] pt-[50px] lg:pb-[130px] lg:pt-[130px] ">
            {/* Filter Tabs */}
            <div className="border-b  mb-[30px] md:mb-[50px] filterbtn no-scrollbar">

              <div className="filter-tabs  flex space-x-4  w-full gap-[15px] md:gap-[30px] ">
                <div className={`pb-1 md:pb-4 mb-[0px] whitespace-nowrap divro ${filter === "all" ? "border-b-2 border-black text-black" : "text-gray1"
                  }`}>
                  <span onClick={() => handleFiltering("all")}>View All</span>
                </div>

                {newFilterTags.map((item, index) => (
                  <div key={index} className={`pb-1 md:pb-4 mb-[0px]  whitespace-nowrap divro ${filter === item ? "border-b-2 border-black text-black" : "text-gray1"
                    }`}><span onClick={() => handleFiltering(item)}>{item}</span></div>
                ))}
              </div>
            </div>

            {/* Portfolio Items */}
            <div className="flex flex-col items-center gap-8  lg:grid  lg:grid-cols-2 lg:gap-8 lg:gap-y-12 ">
              {caseStudies.length > 0 && caseStudies.map((item, index) => (
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
                    <div className="card-img relative h-[300px] overflow-hidden rounded-md md:h-[500px] group">
                      <Image
                        src={item.coverImage ?? item.bannerImage}
                        alt="image"
                        className="h-full w-full object-cover"
                        fill
                      />
                      <div className="absolute left-3 top-3 cursor-pointer rounded-3xl bg-gray1 px-4 py-2 duration-200 duration-300 ease-in-out ease-in-out   group-hover:z-[1] group-hover:-translate-x-[-3px] group-hover:bg-primary  group-hover:shadow-lg  md:left-5 md:top-5">
                        <div className="uppercase text-white">
                          <p className="text-font14 text-white">{item.industry}</p>
                        </div>
                      </div>
                      <div className="absolute bottom-0 mt-3 md:mt-4 z-[1] p-5">
                        <h3 className="text-30 mb-1 duration-200 ease-in-out  md:mb-2 text-white  duration-200 duration-300 ease-in-out ease-in-out ">
                          {item.companyName}
                        </h3>
                        <div className="flex gap-1">
                          {item?.channels?.map((channel, index) => (
                            <p key={index} className="text-19 text-gray1 text-white  group-hover:-translate-x-[-3px] group-hover:text-primary duration-200 ease-in-out">{index == item.channels.length - 1 ? channel.channelName : channel.channelName + ", "}</p>
                          ))}
                        </div>
                        {item?.channels?.length == 0 && <p className="text-19 text-gray1 text-white  group-hover:-translate-x-[-3px] group-hover:text-primary duration-200 ease-in-out">{item.channelsUsed}</p>}
                      </div>
                    </div>

                    <Link href={`/case-study/${formatLinkForCaseStudy(item.companyName)}`}
                      className="absolute top-0 z-[1] h-full w-full"
                    ></Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
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
                  href={`/portfolio/${item.id}`}
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

export default CaseStudyList;
