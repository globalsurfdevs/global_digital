"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import Link from "next/link";
import { motion, useInView, useSpring } from "framer-motion";
import LetsTalk from "../../components/common/LetsConnect";

type PartnerDataType = {
  text: string;
  textred: string;
  subtxt?: string;
};

type PartnerListProps = {
  ctabbutton: string;
  link?: string;
  bgcolor?: string;
  redlast?: boolean;
  subtxt?: string;
  data: PartnerDataType[];
};

const GetInTouch: React.FC<PartnerListProps> = ({
  data,
  ctabbutton,
  bgcolor,
  link,
  redlast,
}) => {
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

  const [clientCount, setClientCount] = useState(0);
  const [retentionCount, setRetentionCount] = useState(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const springClientCount = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  const springRetentionCount = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  const springYearsCount = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  springClientCount.on("change", (value) => {
    setClientCount(Math.round(value));
  });

  springRetentionCount.on("change", (value) => {
    setRetentionCount(Math.round(value));
  });

  useEffect(() => {
    if (isInView) {
      springClientCount.set(150);
      springRetentionCount.set(98);
    }
  }, [isInView, springClientCount, springRetentionCount, springYearsCount]);

  return (
    <>
      {/* Modal section */}
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[1000] w-screen overflow-y-auto bg-white">
          <LetsTalk onClose={() => setModalOpen(false)} />
        </div>
      )}
    <div className="flex flex-col bg-black py-[50px] lg:py-[150px]">
      <div className="container mx-auto px-4 text-white">
        <div className="flex h-1/3 flex-col justify-center ">
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
            {data.map((item, index) =>
              redlast ? (
                <div key={index}>
                  <h2 className="title-65 leading-[1.15]">
                    {item.text}
                    <span className="text-primary">{item.textred} </span>
                  </h2>
                  <p className="text-[19px] text-[#77787B] lg:pt-[45px]">
                    {item.subtxt}
                  </p>
                </div>
              ) : (
                <div key={index}>
                  <h2 className="title-65 leading-[1.15]">
                    <span className="text-primary">{item.textred} </span>
                    {item.text}
                  </h2>
                  <p className="text-[19px] text-[#77787B]  lg:pt-[45px]">
                    {item.subtxt}
                  </p>
                </div>
              ),
            )}
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
                transition: { duration: 1, ease: "easeOut" },
              }, // Slide up and fade in
            }}
          >
            <div className="innerfnont mt-6 lg:mt-[57px] pb-4">
              <button onClick={() => setModalOpen(true)}
                  className={`text-30 w-fit rounded-full border border-primary px-6 py-3 leading-lh1p66 ${
                    bgcolor ? "text-black" : "text-white"
                  } transition-all duration-300 ease-in hover:bg-primary hover:text-white hover:shadow-lg lg:px-24`}
                >
                  <span className="duration-300 ease-in group-hover:text-black">
                    {ctabbutton}
                  </span>
                </button>
            </div>
            <div className="border-t border-[#77787B] lg:my-[75px]"> </div>
            <div ref={ref} className="align-center group mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="clients">
                <h3 className="text-font65 hover:text-[#E63E31]">
                  {clientCount}+
                </h3>
                <p className="text-[30px] text-[#77787B]">
                  E-Commerce Brands Scaled
                </p>
              </div>
              <div className="retention lg:border-l-[1px] border-[#333333] lg:pl-10">
                <h3 className="text-font65 hover:text-[#E63E31]">
                  {retentionCount}%
                </h3>
                <p className="text-[30px] text-[#77787B]">
                  Client Satisfaction
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
      </>
  );
};

export default GetInTouch;
