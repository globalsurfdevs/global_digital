"use client";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Portfolio } from "@/app/types/Portfolio";
import {
  formatLinkForPortfolio,
  formatLinkForCaseStudy,
} from "@/app/helpers/formatLink";

export const SuccessStoriesPortfolio = ({
  data,
  colCount,
}: {
  data: Portfolio[];
  colCount?: number;
}) => {

  return (
    <div className="  flex flex-col py-10  lg:py-[80px] xl:py-[110px]  2xl:py-[150px]">
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
          className={`${data?.length >= 3 ? "grid lg:grid-cols-3" : "grid lg:grid-cols-2"} gap-[30px]`}
        >
          {data?.length > 0
            ? (colCount === 2 ? data.slice(0, 2) : data).map((item, index) => (
                  <Link
                    key={item._id || index}
                    href={
                      item.portfolioSource === "new" ||
                      item.section === "portfolio new" ||
                      item.section === "portfolio"
                        ? `/portfolio/${formatLinkForPortfolio(item.slug || item.companyName)}`
                        : `/case-study/${formatLinkForCaseStudy(item.companyName)}`
                    }
                    className="group relative flex flex-col"
                  >
                  {(item.newBannerImage || item.bannerImage || item.coverImage || item.previewImage?.images?.[0] || item.portfolioType === "new" || item.section === "portfolio new") && (
                    <div className="card-img relative mb-4 h-[250px] lg:mb-[31px] lg:h-[300px] xl:h-[450px] 2xl:h-[580px]">
                      <Image
                        src={item.newBannerImage || item.bannerImage || item.coverImage || item.previewImage?.images?.[0] || (item.portfolioType === "new" || item.section === "portfolio new" ? "/images/placeholder.png" : "")}
                        alt={item.companyName || "Success story"}
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
                  )}

                  <div className="flex items-start justify-between">
                    <div className="pl-2">
                      <h4 className="text-font30">{item.companyName}</h4>

                      <div className="flex flex-wrap gap-2">
                        {item.categories && item.categories.length > 0 ? (
                          <div className="flex flex-wrap gap-2 gap-y-0">
                            {item.categories
                              .map((category) =>
                                typeof category === "string" ? category : category?.name,
                              )
                              .filter((name): name is string => Boolean(name?.trim()))
                              .map((name, i, categories) => (
                                <p
                                  key={`${name}-${i}`}
                                  className="text-font16 text-gray1 transition duration-300 ease-in-out group-hover:text-primary"
                                >
                                  {name}
                                  {i !== categories.length - 1 && ","}
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
                        className="mt-2 transition-all duration-300 group-hover:text-red-500"
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
                </Link>
              ))
            : null}
        </div>
      </motion.div>
    </div>
  );
};
