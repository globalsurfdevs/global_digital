
"use client";
import React from "react";
import { motion } from "framer-motion";
import { services } from "../data/services";
import {Lexend} from "next/font/google";
const lexend = Lexend({subsets: ['latin'] ,weight:["300","400","500","600","700"] });

const OurServices = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-5 xl:gap-24">
      {/* Section Heading */}
      <div className="xl:mb-8 flex gap-2 items-center">
        <h2 className="lg:text-3xl font-[400]">OUR SERVICES</h2>
        <div className="bg-primary lg:size-5 size-3 md:size-4"></div>
      </div>

      {/* Services */}
      {services.map((service) => (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-[88px] srv-item"
          key={service.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} // Trigger only once
        >
          {/* Service Image */}
          <div className="h-full border-b-gray-400 md:order-2 srv-im flex justify-end">
          <motion.div
            className="h-full"
            variants={{
              hidden: { x: 200, opacity: 0.5 },
              visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.1 } },
            }}
          >
            <img src={service.image} alt={service.title} className="h-full object-cover" />
          </motion.div>
          </div>

          {/* Service Details */}
          <motion.div
            className="flex justify-between flex-col border-b pb-2"
            variants={{
              hidden: { opacity: 0, x: 50, skewX: 35 },
              visible: { opacity: 1, x: 0, skewX: 0, transition: { duration: 0.5 } },
            }}
          >
            <div className="flex flex-col gap-5 cntntblc">
              <h3 className="text-font65 max-w-[14ch] leading-lh1p07">{service.title}</h3>
              <div className="flex flex-col gap-5">
                <p className={`mb-2 text-font25 leading-lh1p4 ${lexend.className} font-light`}>{service.description}</p>
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

            <div className="flex mb-3">
              <span>0{service.id}</span>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default OurServices;
