"use client";
import React from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
interface FrameworkItem {
  id: number;
  title: string;
  title1?: string;
  icn?: string | StaticImageData;
  dec: string;
  urllink?: string;
}

interface FrameworkSectionProps {
  title1?: string;
  title: string;
  bgcolor?: string;
  description?: string;
  colcount?: number;
  maxchwidth?: number;
  data: FrameworkItem[];
}

const WhatWeDelivered: React.FC<FrameworkSectionProps> = ({
  title,
  title1,
  data,
  description,
  bgcolor,
  colcount,
  maxchwidth,

}) => {
  return (
    <div className="">
      <div className="container mx-auto py-4">
        <div className="pd-cus flex flex-col pt-10  lg:pt-[80px] xl:pt-[100px]  2xl:pt-[140px]">
          <div className="text-4xl">
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

              {title1 && (
                <Link href="">
                <p className="mb-6 border-l-2 border-[#DC0000] pl-5 text-[20px] uppercase text-[#77787B] lg:mb-[79px]">
                  {title1}
                  </p>
                </Link>
              )}
              {description && (
                <div>
                  <p className="fnt-lexend pb-6 text-font19 font-[500] leading-[1.2] text-gray1 lg:pb-[58px]">
                    {description}
                  </p>
                  </div>
              )}
              {!description && (
                <>
                   <div
                    style={{ maxWidth: `${maxchwidth}ch` }}
                  >
                    <h2 className="title-65 pb-6 lg:pb-[40px]">{title}</h2>
                    </div>
                </>
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
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-4  lg:flex justify-between  xl:grid-cols-${colcount ? `${colcount}` : "4"}`}
            >
              {data.map((framework) => (
                <div
                  key={framework.id}
                  className="group relative  gap-3 md:gap-0  flex flex-row md:flex-col overflow-hidden"
                >
                  {/* Animated Red Border */}
                
                  <div className="align-center flex h-[30px] w-[30px] mb-3 lg:mb-[30px] justify-center bg-primary p-2 transition-colors duration-500   md:h-[50px] md:w-[50px]">
                    <Image
                                             src={framework.icn || ""}
                                             alt={"Default alt text"}
                                             className="fltrcls h-auto w-auto max-w-[50px] object-contain transition duration-500   "
                                           />   </div>
 
                  <div className="text-2xl relative w-fit">

                    <h3
                      className="text-30 text-black "
                      dangerouslySetInnerHTML={{ __html: framework.title }}
                    ></h3>
                        { framework.urllink && (   <Link href={framework.urllink} className="absolute top-0 w-full h-full"> </Link>
                        )}
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

export default WhatWeDelivered;
