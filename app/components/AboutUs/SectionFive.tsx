"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import EmployeesSwiper from "./EmployeesSwiper";
import Button from "../Button/Button";
import React, { useEffect, useState } from "react";
import LetsTalk from "@/app/components/common/LetsConnect";

const SectionFive = () => {
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
      document.body.style.overflow = "";
    };
  }, [modalOpen]);
  return (
    <div>
      {/* Modal section */}
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[1000] w-screen overflow-y-auto bg-white">
          <LetsTalk onClose={() => setModalOpen(false)} />
        </div>
      )}
      <div className="container mx-auto py-4">
        <div className="pt-[50px] lg:pt-[100px] ">
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
            <div className="mb-4  grid lg:mb-[47px]">
              <h2 className="title-65 ">The Experts Who Drive Results</h2>
            </div>
          </motion.div>
        </div>
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
        <EmployeesSwiper />
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
        <div className="container mx-auto py-4">
          <div className="flex flex-col pb-[50px] pt-[50px]  lg:pb-[150px] lg:pt-[138px]   ">
            <h2 className="title-65 mb-4 lg:mb-7">
              Ready to Create the Extraordinary? Let’s Go!
            </h2>
            <p className="text-19 fnt-lexend max-w-[113ch] text-gray1">
              Every great brand has a story. See how we’ve turned challenges
              into triumphs for our clients. Your brand could be next.
            </p>
            <div>
              <div className="innerfnont mt-[20px] lg:mt-[64px]">
                <button
                  onClick={() => setModalOpen(true)}
                  className={`text-30 w-fit rounded-full border border-primary px-6 py-3 leading-lh1p66 text-black transition-all duration-300 ease-in hover:bg-primary hover:text-white hover:shadow-lg lg:px-24`}
                >
                  <span className="duration-300 ease-in group-hover:text-black">
                    LET'S COLLABORATE
                  </span>
                </button>
                {/* <Link href="/lets-talk">
                  <Button text="LET'S COLLABORATE" textcolor={"black"} />
                </Link> */}
              </div>{" "}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionFive;
