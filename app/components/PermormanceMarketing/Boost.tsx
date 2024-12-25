"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
interface BoostItem {
  id: number;
  icon: string;
  title: string;
}

interface BoostSectionProps {
  title: string;
  data: BoostItem[];
}

const Boost: React.FC<BoostSectionProps> = ({ title, data }) => {
  return (
    <div className="bg-dgray">
      <div className="container max-auto py-4">
        <div className="pb-[50px] lg:pb-[157px] pt-[50px] lg:pt-[111px]">
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8  pt-8 lg:pt-[58px]">
              {data.map((boost) => (
                <div className="flex flex-col  " key={boost.id}>
                  <div className="pb-[20px] md:pb-[65px] border-gray-500 imsr">
                    <Image src={boost.icon} alt="image" />
                  </div>

                  <div className="h-[1px] w-full bg-gray-500 rounded-xl"></div>

                  <div className="pt-[17px] md:pt-[53px] ">
                    <h3 className="text-30">{boost.title}</h3>
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

export default Boost;
