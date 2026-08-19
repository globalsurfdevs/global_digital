"use client";

import React from "react";
import { motion } from "framer-motion";

interface NumberCardGridItem {
  id: number;
  title: string;
  dec: string;
}

interface NumberCardGridProps {
  title?: string;
  data: NumberCardGridItem[];
  leftzero?: boolean;
  colcount?: number;
}

const NumberCardGrid: React.FC<NumberCardGridProps> = ({
  title,
  data,
  leftzero,
  colcount = 4,
}) => {
  return (
    <div className={`container mx-auto py-4 ${leftzero ? "relative" : ""}`}>
      <div className={`secps flex flex-col ${leftzero ? "left0w" : ""} `}>
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
          {title && (
            <h2 className="title-65 mb-10 text-white xl:mb-60">{title}</h2>
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
            className={`grid grid-cols-1 gap-x-[30px] gap-y-[45px] md:grid-cols-2 lg:gap-y-[60px] ${
              colcount ? `xl:grid-cols-${colcount}` : "xl:grid-cols-4"
            }`}
          >
            {data.map((item, index) => (
              <div key={item.id} className="group flex flex-col">
                <div className="mb-10 h-[1px] bg-white">
                  <div className="h-full w-0 bg-primary transition-all duration-500 group-hover:w-full"></div>
                </div>
                <span
                  className="text-28 lg:text-30 mb-4 inline-flex w-fit items-center justify-center bg-primary px-[11px] py-[8px] 
                font-normal leading-none text-white md:mb-10"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-30 whitespace-pre-line leading-[1.2] text-white">
                  {item.title}{" "}
                </h3>
                <p className="fnt-lexend  text-19 mt-4 max-w-[360px] leading-[1.35] text-[#8E8E93] md:mt-8 lg:mt-10">
                  {item.dec}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NumberCardGrid;
