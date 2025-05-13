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

const RightAlignedSec: React.FC<FrameworkSectionProps> = ({
  title,
  title1,
  data,
  description,
  bgcolor,
  colcount,
  maxchwidth,

}) => {
  return (
    <div className={` ${bgcolor ? `${bgcolor}` : "bg-dgray"}`}>
      <div className="container mx-auto py-4">
        <div className="pd-cus grid grid-cols-1 py-[50px] lg:py-[150px] xl:grid-cols-7  ">
          <div className="text-4xl col-span-3 lg:pr-[75px]">
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
                    <h2 className="title-65 pb-6 lg:pb-[58px]">{title}</h2>
                    </div>
                </>
              )}
            </motion.div>
          </div>
          <div className="col-span-4">
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
              className={`grid grid-cols-1 gap-6  md:grid-cols-2 lg:gap-10 xl:grid-cols-${colcount ? `${colcount}` : "4"}`}
            >
              {data.map((framework) => (
                <div
                  key={framework.id}
                  className="group relative    flex flex-col overflow-hidden"
                >
                  {/* Animated Red Border */}
                  <div
                    className={`relative h-[1px] overflow-hidden rounded-xl ${bgcolor === "bg-black" ? "bg-white" : "bg-black"}`}
                  >
                    <div className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"></div>
                  </div>
                  {!framework.icn && (
                    <div className="mb-4 mt-6 flex h-[50px]  w-[50px] items-center justify-center bg-primary   transition-transform duration-500  lg:mb-8 lg:mt-10">
                      <p className="text-30  text-white transition-transform duration-500">
                        {String(framework.id).padStart(2, "0")}
                      </p>
                    </div>
                  )}
                  {framework.icn && (
                    <div className="mb-4 mt-6 flex h-[50px]  w-[50px] items-center justify-center bg-primary    lg:mb-8 lg:mt-10">
                      <Image
                        src={framework.icn}
                        alt="icon"
                        className=" object-cover brightness-0 invert-[1] "
                      />
                    </div>
                  )}

                  <div className="text-2xl relative w-fit">

                    <h3
                      className="text-30 pb-3 text-black lg:pb-6 "
                      dangerouslySetInnerHTML={{ __html: framework.title }}
                    ></h3>
                        { framework.urllink && (   <Link href={framework.urllink} className="absolute top-0 w-full h-full"> </Link>
                        )}
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
    </div>
  );
};

export default RightAlignedSec;
