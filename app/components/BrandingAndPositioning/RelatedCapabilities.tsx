"use client";

import { capabilitiesData } from "@/app/data/services/branding-and-positioning-agency-in-dubai/data";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../animations/motionVariants";
import Link from "next/link";
import { toSentenceCase } from "@/app/helpers/maintainProperWordings";

interface RelatedCapabiliProps {
  data: typeof capabilitiesData;
}

const RelatedCapabili = ({ data }: RelatedCapabiliProps) => {
  return (
    <section className="py-120">
      <div className="container">
        <div className="mb-4 xl:mb-8 xxl:mb-12">
          <div className="mb-4 flex items-center gap-3 md:mb-6 xl:mb-8 xxl:mb-12">
            <motion.h3
              initial="hidden"
              whileInView="show"
              variants={moveUp(0)}
              viewport={{ once: true }}
              className="text-18 uppercase leading-[1] tracking-[-0.025em]  text-muted"
            >
              {data.tag}
            </motion.h3>
            <div className="h-4 w-4 bg-primary"></div>
          </div>
          <motion.h2
            initial="hidden"
            whileInView="show"
            variants={moveUp(0.1)}
            viewport={{ once: true }}
            className="title-60 text-[length:var(--text-60-sm)] max-w-[25ch]"> {data.title}</motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {data.items.map((item, index) => (
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={moveUp(index * 0.1)}
              viewport={{ once: true }}
              key={item.id}
              className="rounded-[10px] border border-black/20 p-2 p-6 md:p-3 xl:p-5 xxl:p-10 -mr-px"
            >
              <div className="mb-3 flex items-center gap-2 md:mb-4 xl:mb-5 xl:gap-4 xxl:mb-[30px] 3xl:gap-[26px]">
                <div className="border-primary/12 w-50 h-50 flex shrink-0 items-center justify-center rounded-[7px] border bg-primary/5 p-3 xl:h-[100px] xl:w-[100px] xl:p-5">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="h-10 w-10 object-contain xl:h-auto xl:w-auto xxl:h-[60px] xxl:w-[60px]"
                  />
                </div>
                {item.link ? (
                  <Link href={item.link}>
                    <h3 className="text-28 font-normal tracking-[-0.025em]">
                      {item.title}
                    </h3>
                  </Link>
                ) : (
                  <h3 className="text-28 font-normal tracking-[-0.025em]">
                    {item.title}
                  </h3>
                )}

              </div>
              <p className="text-[length:var(--text-18-sm)] xxl:text-20 fnt-lexend leading-[1.444444444444444] text-[#77787B]">
                {toSentenceCase(item.description)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedCapabili;
