"use client"; 
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image"; 
import { motion,AnimatePresence } from "framer-motion";
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
  { image: assets.chlg1, multiplier: "2X" },
  { image: assets.chlg2, multiplier: "3X" },
  { image: assets.chlg3, multiplier: "4X" },
  { image: assets.chlg4, multiplier: "5X" },
  { image: assets.chlg5, multiplier: "2X" }, // Loop back or add more if needed
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
      <div className="container max-auto py-4">
        <div className="pb-[50px] lg:pb-[140px] pt-[50px] lg:pt-[111px]">
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
            <p className="text-gray1 text-font30 font-normal mt-5 lg:mt-10 leading-[1.2]">80% of our audit recipients discover <span className="text-primary">3+</span> quick wins for business growth.</p>
      
             
 
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8  mt-8 lg:mt-[58px]  bg-dgray py-5 md:py-14 px-10 md:px-20">
              {data.map((boost,index) => (
                <div className="flex flex-col  " key={boost.id}>
                  <div className="pb-3 md:pb-5 border-gray-500 imsr">
                    
                      <div className="align-center flex h-[30px] w-[30px] justify-center bg-primary p-2 transition-colors duration-500 group-hover:bg-white md:h-[50px] md:w-[50px]">
                     <p className="text-font19 md:text-30 leading-[1]  text-white transition-transform duration-500">0{index + 1}</p>
                                            </div>
                  </div>

                  <div className="h-[1px] w-full bg-gray-500 rounded-xl"></div>

                  <div className="pt-3 md:pt-5 ">
                    <h3 className="text-font19 font-semibold text-gray1">{boost.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="mt-5 lg:mt-14 mb-6 lg:mb-20">
      <p className="font-normal text-font25  gap-y-2 lg:gap-y-0  flex flex-wrap items-center">
        We’ve helped brands like 
        <div className="relative lg:w-[163px] lg:h-[62px] w-[100px] h-[40px] mx-4 border border-primary rounded-full overflow-hidden">
         
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex + "-img"}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full h-full"
            >
              <Image
                src={imagesdata[currentIndex].image}
                alt={`Brand ${currentIndex + 1}`}
                className="object-contain w-full h-full"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        increase revenue by up to{" "}
        <span className="text-primary relative   inline-block ml-2">
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
        </span>.
      </p>
    </div>
    
    <button
                              onClick={() => setModalOpen(true)}
                              className="z-2 z-1 group relative  flex w-fit items-center gap-3 border border-l-0 border-r-0 border-t-0 border-transparent p-0 pb-3
                                   before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-black before:transition-all before:duration-300 before:ease-in-out after:absolute
                                        after:bottom-0 after:right-0 after:h-[1px] after:w-full after:bg-orange-500 after:transition-all after:duration-300 after:ease-in-out hover:border-b-white hover:after:w-0 lg:mt-10 mt-8"
                            >
                              <div className="relative">
                                <p
                                  className={`duration-200 text-sm font-medium uppercase ease-in-out group-hover:text-primary md:text-[16px] ${lexend.className}`}
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
