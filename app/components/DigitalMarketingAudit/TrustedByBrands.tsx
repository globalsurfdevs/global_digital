"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ExpertiseItem { 
  icon: string; 
}

interface ExpertiseSectionProps {
  title: string; 
  data: ExpertiseItem[]; 
  maxchwidth?: number;
  subttle?: string;
}

const TrustedByBrands: React.FC<ExpertiseSectionProps> = ({
  title,
  maxchwidth,
  subttle,
  data, 
}) => {
  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-col   pt-[50px]   lg:pt-[136px] padding0">
        <div className="">
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
            <h2 className="title-65" style={{ maxWidth: maxchwidth ? `${maxchwidth}ch` : undefined }}>{title}</h2>
            <p className="text-19 fnt-lexend font-400 text-[#77787B] my-5 lg:mt-7 lg:mb-[75px]">{subttle}</p>             
          </motion.div>
        </div>

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {data.map((expertise ,index) => (
              <div key={index}>
                <Image
                  src={expertise.icon}
                  alt={'brand'} 
                  width={189}
                  height={91} 
                />
              </div>
            ))}
          </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrustedByBrands;
