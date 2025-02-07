"use client";

import React, { useRef } from "react";
import { Lexend } from "next/font/google";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const AboutGlobal = () => {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true });

  return (
    <div className="container mx-auto px-4 py-4">
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
        <div className="mb-[50px] flex flex-col gap-5 border-b py-[50px] lg:mb-8  lg:pb-[150px] lg:pt-[136px]">
          <motion.div
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="relative overflow-hidden"
            ref={ref}
          >
            <motion.p className="title-65 leading-tight">
              {"Hello".split("").map((l, i) => (
                <motion.span
                  key={i}
                  variants={{
                    initial: { y: 0 },
                    animate: { y: "-100%" },
                    transition: {
                      delay: 0.2 * i,
                    },
                  }}
                  transition={{ delay: 0.2 * i }}
                  className="inline-block"
                >
                  {l}
                </motion.span>
              ))}
              <motion.span className="text-red-600">!</motion.span>
            </motion.p>

            <motion.p className="title-65 absolute inset-0 leading-tight">
              {"Hello".split("").map((l, i) => (
                <motion.span
                  key={i}
                  variants={{
                    initial: { y: "100%" },
                    animate: { y: 0 },
                  }}
                  transition={{ delay: 0.2 * i }}
                  className="inline-block"
                >
                  {l}
                </motion.span>
              ))}
              <motion.span className="text-red-600">!</motion.span>
            </motion.p>
          </motion.div>
          <p className="font-35 max-w-[50ch]">
            We’re Global Surf Digital, a full-service digital marketing agency
            in Dubai, specializing in data-driven strategies, creative
            innovation, and business-focused solutions.
          </p>
          <button
            className="z-2 z-1 group relative flex flex w-fit items-center gap-1 gap-3 border border-l-0 border-r-0 border-t-0 border-transparent p-0
        pb-3 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-black before:transition-all before:duration-300 before:ease-in-out
          after:absolute after:bottom-0 after:right-0 after:h-[1px] after:w-full after:bg-orange-500 after:transition-all after:duration-300 after:ease-in-out hover:border-b-white hover:after:w-0
        "
          >
            <div className="relative">
              <p
                className={`duration-200" text-sm font-medium ease-in-out group-hover:text-primary md:text-[16px] ${lexend.className}`}
              >
                ABOUT US
              </p>
              <Link
                href="about-us"
                className="absolute top-0 z-[1] h-full w-full"
              ></Link>
            </div>
            <svg
              width="10"
              height="10"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="duration-200 ease-in-out group-hover:scale-125 "
            >
              <g clipPath="url(#clip0_65_58)">
                <path
                  d="M18.7892 1.2749L0.699219 19.0149"
                  stroke="#E53F30"
                  strokeWidth="3"
                  strokeMiterlimit="10"
                  className="group-hover:stroke-black"
                />
                <path
                  d="M0.699219 1.2749H18.7892V18.6649"
                  stroke="#E53F30"
                  strokeWidth="3"
                  strokeMiterlimit="10"
                  className="group-hover:stroke-black"
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
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutGlobal;
