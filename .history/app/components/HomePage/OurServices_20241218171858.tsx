
"use client";
import React from "react";
import { motion } from "framer-motion";
import { services } from "../../data/services";
import {Lexend} from "next/font/google";
const lexend = Lexend({subsets: ['latin'] ,weight:["300","400","500","600","700"] });

const OurServices = () => {
  return (
    <>
      {/* Section Heading */}
      <div className="container mx-auto ">
    <motion.div
        initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                variants={{
                  hidden: { opacity: 0, y: 150 }, // Start below and invisible
                  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                }}
      >
      <div className="lg:mb-[89px] mb-5 flex gap-2 items-center">
        <h2 className="text-30 leading-[1.5] font-[400]">OUR SERVICES</h2>
        <div className="bg-primary lg:size-5 size-3 md:size-4"></div>
      </div>

        </motion.div>
        </div>
    <div className="container mx-auto px-4 py-8 flex flex-col gap-5 xl:gap-24">

      {/* Services */}
      {services.map((service) => (
        <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-[88px] srv-item relative"
        key={service.id}
        initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0 }} // Trigger animation once when 50% visible
                variants={{
                  hidden: { opacity: 0, y: 150 }, // Start below and invisible
                  visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } }, // Slide up and fade in
                }}
      >
        {/* Service Image */}
        <div className="h-full border-b-gray-400 md:order-2 srv-im flex justify-end bg-black ">
          {/* <motion.div
            className="h-full overflow-hidden"
            variants={{
              hidden: { y: 50, opacity: 0 }, // Start below and fade in
              visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.2 } },
            }}
          >
            <motion.img
              src={service.image}
              alt={service.title}
              className="h-full object-cover"
              initial={{ scale: 1 }} // Initial scale
              whileInView={{ scale: 1.1 }} // Zoom effect
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </motion.div> */}
        </div>

          {/* Service Details */}
          <motion.div
                className="flex justify-between flex-col border-b pb-5 lg:pb-2"

              >
                {/* Content Block */}
                <div className="flex flex-col gap-3 cntntblc">
                  <h3 className="title-65 max-w-[14ch] ">{service.title}</h3>
                  <div className="flex flex-col gap-2 lg:gap-7">
                    <p className={`mb-2 text-font25 leading-lh1p4 ${lexend.className} font-light`}>
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5 xl:mb-[4em] srvbt">
                      {service.buttonTexts.map((item, index) => (
                        <button
                          className="px-3 py-2 border text-gray-500 rounded-full text-sm font-[500] hover:border-primary hover:text-black ease-in duration-200"
                          key={index}
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                  {/* Service ID */}
                  <div className="flex mb-3">
                    <span>0{service.id}</span>
                  </div>
              </motion.div>

        </motion.div>
      ))}
      </div>
      </>
  );
};

export default OurServices;
