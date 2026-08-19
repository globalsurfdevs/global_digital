"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Portfolio } from "@/app/types/Portfolio";
import {
  formatLinkForPortfolio,
  formatLinkForCaseStudy,
} from "@/app/helpers/formatLink";

export const SuccessStoriesPortfolio = ({
  companyId,
  colCount,
}: {
  companyId: string | undefined;
  colCount?: number;
}) => {
  const [data, setData] = useState<Portfolio[] | null>(null);

  useEffect(() => {
    // const fetchPortfolios = async () => {
    //     const response = await fetch(`/api/portfolio`);
    //     if (response.ok) {
    //         const data = await response.json();
    //         console.log(data)
    //         setData(data?.portfolio.filter((item:Portfolio)=>item.id!==companyId).sort(() => Math.random() - 0.5).slice(0,3))
    //     }
    // }
    const fetchPortfolios = async () => {
      const response = await fetch(`/api/portfolio`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const allowedIds = [46, 49, 57, 85, 73, 83, 1, 43];

        const filtered = data?.portfolio
          ?.filter((item: Portfolio) => allowedIds.includes(item.id))
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        setData(filtered);
      }
    };

    fetchPortfolios();
  }, [companyId]);

  return (
    <div className="  flex flex-col py-10  lg:py-[80px] xl:py-[100px]  2xl:py-[140px]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
        variants={{
          hidden: { opacity: 0, y: 50 }, // Start below and invisible
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" },
          }, // Slide up and fade in
        }}
      >
        <div>
          <h2 className="title-65 pb-5 lg:pb-[48px]">Success Stories</h2>
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
        variants={{
          hidden: { opacity: 0, y: 50 }, // Start below and invisible
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.3, ease: "easeOut" },
          }, // Slide up and fade in
        }}
      >
        <div
          className={`${colCount ? `grid lg:grid-cols-${colCount}` : "grid lg:grid-cols-3"} gap-8`}
        >
          {data && data.length > 0
            ? (colCount === 2 ? data.slice(0, 2) : data).map((item, index) => (
                <div className="group relative flex flex-col" key={index}>
                  <div className="card-img relative mb-4 h-[250px] lg:mb-[31px] lg:h-[300px] xl:h-[450px] 2xl:h-[580px]">
                    <Image
                      src={item.bannerImage ?? item.coverImage}
                      alt="image"
                      className="absolute h-full w-full object-cover"
                      fill
                    />

                    <div className="absolute left-3 top-3 cursor-pointer rounded-3xl bg-gray1 px-4 py-2 duration-200 ease-in-out group-hover:z-[1] group-hover:-translate-x-[-3px] group-hover:bg-primary group-hover:shadow-lg lg:left-7 lg:top-7 ">
                      <div className="uppercase text-white">
                        <p className="text-font14 text-white">
                          {item.industry}
                        </p>
                      </div>
                    </div>

                    <div className="absolute bottom-8 right-8 z-10">
                      <img
                        src={item.logo}
                        alt="logo"
                        className="h-[33px] w-auto brightness-0 invert-[1]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-font30">{item.companyName}</h4>

                      <div className="flex flex-wrap gap-2">
                        {item.categories && item.categories.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {item.categories.map((ch, i) => (
                              <p
                                key={i}
                                className="text-font16 text-gray1 transition duration-300 ease-in-out group-hover:text-primary"
                              >
                                {ch.name}
                                {i !== item.categories.length - 1 && ","}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-font16 text-gray1 transition duration-300 ease-in-out group-hover:text-primary">
                            {item.channelsUsed}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 36 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-all duration-300 group-hover:text-red-500"
                      >
                        <path
                          d="M33.8105 1.7998L1.25781 33.7227"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M1.25781 1.7998H33.8105V33.0929"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-2 h-[2px] w-full bg-[#E6E6E6] transition-colors duration-300 group-hover:bg-primary lg:mt-5"></div>

                  <Link
                    href={
                      item.section == "portfolio"
                        ? `/portfolio/${formatLinkForPortfolio(item.companyName)}`
                        : `/case-study/${formatLinkForCaseStudy(item.companyName)}`
                    }
                    className="absolute left-0 top-0 h-full w-full"
                  />
                </div>
              ))
            : null}
        </div>
      </motion.div>
    </div>
  );
};
