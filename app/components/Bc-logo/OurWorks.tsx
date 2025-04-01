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
  maintitle?: string; // Added to avoid errors
}

interface ClientsformsSectionProps {
  Clientsformsdata: ClientsformsItem[];
  maintitle?: string;
}

const Slider: React.FC<ClientsformsSectionProps> = ({
  Clientsformsdata,
  maintitle,
}) => {
  return (
    <div>
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            },
          }}
        >
          {maintitle && (
            <div className="mb-4 lg:mb-[75px]">
              <h2
                className="title-65"
                dangerouslySetInnerHTML={{ __html: maintitle }}
              ></h2>
            </div>
          )}
        </motion.div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.3, ease: "easeOut" },
          },
        }}
      >
        <PlatformSwiper Clientsformsdata={Clientsformsdata} />
      </motion.div>
    </div>
  );
};

export default Slider;
