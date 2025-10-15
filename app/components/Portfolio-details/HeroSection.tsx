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

const HeroSection = ({
  data,
}: {
  data: {
    portfolio: Portfolio[];
    portfolioHighlights: PortfolioHighlight[];
  } | null;
}) => {
  if (!data) return null;

  return (
    <div>
      <div className="relative">
        <div className="z-1 relative h-[350px] w-full lg:h-[450px] xl:h-[700px]">
          <Image
            src={data.portfolio[0].bannerImage}
            alt="heroImage"
            className="absolute h-full w-full object-cover object-center"
            fill
          />
          <div className="bg-bl-gradient absolute top-0 h-full w-full "></div>
        </div>
      </div>

      <div className="">
        <div className="   bg-dgray   py-10  lg:py-[80px] xl:py-[100px]  2xl:py-[140px] ">
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
              <div className="grid grid-cols-1 lg:grid-cols-[35%_65%]">
                <div> 
                  <div className="mb-2 flex items-center gap-2 lg:mb-8">
                    <h3 className="text-30 leading-lh1p33">STORY</h3>
                    <div className="h-4 w-4 bg-primary lg:h-5 lg:w-5 "></div>
                  </div>
                </div>
                <div>
                  <div className="text-30 fnt-lexend text-black lastptag">
                    {parse(data.portfolio[0].story)}
                  </div>

                  <Link
                    href={data.portfolio[0].websiteLink}
                    className="z-2 z-1 group relative  mt-8 flex w-fit items-center gap-3 border border-l-0 border-r-0 border-t-0 border-transparent p-0
                                   pb-3 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-black before:transition-all before:duration-300 before:ease-in-out
                                        after:absolute after:bottom-0 after:right-0 after:h-[1px] after:w-full after:bg-orange-500 after:transition-all after:duration-300 after:ease-in-out hover:border-b-white hover:after:w-0 lg:mt-10"
                  >
                    <div className="relative">
                      <p
                        className={`text-sm font-medium uppercase duration-200 ease-in-out group-hover:text-primary md:text-[16px] ${lexend.className}`}
                      >
                        Visit live website
                      </p>
                    </div>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="duration-200 ease-in-out group-hover:scale-125"
                    >
                      <g clipPath="url(#clip0_65_58)">
                        <path
                          d="M18.7892 1.2749L0.699219 19.0149"
                          stroke="#E53F30"
                          strokeWidth="3"
                          strokeMiterlimit="10"
                          className="group-hover:stroke-black"
                        />
                        <path
                          d="M0.699219 1.2749H18.7892V18.6649"
                          stroke="#E53F30"
                          strokeWidth="3"
                          strokeMiterlimit="10"
                          className="group-hover:stroke-black"
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
                  </Link>
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
                <div  className="py-10 lg:py-[75px]">
                <hr />
                </div>
                <div className="flex flex-col gap-5  lg:grid lg:grid-cols-3 lg:gap-5 lg:gap-x-[50px] ">
                  {data.portfolioHighlights.map((item) => (
                    <div
                      className="group border-b border-black/10   last:border-b-0 last:border-r-0 lg:border-b-0 lg:border-r "
                      key={item.customId}
                    >
                      <p className="title-65 font-400 text-black duration-500 group-hover:-translate-y-1">
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

export default HeroSection;
