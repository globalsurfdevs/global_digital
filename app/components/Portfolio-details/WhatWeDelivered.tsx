"use client";
import React from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
interface FrameworkItem {
  id: number;
  title: string;
  title1?: string;
  icn?: string | StaticImageData | LucideIcon;
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
  endpoint?: string;
}

const WhatWeDelivered: React.FC<FrameworkSectionProps> = ({
  title,
  title1,
  data,
  description,
  bgcolor,
  colcount,
  maxchwidth,
  endpoint,
}) => {
  const gridColumnsClass = colcount === 6 ? "xl:grid-cols-6" : "xl:grid-cols-4";

  return (
    <div className="">
      <div className="container mx-auto py-4">
        <div
          className={`pd-cus flex flex-col ${endpoint === "sobha-constructions-v2" ? "pt-0" : "pt-10  lg:pt-[80px] xl:pt-[100px]  2xl:pt-[140px]"}`}
        >
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
              className={`grid grid-cols-1 justify-between gap-4 md:grid-cols-2 ${gridColumnsClass}`}
            >
              {data.map((framework) => (
                <div
                  key={framework.id}
                  className="group relative  flex flex-row  gap-3 overflow-hidden md:flex-col md:gap-0"
                >
                  {/* Animated Red Border */}

                  <div className="mb-3 flex h-[30px] w-[30px] items-center justify-center bg-primary p-2 transition-colors duration-500 md:h-[50px] md:w-[50px] lg:mb-[30px]">
                    {framework.icn &&
                      (typeof framework.icn === "string" ||
                      "src" in framework.icn ? (
                        <Image
                          src={framework.icn}
                          alt=""
                          className="fltrcls h-auto w-auto max-w-[50px] object-contain transition duration-500"
                        />
                      ) : (
                        React.createElement(framework.icn, {
                          size: 32,
                          color: "#FFFFFF",
                          strokeWidth: 1.5,
                        })
                      ))}
                  </div>

                  <div className="relative w-fit text-2xl">
                    <h3
                      className="text-30 text-black "
                      dangerouslySetInnerHTML={{ __html: framework.title }}
                    ></h3>
                    {framework.urllink && (
                      <Link
                        href={framework.urllink}
                        className="absolute top-0 h-full w-full"
                      >
                        {" "}
                      </Link>
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
