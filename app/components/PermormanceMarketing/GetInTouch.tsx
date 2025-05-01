"use client";

import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import LetsTalk from "../../components/common/LetsConnect";
type PartnerDataType = {
  text: string;
  textred: string;
  subhead?: string;
};

type PartnerListProps = {
  ctabbutton: string;
  bgcolor?: string;
  redlast?: boolean;
  data: PartnerDataType[];
};

const GetInTouch: React.FC<PartnerListProps> = ({
  data,
  ctabbutton,
  bgcolor,
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
  return (
    <>
      {/* Modal section */}
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[1000] w-screen overflow-y-auto bg-white">
          <LetsTalk onClose={() => setModalOpen(false)} />
        </div>
      )}
      <div
        className={`flex flex-col   py-[50px] lg:py-[150px] ${bgcolor ? `bg-[${bgcolor}]` : "bg-black"}`}
      >
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
                  <h2
                    className="title-65 leading-[1.15]"
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: `<span class='${bgcolor ? `text-black` : ""}'>${item.text}</span><span class="text-primary">${item.textred}</span>`,
                    }}
                  />
                ) : (
                  <h2
                    className="title-65 leading-[1.15]"
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: `<span class="text-primary">${item.textred}</span><span class='${bgcolor ? `text-black` : ""}'>${item.text}</span>`,
                    }}
                  />
                ),
              )}

              {data.map((item, index) => {
                item.subhead && item.subhead.length > 0 ? (
                  <div key={index}>
                    <p className="pt-5 text-font30 leading-[1.3] text-gray1 lg:mt-10">
                      {item.subhead}
                    </p>
                  </div>
                ) : null;
              })}
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
              <div className="innerfnont mt-6 lg:mt-[57px]">
                <button
                  onClick={() => setModalOpen(true)}
                  className={`text-30 w-fit rounded-full border border-primary px-6 py-3 leading-lh1p66 ${
                    bgcolor ? "text-black" : "text-white"
                  } transition-all duration-300 ease-in hover:bg-primary hover:text-white hover:shadow-lg lg:px-24`}
                >
                  <span className="duration-300 ease-in group-hover:text-black">
                    {ctabbutton}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetInTouch;
