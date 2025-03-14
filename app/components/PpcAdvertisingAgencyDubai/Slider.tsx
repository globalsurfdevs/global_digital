"use client";
import { motion } from "framer-motion";
import PlatformSwiper from "./PlatformSwiper";
import React from "react";
interface PlatformsItem {
  id: number;
  image: string;
}

interface PlatformsSectionProps {
  Platformsdata: PlatformsItem[];
}

const Slider: React.FC<PlatformsSectionProps> = ({ Platformsdata}) => {
  return (
    <div >
      <div className="container mx-auto py-4">
        <div className="pt-[50px] lg:pt-[140px]  ">
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
              <h2 className="title-65 ">Tools and Platforms</h2>
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
        <PlatformSwiper Platformsdata={Platformsdata} />
      </motion.div>

    </div>
  );
};

export default Slider;
