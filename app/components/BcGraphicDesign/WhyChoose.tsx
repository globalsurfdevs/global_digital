"use client";

import React from "react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import { motion } from "framer-motion";

interface PlatformsItem {
  id?: number;
  icon?: string;
  title?: string;
  colcount?: number;
  dec?: string;
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
      className={`container mx-auto py-4 ${leftzero ? "relative" : ""}  pb-[50px] md:pb-10 lg:pb-12  xl:pb-[138px]`}
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
                <div className="flex items-center ">
                  <div className="  flex h-[30px] w-[35px] items-center justify-center bg-primary transition-transform duration-500">
                    <Image src={assets.gdtick} alt="tick" />
                  </div>

                  <div
                    className={`ml-[15px] h-[1px] w-full rounded-xl bg-black  ${bgblack ? "bg-white" : ""}`}
                  >
                    {/* <div className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"></div> */}
                  </div>
                </div>

                <div>
                  <h3 className="text-30 my-5 lg:my-[30px]">
                    {platform.title}
                  </h3>
                  <p className="text-19 fnt-lexend text-[#77787B]">
                    {platform.dec}
                  </p>
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
