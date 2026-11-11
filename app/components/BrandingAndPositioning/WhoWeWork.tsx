"use client";

import { toSentenceCase } from "@/app/helpers/maintainProperWordings";
import { moveUp } from "../animations/motionVariants";
import { motion } from "framer-motion";
import Image from "next/image";

interface WhoWeWorkData {
  tag: string;
  title: string;
  items: {
    id: number;
    label: string;
    icon: string;
    description?: string;
  }[];
}

const WhoWeWork = ({ data }: { data: WhoWeWorkData }) => {
  return (
    <section className="py-120">
      <div className="container">
        <div className="mb-8 flex items-center gap-3 md:mb-10 xl:mb-12">
          <motion.p
            initial="hidden"
            whileInView="show"
            variants={moveUp(0)}
            viewport={{ once: true }}
            className="text-18 uppercase leading-[1] tracking-[-0.025em] text-muted"
          >
            {data.tag}
          </motion.p>
          <div className="h-4 w-4 bg-primary"></div>
        </div>

        <motion.h2
          initial="hidden"
          whileInView="show"
          variants={moveUp(0)}
          viewport={{ once: true }}
          className="title-60 mb-8 max-w-[20ch] text-[length:var(--text-60-sm)] tracking-[-0.025em] md:mb-[22px]"
          dangerouslySetInnerHTML={{ __html: data.title }}
        />

        <div className="grid grid-cols-1 gap-x-[30px] gap-y-[30px]  sm:grid-cols-2 md:gap-y-[60px] lg:grid-cols-3">
          {data.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="show"
              variants={moveUp(index * 0.1)}
              viewport={{ once: true }}
            >
              <div className="border-[#E63E31]/12 relative mb-[20px] md:mb-[40px] h-[80px] w-[80px] rounded-lg border bg-[#E63E31]/5 px-[12px] py-[15px]">
                <div className="relative h-full w-full">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="border-t border-black/20 pt-[13px] md:pt-[26px]">
                <p className="text-28 leading-[1.2142] tracking-[-0.025em]">
                  {toSentenceCase(item.label)}
                </p>
                <p className="fnt-lexend text-[length:var(--text-18-sm)] font-normal leading-[1.444444444444444] text-[#a3a3a3] pt-1 md:pt-2">
                  {toSentenceCase(item.description || "")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeWork;
