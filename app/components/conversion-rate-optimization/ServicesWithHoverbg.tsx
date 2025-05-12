"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
interface ServicesItem {
  id?: number;
  title: string;
  desc?: string;
  icon?: string;
  alttitle?: string;
}

interface ServicesSectionProps {
  title: string;
  colcount?: number;
  description?: string;
  bgtt1?: string;
  bgtt2?: string;
  bgtt3?: string;
  bgtt4?: string;
  leftzero?: boolean;
  bgcolor?: string;
  hrcontent1?: boolean;
  hrcontent?: boolean;
  data: ServicesItem[];
}

const ServicesWithHover: React.FC<ServicesSectionProps> = ({
  title,
  data,
  bgcolor,
  bgtt1,
  hrcontent1,
  bgtt2,
  bgtt3,
  bgtt4,
  colcount,
  hrcontent,
  description,
  leftzero,
}) => {
  return (
    <div className={` ${bgcolor ? `${bgcolor}` : "bg-white"} `}>
      <div className={`container mx-auto py-4  `}>
        <div className={`  ${leftzero ? "bgafter relative" : ""}`}>
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
            <div
              className={`gap-xl-0 pas grid grid-cols-1 gap-5 pb-[60px]  pt-[50px] lg:gap-10 lg:pb-[150px] lg:pt-[140px]  ${colcount ? `xl:grid-cols-${colcount}` : "xl:grid-cols-6"}`}
            >
              <div className="col-span-2 text-5xl">
                <h2 className={`title-65 pb-2 ${bgtt1 ? bgtt1 : "text-black"}`}>
                  {title}
                </h2>
                <p className="text-19 fnt-lexend max-w-[38ch] pt-4 text-[#77787B] md:pt-6 xl:pt-14">
                  {description}
                </p>
              </div>

              <div
                className={`serv-mn  w-full ps-0 text-font30 xl:ps-12 ${colcount ? `col-span-${colcount - 2}` : "col-span-4"}`}
              >
                {data.map((service) => (
                  <div
                    key={service.id}
                    className={`${hrcontent1 ? "border-t last:border-b" : ""}`}
                  >
                    <div className="group  flex gap-4 border-b py-[15px] transition-all duration-500 hover:bg-primary md:gap-7 lg:gap-10 lg:px-[40px] lg:py-[40px]">
                      <div className="align-center flex h-[30px] w-[30px] justify-center bg-primary p-[12px] transition-colors duration-500 group-hover:bg-white md:h-[50px] md:w-[50px]">
                        <Image
                          src={service.icon || ""}
                          alt={service.alttitle || "Default alt text"}
                          className="fltrcls h-auto w-auto max-w-[50px] object-contain transition duration-500 group-hover:invert-0 "
                        />
                      </div>
                      <div className="consu relative">
                        <h3
                          className={`text-30 transition-colors duration-300 group-hover:text-white ${bgtt3 ? bgtt3 : "text-black"}`}
                        >
                          {service.title}
                        </h3>
                        {/* Hover Description */}
                        {hrcontent && (
                          <div className="     h-0 group-hover:h-auto  ">
                            <p
                              className={`mt-2 text-font19 leading-[1.2] opacity-0 transition-opacity duration-300 group-hover:text-white group-hover:opacity-100 ${
                                bgtt4 ? `${bgtt4}` : "text-black"
                              }`}
                            >
                              {service.desc}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicesWithHover;
