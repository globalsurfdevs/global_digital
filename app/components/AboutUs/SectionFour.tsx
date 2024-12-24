"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { assets } from "@/public/assets/assets";
const SectionFour = () => {
  return (
    <div className="bg-dgray">
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
          <div className=" pt-[50px] lg:pt-[140px] pb-[60px] lg:pb-[150px] grid grid-cols-1 xl:grid-cols-7 gap-5 lg:gap-10 gap-xl-0">
            <div className="col-span-2 text-5xl">
              <h2 className="title-65 pb-2">We Believe In</h2>
            </div>

            <div className="w-full col-span-5 ps-0 xl:ps-12 text-font30 serv-mn">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0 "
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
                {[
                  {
                    title: "Pursuit of Excellence",
                    content:
                      "We aim for excellence in all that we do, delivering top-quality work, innovative strategies, and impactful results. Our team is dedicated to continuous improvement, staying ahead of industry trends, and maintaining high standards to achieve exceptional outcomes in digital marketing.",
                  },
                  {
                    title: "Commitment to Integrity",
                    content:
                      "We operate with honesty, transparency, and ethical values in all our interactions. Building trust is at the core of our work, and we foster long-term relationships rooted in respect, reliability, and accountability with clients, partners, and colleagues.",
                  },
                  {
                    title: "Fostering Diversity, Equity & Inclusion",
                    content:
                      "We are committed to creating an inclusive workplace that values diverse perspectives and experiences. We actively promote equal opportunities, challenge systemic barriers, and nurture an environment where every voice is respected and empowered to make meaningful contributions.",
                  },
                  {
                    title: "Creating Lasting Impact",
                    content:
                      "We are motivated by the opportunity to create meaningful change. By empowering purpose-driven brands to share their messages and achieve their goals, we focus on driving positive outcomes for our clients, their audiences, and the communities they impact.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bdrsm flex flex-col  p-5 lg:py-[80px] lg:px-[60px]  border border-gray1 group transition-all duration-500"
                    style={{
                      borderBottom: index < 2 ? "none" : "1px solid #77787B", // Add bottom border only for first two rows
                      borderRight:
                        index % 2 === 0 ? "none" : "1px solid #77787B", // Add right border for items on the left column
                    }}
                  >
                    <div className="flex gap-3 items-center">
                      <div className="min-w-[29px] h-[29px] bg-primary"></div>
                      <p className="text-30">{item.title}</p>
                    </div>
                    <div>
                      <p className="text-19 pt-5 fnt-lexend text-gray1">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionFour;
