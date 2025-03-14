"use client";

import React, { useState } from "react";
import Image from "next/image";
import arrowactive from "@/public/assets/logos/arr-active.svg";
import arrowdown from "@/public/assets/logos/arr-down.svg";
import { Collapse } from "react-collapse";
import { motion } from "framer-motion";
type PartnerDataType = {
  title: string;
  description: string;
};

type PartnerListProps = {
  data: PartnerDataType[];
};

const FAQ: React.FC<PartnerListProps> = ({ data }) => {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (itemIndex: number) => {
    if (open == itemIndex) {
      setOpen(null);
      return;
    }

    setOpen(itemIndex);
  };

  return (
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
        <div className="grid grid-cols-1 py-[50px] lg:py-[150px] xl:grid-cols-7">
          <div className="col-span-2  mb-5 xl:mb-0">
            <h2 className="title-65">FAQ</h2>
          </div>

          <div className="col-span-5 w-full">
            {data.map((item, index) => (
              <div
                className="flex w-full items-center justify-between gap-3 border-b border-t py-6 lg:pb-[50px] lg:pt-[50px]"
                key={index}
                onClick={() => toggle(index)}
              >
                <div className="flex cursor-pointer  flex-col">
                  <h3
                    className={` ${open === index ? "text-30 cursor-pointer text-black" : "text-30 text-gray1"}`}
                  >
                    {index + 1}. {item.title}
                  </h3>
                  <Collapse isOpened={open === index}>
                    <div className="collapse-item pt-3 lg:pt-[22px]">
                      <h4 className="text-19 fnt-lexend text-gray1 ">
                        {item.description}
                      </h4>
                    </div>
                  </Collapse>
                </div>
                {open === index ? (
                  <div className="text-5xl text-primary">
                    <Image
                      src={arrowactive}
                      alt="image"
                      className="min-h-[25px] min-w-[25px] lg:min-h-[35px] lg:min-w-[35px] "
                    ></Image>
                  </div>
                ) : (
                  <div className="text-xl">
                    <Image
                      src={arrowdown}
                      alt="image"
                      className="min-h-[15px] min-w-[15px] bg-white "
                    ></Image>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;
