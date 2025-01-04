"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (video) {
      video.classList.add("opacity-100");
      video.classList.remove("opacity-0");
      video.play();
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (video) {
      video.classList.add("opacity-0");
      video.classList.remove("opacity-100");
      video.pause();
      video.currentTime = 0;
    }
  };
  return (
    <motion.section
      className="bnrnmn relative flex items-center py-24 text-white lg:h-[60vh] xl:h-screen"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="absolute left-0 top-0 -z-20 h-full w-full bg-black"></div>

      <video
        ref={videoRef}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/assets/GS_Digital-banner.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container mx-auto px-4">
        <motion.h1
          className="title-80  font-[400] cursor-pointer inline-block"
          id="triggerSection"
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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Performance Focused <br /><span className="text-primary relative linbsx"> Digital Marketing</span>
        </motion.h1>
        <motion.div
          className="mt-[30px] lg:mt-[45px] "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
          variants={{
            hidden: { opacity: 0, y: 50 }, // Start below and invisible
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.2, ease: "easeOut" },
            }, // Slide up and fade in
          }}
        >
          <Link
            href="portfolio"
            className="fnt-lexend z-2 z-1 group relative flex w-fit items-center gap-3 border-b-2 border-transparent pb-[24px] text-[16px] font-medium leading-[1.3] text-white transition
          before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:bg-white before:transition-all before:duration-300 before:ease-in-out after:absolute
          after:bottom-0 after:right-0 after:h-[2px] after:w-full after:bg-primary after:transition-all after:duration-300 after:ease-in-out hover:border-black hover:text-white hover:after:w-0"
          >
            SUCCESS STORIES
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="  duration-300 ease-in-out group-hover:translate-x-[2px] group-hover:translate-y-[-2px] group-hover:scale-[1.1]"
            >
              <g clipPath="url(#clip0_65_58)">
                <path
                  d="M18.7892 1.2749L0.699219 19.0149"
                  stroke="#E53F30"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M0.699219 1.2749H18.7892V18.6649"
                  stroke="#E53F30"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
              </g>
              <defs>
                <clipPath id="clip0_65_58">
                  <rect
                    width="19.79"
                    height="19.45"
                    fill="white"
                    transform="translate(0 0.274902)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
