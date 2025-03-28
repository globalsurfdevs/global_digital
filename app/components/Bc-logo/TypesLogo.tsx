"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
interface FrameworkItem {
  title: string;
  description?: string;
  dec: string;
  icon: string;
  alt?: string;
}

interface FrameworkSectionProps {
  title: string;
  bgcolor?: string;
  description?: string; // Made description required
  colcount?: number;
  data: FrameworkItem[];
}

const LogoDesign: React.FC<FrameworkSectionProps> = ({
  title,
  data,
  description,
  bgcolor,
  colcount,
}) => {
  return (
    <div className={` ${bgcolor ? `${bgcolor}` : "bg-black"}`}>
      <div className="container mx-auto py-4">
        <div className="flex flex-col py-[50px] lg:py-[111px] ">
          <div className="text-4xl ">
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
              <h2 className="title-65 pb-6 text-white lg:pb-[58px]">{title}</h2>
              <p className="fnt-lexend pb-6 text-font19 font-[500] leading-[1.2] text-[#77787B] lg:pb-[58px]">
                {description}
              </p>
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
              className={`grid grid-cols-1 gap-6  md:grid-cols-2 lg:gap-10 xl:grid-cols-${colcount ? `${colcount}` : "3"}`}
            >
              {data.map((framework) => (
                <div
                  key={framework.title}
                  className="group relative    flex flex-col overflow-hidden"
                >
                  {/* Animated Red Border */}
                  <div className="relative h-[1px] overflow-hidden rounded-xl  bg-white">
                    <div className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"></div>
                  </div>
                  <Image
                    src={framework.icon}
                    alt={framework.title}
                    className="my-8 lg:my-[40px]"
                  />
                  <div className="text-2xl">
                    <h3 className="text-30 pb-3 text-white lg:pb-6">
                      {framework.title}
                    </h3>
                  </div>
                  <div>
                    <p className="fnt-lexend text-19 font-medium text-gray1">
                      {framework.dec}
                    </p>
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

export default LogoDesign;
