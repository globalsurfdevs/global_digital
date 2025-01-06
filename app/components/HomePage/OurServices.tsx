"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { services } from "../../data/services";
import { Lexend } from "next/font/google";
import Link from "next/link";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const OurServices = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Ref for the next container (HTMLDivElement type)
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
    <>
      {/* Section Heading */}
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
            <h2 className="text-30 font-[400] leading-[1.5]">OUR SERVICES</h2>
            <div className="size-3 bg-primary md:size-4 lg:size-5"></div>
          </div>
        </motion.div>
      </div>
      <div className="container mx-auto flex flex-col gap-5 px-4 py-8 xl:gap-24">
        {/* Services */}
        {services.map((service) => (
          <motion.div
            className="srv-item ref-ht grid grid-cols-1 gap-8 overflow-hidden md:grid-cols-2 xl:gap-[88px] items-center"
            ref={nextContainerRef}
            key={service.id}
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
                className=" overflow-hidden"
                variants={{
                  hidden: { y: 50, opacity: 0 }, // Start below and fade in
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 1, delay: 0.2 },
                  },
                }}
              >
                <motion.img
                  src={service.image}
                  alt={service.title}
                  // className="h-full object-cover objectstm"
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </motion.div>
            </div>

            {/* Service Details */}
            <motion.div
              // style={{ minHeight: divheight }}
              className={`${isSmallScreen ? "targ-ht htsmedia flex flex-col justify-between border-b pb-5 lg:pb-2 h-full" : ""} custom-class`}
            >
              {/* Content Block */}
              <div className="cntntblc flex flex-col gap-3">
                <div className="group relative">
                  <h3 className="title-65 max-w-[14ch] macst transition-all duration-300 ease-in-out group-hover:text-primary">
                    {service.title}
                  </h3>
                  <Link
                    href={service.url}
                    className="absolute top-0 z-[1] h-full w-full  "
                  ></Link>
                </div>
                <div className="flex flex-col gap-2 lg:gap-7">
                  <p
                    className={`mb-2 text-font25 leading-lh1p4 ${lexend.className} font-light text-[#000]`}
                  >
                    {service.description}
                  </p>
                  <div className="srvbt mb-5 flex flex-wrap gap-2 xl:mb-[4em]">
                    {service.buttonTexts.map((item, index) => (
                      <button
                        className="rounded-full border px-4 py-3 pmac text-font19 font-[500] text-gray-500 duration-200 ease-in hover:border-primary hover:text-black"
                        key={index}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service ID */}
              <div className="mb-3 flex">
                <span className="text-gray-500">0{service.id}</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default OurServices;
