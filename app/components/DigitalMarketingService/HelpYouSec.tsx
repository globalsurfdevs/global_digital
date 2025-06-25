"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
interface HelpYouItem {
  id: number;
  icon: string;
  title?: string;
  title2?: string;
  subtitle?: string;
  dec: string;
}

interface HelpYouSectionProps {
  bgblack?: boolean;
  icontitle?: boolean;
  leftzero?: boolean;
  title?: string;
  title2?: string;
  subtitle?: string;
  colcount?: number;
  hiddentitle?: boolean;
  data: HelpYouItem[];
}

const HelpYouSec: React.FC<HelpYouSectionProps> = ({
  title,
  subtitle,
  title2,
  data,
  bgblack,
  icontitle,
  leftzero,
  hiddentitle,
  colcount,
}) => {
  return (
   <section className={ `py-140 ${bgblack ? "bg-black" : "bg-dgray"}`}>
      <div className="container">
        <div className={`secps flex flex-col gap-7 `} >
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
              {title && (
                <h2 className={`title-65  ${bgblack ? "text-white" : ""}`}>
                  {title}
                </h2>
              )}
              {title && (
                <p className="text-19 fnt-lexend text-[#77787B] lg:my-[30px]">
                  {subtitle}
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
            <div className={`grid grid-cols-1 gap-x-8 gap-y-[45px] md:grid-cols-2 lg:gap-y-[95px]  ${colcount ? `xl:grid-cols-${colcount}` : "xl:grid-cols-3"}`} >
              {data.map((helpyou) => (
                <div key={helpyou.id} className="group flex flex-col transition-all duration-300  " >
                  <div className={`flex items-center gap-7 ${icontitle ? "flex-col items-baseline " : ""}`} >
                    <Image src={helpyou.icon} alt={helpyou.title || helpyou.dec} className="w-[25px] lg:w-auto" />
                    {!hiddentitle && (
                      <h3
                        className={`text-30 transition-colors duration-300 group-hover:text-primary ${bgblack ? "text-white" : ""
                          }`}
                        dangerouslySetInnerHTML={{ __html: helpyou.title ?? "" }}
                      />
                    )}
                  </div>

                  <div className={`relative mb-5 mt-5 h-[1px] overflow-hidden rounded-xl bg-black lg:mb-[30px] lg:mt-[30px] ${bgblack ? "bg-white" : ""}`} >
                    <div className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"></div>
                  </div>

                  <div>
                    {!hiddentitle && helpyou.title2 && (
                      <h3
                        className={`text-30 transition-colors duration-300 group-hover:text-primary lg:mt-[20px] ${bgblack ? "text-white" : ""
                          }`}
                        dangerouslySetInnerHTML={{
                          __html: helpyou.title2,
                        }}
                      />
                    )}
                    <p className={` ${bgblack ? "group-hover:text-gray-300" : ""}  
                    ${hiddentitle ? "text-30 transition-colors " : "text-19 fnt-lexend text-gray1 transition-colors duration-300 group-hover:text-gray-700"}`}
                      dangerouslySetInnerHTML={{ __html: helpyou.dec }} ></p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
   </section>
  );
};

export default HelpYouSec;
