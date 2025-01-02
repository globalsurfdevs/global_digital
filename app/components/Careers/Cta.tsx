"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Cta = () => {


  return (
    <>
      <div className="bg-black pt-[50px] xs:pt-10 lg:pt-14   xl:pt-[109px]">
        <div className="container mx-auto px-4 text-white">
          <div className="flex flex-col">
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
                <div className="flex h-1/2  flex-col justify-center border-b border-gray-400  ">
                  <h2 className="text-font65 leading-lh1p07">
                    <span className="text-primary">Grow With Us </span>Your Next Big Opportunity Awaits Here.    </h2>

                  <div className="innerfnont mb-10 mt-10  lg:mb-[120px] lg:mt-[57px]">
                    <Link href="/lets-talk"> <p className="text-primary text-30">Let’s create something extraordinary together. </p>
                    </Link>
                  </div>
                </div>

            </motion.div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Cta;
