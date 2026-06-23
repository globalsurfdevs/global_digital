"use client";

import React, { useState } from "react";
import Image from "next/image";
import arrowactive from "@/public/assets/logos/arr-active.svg";
import arrowdown from "@/public/assets/logos/arr-down.svg";
import { Collapse } from "react-collapse";
import { motion } from "framer-motion";

type PartnerDataType = {
  title: string;
  description: string | string[]; // ✅ support single or multiple paragraphs
  bullets?: string[]; // ✅ optional bullet list
};

type PartnerListProps = {
  data: PartnerDataType[];
  subp?: string;
  bgcolor?: string;
  title?: string;
};

const BlogFAQ: React.FC<PartnerListProps> = ({
  data,
  subp,
  bgcolor,
  title,
}) => {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (itemIndex: number) => {
    setOpen((prev) => (prev === itemIndex ? null : itemIndex));
  };

  return (
    <div className="w-full">
      <div className="container py-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            },
          }}
        >
          <div className="pb-[50px] lg:pb-[100px] ">
            <div className="col-span-2 mb-5 xl:mb-0"></div>

            <div className="w-full">
              <h2 className="title-65">
                {!title && "Frequently Asked Questions"}
                {title}
              </h2>
              <p className="fnt-lexend text-19 mt-6 max-w-[74ch] text-gray1 lg:mt-[40px]">
                {subp}
              </p>
              {data?.map((item, index) => (
                <div
                  className="flex w-full items-center justify-between gap-3 border-t py-6 last:border-b lg:pb-[50px] lg:pt-[50px]"
                  key={index}
                  onClick={() => toggle(index)}
                >
                  <div className="flex cursor-pointer flex-col">
                    <h3
                      className={`text-30 ${
                        open === index ? "text-black" : "text-gray1"
                      }`}
                    >
                      {index + 1}. {item.title}
                    </h3>

                    <Collapse isOpened={open === index}>
                      <div className="collapse-item pt-3 lg:pt-[22px]">
                        {/* ✅ handle single or multiple paragraphs */}
                        {Array.isArray(item.description) ? (
                          item.description.map((para, i) => (
                            <p
                              key={i}
                              className="text-19 fnt-lexend mb-3 text-gray1 last:mb-0"
                            >
                              {para}
                            </p>
                          ))
                        ) : (
                          <p
                            className="text-19 fnt-lexend text-gray1"
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        )}

                        {/* ✅ optional bullets */}
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="text-19 fnt-lexend mt-3 list-inside list-disc space-y-1 text-gray1">
                            {item.bullets.map((bullet, idx) => (
                              <li key={idx}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </Collapse>
                  </div>

                  {open === index ? (
                    <div className="text-xl text-primary">
                      <Image
                        src={arrowactive}
                        alt="image"
                        // className="min-h-[25px] min-w-[25px] lg:min-h-[35px] lg:min-w-[35px]"
                        className="max-h-[26px] min-h-[15px] min-w-[15px] max-w-[26px]"
                      />
                    </div>
                  ) : (
                    <div className="text-xl">
                      <Image
                        src={arrowdown}
                        alt="image"
                        className="max-h-[26px] min-h-[15px] min-w-[15px] max-w-[26px]"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogFAQ;
