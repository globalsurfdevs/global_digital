"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
interface PlatformsItem {
  id: number;
  icon: string;
  title?: string;
  rttitel?: string;
  dec: string;
}

interface PlatformsSectionProps {
  bgblack?: boolean;
  icontitle?: boolean;
  leftzero?: boolean;
  desc?: string;
  fdesc?: string;
  title: string;
  colcount?: number;
  data: PlatformsItem[];
}

const WhychooseWithoutspace: React.FC<PlatformsSectionProps> = ({
  title,
  data,
  bgblack,
  icontitle,
  leftzero,
  desc,
  fdesc,
  colcount,
}) => {
  return (
    <div className={`container mx-auto py-4  ${leftzero ? "relative" : ""}`}>
      <div
        className={`  flex flex-col gap-7  ${bgblack ? "bg-black" : "bg-dgray"} ${leftzero ? "left0w" : ""} p-[25px] lg:gap-12 lg:p-[100px]`}
      >
        <div>
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
            <h2
              className={`title-65 mb-6  md:mb-10 ${bgblack ? "text-white" : ""}`}
            >
              {title}{" "}
            </h2>
            <p
              className="text-19 fnt-lexend max-w-[87ch] text-gray1 transition-colors duration-300 group-hover:text-gray-700 "
              dangerouslySetInnerHTML={{ __html: desc || "" }}
            ></p>
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
          <div
            className={`grid grid-cols-1 gap-x-8 gap-y-[45px] md:grid-cols-2 lg:gap-x-10  lg:gap-y-[95px] ${colcount ? `xl:grid-cols-${colcount}` : "xl:grid-cols-4"}`}
          >
            {data.map((platform) => (
              <div
                key={platform.id}
                className="group flex flex-col transition-all duration-300   "
              >
                <div
                  className={`flex items-end justify-between gap-7 ${icontitle ? "flex-col items-baseline " : ""}`}
                >
                  <Image
                    src={platform.icon}
                    alt=""
                    className={`${bgblack ? "text-white" : ""}`}
                  />
                </div>

                <div
                  className={`relative mb-5 mt-5 h-[1px] overflow-hidden rounded-xl bg-black lg:mb-[30px] lg:mt-[30px]`}
                >
                  <div className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"></div>
                </div>
                {platform.title && (
                  <p
                    className={`text-30 mb-5 font-[400] transition-colors duration-300 group-hover:text-primary lg:mb-8  ${bgblack ? "text-white" : ""}`}
                  >
                    {platform.title}
                  </p>
                )}
                <div>
                  <p
                    className={`text-19 fnt-lexend text-gray1 transition-colors duration-300 group-hover:text-gray-700 ${bgblack ? "group-hover:text-gray-300" : ""}`}
                  >
                    {platform.dec}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="fnt-lexend mt-4 max-w-[65ch] text-font19 font-[500] leading-[1.2] text-gray1 md:mt-8 xl:mt-14">
            {fdesc}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WhychooseWithoutspace;
