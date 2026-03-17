"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { SuccessStoriesPortfolio } from "../SuccessStories/SuccessStoriesPortfolio";
import { Portfolio } from "@/app/types/Portfolio";
import parse from "html-react-parser";
import LetsTalk from "@/app/components/common/LetsConnect";

const CtaDetailsTwo = ({
  data,
}: {
  data: {
    portfolio: Portfolio;
  } | null;
}) => {
  console.log("ResultData", data)

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      // disables scroll
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto"; // resets to default
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <>
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[1000] w-screen overflow-y-auto bg-white">
          <LetsTalk onClose={() => setModalOpen(false)} />
        </div>
      )}
 

      <div className="bg-dgray">
        <motion.div
          className="container mx-auto py-4"
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
          <div className="flex flex-col  py-10  lg:py-[80px] xl:py-[100px]  2xl:py-[140px]  ">
            <h2 className="title-65   text-black max-w-[32ch]">Like what you see? Let's build something for your brand.</h2>
             
            <div className="innerfnont mt-[20px] lg:mt-[60px] relative w-fit">
              <Button text="Book a free consultation" textcolor={'black'}     className="uppercase text-30 w-fit rounded-full border border-primary px-6 py-3 leading-lh1p66 transition-all duration-300 ease-in hover:bg-primary hover:text-white  hover:shadow-lg lg:px-[34px] "
          onClick={() => {
                setModalOpen(true);
                document.body.style.overflow = "hidden";
              }} />   
            </div>
          </div>
        </motion.div>
      </div>

       
    </>
  );
};

export default CtaDetailsTwo;
