"use client";
import React from "react";
import { motion } from "framer-motion";
import { services } from "../../data/services";
import { Lexend } from "next/font/google";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const OurServices = () => {
  return (
    <div className="container mx-auto flex flex-col gap-5 px-4 py-8 xl:gap-24">
      {/* Section Heading */}
      <div className="flex items-center gap-2 xl:mb-8">
        <h2 className="font-[400] lg:text-3xl">OUR SERVICES</h2>
        <div className="size-3 bg-primary md:size-4 lg:size-5"></div>
      </div>

      {/* Services */}
      {services.map((service) => (
        <motion.div
          className="srv-item grid grid-cols-1 gap-8 md:grid-cols-2 xl:gap-[88px]"
          key={service.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} // Trigger only once
        >
          {/* Service Image */}
          <div className="srv-im flex h-full justify-end border-b-gray-400 md:order-2">
            <motion.div
              className="h-full"
              variants={{
                hidden: { x: 200, opacity: 0.5 },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.5, delay: 0.1 },
                },
              }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Service Details */}
          <motion.div
            className="flex flex-col justify-between border-b pb-2"
            variants={{
              hidden: { opacity: 0, x: 50, skewX: 35 },
              visible: {
                opacity: 1,
                x: 0,
                skewX: 0,
                transition: { duration: 0.5 },
              },
            }}
          >
            <div className="cntntblc flex flex-col gap-5">
              <h3 className="max-w-[14ch] text-font65 leading-lh1p07">
                {service.title}
              </h3>
              <div className="flex flex-col gap-5">
                <p
                  className={`mb-2 text-font25 leading-lh1p4 ${lexend.className} font-light`}
                >
                  {service.description}
                </p>
                <div className="srvbt mb-5 flex flex-wrap gap-2 xl:mb-[4em]">
                  {service.buttonTexts.map((item, index) => (
                    <button
                      className="rounded-full border px-3 py-2 text-sm font-[500] text-gray-500 duration-200 ease-in hover:border-primary hover:text-black"
                      key={index}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-3 flex">
              <span>0{service.id}</span>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default OurServices;
