"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ExpertiseItem {
  id: number;
  icon: string;
  title: string;
  subtitle?: string;
  desc: string;
  url?: string;
}

interface ExpertiseSectionProps {
  title: string;
  subtitle?: string;
  data: ExpertiseItem[];
}

const Expertise: React.FC<ExpertiseSectionProps> = ({
  title,
  data,
  subtitle,
}) => {
  return (
    <div className="bg-black">
      <div className="container mx-auto py-4">
        <div className="flex flex-col pb-[50px] pt-[50px] lg:pb-[150px] lg:pt-[136px] ">
          <div className="mb-5 lg:mb-[56px]">
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
              <h2 className="title-65 text-white ">{title}</h2>
              <div className="flex justify-between lg:mt-[40px] ">
                {subtitle && (
                  <h3 className="text-[19px] text-[#77787B]">{subtitle}</h3>
                )}

              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              className="grid grid-cols-1 gap-5  md:grid-cols-2 xl:grid-cols-3 xl:gap-0 xxl:grid-cols-4 "
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
              {/* Item 1 */}
              {data.map((expertise) => (
                <div key={expertise.id}>
                  {expertise.url ? (
                    <div key={expertise.id}>
                      <Link href={`${expertise.url}`}>
                        <div
                          key={expertise.id}
                          className="group flex flex-col justify-between gap-3 border-[1px] border-[#e5e7eb4d] p-5 transition-all duration-500 hover:bg-primary md:h-[350px]  lg:h-[400px] lg:gap-0 lg:p-10 xl:h-[502px]"
                        >
                          {/* Image Wrapper */}
                          <div className="align-center flex h-[30px] w-[30px] justify-center bg-primary p-2 transition-colors duration-500 group-hover:bg-white md:h-[50px] md:w-[50px]">
                            <Image
                              src={expertise.icon}
                              alt={expertise.title}
                              className="fltrcls transition duration-500 group-hover:invert-0"
                            />
                          </div>

                          {/* Content */}
                          <div>
                            {/* Title */}
                            <h3 className="text-30 titlesp  text-white transition-colors duration-300 group-hover:text-white">
                              {expertise.title}
                            </h3>

                            <div className=" overflow-hidden">
                              <p
                                className="text-19 fnt-lexend cntsmd hided-content max-h-0 w-[102%] overflow-hidden pt-2 text-white
                                opacity-0 transition-all duration-500 group-hover:max-h-[15rem] group-hover:opacity-100"
                              >
                                {expertise.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <div key={expertise.id}>
                      <div
                        key={expertise.id}
                        className="group flex flex-col justify-between gap-3 border-[1px] border-[#e5e7eb4d] p-5 transition-all duration-500 hover:bg-primary md:h-[350px]  lg:h-[400px] lg:gap-0 lg:p-10 xl:h-[502px]"
                      >
                        {/* Image Wrapper */}
                        <div className="align-center flex h-[30px] w-[30px] justify-center bg-primary p-2 transition-colors duration-500 group-hover:bg-white md:h-[50px] md:w-[50px]">
                          <Image
                            src={expertise.icon}
                            alt={expertise.title}
                            className="fltrcls transition duration-500 group-hover:invert-0"
                          />
                        </div>

                        {/* Content */}
                        <div>
                          {/* Title */}
                          <h3 className="text-30 titlesp  text-white transition-colors duration-300 group-hover:text-white">
                            {expertise.title}
                          </h3>

                          <div className=" overflow-hidden">
                            <p
                              className="text-19 fnt-lexend cntsmd hided-content max-h-0 w-[102%] overflow-hidden pt-2 text-white
                                   opacity-0 transition-all duration-500 group-hover:max-h-[15rem] group-hover:opacity-100"
                            >
                              {expertise.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
