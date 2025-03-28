"use client";
import { motion } from "framer-motion";
import PlatformSwiper from "./OurWorksSwiper"; // Ensure this file exists in the same directory
import React from "react";
import { StaticImageData } from "next/image";
interface ClientsformsItem {
  id: number;
  image: string | StaticImageData;
  title: string;
  btntext?: string;
  btnurl?: string;
}

interface ClientsformsSectionProps {
  Clientsformsdata: ClientsformsItem[];
}

const Slider: React.FC<ClientsformsSectionProps> = ({ Clientsformsdata }) => {
  return (
    <div>
      <div className="container mx-auto ">
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
