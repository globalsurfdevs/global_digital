"use client";
import React from "react";
import { assets } from "@/public/assets/assets";
import { motion } from "framer-motion";

import Image from "next/image";
const Standards = () => {
  return (
    <div className="flex flex-col  pb-[0px] lg:pb-[50px]">
      <div className="container  mx-auto  bg-dgray p-[40px] lg:p-[90px]">
         <motion.div
                            initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                    variants={{
                                      hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                      visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                    }}
                          >
                      <h2 className='title-65 mb-[20px] lg:mb-[65px]'>Elevating the Standards for Our Customer
                      </h2>
   </motion.div>
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
          <div className=" grid md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-5 pt-5 md:pt-[50px]">
            <div>
              <div className="text-center ">
                <Image src={assets.seopr1} alt="image" className="m-auto"/>
                <p className=" text-font19 mt-3">Increase in <br />CTR</p>
              </div>
            </div>
            <div>
              <div className="text-center ">
                <Image src={assets.seopr2} alt="image" className="m-auto"/>
                <p className=" text-font19 mt-3">Increase in <br />Keyword positions</p>
              </div>
            </div>
            <div>
              <div className="text-center ">
                <Image src={assets.seopr3} alt="image" className="m-auto"/>
                <p className=" text-font19 mt-3">Increase in <br />Organic Traffic</p>
              </div>
            </div>
            <div>
              <div className="text-center ">
                <Image src={assets.seopr4} alt="image" className="m-auto"/>
                <p className=" text-font19 mt-3">Increase in <br />Conversions</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Standards;
