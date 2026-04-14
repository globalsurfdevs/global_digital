"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import arrowactive from "@/public/assets/logos/arr-active.svg";
import arrowdown from "@/public/assets/logos/arr-down.svg";
import { Collapse } from "react-collapse";
import { Lexend } from "next/font/google";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
}); import { motion, AnimatePresence } from "framer-motion";
type PartnerDataType = {
  title: string;
  description: string;
};

type PartnerListProps = {
  data: PartnerDataType[];
  subp?: string;
  bgcolor?: string;
  title?: string;
  defActive?: string;
};
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const FAQ: React.FC<PartnerListProps> = ({
  data,
  subp,
  bgcolor,
  title,
  defActive,
}) => {
  const getDefaultOpenIndex = (value?: string) => {
    const parsedValue = Number.parseInt(value ?? "", 10);

    if (Number.isNaN(parsedValue) || parsedValue < 1 || parsedValue > data.length) {
      return null;
    }

    return parsedValue - 1;
  };

  const [open, setOpen] = useState<number | null>(() => getDefaultOpenIndex(defActive));
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setOpen(getDefaultOpenIndex(defActive));
  }, [defActive, data.length]);

  const toggle = (itemIndex: number) => {
    if (open == itemIndex) {
      setOpen(null);
      return;
    }

    setOpen(itemIndex);
  };

  return (
    <div className={` ${bgcolor ? `bg-[${bgcolor}]` : 'bg-white'}`}>
      <div className="container mx-auto py-4">
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
          <div className={`grid grid-cols-1 py-8 md:py-[50px] lg:py-[140px] xl:grid-cols-8  `} >
            <div className="col-span-2  mb-5 xl:mb-0">
              <h2 className="title-65">
                {!title && "FAQ"}
                {title}</h2>
              {
                subp && (
                  <p className="fnt-lexend text-19 mt-6 max-w-[74ch] text-gray1 lg:mt-[40px]">
                    {subp}
                  </p>
                )
              }
            </div>

            <div className={`col-span-5 w-full overflow-hidden`} >
              <motion.div layout variants={containerVariants} initial="hidden" animate="visible" >
                <AnimatePresence mode="popLayout">
                  {data.map((item, index) => (
                    <motion.div
                      key={item.title} // ⚠️ Important: never use index
                      layout
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden flex w-full items-center justify-between gap-3 border-b first:border-t py-6 lg:pb-[50px] lg:pt-[50px]"
                    >
                      <div className="flex cursor-pointer  flex-col" onClick={() => toggle(index)}>
                        <h3
                          className={` ${open === index ? "text-30 cursor-pointer text-black" : "text-30 text-gray1"}`}
                        >
                          {index + 1}. {item.title}
                        </h3>
                        <Collapse isOpened={open === index}>
                          <div className="collapse-item pt-3 lg:pt-[22px]">
                            <p className="text-19 fnt-lexend text-gray1 ">
                              {item.description}
                            </p>
                          </div>
                        </Collapse>
                      </div>
                      {open === index ? (
                        <div className="text-5xl text-primary">
                          <Image src={arrowactive} alt="image" width={25} height={25} className="min-h-[25px] min-w-[25px] lg:min-h-[35px] lg:min-w-[35px] " loading="lazy" ></Image>
                        </div>
                      ) : (
                        <div className="text-xl">
                          <Image src={arrowdown} alt="image" height={25} width={25} className="min-h-[15px] min-w-[15px]  " loading="lazy" ></Image>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              {/* <button 
             onClick={() => setShowAll(!showAll)}
              className="z-2 z-1 group relative  flex w-fit items-center gap-3 border border-l-0 border-r-0 border-t-0 border-transparent p-0 pb-3
                          before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-black before:transition-all before:duration-300 before:ease-in-out after:absolute
                          after:bottom-0 after:right-0 after:h-[1px] after:w-full after:bg-orange-500 after:transition-all after:duration-300 after:ease-in-out hover:border-b-white hover:after:w-0 lg:mt-[30px] mt-3"
            >
              <div className="relative">
                <p
                  className={`duration-200 text-sm font-medium uppercase ease-in-out group-hover:text-primary md:text-[16px] ${lexend.className}`}
                >
                   {showAll ? "SEE LESS" : "SEE ALL"}
                </p>
              </div>
              <svg
                width="10"
                height="10"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg" 
                className={`duration-300 ease-in-out ${
    showAll ? "rotate-180 scale-110" : "rotate-0"
  } group-hover:scale-125`}
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
            </button> */}
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
