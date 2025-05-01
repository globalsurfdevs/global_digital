"use client";
import React, { useEffect, useState } from "react";

import LetsTalk from "../../components/common/LetsConnect";
import { motion } from "framer-motion";
import { Lexend } from "next/font/google";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
interface PlatformsItem {
  id: number;
  icon: string;
  title?: string;
  rttitel?: string;
  btntitle?: string;
  btnurl?: string;
  dec: string;
}

interface DigitalServSectionProps {
  bgblack?: boolean;
  icontitle?: boolean;
  leftzero?: boolean;
  desc?: string;
  fdesc?: string;
  btntitle?: string;
  btnurl?: string;
  title: string;
  colm?: number;
  data: PlatformsItem[];
}

const DigitalServ: React.FC<DigitalServSectionProps> = ({
  title,
  btntitle,
  btnurl,
  data,
  bgblack,
  icontitle,
  leftzero,
  desc,
  fdesc,
  colm,
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
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
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
      <div className={`container  py-4  `}>
        <div
          className={`  flex flex-col gap-4 md:gap-7   ${leftzero ? "left0w" : ""} py-[25px] lg:gap-12 lg:py-[100px]`}
        >
          <div>
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
              <h2
                className={`title-65 mb-6 md:mb-10 md:max-w-[35ch] ${bgblack ? "text-white" : ""}`}
              >
                {title}{" "}
              </h2>
              <p
                className="text-19 fnt-lexend text-gray1 transition-colors duration-300 group-hover:text-gray-700 md:max-w-[67ch] "
                dangerouslySetInnerHTML={{ __html: desc || "" }}
              ></p>
              <button
                onClick={() => setModalOpen(true)}
                className="z-2 z-1 group relative my-5 flex w-fit items-center gap-3 border border-l-0 border-r-0 border-t-0 border-transparent p-0 pb-3
                            before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-black before:transition-all before:duration-300 before:ease-in-out after:absolute
                            after:bottom-0 after:right-0 after:h-[1px] after:w-full after:bg-orange-500 after:transition-all after:duration-300 after:ease-in-out hover:border-b-white hover:after:w-0 lg:mb-[87px] lg:mt-[75px]
                            "
              >
                <div className="relative">
                  <p
                    className={`duration-200" text-sm  font-medium uppercase ease-in-out group-hover:text-primary md:text-[16px] ${lexend.className}`}
                  >
                    {btntitle}
                  </p>
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
              <hr className="hidden md:mb-[27px] md:block" />
            </motion.div>
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
                transition: { duration: 1.2, ease: "easeOut" },
              }, // Slide up and fade in
            }}
          >
            <div
              className={`grid grid-cols-1 gap-x-8 gap-y-[45px]  md:grid-cols-2 lg:gap-y-[95px]  ${colm ? `xl:grid-cols-${colm}` : `xl:grid-cols-3`} `}
            >
              {data.map((platform) => (
                <div
                  key={platform.id}
                  className={`group flex flex-col transition-all duration-300 ${
                    platform.id !== 1
                      ? "border-0 pl-5 md:border-l md:border-solid"
                      : ""
                  }`}
                >
                  <div className="">
                    {" "}
                    {platform.title && (
                      <p
                        className={`text-30 transition-colors duration-300  lg:text-[65px] ${bgblack ? "text-white" : ""}`}
                      >
                        {platform.title}{" "}
                        <span className="relative right-2  ">+</span>
                      </p>
                    )}
                    <p
                      className="  text-font25 leading-[1.3] text-black"
                      dangerouslySetInnerHTML={{
                        __html: platform.rttitel || "",
                      }}
                    ></p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DigitalServ;
