"use client";
import { motion } from "framer-motion";
import EmployeesSwiper from "./EmployeesSwiper";
import Button from "../Button/Button";
import React from "react";

const SectionFive = () => {
  return (
    <div>
      <div className="container mx-auto py-4">
        <div className="pt-[50px] lg:pt-[100px] ">
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
            <div className="grid  mb-4 lg:mb-[47px]">
              <h2 className="title-65 ">We Believe In</h2>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
        variants={{
          hidden: { opacity: 0, y: 50 }, // Start below and invisible
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.3, ease: "easeOut" },
          }, // Slide up and fade in
        }}
      >
        <EmployeesSwiper />
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
            transition: { duration: 1.3, ease: "easeOut" },
          }, // Slide up and fade in
        }}
      >
        <div className="container mx-auto py-4">
          <div className="lg:pb-[150px] pb-[50px] lg:pt-[138px] pt-[30px] border-b flex flex-col   ">
            <h2 className="title-65 mb-4 lg:mb-7">
              Ready to Create the Extraordinary? Let’s Go!
            </h2>
            <p className="text-19 text-gray1 max-w-[113ch] fnt-lexend">
              Every great brand has a story. See how we’ve turned challenges
              into triumphs for our clients. Your brand could be next.
            </p>
            <div>
              <div className="mt-[20px] lg:mt-[64px] innerfnont">
                <Button text="LET'S COLLABORATE" />
              </div>{" "}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionFive;
