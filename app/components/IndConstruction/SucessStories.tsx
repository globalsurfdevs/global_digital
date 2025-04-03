"use client";
import { motion } from "framer-motion";
import PlatformSwiper from "./ClientsSwiper"; // Ensure this file exists in the same directory
import React from "react";
import { StaticImageData } from "next/image";
interface ClientsformsItem {
  id: number;
  image: string | StaticImageData;
  title: string;
  btntext: string;
  btnurl?: string;
  subdesc?: string;
}

interface ClientsformsSectionProps {
  Clientsformsdata: ClientsformsItem[];
  padding?: string; // New padding prop
  pt?: string; // New padding-top prop
  pb?: string; // New padding-bottom prop
  subdesc?: string;
}

const Slider: React.FC<ClientsformsSectionProps> = ({
  Clientsformsdata,
  subdesc,
  padding = "p-4",
  pt = "pt-[50px] lg:pt-[140px] ",
  pb = "pb-4",
}) => {
  return (
    <div>
      <div className={`container mx-auto ${padding} ${pt} ${pb} :""}`}>
        <div className=" ">
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
            <div className="mb-4  grid lg:mb-[75px]">
              <h2 className="title-65 ">
                Success Stories <br></br> That Speak for Themselves
              </h2>
              <p className="text-19 fnt-lexend mt-6 max-w-[74ch] text-gray1 transition-colors duration-300 group-hover:text-gray-700 lg:mt-[25px]">
                {" "}
                {subdesc}
              </p>
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
        <PlatformSwiper Clientsformsdata={Clientsformsdata} />
      </motion.div>
    </div>
  );
};

export default Slider;
