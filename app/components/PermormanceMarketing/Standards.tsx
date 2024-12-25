"use client";
import React from "react";
import { assets } from "@/public/assets/assets";
import { motion } from "framer-motion";

import Image from "next/image";
const Standards = () => {
  return (
    <div className="flex flex-col  pb-[0px] lg:pb-[50px]">
      <div className="container  mx-auto  ">
         <motion.div
                            initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                    variants={{
                                      hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                      visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                    }}
                          >
                      <h2 className='title-65'>Elevating the Standards
                      for Our Customer</h2>
<p className=" text-font19 mt-5 max-w-[80ch] text-gray1">Our squad of top-notch professionals in the realm of SEO is dedicated to attaining exceptional outcomes for major corporations by presenting practical observations instantaneously.</p>
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
                <p className=" text-font19 mt-3">Increase in CTR</p>
              </div>
            </div>
            <div>
              <div className="text-center ">
                <Image src={assets.seopr2} alt="image" className="m-auto"/>
                <p className=" text-font19 mt-3">Increase in Keyword positions</p>
              </div>
            </div>
            <div>
              <div className="text-center ">
                <Image src={assets.seopr3} alt="image" className="m-auto"/>
                <p className=" text-font19 mt-3">Increase in Organic Traffic</p>
              </div>
            </div>
            <div>
              <div className="text-center ">
                <Image src={assets.seopr4} alt="image" className="m-auto"/>
                <p className=" text-font19 mt-3">Increase in Conversions</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Standards;
