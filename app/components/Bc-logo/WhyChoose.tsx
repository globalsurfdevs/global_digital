"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface PlatformsItem {
  id: number;
  icon: string;
  title: string;
  colcount?: number;
  dec: string;
}

interface PlatformsSectionProps {
  bgblack?: boolean;
  icontitle?: boolean;
  leftzero?: boolean;
  colcount?: number;
  desc?: string;
  fdesc?: string;
  title: string;
  data: PlatformsItem[];
  hiddentitle?: boolean;
}

const Platformsecom: React.FC<PlatformsSectionProps> = ({
  title,
  data,
  bgblack,
  leftzero,
  desc,
  colcount = 3, // Default column count
  icontitle,
  hiddentitle,
}) => {
  return (
    <div
      className={`container mx-auto py-4 ${leftzero ? "relative" : ""}  pt-[50px] md:pt-10 lg:pt-12  xl:pt-[138px]`}
    >
      <div
        className={`flex flex-col gap-7 ${bgblack ? "bg-black" : "bg-dgray"} ${leftzero ? "left0w" : ""} p-[25px] lg:gap-12 lg:p-[100px]`}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            },
          }}
        >
          <h2
            className={`title-65 mb-6 max-w-[31ch] md:mb-[54px] ${bgblack ? "text-white" : ""}`}
          >
            {title}
          </h2>
          {desc && (
            <p
              className="text-19 fnt-lexend max-w-[76ch] text-gray1 transition-colors duration-300 group-hover:text-gray-700"
              dangerouslySetInnerHTML={{ __html: desc }}
            ></p>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.2, ease: "easeOut" },
            },
          }}
        >
          <div
            className={`grid grid-cols-1 gap-x-8 gap-y-[45px] md:grid-cols-2 lg:gap-y-[95px] xl:grid-cols-${colcount}`}
          >
            {data.map((platform) => (
              <div
                key={platform.id}
                className="group flex flex-col transition-all duration-300"
              >
                <div
                  className={`flex items-center gap-7 ${icontitle ? "flex-col items-baseline" : ""}`}
                >
                  <Image
                    src={platform.icon}
                    alt={platform.title || platform.dec}
                    width={50}
                    height={50}
                    className="w-[25px] lg:w-auto"
                  />
                </div>

                <div
                  className={`relative mt-5 h-[1px] overflow-hidden rounded-xl bg-black lg:mt-[30px] ${bgblack ? "bg-white" : ""}`}
                >
                  {/* <div className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"></div> */}
                </div>

                <div>
                  <h3 className="text-30 my-5 lg:my-[30px]">
                    {platform.title}
                  </h3>
                  <p
                    className={`${bgblack ? "group-hover:text-gray-300" : ""} ${
                      hiddentitle
                        ? "text-30 transition-colors"
                        : "text-19 fnt-lexend text-[#77787B]"
                    }`}
                    dangerouslySetInnerHTML={{ __html: platform.dec }}
                  ></p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Platformsecom;
