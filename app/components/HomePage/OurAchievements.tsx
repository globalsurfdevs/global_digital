"use client";

import { assets } from "@/public/assets/assets";
import Image from "next/image";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useSpring } from "motion/react";
import { motion } from "framer-motion";

const OurAchievements = () => {
  const [yearCount, setYearCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const springYearCount = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  const springClientCount = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  const springProjectCount = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  springYearCount.on("change", (value) => {
    setYearCount(Math.round(value));
  });

  springClientCount.on("change", (value) => {
    setClientCount(Math.round(value));
  });

  springProjectCount.on("change", (value) => {
    setProjectCount(Math.round(value));
  });

  useEffect(() => {
    if (isInView) {
      springYearCount.set(11);
      springClientCount.set(125);
      springProjectCount.set(250);
    }
  }, [isInView, springYearCount]);

  const [activeSection, setActiveSection] = useState(2); // Initialize with the second section active

  return (
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
      <div className="mt-10 bg-black py-0 text-white xl:mt-20 xl:px-16 xl:py-0 ">
        <div className="grid gap-8 md:min-h-[300px] md:grid-cols-3 lg:min-h-[450px] xl:min-h-[598px]">
          <div
            className="group border-b border-b-[#77787B] md:border-none"
            onMouseEnter={() => setActiveSection(1)}
          >
            <div className="cntrsx flex h-[100%] flex-col items-start justify-between p-4 lg:py-10 xl:pb-[100px] xl:pt-[50px] ">
              <div className="relative mb-8">
                <Image
                  src={assets.yr}
                  alt="years"
                  width={38}
                  height={52}
                  className="transition-transform  duration-500 group-hover:scale-110 group-hover:opacity-50"
                />
                <Image
                  src={assets.yr1}
                  alt="years"
                  width={72}
                  height={80}
                  className="absolute top-0 opacity-0 transition-transform   duration-500 group-hover:scale-110 group-hover:opacity-[1]"
                />
              </div>
              <div className="transition-all duration-500 group-hover:-translate-y-3 ">
                <p className="mt-4 text-font65 font-[400] leading-lh1p07">
                  <span
                    className={`
                      count-number
                    transition-colors duration-300 ease-in-out`}
                  >
                    {yearCount}
                  </span>{" "}
                  Years
                </p>
                {/* <p className={`text-font30  leading-lh2p3 text-gray1 `}>
                  and{" "}
                  <span className="count-number"
                    // className={`${activeSection === 1 ? "text-primary" : ""}`}
                  >
                    Counting
                  </span>
                </p> */}
                <div className="ttlbx">
                  <div className="letter-wrapper">
                    <div className="letter-default  text-font30 leading-lh2p3 text-gray1">
                      and Counting
                    </div>
                    <div className="letter-hover  text-font30 leading-lh2p3 text-gray1">
                      and Counting
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="group border-b border-b-[#77787B] p-4 md:border-b-0 md:border-l md:border-gray1 lg:p-0  lg:px-4 xl:pl-10 "
            onMouseEnter={() => setActiveSection(2)}
            ref={ref}
          >
            <div className="cntrsx flex h-[100%] flex-col items-start justify-between lg:py-10 xl:pb-[100px] xl:pt-[50px]">
              <div className="relative mb-8">
                <Image
                  src={assets.cl}
                  alt="Clients"
                  width={38}
                  height={52}
                  className="transition-transform  duration-500 group-hover:scale-110 group-hover:opacity-50"
                />
                <Image
                  src={assets.cl1}
                  alt="Clients"
                  width={72}
                  height={80}
                  className="absolute top-0 opacity-0 transition-transform   duration-500 group-hover:scale-110 group-hover:opacity-[1]"
                />
              </div>
              <div className="transition-all duration-500 group-hover:-translate-y-3">
                <p className="mt-4 text-font65 font-[400] leading-lh1p07">
                  <span
                    className={`count-number
                    transition-colors duration-300 ease-in-out`}
                  >
                    {clientCount}
                  </span>{" "}
                  Clients
                </p>
                {/* <p className={`text-font30 leading-lh2p3 text-gray1`}>
                  {" "}
                  and{" "}
                  <span
                    className={`${activeSection === 2 ? "text-primary" : ""}`}
                  >
                    Growing
                  </span>{" "}
                </p> */}
                <div className="ttlbx">
                  <div className="letter-wrapper">
                    <div className="letter-default  text-font30 leading-lh2p3 text-gray1">
                      and Growing
                    </div>
                    <div className="letter-hover  text-font30 leading-lh2p3 text-gray1">
                      and Growing
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="group p-4 md:border-l md:border-gray1 lg:p-0  lg:px-4 xl:pl-10"
            onMouseEnter={() => setActiveSection(3)}
          >
            <div className="cntrsx flex h-[100%] flex-col items-start justify-between lg:py-10 xl:pb-[100px] xl:pt-[50px]">
              <div className="relative mb-8">
                <Image
                  src={assets.pjt}
                  alt="Projects"
                  width={38}
                  height={52}
                  className="transition-transform  duration-500 group-hover:scale-110 group-hover:opacity-50"
                />
                <Image
                  src={assets.pjt1}
                  alt="Projects"
                  width={72}
                  height={80}
                  className="absolute top-0 opacity-0 transition-transform   duration-500 group-hover:scale-110 group-hover:opacity-[1]"
                />
              </div>
              <div className="transition-all duration-500 group-hover:-translate-y-3">
                <p className="mt-4 text-font65 font-[400] leading-lh1p07">
                  <span
                    className={`count-number
                    transition-colors duration-300 ease-in-out`}
                  >
                    {projectCount}
                  </span>{" "}
                  Projects
                </p>
                {/* <p className={`text-font30   leading-lh2p3 text-gray1`}>
                  and{" "}
                  <span
                    className={`${activeSection === 3 ? "text-primary" : ""}`}
                  >
                    More to Come
                  </span>
                </p> */}
                <div className="ttlbx">
                  <div className="letter-wrapper">
                    <div className="letter-default  text-font30 leading-lh2p3 text-gray1">
                      More to Come
                    </div>
                    <div className="letter-hover  text-font30 leading-lh2p3 text-gray1">
                      More to Come
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OurAchievements;
