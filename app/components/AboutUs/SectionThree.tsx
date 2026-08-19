"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { About } from "@/app/types/about";

const SectionThree = ({ data }: { data: About["thirdSection"] }) => {
  const items = [
    // {
    //   text: "Extensive Expertise",
    //   image: "/assets/aboutus/core1.svg",
    //   width: 35,
    //   height:50,
    // },
    // {
    //   text: "Performance-Focused Strategies",
    //   image: "/assets/aboutus/core2.svg",
    //   width: 48,
    //   height:50,
    // },
    // {
    //   text: "Customized Solutions",
    //   image: "/assets/aboutus/core3.svg",
    //   width: 49,
    //   height:50,
    // },
    // {
    //   text: "Collaborative Approach",
    //   image: "/assets/aboutus/core4.svg",
    //   width: 50,
    //   height:44,
    // },
    // {
    //   text: "Transparent Communication",
    //   image: "/assets/aboutus/core5.svg",
    //   width: 50,
    //   height:39,
    // },
    ...data.items.map((item) => ({
      text: item.title,
      width: 50,
      height: 30,
      ...item,
    })),
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
        <div className=" gap-xl-0 grid grid-cols-1 gap-5 pb-[60px] pt-[50px] lg:gap-10 lg:pb-[150px] lg:pt-[140px] xl:grid-cols-7">
          <div className="col-span-2 text-5xl">
            <h2 className="title-65 pb-2">{data.title}</h2>
          </div>

          <div className="serv-mn col-span-5 w-full ps-0 text-font30 xl:ps-12 ">
            {items.map((item, index) => (
              <div key={index} className="border-t last:border-b">
                <div className="sevsr group flex items-center items-center justify-between gap-4 py-[10px] pe-[10px] ps-[10px] transition-all duration-300 ease-in-out hover:translate-x-2 md:gap-7 lg:gap-10 lg:py-[28px] lg:pe-[20px] xl:ps-[60px]">
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
