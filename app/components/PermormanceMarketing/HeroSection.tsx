"use client";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import PerformanceSwiper from "../PermormanceMarketing/PerformanceSwiper";
import { Lexend } from "next/font/google";
import Image, { StaticImageData } from "next/image";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
interface su {
  stitle: string;
  desc: string;
}
interface BannerSection {
  id: number;
  title: string;
  image: string | StaticImageData;
  sub: su[];
}
interface HeroSectionProps {
  order: string;
  Bannerdata: BannerSection[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ Bannerdata, order }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Ref for the next container (HTMLDivElement type)
  const nextContainerRef = useRef<HTMLDivElement | null>(null);
  const [divWidth, setDivWidth] = useState("100%");

  useEffect(() => {
    const updateDivWidth = () => {
      if (nextContainerRef.current) {
        // Get the bounding rectangle of the next container
        const containerRect = nextContainerRef.current.getBoundingClientRect();

        // Get the computed style of the next container to retrieve margin values
        const computedStyle = window.getComputedStyle(nextContainerRef.current);

        // Calculate the total width including margins (left + width + right)
        const marginLeft = parseFloat(computedStyle.marginLeft);
        const totalWidth = containerRect.width + marginLeft - 15;

        setDivWidth(`${totalWidth}px`);
      }
    };
    // Initial width calculation
    updateDivWidth();

    // Recalculate on window resize
    window.addEventListener("resize", updateDivWidth);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", updateDivWidth);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const checkWidth = () => {
    if (window.innerWidth < 992) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  // Run on mount and on resize
  useEffect(() => {
    checkWidth(); // Check width on initial render
    window.addEventListener("resize", checkWidth); // Add event listener

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <>
      <div className="container mx-auto py-2" ref={nextContainerRef}>
        {Bannerdata.map((herosection) => (
          <div key={herosection.id}>
            <motion.div
              className="title-80"
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
              <div className="flex items-end justify-between border-b pb-10 pt-[20px] sm:pt-[50px] lg:pt-[130px]">
                <div className="  max-w-[1000px] ">
                  <h1 className="title-80"> {herosection.title}</h1>
                </div>
                <div className="text-font19 text-gray1">{order}</div>
              </div>
            </motion.div>
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
              <div>
                {herosection.sub.map((su, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 py-[50px] lg:grid-cols-2 lg:py-[142px] "
                  >
                    <div className="col-span-1 mb-2 lg:mb-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-30 leading-[1.5]">{su.stitle}</h2>

                        <div className="h-5 w-5 bg-primary"></div>
                      </div>
                    </div>

                    <div className="ms-0 text-[19px] text-gray1 ">
                      <p className={`text-font19 ${lexend.className}`}>
                        {su.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
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
        <div
          style={{ width: isSmallScreen ? "" : divWidth }}
          className={`${
            isSmallScreen ? "container mx-auto py-2" : ""
          } custom-class`}
        >
          <div className="flex gap-5 bg-bglight  py-[17px]">
            <div className="  flexcl600 container mr-0 lg:mr-[-15px]">
              <div className="w-full  overflow-hidden">
                <PerformanceSwiper />
              </div>
            </div>
          </div>
          {Bannerdata.map((herosection) => (
            <div className=" w-full bg-black ">
              <Image
                src={herosection.image}
                className="w-full"
                alt=""
                width={1500}
                height={700}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default HeroSection;
