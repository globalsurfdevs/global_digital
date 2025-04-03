"use client";
import React from "react";
import { motion } from "framer-motion";
interface FrameworkItem {
  id: number;
  title: string;
  dec: string;
}

interface FrameworkSectionProps {
  title: string;
  bgcolor?: string;
  description?: string;
  colcount?: number;
  paddingtop?: number;
  paddingbottom?: number;
  data: FrameworkItem[];
}

const SeoService: React.FC<FrameworkSectionProps> = ({
  title,
  data,
  paddingtop,
  paddingbottom,
  description,
  bgcolor,
  colcount,
}) => {
  return (
    <div className={` ${bgcolor ? `${bgcolor}` : "bg-dgray"}`}>
      <div className="container mx-auto py-4">
        <div className="flex flex-col ">
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
              {description && (
                <div>
                  <h2 className="title-65 pb-6 lg:pb-[25px]">{title}</h2>
                  <p className="fnt-lexend pb-6 text-font19 font-[500] leading-[1.2] text-gray1 lg:pb-[58px]">
                    {description}
                  </p>
                </div>
              )}
              {!description && (
                <h2 className="title-65 pb-6 lg:pb-[58px]">{title}</h2>
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
              className={`grid grid-cols-1 gap-6  md:grid-cols-2 lg:gap-10 xl:grid-cols-${colcount ? `${colcount}` : "4"}`}
            >
              {data.map((framework) => (
                <div
                  key={framework.id}
                  className="group relative    flex flex-col overflow-hidden"
                >
                  {/* Animated Red Border */}
                  <div className="relative h-[1px] overflow-hidden rounded-xl  bg-black">
                    <div className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"></div>
                  </div>
                  <div className="mb-4 mt-6 flex h-[50px]  w-[50px] items-center justify-center bg-primary   transition-transform duration-500  lg:mb-8 lg:mt-10">
                    <p className="text-30  text-white transition-transform duration-500">
                      {String(framework.id).padStart(2, "0")}
                    </p>
                  </div>
                  <div className="text-2xl">
                    <h3
                      className="text-30 pb-3 text-black lg:pb-6"
                      dangerouslySetInnerHTML={{ __html: framework.title }}
                    ></h3>
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

export default SeoService;
