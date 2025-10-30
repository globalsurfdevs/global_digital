"use client";

import React, { useEffect, useRef, useState } from "react";
import { stories } from "../../data/stories";
import { Lexend } from "next/font/google";

import { motion } from "framer-motion";
import Link from "next/link";
import { Portfolio } from "@/app/types/Portfolio";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

type Data = {
  caseStudyHighlights: {
    companyId: number;
    number: string;
    text: string;
    portfolios: Portfolio;
  }[];
};

const SuccessStories = () => {
  const ref = useRef(null);

  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchCaseStudyData = async () => {
      try {
        const response = await fetch("/api/case-study/home");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setData(data);
        }
      } catch (error) {
        console.log("Failed fetching case study data:", error);
      }
    };

    fetchCaseStudyData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col  gap-6 pb-[50px]  pt-[50px] lg:gap-[50px] lg:pb-[150px] lg:pt-[70px]">
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
          <h2 className="title-65">Discover Our Success Stories</h2>
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
              transition: { duration: 1, ease: "easeOut" },
            }, // Slide up and fade in
          }}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {data &&
              data.caseStudyHighlights.length > 0 &&
              data.caseStudyHighlights.map((item, index) => (
                <div
                  className="group   relative bg-black text-white duration-300 ease-linear hover:cursor-pointer"
                  key={index}
                  ref={ref}
                >
                  <div className="flex flex-col justify-center h-[273px] gap-5   px-8 py-6 duration-300 ease-in-out group-hover:bg-primary lg:py-12 xl:px-[3.5rem]"
                    style={{
                    backgroundImage: `url(${item.portfolios.homeImage})`,
                  }}>
                    <div className="minh247 relative flex h-full flex-col justify-between">
                       
                      
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
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-8 px-8 py-10  text-white xl:px-[3.5rem]">
                    <div className="lg:mb-2">
                      <p className="mb-[28px] text-font65 leading-lh0p76 text-white">
                        {/* {index == 0 ? <span>&#8595;</span> : <span>&#8593;</span>}
                    {animatedValues[index] + "%"} */}
                        {item.number}
                      </p>
                      <p
                        className={`w-3/4 text-font25 leading-lh1p4 ${lexend.className}`}
                      >
                        {item.text}
                      </p>
                    </div>
                    <p className="text-font30 leading-lh1p26">
                      {item.portfolios.homeTitle}
                    </p>
                    <p
                      className={`text-font19 leading-lh1p4 ${lexend.className} text-[#959AA6]`}
                    >
                      {item.portfolios.homeSubTitle}
                    </p>
                  </div>
                  <Link
                    href={`/case-study/${item.portfolios.slug}`}
                    className="absolute left-0 right-0 top-0 h-full w-full"
                  ></Link>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessStories;
