"use client";
import React from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { totitleSentenceCase } from "@/app/helpers/maintainProperWordings";
interface FrameworkItem {
  _id: number;
  title: string;
  icn?: string;
  dec?: string;
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
  const gridColumnsClass = `xl:grid-cols-${colcount} `;

  return (
    <div className="overflow-hidden">
      <div className="container  ">
        {/* <div className="container mx-auto py-4 !pb-[40px] lg:!pb-[100px]"> */}
        <div className="border-t border-black/20 py-10  lg:py-[80px] xl:py-[100px]  2xl:py-[150px]">
          <div className={`pd-cus flex flex-col `}>
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
                      <h2 className="title-65 pb-8 leading-[1.507692] lg:pb-[40px]">
                        {totitleSentenceCase(title)}
                      </h2>
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
                className={`grid grid-cols-1 justify-between gap-8 sm:grid-cols-2  lg:gap-[80px] ${gridColumnsClass}`}
              >
                {data.map((framework) => (
                  <div
                    key={framework._id}
                    className="group relative flex flex-row items-start gap-3 overflow-hidden sm:flex-col md:gap-0"
                  >
                    <div className="flex h-[36px] w-[36px] max-sm:mt-1 shrink-0 items-center justify-center bg-primary md:mb-3 md:h-[50px] md:w-[50px] lg:mb-[30px]">
                      {framework.icn && (
                        <Image
                          src={framework.icn}
                          alt=""
                          width={28}
                          height={28}
                          className="fltrcls h-auto max-h-[34px] w-[28px] max-w-[34px] object-contain transition duration-500 lg:w-[34px]"
                        />
                      )}
                    </div>

                    <div className="relative w-full self-start text-2xl ">
                      <h3
                        className="xl:text-30 m-0 w-full self-start text-[19px] leading-[1.3] text-black md:text-[26px] lg:text-[30px]"
                        dangerouslySetInnerHTML={{
                          __html: totitleSentenceCase(framework.title),
                        }}
                      />

                      {framework.urllink && (
                        <Link
                          href={framework.urllink}
                          className="absolute top-0 h-full w-full"
                        />
                      )}
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

export default WhatWeDelivered;
