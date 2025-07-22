"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { StaticImageData } from "next/image";
import Link from "next/link";

interface ExpertiseItem {
  id: number;
  icon?: string;
  title: string;
  subttle?: string;
  desc?: string;
  url?: string;
  hoverImg?: string | StaticImageData;
}

interface ExpertiseSectionProps {
  title: string;
  colnum?: number;
  maxchwidth?: number;
  data: ExpertiseItem[];
  subttle?: string;
}

const Expertise: React.FC<ExpertiseSectionProps> = ({
  title,
  data,
  colnum,
  subttle,
  maxchwidth,
}) => {
  return (
    <div className="container mx-auto py-4">
      <div className="padding0 flex flex-col pb-[50px] pt-[50px] lg:pb-[150px] lg:pt-[136px]">
        <div className="mb-5 lg:mb-[56px]">
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
            <h2
              className="title-65"
              style={{ maxWidth: maxchwidth ? `${maxchwidth}ch` : undefined }}
            >
              {title}
            </h2>
            <p className="text-19 fnt-lexend font-400 mt-6 text-[#77787B] lg:mt-[30px] lg:max-w-[96ch]">
              {subttle}
            </p>
          </motion.div>
        </div>

        <div>
          <motion.div
            className={`grid grid-cols-1 gap-5  md:grid-cols-2 xl:grid-cols-3 xl:gap-0  ${colnum ? `xxl:grid-cols-${colnum}` : "xxl:grid-cols-4"} `}
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
            {/* Item 1 */}
            {data.map((expertise, index) => (
              <div key={expertise.id}>
                {expertise.url ? (
                  <div key={expertise.id}>
                    <Link href={`${expertise.url}`}>
                      <div
                        key={expertise.id}
                        className="group relative flex flex-col justify-between gap-3 overflow-hidden border p-5 transition-all duration-500 h-[300px] lg:h-[340px] lg:gap-0 lg:p-10 xl:h-[414px]"
                      >
                        {" "}
                        {expertise.hoverImg && (
                          <Image src={expertise.hoverImg} alt="Hover Background" fill className="absolute left-0 top-0 -z-10 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        )}
                        {/* Default background color */}
                        <div className="absolute left-0 top-0 -z-20 h-full w-full bg-white transition-colors duration-500 group-hover:bg-transparent"></div>
                        {/* Image Wrapper */}
                        <div className="align-center flex h-[30px] w-[30px] justify-center bg-primary   p-2 transition-colors duration-500 group-hover:bg-white   md:h-[50px] md:w-[50px]">
                        {expertise.icon ? (<Image
                            src={expertise.icon}
                            alt={expertise.title}
                            className="fltrcls transition duration-500 group-hover:invert-0"
                          />) : ( <div className="align-center flex flex-col items-center    h-[30px] w-[30px] justify-center bg-primary group-hover:bg-white   p-2 transition-colors duration-500  md:h-[50px] md:w-[50px]  ">
                            <p className="text-font19  text-white group-hover:text-primary transition-transform duration-500">0{index+1}</p></div>) }
                      </div>
                        {/* Content */}
                        <div>
                          {/* Title */}
                          <h3 className="text-30  titlesp transition-colors duration-300 group-hover:text-white">
                            {expertise.title}
                          </h3>

                          <div className=" overflow-hidden">
                            <p
                              className="text-19 fnt-lexend cntsmd hided-content max-h-0 w-[102%] overflow-hidden pt-2 text-white
                                opacity-0 transition-all duration-500 group-hover:max-h-[15rem] group-hover:opacity-100"
                            >
                              {expertise.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div key={expertise.id}>
                    <div
                      key={expertise.id}
                      className="group relative flex flex-col justify-between gap-3 overflow-hidden border p-5 transition-all duration-500 h-[200px] md:h-[300px] lg:h-[340px] lg:gap-0 lg:p-10 xl:h-[414px]"
                    >
                      {" "}
                      {expertise.hoverImg && (
                        <Image
                          src={expertise.hoverImg}
                          alt="Hover Background"
                          fill
                          className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                      )}
                      {/* Default background color */}
                      <div className="absolute left-0 top-0 -z-20 h-full w-full bg-white transition-colors duration-500 group-hover:bg-transparent"></div>
                      {/* Image Wrapper */}
                     
                      {expertise.icon ? ( <div className="align-center flex h-[30px] w-[30px] justify-center bg-primary   p-2 transition-colors duration-500  md:h-[50px] md:w-[50px]">
                        <Image
                            src={expertise.icon}
                            alt={expertise.title}
                            className="fltrcls transition duration-500 group-hover:invert-0"
                          /></div>) : (<div className="align-center flex flex-col items-center    h-[30px] w-[30px] justify-center bg-primary group-hover:bg-white   p-2 transition-colors duration-500  md:h-[50px] md:w-[50px]  ">
                            <p className="text-font19  text-white group-hover:text-primary transition-transform duration-500">0{index+1}</p></div>) }
                      
                      {/* Content */}
                      <div>
                        {/* Title */}
                        <h3 className="text-30  titlesp transition-colors duration-300 group-hover:text-white">
                          {expertise.title}
                        </h3>

                        <div className=" overflow-hidden">
                          <p
                            className="text-19 fnt-lexend cntsmd hided-content max-h-0 w-[102%] overflow-hidden pt-2 text-white
                                   opacity-0 transition-all duration-500 group-hover:max-h-[15rem] group-hover:opacity-100"
                          >
                            {expertise.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
