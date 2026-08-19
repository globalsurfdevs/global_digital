"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/public/assets/assets";
import { Lexend } from "next/font/google";
import LetsTalk from "../common/LetsConnect";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
interface BoostItem {
  id: number;
  icon: string;
  title: string;
}

interface BoostSectionProps {
  title: string;
  data: BoostItem[];
}
const imagesdata = [
  { image: assets.chlg1, multiplier: "10X" },
  { image: assets.chlg2, multiplier: "5X" },
  { image: assets.chlg3, multiplier: "4X" },
];

/**
 * AuditSecTwo renders a section that displays a title, animated brand images, and a list of boosts.
 * It includes an interval-based animation for rotating brand images and multipliers,
 * and handles modal state for a button interaction.
 *
 * Props:
 * - title: The section title to be displayed.
 * - data: An array of BoostItem objects, each containing an id, icon, and title.
 *
 * The component uses framer-motion for animations and manages the current index for image rotation
 * as well as the modal open state using React hooks.
 */
const AuditSecTwo: React.FC<BoostSectionProps> = ({ title, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollToSection = () => {
    const section = document.getElementById("requestst");
    section?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [modalOpen]);
  // Ref for the next container (HTMLDivElement type)
  const nextContainerRef = useRef<HTMLDivElement | null>(null);
  const [divWidth, setDivWidth] = useState("100%");
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="">
      {/* Modal section */}
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[1000] w-screen overflow-y-auto bg-white">
          <LetsTalk onClose={() => setModalOpen(false)} />
        </div>
      )}
      <div className="max-auto container py-4">
        <div className="pb-[50px] pt-[50px] lg:pb-[140px] lg:pt-[111px]">
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
            <h2 className="title-65">{title}</h2>
            <p className="mt-5 text-font30 font-normal leading-[1.2] text-gray1 lg:mt-10">
              80% of our audit recipients discover{" "}
              <span className="text-primary">3+</span> quick wins for business
              growth.
            </p>
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
                transition: { duration: 1.2, ease: "easeOut" },
              }, // Slide up and fade in
            }}
          >
            <div className="mt-8 grid grid-cols-1 gap-8 bg-dgray  px-10 py-5  md:grid-cols-2 md:px-20 md:py-14 lg:mt-[40px] xl:grid-cols-3">
              {data.map((boost, index) => (
                <div className="flex flex-col  " key={boost.id}>
                  <div className="imsr border-gray-500 pb-3 md:pb-5">
                    <div className="align-center flex h-[30px] w-[30px] justify-center bg-primary p-2 transition-colors duration-500 group-hover:bg-white md:h-[50px] md:w-[50px]">
                      <p className="md:text-30 text-font19 leading-[1]  text-white transition-transform duration-500">
                        0{index + 1}
                      </p>
                    </div>
                  </div>

                  <div className="h-[1px] w-full rounded-xl bg-gray-500"></div>

                  <div className="pt-3 md:pt-5 ">
                    <h3 className="text-font19 font-semibold text-gray1">
                      {boost.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="mb-6 mt-5 flex flex-wrap items-center lg:mb-[75px] lg:mt-[65px]">
            <p className="gap-y-2 text-font25  font-normal lg:gap-y-0  ">
              We’ve helped brands like{" "}
            </p>
            <div className="relative mx-4 h-[40px] w-[100px] overflow-hidden rounded-full border border-primary lg:h-[62px] lg:w-[163px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex + "-img"}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute h-full w-full"
                >
                  <Image
                    src={imagesdata[currentIndex].image}
                    alt={`Brand ${currentIndex + 1}`}
                    className="h-full w-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="gap-y-2 text-font25  font-normal lg:gap-y-0  ">
              {" "}
              increase revenue by up to{" "}
            </p>
            <span className="relative ml-2   inline-block text-font25 font-normal text-primary">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex + "-txt"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className=" "
                >
                  {imagesdata[currentIndex].multiplier}
                </motion.span>
              </AnimatePresence>
            </span>
            <p className="text-font25 font-normal">.</p>
          </div>

          <button
            onClick={scrollToSection}
            className="z-2 z-1 group relative  mt-8 flex w-fit items-center gap-3 border border-l-0 border-r-0 border-t-0 border-transparent p-0
                                   pb-3 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-black before:transition-all before:duration-300 before:ease-in-out
                                        after:absolute after:bottom-0 after:right-0 after:h-[1px] after:w-full after:bg-orange-500 after:transition-all after:duration-300 after:ease-in-out hover:border-b-white hover:after:w-0 lg:mt-10"
          >
            <div className="relative">
              <p
                className={`text-sm font-medium uppercase duration-200 ease-in-out group-hover:text-primary md:text-[16px] ${lexend.className}`}
              >
                Get My Free Audit
              </p>
            </div>
            <svg
              width="10"
              height="10"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="duration-200 ease-in-out group-hover:scale-125"
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
      </div>
    </div>
  );
};

export default AuditSecTwo;
