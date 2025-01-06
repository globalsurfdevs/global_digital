"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // To store the interval ID
  const currentIndexRef = useRef(0); // To store the current content index
  const [spanContent, setSpanContent] = useState("Digital Marketing");

  const contentArray = [
    "Digital Marketing",
    "Web Design",
    "Web Development",
    "Data Analytics",
    "Strategy Consulting",
    "Marketing Automation",
  ];

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (video) {
      video.classList.add("opacity-100");
      video.classList.remove("opacity-0");
      video.play();
    }

    // Start changing the span content
    intervalRef.current = setInterval(() => {
      currentIndexRef.current =
        (currentIndexRef.current + 1) % contentArray.length;
      setSpanContent(contentArray[currentIndexRef.current]);
    }, 100); // Change content every second
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (video) {
      video.classList.add("opacity-0");
      video.classList.remove("opacity-100");
      video.pause();
      video.currentTime = 0;
    }

    // Stop changing the span content
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Keep the current content and do not reset
  };

  return (
    <motion.section
      className="bnrnmn relative flex items-center py-24 text-black lg:h-[60vh] xl:h-screen"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="absolute left-0 top-0 -z-20 h-full w-full bg-bglight"></div>

      <video
        ref={videoRef}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover opacity-0"
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
          className="title-120 font-[400] cursor-pointer inline-block hover:text-white duration-100"
          id="triggerSection"
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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Performance Focused <br />
          <span className="text-primary relative linbsx underline">
            {spanContent}
          </span>
        </motion.h1>
      </div>
    </motion.section>
  );
};

export default HeroSection;
