"use client";

import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "motion/react";
import { Lexend } from "next/font/google";
import Link from "next/link";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

import { services } from "./data";


const TestimonialsSwiper = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
   const nextContainerRef = useRef<HTMLDivElement | null>(null);
    const [divheight, setdivheight] = useState("100%");

    useEffect(() => {
       const updatedivheight = () => {
         if (nextContainerRef.current) {
           // Get the bounding rectangle of the next container
           const containerRect = nextContainerRef.current.getBoundingClientRect();

           const totalHeight = containerRect.height;

           setdivheight(`${totalHeight}px`);
         }
       };

       if (window.innerWidth > 767) {
         // Initial height calculation
         updatedivheight();

         // Recalculate on window resize
         window.addEventListener("resize", updatedivheight);
       }
       // Cleanup event listener on unmount
       return () => {
         window.removeEventListener("resize", updatedivheight);
       };
     }, []); // Empty dependency array ensures this runs once on mount
     const checkWidth = () => {
       if (window.innerWidth > 767) {
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
    <div className="py-[50px]   lg:py-[140px]">
    <div className="container mx-auto ">
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
      <div className="mb-5 flex items-center gap-2 lg:mb-[89px]">
        <h2 className="text-30 font-[400] leading-[1.5] uppercase">industries We Serve</h2>
        <div className="size-3 bg-primary md:size-4 lg:size-5"></div>
      </div>
    </motion.div>
      </div>
      <div className="container mx-auto flex flex-col gap-5 px-4 py-8 xl:gap-[75px]">
        {/* Services */}
        {services.map((service) => (

          <div
          key={service.id}>
          <motion.div
            className="srv-item ref-ht grid grid-cols-1 gap-8  md:grid-cols-2 xl:gap-[88px] relative"
            ref={nextContainerRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }} // Trigger animation once when 50% visible
            variants={{
              hidden: { opacity: 0, y: 50 }, // Start below and invisible
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1, ease: "easeOut" },
              }, // Slide up and fade in
            }}
          >
            {/* Service Image */}

            <div
              // style={{ minHeight: divheight }}
              className={`${isSmallScreen ? "srv-im targ-ht   justify-end border-b-gray-400 md:order-2" : ""} custom-class`}
            >
              <motion.div
                className=""
                variants={{
                  hidden: { y: 50, opacity: 0 }, // Start below and fade in
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 1, delay: 0.2 },
                  },
                }}
              ><Link href={service.url} >
                <motion.img
                  src={service.image}
                  alt={service.title}
                  // className="h-full object-cover objectstm"
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  </Link>
              </motion.div>
            </div>

            {/* Service Details */}
            <motion.div
              // style={{ minHeight: divheight }}
              className={`${isSmallScreen ? "targ-ht htsmedia flex flex-col justify-between  pb-5 lg:pb-2 h-full" : ""} custom-class`}
            >
              {/* Content Block */}
              <div className="cntntblc flex justify-center h-full flex-col ">
                <div className="group relative">
                <Link href={service.url} > <h3 className="title-65 max-w-[14ch] macst transition-all duration-300 ease-in-out group-hover:text-primary">
                    {service.title}
                  </h3>
                 </Link>
                </div>
                <div className="flex flex-col gap-2 lg:gap-7 my-3 md:my-4 lg:my-[40px] ">
                  <p
                    className={`mb-0 text-font25 leading-lh1p4 ${lexend.className} font-light text-[#000]`}
                  >
                    {service.description}
                  </p>

                  </div>
                  <button
                        className="z-2 z-1 group relative flex w-fit items-center gap-3 border border-l-0 border-r-0 border-t-0 border-transparent p-0 pb-3
                before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-black before:transition-all before:duration-300 before:ease-in-out after:absolute
                after:bottom-0 after:right-0 after:h-[1px] after:w-full after:bg-orange-500 after:transition-all after:duration-300 after:ease-in-out hover:border-b-white hover:after:w-0
                "
                      >
                        <div className="relative">
                          <p
                            className={`duration-200 uppercase text-sm font-medium ease-in-out group-hover:text-primary md:text-[16px] ${lexend.className}`}
                          >
                           Learn More
                          </p>
                          <Link
                            href={ "#"}
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
          </motion.div>
            </div>
        ))}
      </div>
      </div>
  );
};

export default TestimonialsSwiper;
