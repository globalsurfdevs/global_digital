"use client"

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

const WhyChoose = ({ data }: { data: WhyChooseData }) => {
  return (
    <section className="py-120 bg-[#f6f6f6]">
      <div className="container">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr] 3xl:grid-cols-[931px_520px] 3xl:gap-[169px]">
          <div>
            <div className="mb-4 xl:mb-8 xxl:mb-12">
              <div className="mb-4 flex items-center gap-2 md:mb-6 xl:mb-8 xxl:mb-12">
                <motion.h3
                  initial="hidden"
                  whileInView="show"
                  variants={moveUp(0)}
                  viewport={{ once: true }}
                  className="text-28 uppercase leading-[1] tracking-[-0.025em] text-muted"
                >
                  {data.tag}
                </motion.h3>
                <div className="h-5 w-5 bg-primary"></div>
              </div>
              <motion.h2
                initial="hidden"
                whileInView="show"
                variants={moveUp(0)}
                viewport={{ once: true }}
                className="title-60 tracking-[-0.025em]"> {data.title} </motion.h2>
            </div>
            <motion.p
              initial="hidden"
              whileInView="show"
              variants={moveUp(0)}
              viewport={{ once: true }}
              className="text-18 max-w-[58ch] text-muted">
              {data.description}
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
                className="mb-4 border-b border-black/20 pb-4 lg:mb-6 lg:pb-6 xl:mb-8 xl:pb-10 xxl:mb-10 2xl:pb-[46px] 3xl:mb-[46px]"
              >
                <h3 className="text-60 mb-3 font-normal leading-none tracking-[-0.025em] text-primary">
                  {item.value}
                </h3>
                <p className="text-18 font-lexend font-semibold uppercase leading-[1.444444444444444]">
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
