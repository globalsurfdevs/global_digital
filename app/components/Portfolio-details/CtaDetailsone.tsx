"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react"; 
import { Lexend } from "next/font/google";
import { SuccessStoriesPortfolio } from "../SuccessStories/SuccessStoriesPortfolio";
import { Portfolio } from "@/app/types/Portfolio";
import parse from "html-react-parser";
import LetsTalk from "@/app/components/common/LetsConnect";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const CtaDetailsone = ({
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

      
      <div className="bg-black mt-10  lg:mt-[80px] xl:mt-[100px]  2xl:mt-[140px]">
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
            <h2 className="title-80   text-white max-w-[25ch]">This project drove measurable business growth.</h2>
            
            <div className="innerfnont mt-[20px] lg:mt-[60px] relative w-fit">
              
              <div
              //      onClick={() => {
              //   setModalOpen(true);
              //   document.body.style.overflow = "hidden";
              // }}
                    className="z-2 z-1 group cursor-pointer relative    flex w-fit items-center gap-3 border border-l-0 border-r-0 border-t-0 border-transparent p-0
                                   pb-[24px] pt-[10px] before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-black before:transition-all before:duration-300 before:ease-in-out
                                        after:absolute after:bottom-0 after:right-0 after:h-[1px] after:w-full after:bg-orange-500 after:transition-all after:duration-300 after:ease-in-out hover:border-b-white hover:after:w-0  "
                  >
                    <div className="relative">
                      <p
                        className={`text-sm font-medium uppercase duration-200 ease-in-out text-white  group-hover:text-primary md:text-[16px] ${lexend.className}`}
                      >
                        Read the full case study
                      </p>
                    </div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="duration-200 ease-in-out group-hover:scale-110"
                    >
                      <g clipPath="url(#clip0_65_58)">
                        <path
                          d="M18.7892 1.2749L0.699219 19.0149"
                          stroke="#E53F30"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          className="group-hover:stroke-white"
                        />
                        <path
                          d="M0.699219 1.2749H18.7892V18.6649"
                          stroke="#E53F30"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          className="group-hover:stroke-white"
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
                  </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto py-4">
        <div>
          <SuccessStoriesPortfolio companyId={data?.portfolio._id} colCount={2} />
        </div>
      </div>
      
    </>
  );
};

export default CtaDetailsone;
