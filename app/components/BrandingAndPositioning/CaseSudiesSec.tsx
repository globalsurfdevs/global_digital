"use client"

import Image from "next/image";
import Link from "next/link";
import { caseStudiesData } from "@/app/data/services/branding-and-positioning-agency-in-dubai/data";
import { motion } from "framer-motion";
import { moveUp } from "../animations/motionVariants";

interface CaseSudiesSecProps {
  data: typeof caseStudiesData;
}

const CaseSudiesSec = ({ data }: CaseSudiesSecProps) => {
  return (
    <section className="pb-8 pt-12 xl:pb-12 xl:pt-20 xxl:pb-[120px] xxl:pt-[160px]">
      <div className="container">
        {/* Heading */}
        <div className="mb-8 xl:mb-12 xxl:mb-60">
          <div className="mb-4 flex items-center gap-2 xl:mb-8 xxl:mb-60">
            <motion.h3
              initial="hidden"
              whileInView="show"
              variants={moveUp(0)}
              viewport={{ once: true }}
              className="text-28 uppercase leading-[1] tracking-[-0.025em] text-muted"
            >
              {data.tag}
            </motion.h3>
            <div className="h-5 w-5 bg-primary" />
          </div>

          <motion.h2
            initial="hidden"
            whileInView="show"
            variants={moveUp(0.1)}
            viewport={{ once: true }}
            className="title-60 tracking-[-0.025em]">{data.title}</motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
          {data.items.map((item, index) => (
            <motion.div
              initial="hidden"
              key={item.id}
              whileInView="show"
              variants={moveUp(index * 0.1)}
              viewport={{ once: true }}
            >
              <Link
                href={item.href}
                className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top */}
                {/* <div className="bg-white pt-5 xl:pt-8 xxl:pt-[41px] pl-5 xl:pl-8 xxl:pl-[41px] 3xl:pl-[49px] pr-5 xl:pr-8 xxl:pr-[41px] 3xl:pr-[65px] min-h-[160px] xxl:min-h-[220px] flex flex-col border border-[#00000033] rounded-[10px]"> */}
                <div className="flex flex-col rounded-[10px] border border-[#00000033] bg-white pl-5 pr-5 pt-5 pb-5 xl:pl-8 xl:pr-8 xl:pt-8 xl:pb-8 xxl:pl-[41px] xxl:pr-[41px] xxl:pt-[41px] xxl:pb-[41px] 3xl:pl-[49px] 3xl:pr-[65px] 3xl:pb-[84px]">
                  <h3 className="text-28 mb-8 leading-[1] xl:mb-10">
                    {item.client}
                  </h3>
                  {/* <Image src={item.logo} alt={item.client} width={200} height={60} className="h-auto w-auto object-contain 3xl:h-[34.59px] max-w-[160px]" /> */}
                </div>
                {/* Bottom */}
                <div className="flex-1 rounded-[10px] bg-[#1F1F1F] p-8 text-white xl:p-12 3xl:pl-[49px] 3xl:pr-[65px] 3xl:pt-[62px]">
                  <h3 className="text-30 mb-6 leading-tight transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="text-description !text-18 leading-[1.444444444444444] text-white">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseSudiesSec;
