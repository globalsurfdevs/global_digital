'use client'
import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.section className="bg-black text-white py-24 lg:h-[60vh] xl:h-screen flex items-center"  initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }} >
      <div className="container mx-auto px-4"  >
        <motion.h1 className="title-80  font-[400] " id="triggerSection"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
        variants={{
          hidden: { opacity: 0, y: 50 }, // Start below and invisible
          visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
          }}
        > Performance Focused <br /> Digital Marketing </motion.h1>
        <motion.div className="lg:mt-[45px] mt-[30px] "  initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                variants={{
                  hidden: { opacity: 0, y: 70 }, // Start below and invisible
                  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }, // Slide up and fade in
                }}>
          <a href="#"
            className="text-[16px] font-medium leading-[1.3] fnt-lexend relative group flex gap-3 w-fit items-center text-white border-b-2 border-transparent pb-[24px] hover:text-white hover:border-black transition
          before:absolute before:bottom-0 before:left-0 before:h-[2px] before:bg-white before:w-full before:transition-all before:duration-300 before:ease-in-out z-2
          after:absolute after:bottom-0 after:right-0 after:h-[2px] after:bg-primary after:w-full after:transition-all after:duration-300 after:ease-in-out hover:after:w-0 z-1" >
            SUCCESS STORIES
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="  group-hover:scale-[1.1] group-hover:translate-y-[-2px] group-hover:translate-x-[2px] ease-in-out duration-300">
              <g clipPath="url(#clip0_65_58)">
                <path d="M18.7892 1.2749L0.699219 19.0149" stroke="#E53F30" strokeWidth="2" strokeMiterlimit="10" />
                <path d="M0.699219 1.2749H18.7892V18.6649" stroke="#E53F30" strokeWidth="2" strokeMiterlimit="10" />
              </g>
              <defs>
                <clipPath id="clip0_65_58">
                  <rect width="19.79" height="19.45" fill="white" transform="translate(0 0.274902)" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
