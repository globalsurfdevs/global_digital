"use client";
import { motion } from "framer-motion";
import PlatformSwiper from "@/app/components/IndConstruction/ClientsSwiper";
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
  title1?: string;
  pt?: string; // New padding-top prop
  pb?: string; // New padding-bottom prop
  subdesc?: string;
}

const CaseStudyNew: React.FC<ClientsformsSectionProps> = ({
  Clientsformsdata,
  subdesc,
  padding = "",
  pt = "",
  pb = "",
  title1, // Added title1 to destructured props
}) => {
  return (
    <div className="py-120">
      <div className={`container mx-auto`}>
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
            <div className="mb-4 mt-6 grid lg:mb-[75px] lg:mt-0">
              {title1 && (
                <h2
                  className="title-65 text-[length:var(--text-60-sm)]"
                  dangerouslySetInnerHTML={{ __html: title1 }}
                ></h2>
              )}
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

export default CaseStudyNew;
