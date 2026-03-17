"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Portfolio } from "@/app/types/Portfolio";
import { Lexend } from "next/font/google";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
import parse from "html-react-parser";
import { PortfolioHighlight } from "@/app/types/PortfolioHighlights";
import Link from "next/link";

const HeroSectionDetails = ({
  data,
}: {
  data: {
    portfolio: Portfolio;
    portfolioHighlights: PortfolioHighlight[];
  } | null;
}) => {
  if (!data) return null;

  return (
    <div> 

      <div className="">
        <div className="      py-10  lg:py-[80px] xl:py-[100px]  2xl:py-[140px] ">
          <div className="container  flex w-full flex-col gap-5   lg:p-0">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
              variants={{
                hidden: { opacity: 0, y: 30 }, // Start below and invisible
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, ease: "easeOut" },
                }, // Slide up and fade in
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[auto_270px] justify-between lg:items-center gap-5">
                <div> 
                  <div className="text-30 fnt-lexend text-black lastptag max-w-[60ch]">
                    {/* {parse(data.portfolio.story)} */}
                    <p>Innovo Group is a UK-headquartered construction and real estate developer with operations across the UAE, Africa, and Canada</p>
                  </div>
                </div>
                <div>

                  <div>
                    <Link
                    href={data.portfolio.websiteLink} target="_blank"
                    className="z-2 z-1 group relative  mt-8   "
                  > 
                    <button className="btn-outline-primary-text-black flex items-center gap-3 xl:px-[43px] xl:py-[22px] xl:rounded-[100px]">Visit live website
                       <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className=" w-3 h-3 lg:w-[20px] lg:h-[20px] duration-200 ease-in-out group-hover:scale-105"
                    >
                      <g clipPath="url(#clip0_65_58)">
                        <path
                          d="M18.7892 1.2749L0.699219 19.0149"
                          stroke="#E53F30"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          className="group-hover:white"
                        />
                        <path
                          d="M0.699219 1.2749H18.7892V18.6649"
                          stroke="#E53F30"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          className="group-hover:white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_65_58">
                          <rect
                            width="19.79"
                            height="19.45"
                            fill="white"
                            transform="translate(0 0.274902)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    </button>
                   
                  </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div>
            {data.portfolioHighlights.length !== 0 ? (
              <div  >
                <div className="container mx-auto">
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
                    <div className="py-10 lg:py-[75px]">
                      <hr />
                    </div>
                    <div className="flex flex-col gap-5  lg:grid lg:grid-cols-3 lg:gap-5 lg:gap-x-[50px] ">
                      {data.portfolioHighlights.map((item) => (
                        <div
                          className="group border-b border-black/10   last:border-b-0 last:border-r-0 lg:border-b-0 lg:border-r "
                          key={item.customId}
                        >
                          <p className="title-65 font-400 text-primary duration-500 group-hover:-translate-y-1">
                            {item.number}
                          </p>
                          <p className="text-[25px] pt-[10px] text-77787B duration-500 group-hover:-translate-y-2 lg:pt-[30px]">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            ) : null}
          </div>
        </div>


      </div>
    </div>
  );
};

export default HeroSectionDetails;
