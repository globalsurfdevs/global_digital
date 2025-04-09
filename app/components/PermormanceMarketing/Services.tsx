"use client";
import React from "react";
import { motion } from "framer-motion";
interface ServicesItem {
  id: number;
  title: string;
  desc?: string;
}

interface ServicesSectionProps {
  title: string;
  colcount?: number;
  description?: string;
  bgtt1?: string;
  bgtt2?: string;
  bgtt3?: string;
  bgtt4?: string;
  bgcolor?: string;
  hrcontent1?: boolean;
  hrcontent?: boolean;
  data: ServicesItem[];
}

const Services: React.FC<ServicesSectionProps> = ({
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
}) => {
  return (
    <div className={` ${bgcolor ? `${bgcolor}` : "bg-white"}`}>
      <div className="container mx-auto py-4">
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
            className={`gap-xl-0 grid grid-cols-1 gap-5 pb-[60px] pt-[50px]  lg:gap-10 lg:pb-[150px] lg:pt-[140px]  ${colcount ? `xl:grid-cols-${colcount}` : "xl:grid-cols-6"}`}
          >
            <div className="col-span-2 text-5xl">
              <h2
                className={`title-65 pb-2 ${bgtt1 ? `${bgtt1}` : "text-black"}`}
              >
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
                  <div className="group border-b relative flex gap-4 py-[15px] transition-all duration-300  ease-in-out hover:translate-x-2 md:gap-7 lg:gap-10 lg:py-[34px]">
                    <p
                      className={` transition-all duration-300 group-hover:text-primary ${bgtt2 ? `${bgtt2}` : "text-gray1"}`}
                    >
                      {String(service.id).padStart(2, "0")}
                    </p>
                    <div className="consu relative">
                      <h3
                        className={`text-30 transition-all duration-300 group-hover:text-primary ${bgtt3 ? `${bgtt3}` : "text-black"}`}
                      >
                        {service.title}
                      </h3>
                      {/* Hover Description */}
                      {hrcontent && (
                        <div className="     h-0 group-hover:h-[30px] ">
                          <p
                            className={` mt-2 text-font19 leading-[1.2] opacity-0  transition-opacity duration-300 group-hover:opacity-100  ${bgtt4 ? `${bgtt4}` : "text-77787B"}`}
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
  );
};

export default Services;
