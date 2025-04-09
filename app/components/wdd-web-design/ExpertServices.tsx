"use client";
import React,  { useState }  from "react";
import Image from "next/image";
import { motion } from "framer-motion";
interface FrameworkItem {
  id: number;
  title: string;
  dec: string;
  icon: string;
}

interface FrameworkSectionProps {
  title: string;
  bgcolor?: string;
  text?: string;
  description?: string;
  colcount?: number;
  data: FrameworkItem[];
}

const ExpertServices: React.FC<FrameworkSectionProps> = ({
  title,
  bgcolor,
  text,
  description,
  data,
}) => {
  const [activeId, setActiveId] = useState(null); // Track hovered item
  return (
    <div className={` ${bgcolor ? `bg-${bgcolor}` : "bg-dgray"}`}>
      <div className="container mx-auto ">
        <div className="py-[50px] lg:py-[111px]">
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
            <div className="pb-6 lg:pb-[40px]">
              <h2 className={`title-65 pb-6 ${text ? "text-white" : ""}`}>
                {title}
              </h2>
            </div>
          </motion.div>
           <div className="serv-mn col-span-5 w-full text-font30">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: "easeOut" },
          },
        }}
      >
        {data.map((framework) => {
          const isActive = activeId === framework.id;

          return (
            <div
              key={framework.id}
              onMouseEnter={() => setActiveId(framework.id as any)}
              onMouseLeave={() => setActiveId(null)}
              className={`sevsr group gap-4 border-b border-t border-[#dadada] p-5 transition-all duration-300 ease-in-out md:gap-7 lg:gap-10 lg:p-10 ${
                isActive ? "bg-red-500 hovered-item" : ""
              }`}
            >
              <div className="block md:flex">
                <div className="justify-left mb-4 flex w-full items-center gap-[15px] md:mb-0 md:w-1/2 md:gap-[40px] xxl:gap-[180px]">
                  <Image
                    src={framework.icon}
                    width={40}
                    height={30}
                    alt="Boost Image"
                    className="wsd2 transition-all duration-100 ease-in-out"
                  />
                </div>

                <div className="md:w-1/2">
                  <p
                    className={`text-small-30  transition-all duration-300`}
                    dangerouslySetInnerHTML={{ __html: framework.title }}
                  ></p>

                  <div
                    className={`flex w-full items-center justify-between gap-[15px] pt-3 md:gap-[40px] xxl:gap-[130px] overflow-hidden transition-all duration-500 ease-in-out ${
                      isActive
                        ? "max-h-[200px] opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 translate-y-4"
                    }`}
                  >
                    <p className="text-19 fnt-lexend text-gray1 transition-all duration-500">
                      {framework.dec}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertServices;
