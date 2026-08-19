"use client";

import { ServiceItem } from "@/app/(user)/[slug]/type";
import { becsData } from "@/app/data/services/branding-and-positioning-agency-in-dubai/data";
import Image from "next/image";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { moveUp } from "../animations/motionVariants";
import { toSentenceCase } from "@/app/helpers/maintainProperWordings";

const BECS = ({ data }: { data: ServiceItem["seventhSection"] }) => {
  return (
    <section className="pb-8 pt-8 xl:pb-12 xl:pt-12 xxl:pb-20 xxl:pt-20 3xl:pb-[146px] 3xl:pt-[142px]">
      <div className="container">
        <div className="row">
          <motion.h2
            initial="hidden"
            whileInView="show"
            variants={moveUp(0)}
            viewport={{ once: true }}
            className="title-60 mb-6 text-[length:var(--text-60-sm)] xl:mb-8 xxl:mb-[50px]"
          >
            {data.title}
          </motion.h2>

          {/* Mobile: stacked cards, no connecting line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:hidden">
            {data.items.map((item, index) => (
              <motion.div
                initial="hidden"
                whileInView="show"
                variants={moveUp(index * 0.1)}
                viewport={{ once: true }}
                key={index}
                className="border-b border-black/10  bg-white p-6"
              >
                <div className="mb-4 flex w-fit items-center justify-center gap-2 rounded-[10px] border border-black/20 px-4 py-3">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={42}
                    height={42}
                    className="h-7 w-7"
                  />
                  <p className="text-28 font-normal leading-[1.214285714285714] tracking-[-0.025em]">
                    {item.title}
                  </p>
                </div>
                <p className="fnt-lexend text-[length:var(--text-18-sm)] font-normal leading-[1.444444444444444] text-muted">
                  {toSentenceCase(item.description)}
                </p>
              </motion.div>
            ))}
          </div>

          {/* md and up: one continuous connected row + description grid below */}
          <div className="hidden xl:block">
            <div className="relative mb-4 grid grid-cols-2 items-center gap-x-6 lg:grid-cols-4 xl:mb-[30px] xl:gap-x-10">
              {/* connecting line, now a background element spanning the full row */}
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/10" />

              {data.items.map((item, index) => (
                <div key={index} className="relative z-10 flex justify-start">
                  <div className="flex w-fit shrink-0 items-center justify-center gap-2 rounded-[10px] border border-black/20 bg-white px-4 py-3 xl:gap-[14px] xl:px-6 xl:py-[24px] xxl:px-10 xxl:py-[29px]">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={42}
                      height={42}
                      className="h-7 w-7 xl:h-[42px] xl:w-[42px]"
                    />
                    <h3 className="text-28 font-normal leading-[1.214285714285714] tracking-[-0.025em]">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-10">
              {data.items.map((item, idx) => (
                <motion.p
                  initial="hidden"
                  whileInView="show"
                  variants={moveUp(idx * 0.1)}
                  viewport={{ once: true }}
                  key={idx}
                  className="fnt-lexend max-w-[35ch] text-left text-[length:var(--text-18-sm)] font-normal leading-[1.444444444444444] text-muted"
                >
                  {item.description}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BECS;
