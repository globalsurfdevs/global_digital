"use client";

import { toSentenceCase } from "@/app/helpers/maintainProperWordings";
import { moveUp } from "../animations/motionVariants";
import { motion } from "framer-motion";

interface WhyChooseData {
  tag: string;
  title: string;
  description: string;
  items: {
    id: number;
    value: string;
    label: string;
  }[];

}

const WhyChoose = ({ data,page }: { data: WhyChooseData; page?: string }) => {
  return (
    <section className="py-120 bg-[#f6f6f6]">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:gap-4 lg:grid-cols-[2fr_1fr] 3xl:grid-cols-[931px_520px] 3xl:gap-[169px]">
          <div>
            <div className="mb-4 xl:mb-8 xxl:mb-[70px]">
              <div className="mb-4 flex items-center gap-3 md:mb-6 xl:mb-8 xxl:mb-12">
                <motion.h3
                  initial="hidden"
                  whileInView="show"
                  variants={moveUp(0)}
                  viewport={{ once: true }}
                  className={`${page === "service" ? "text-18" : "text-30"} uppercase leading-[1] tracking-[-0.025em] text-muted`}
                >
                  {data.tag}
                </motion.h3>
                <div className={`${page === "service" ? "h-4 w-4" : "h-5 w-5"} bg-primary`}></div>
              </div>
              <motion.h2
                initial="hidden"
                whileInView="show"
                variants={moveUp(0)}
                viewport={{ once: true }}
                className="title-60 tracking-[-0.025em]"
                dangerouslySetInnerHTML={{ __html: data.title }}
              />
            </div>
            <motion.p
              initial="hidden"
              whileInView="show"
              variants={moveUp(0)}
              viewport={{ once: true }}
              className="text-14 md:text-16 xl:text-18 xxl:text-20 fnt-lexend leading-[1.444444444444444] text-[#77787B] max-w-[60ch]"
              dangerouslySetInnerHTML={{ __html: toSentenceCase(data.description) }}
            >
              {/* {toSentenceCase(data.description)} */}
            </motion.p>
          </div>
          <div>
            {data.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="show"
                variants={moveUp(index * 0.1)}
                viewport={{ once: true }}
                className="mb-4 border-b border-black/20 pb-4 lg:mb-6 lg:pb-6 xl:mb-8 xl:pb-10 xxl:mb-10 2xl:pb-[46px] 3xl:mb-[46px] last:mb-0 last:border-0"
              >
                <h3 className="text-60 mb-3 font-normal leading-none tracking-[-0.025em] text-primary">
                  {item.value}
                </h3>
                <p className="text-18 tracking-[0.03em] font-lexend font-semibold uppercase leading-[1.444444444444444]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
