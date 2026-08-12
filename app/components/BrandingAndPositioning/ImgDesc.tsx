"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../animations/motionVariants";
import { toSentenceCase } from "@/app/helpers/maintainProperWordings";

const ImgDesc = ({ data }: any) => {
  return (
    <section className="py-8 xl:py-20 3xl:py-[100px]">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 xxl:gap-[80px] 3xl:grid-cols-[auto_745px]">
          <motion.div
            variants={moveUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Image
              src={data.image}
              alt={data.imageAlt}
              width={1500}
              height={1500}
              className="h-full max-h-[600px] w-full object-cover"
            />
          </motion.div>
          <motion.div
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center gap-3 md:mb-6 xl:mb-8 xxl:mb-12">
              <h2 className="text-18 uppercase leading-[1] tracking-[-0.025em] text-muted">
                {data.title}
              </h2>
              <div className="h-4 w-4 bg-primary"></div>
            </div>
            <h2 className="title-60 text-[length:var(--text-60-sm)] mb-4 tracking-[-0.025em] md:mb-5 xl:mb-[40px]">
              {data.subTitle}
            </h2>
            <p className="text-[length:var(--text-18-sm)] text-77787B fnt-lexend leading-[1.444444444444444]">
              {toSentenceCase(data.description)}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImgDesc;
