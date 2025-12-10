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
 subtitle?: string; 
  description?: string;
  colcount?: number;
  maxchwidth?: number;
  data: FrameworkItem[];
}

const BottomLine: React.FC<FrameworkSectionProps> = ({
  title,
  title1,
   subtitle,  
  data,
  description,
  bgcolor,
  colcount,
  maxchwidth,

}) => {
  return (
    <div className="bg-[#F2F2F2]">
      <div className="container mx-auto py-4">
        <div className="pd-cus flex flex-col py-[50px] lg:py-[111px]">
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
                  <div style={{ maxWidth: `${maxchwidth}ch` }}>
                    <h2 className="title-65 pb-3 lg:pb-4">{title}</h2>
                    {subtitle && (
                      <p className="text-font19 text-gray1 font-medium pb-6 lg:pb-[58px] leading-[1.4]">
                        {subtitle}
                      </p>
                    )}
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
              className={`grid grid-cols-1 gap-3 lg:gap-[75px]  md:grid-cols-2 lg:gap-10 xl:grid-cols-${colcount ? `${colcount}` : "4"}`}
            >
              {data.map((framework) => (
                <div
                  key={framework.id}
                  className="group relative    flex flex-col overflow-hidden"
                >

 
                  <div className="text-2xl relative w-fit">

                    <h3
                      className="text-30 text-black mb-[30px]"
                      dangerouslySetInnerHTML={{ __html: framework.title }}
                    ></h3>
                        { framework.urllink && (   <Link href={framework.urllink} className="absolute top-0 w-full h-full"> </Link>
                        )}
                  </div>
                   
                  <div>
                    <p className="fnt-lexend text-19 font-medium text-[#77787B] mb-[30px]">
                      {framework.dec}
                    </p>
                  </div>
                  <div
                    className={`relative h-[1px]  overflow-hidden rounded-xl ${bgcolor === "bg-black" ? "bg-white" : "bg-black"}`}
                  >
                    <div className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"></div>
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

export default BottomLine;
