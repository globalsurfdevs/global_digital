"use client";
import React from "react";
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

const RelatedServices: React.FC<FrameworkSectionProps> = ({
  title,
  bgcolor,
  text,
  description,
  data,

}) => {
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

              {description &&
                <div>
                  <h2 className={`title-65 pb-6 ${text ? 'text-white' : ''}`}>{title}</h2>
                  <p className="text-gray1 text-font19 leading-[1.2] font-[500] fnt-lexend">{description}</p>
                </div>
              }
              {!description &&
                <h2 className={`title-65 pb-6 ${text ? 'text-white' : ''}`}>{title}</h2>
              }
            </div>
          </motion.div>
          <div className="serv-mn col-span-5  w-full text-font30 ">
            <div className="">
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
                {data.map((framework) => (
                  <div key={framework.id} className="sevsr border-t border-b border-[#dadada]  group gap-4 px-0 py-6 md:px-4 md:py-[10px] transition-all  duration-300 ease-in-out   hover:bg-[#dadada]  md:gap-7 lg:gap-10 lg:py-[28px]">
                    <div className="block md:flex">
                      <div className="justify-left mb-4 flex w-full items-center gap-[15px] md:mb-0 md:w-1/2 md:gap-[40px]  xxl:gap-[180px]">
                        <Image
                          src={framework.icon}
                          width={40}
                          height={30}
                          alt="Boost Image"
                          className=" wsd2 "
                        />
                        <div className={` ${text ? '' : 'consu'}`}>
                          <p className={`text-small-30  max-w-[20ch] ${text ? `text-${text} ` : ''}`}  >
                            {framework.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between gap-[15px]  md:w-1/2 md:gap-[40px]  xxl:gap-[130px]">
                        <p className="text-19 text-gray1 transition-all duration-300 fnt-lexend" >{framework.dec}</p>
                        <div className="transition-transform duration-300 group-hover:translate-x-[-5px] md:group-hover:translate-x-[-30px]">
                          <svg width="20" height="20" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-110">
                            <path d="M33.8105 1.7998L1.25781 33.7227" stroke="#E63E31" strokeWidth="2" strokeMiterlimit="10"/>
                            <path d="M1.25781 1.7998H33.8105V33.0929" stroke="#E63E31" strokeWidth="2" strokeMiterlimit="10"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RelatedServices;
