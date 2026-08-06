"use client"
import { motion } from "framer-motion";
import { moveUp } from "../animations/motionVariants";

import { ServiceItem } from "@/app/(user)/engineering-and-infrastructure/type";
import Image from "next/image";

const IndustriesSec = ({ data }: { data: ServiceItem["industries"] }) => {
  return (
    <section className="py-120 bg-[#f6f6f6]">
      <div className="container">
        <div className="mb-4 xl:mb-8 xxl:mb-[42px]">
          <div className="mb-4 flex items-center gap-3 md:mb-3 xl:mb-4 xxl:mb-[28px]">
            <motion.h3
              initial="hidden"
              whileInView="show"
              variants={moveUp(0)}
              viewport={{ once: true }}
              className="text-28 uppercase leading-[1] tracking-[-0.025em] text-muted"
            >
              {data.subTitle}
            </motion.h3>
            <div className="h-5 w-5 bg-primary"></div>
          </div>
          <motion.h2
            initial="hidden"
            whileInView="show"
            variants={moveUp(0)}
            viewport={{ once: true }}
            className="title-60 tracking-[-0.025em] max-w-[25ch]"
            dangerouslySetInnerHTML={{ __html: data.title }}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 xl:gap-[30px] md:grid-cols-2 xl:grid-cols-3">
          {data.items.map((item, index) => (
            <motion.a
              key={item._id}
              href={`/${item.slug}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={moveUp(index * 0.08)}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group flex items-stretch overflow-hidden"
            >
              {/* Icon */}
              <div className="flex h-full w-[64px] xl:w-[90px] xl:min-h-[90px] shrink-0 items-center justify-center rounded-[7px] border border-[#E63E311F] bg-primary/5">
                <Image src={item.icon} alt={item.iconAlt} width={40} height={40} className="h-8 w-auto xl:h-10 object-contain" />
              </div>

              {/* Title */}
              <div className={`flex flex-1 items-center justify-between px-3 py-[10px] 3xl:pl-[26px] 3xl:pr-[35px] border border-primary/10 rounded-[7px] bg-transparent hover:bg-primary/15`}>
                <h3 className="text-28 leading-[1.214285714285714] tracking-[-0.025em]" dangerouslySetInnerHTML={{ __html: item.title }}></h3>
                <Image
                  src="/assets/icons/engineering-and-infrastructure/top-right-arrow-thick-primary.svg"
                  alt="arrow-right"
                  width={22}
                  height={22}
                  className="translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSec;