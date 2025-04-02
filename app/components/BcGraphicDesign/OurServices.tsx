"use client";
import React from "react";
import { motion } from "framer-motion";
import OurServicesTab from "../BcGraphicDesign/OurServicesTab";
interface ServicesItem {
  title: string;
  desc?: string;
}

interface ServicesSectionProps {
  title: string;
  colcount?: number;
  description?: string;
  hrcontent?: boolean;
}

const Services: React.FC<ServicesSectionProps> = ({
  title,

  colcount,
  hrcontent,
  description,
}) => {
  return (
    <div className="container mx-auto py-[30px] md:py-10 lg:py-12 xl:py-[140px] ">
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
        <div className="grid grid-cols-1  items-start pb-8 lg:pb-[75px] xl:grid-cols-7">
          <div className="col-span-3  mb-5 xl:mb-0">
            <h2
              className="title-65 pb-2"
              dangerouslySetInnerHTML={{ __html: title }}
            ></h2>
          </div>
          <div className="col-span-4 w-full">
            <p className="text-19 fnt-lexend   text-[#77787B] ">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
      <OurServicesTab />
    </div>
  );
};

export default Services;
