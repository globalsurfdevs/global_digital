"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ExpertiseItem {
  id: number;
  icon: string;
  title: string;
  subtitle?: string;
  desc: string;
  url?: string;
}

interface ExpertiseSectionProps {
  title: string;
  subtitle?: string;
  data: ExpertiseItem[];
}

const Expertise: React.FC<ExpertiseSectionProps> = ({
  title,
  data,
  subtitle,
}) => {
  return (
    <div className="bg-black">
      <div className="container mx-auto py-4">
        <div className="flex flex-col pb-[50px] pt-[50px] lg:pb-[150px] lg:pt-[136px] ">
          <div className="mb-5 lg:mb-[56px]">
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
              <h2 className="title-65 text-white lg:max-w-[1008px]">{title}</h2>
              <div className="flex justify-between lg:mt-[40px] ">
                {subtitle && (
                  <h3 className="text-[19px] text-[#77787B]">{subtitle}</h3>
                )}
                {/* <button
                  className="z-2  hover:border-b-red group relative flex w-fit items-center gap-3 border border-l-0 border-r-0 border-t-0 border-transparent
                      p-0 pb-3 text-white before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-black 
                      before:transition-all before:duration-300 before:ease-in-out after:absolute after:bottom-0 after:right-0 after:h-[1px] after:w-full after:bg-orange-500 
                      after:transition-all after:duration-300 after:ease-in-out hover:after:w-0"
                >
                  <div className="relative">
                    <p className="text-sm font-medium duration-200 ease-in-out  md:text-[16px]">
                      Get a Free Strategy Session
                    </p>
                    <Link
                      href="#"
                      className="absolute top-0 z-[1] h-full w-full"
                    ></Link>
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
                </button> */}
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              className="grid grid-cols-1 gap-5  md:grid-cols-2 xl:grid-cols-3 xl:gap-0 xxl:grid-cols-4 "
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
              {/* Item 1 */}
              {data.map((expertise) => (
                <div key={expertise.id}>
                  {expertise.url ? (
                    <div key={expertise.id}>
                      <Link href={`${expertise.url}`}>
                        <div
                          key={expertise.id}
                          className="group flex flex-col justify-between gap-3 border-[1px] border-[#e5e7eb4d] p-5 transition-all duration-500 hover:bg-primary md:h-[300px]  lg:h-[340px] lg:gap-0 lg:p-10 xl:h-[414px]"
                        >
                          {/* Image Wrapper */}
                          <div className="align-center flex h-[30px] w-[30px] justify-center bg-primary p-2 transition-colors duration-500 group-hover:bg-white md:h-[50px] md:w-[50px]">
                            <Image
                              src={expertise.icon}
                              alt={expertise.title}
                              className="fltrcls transition duration-500 group-hover:invert-0"
                            />
                          </div>

                          {/* Content */}
                          <div>
                            {/* Title */}
                            <h3 className="text-30 titlesp  text-white transition-colors duration-300 group-hover:text-white">
                              {expertise.title}
                            </h3>

                            <div className=" overflow-hidden">
                              <p
                                className="text-19 fnt-lexend cntsmd hided-content max-h-0 w-[102%] overflow-hidden pt-2 text-white
                                opacity-0 transition-all duration-500 group-hover:max-h-[15rem] group-hover:opacity-100"
                              >
                                {expertise.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <div key={expertise.id}>
                      <div
                        key={expertise.id}
                        className="group flex flex-col justify-between gap-3 border-[1px] border-[#e5e7eb4d] p-5 transition-all duration-500 hover:bg-primary md:h-[300px]  lg:h-[340px] lg:gap-0 lg:p-10 xl:h-[414px]"
                      >
                        {/* Image Wrapper */}
                        <div className="align-center flex h-[30px] w-[30px] justify-center bg-primary p-2 transition-colors duration-500 group-hover:bg-white md:h-[50px] md:w-[50px]">
                          <Image
                            src={expertise.icon}
                            alt={expertise.title}
                            className="fltrcls transition duration-500 group-hover:invert-0"
                          />
                        </div>

                        {/* Content */}
                        <div>
                          {/* Title */}
                          <h3 className="text-30 titlesp  text-white transition-colors duration-300 group-hover:text-white">
                            {expertise.title}
                          </h3>

                          <div className=" overflow-hidden">
                            <p
                              className="text-19 fnt-lexend cntsmd hided-content max-h-0 w-[102%] overflow-hidden pt-2 text-white
                                   opacity-0 transition-all duration-500 group-hover:max-h-[15rem] group-hover:opacity-100"
                            >
                              {expertise.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
