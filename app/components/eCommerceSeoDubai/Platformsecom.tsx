"use client";

import React from "react";
import { motion } from "framer-motion";
interface PlatformsItem {
  id: number;
  icon: string;
  title: string;
  dec: string;
}

interface PlatformsSectionProps {
  bgblack?: boolean;
  icontitle?: boolean;
  leftzero?: boolean;
  btmpara?: string;
  colm?: number;
  desc?: string;
  title: string;
  data: PlatformsItem[];
}

const Platformsecom: React.FC<PlatformsSectionProps> = ({ title, data, bgblack,icontitle ,leftzero,desc,btmpara, colm}) => {
  return (
    <div className={`container mx-auto py-4  ${leftzero ? 'relative' : ''}`}>
      <div className={`mb-[50px] lg:mb-[140px] flex flex-col gap-7 ${bgblack ? 'bg-black' : 'bg-dgray'} ${leftzero ? 'left0w' : ''} p-[25px] lg:gap-12 lg:p-[100px]`}>
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
            <h2 className={`title-65 max-w-[31ch] mb-6 md:mb-10 ${bgblack ? 'text-white' : ''}`}>{title} </h2>
            <p className="text-19 fnt-lexend text-gray1 transition-colors duration-300 group-hover:text-gray-700 max-w-[76ch] ">{desc} </p>
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
          <div className={`grid grid-cols-1 gap-x-8 gap-y-[45px] md:grid-cols-2 lg:gap-y-[95px]  ${colm ? `xl:grid-cols-${colm}` : 'xl:grid-cols-4'}`}>
            {data.map((platform) => (
              <div
                key={platform.id}
                className="group flex flex-col transition-all duration-300   "
              >
                <div className= {`flex items-center gap-7 ${icontitle ? 'flex-col items-baseline ' : ''}`}>

                  <h3 className= {`text-30 transition-colors duration-300 group-hover:text-primary ${bgblack ? 'text-white' : ''}`}>
                    {platform.title}
                  </h3>
                </div>

                <div className={`relative mb-5 mt-5 h-[1px] overflow-hidden rounded-xl bg-black lg:mb-[30px] lg:mt-[30px] ${bgblack ? 'bg-white' : '' }`}>
                  <div className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"></div>
                </div>

                <div>
                  <p className={`text-19 fnt-lexend text-gray1 transition-colors duration-300 group-hover:text-gray-700 ${bgblack ? 'group-hover:text-gray-300' : ''}`}>
                    {platform.dec}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {btmpara &&
            <p className="text-19 mb-0 fnt-lexend text-gray1 transition-colors duration-300 group-hover:text-gray-700 max-w-[76ch] pt-4 md:pt:6 xl:pt-[60px]">{btmpara} </p>
          }
        </motion.div>
      </div>
    </div>
  );
};

export default Platformsecom;
