"use client";
import React from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import { assets } from "@/public/assets/assets";
interface ResultsItem {
  id: number;

  title: string;
  dec: string;
  url: string;
  icon: string;
}

interface PaidsearchSectionProps {
  title: string;
  data: ResultsItem[];
}

const Paidsearch: React.FC<PaidsearchSectionProps> = ({ title, data }) => {
  return (
    <div className="pb-[50px] lg:pb-[147px]">
      <div className="container mx-auto py-4">
        <div className="flex flex-col  pt-[50px] lg:pt-[140px]  ">
          <div className="mb-6 text-4xl lg:mb-[32px]">
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
              <h2 className="title-65">{title}</h2>
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
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {data.map((result) => (
                <div
                  key={result.id}
                  className="group relative bg-[#1D1D1D] pb-0 text-white duration-300 ease-linear hover:cursor-pointer "
                >
                  <div className="flex flex-col  px-6 pb-6 pt-5  duration-300 ease-in-out group-hover:bg-primary  md:px-[50px] md:pb-8   md:pt-8 lg:pb-[50px] lg:pt-[37px]">
                    <div className="relative  flex flex-col  ">
                    <Image src= {result.icon} alt="image"  className="mb-8" />
                     <p className="text-30 mb-[10px] md:mb-[33px]">
                      {result.title}
                    </p>
                    <p className={`text-19 fnt-lexend text-white  `}>
                      {result.dec}
                    </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Paidsearch;
