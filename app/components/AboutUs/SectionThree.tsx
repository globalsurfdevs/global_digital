"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const SectionThree = () => {
  const items = [
    {
      text: "Extensive expertise",
      image: "/assets/aboutus/core1.svg",
      width: 35,
      height:50,
    },
    {
      text: "Performance-Focused Strategies",
      image: "/assets/aboutus/core2.svg",
      width: 48,
      height:50,
    },
    {
      text: "Customized Solutions",
      image: "/assets/aboutus/core3.svg",
      width: 49,
      height:50,
    },
    {
      text: "Collaborative approach",
      image: "/assets/aboutus/core4.svg",
      width: 50,
      height:44,
    },
    {
      text: "Transparent communication",
      image: "/assets/aboutus/core5.svg",
      width: 50,
      height:39,
    },
  ];
  return (
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
            <h2 className="title-65 pb-2">Core Advantages </h2>
          </div>

          <div className="w-full col-span-5 ps-0 xl:ps-12 text-font30 serv-mn ">
    {items.map((item, index) => (
      <div key={index} className="border-t last:border-b">
        <div className="sevsr flex ps-[10px] pe-[10px] xl:ps-[60px] lg:pe-[20px] py-[10px] lg:py-[28px] gap-4 md:gap-7 justify-between items-center lg:gap-10 group items-center hover:translate-x-2 transition-all duration-300 ease-in-out">
          <div className="consu">
            <p className="text-small-30 transition-all duration-300 group-hover:text-primary">
              {item.text}
            </p>
          </div>
          <div className="min-w-auto md:min-w-[50px]">
            <Image
              src={item.image}
              alt={item.text}
              width={item.width}
              height={item.height}
              className=" wsd2 transition-all duration-100 ease-in-out"
            />
          </div>
        </div>
      </div>
    ))}
  </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionThree;
