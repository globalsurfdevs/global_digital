"use client";
import React from "react";

import { motion } from "framer-motion";
import Link from "next/link";
interface ResultsItem {
  id: number;
  growth: string;
  traffic: string;
  title: string;
  url?: string;
}

interface ResultsSectionProps {
  description?: string;
  title: string;
  data: ResultsItem[];
}

const Results: React.FC<ResultsSectionProps> = ({
  title,
  data,
  description,
}) => {
  return (
    <div className="">
      <div className="container mx-auto py-4">
        <div className="flex flex-col  pt-[50px] lg:pt-[69px]  ">
          <div className="mb-6 text-4xl lg:mb-[32px]">
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
              <h2 className="title-65">{title}</h2>
              {description && (
                <p className="text-19 fnt-lexend max-w-[70ch] pb-2 pt-6 text-gray1 md:pb-6">
                  {description}
                </p>
              )}
            </motion.div>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
            variants={{
              hidden: { opacity: 0, y: 50 }, // Start below and invisible
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.2, ease: "easeOut" },
              }, // Slide up and fade in
            }}
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {data.map((result) => (
                <div
                  key={result.id}
                  className="group relative bg-black pb-0 text-white duration-300 ease-linear hover:cursor-pointer"
                >
                  <div className="flex flex-col bg-gray2 px-6 pb-6 pt-5  duration-300 ease-in-out group-hover:bg-primary  md:px-[50px] md:pb-8   md:pt-8 lg:pb-[50px] lg:pt-[60px]">
                    <div className="relative  flex flex-col  ">
                      <p
                        className={`title-65 leading-lh0p76 text-white ${result.traffic ? "mb-[15px] lg:mb-[28px]" : ""}`}
                      >
                        {result.growth}
                      </p>
                      <p className={`fnt-lexend text-font25  leading-lh1p26`}>
                        {result.traffic}
                      </p>
                      {result.url && (
                        <div className="absolute right-0 top-0 opacity-0 duration-500 ease-in-out group-hover:opacity-100">
                          <svg
                            width="36"
                            height="35"
                            viewBox="0 0 36 35"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M33.8125 1.7998L1.25977 33.7227"
                              stroke="white"
                              strokeWidth="2"
                              strokeMiterlimit="10"
                            />
                            <path
                              d="M1.25977 1.7998H33.8125V33.0929"
                              stroke="white"
                              strokeWidth="2"
                              strokeMiterlimit="10"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col px-6 pb-8 pt-6 text-white md:px-[50px] md:pt-8  ">
                    <p className="text-30">{result.title}</p>
                  </div>

                  {result.url && (
                    <Link
                      href={result.url}
                      className="absolute left-0 right-0 top-0 h-full w-full"
                    ></Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Results;
