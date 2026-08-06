"use client";

import { Lexend } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface SuccessStoriesProps {
  data: {
    title: string;
    items: {
      id: string;
      topTitle: string;
      stat: string;
      statLabel: string;
      title: string;
      description: string;
      logo: string;
      image: string;
      slug: string;
      accent: "primary" | "dark";
    }[];
  };
}

const ExperienceResult = ({ data }: SuccessStoriesProps) => {
  return (
    <section className="py-120">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="title-60 mb-8 xl:mb-12"
        >
          {data.title}
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 xxl:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {data.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} 
              transition={{
                delay: index * 0.12,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1], 
              }}
              whileHover={{
                y: -10,
                transition: {
                  duration: 0.25,
                  ease: "easeOut",
                },
              }}
              className="group relative overflow-hidden bg-black text-white" 
            >
              {/* Top */}
              <div className={`py-4 px-6 xl:px-6 lg:px-10 lg:py-8 xl:py-5 3xl:px-[50px] 3xl:pt-[37px] 3xl:pb-[50px]  ${item.accent === "primary" ? "bg-primary" : "bg-[#424242]" }`} >
                <p className={`mb-2 xl:mb-[8px] text-30 font-normal leading-[1.666666666666667]`} >
                  {item.topTitle}
                </p>

                <h3 className="mb-2 xl:mb-[28px] text-65 leading-[1] font-light">
                  {item.stat}
                </h3>

                <p className={`text-19 xxl:text-25 font-normal leading-[1.268] ${lexend.className}`}>
                  {item.statLabel}
                </p>
              </div>

              {/* Bottom */}
              <div className="flex min-h-[220px] flex-col pl-6 pr-6 pt-4 pb-8 lg:pl-10 lg:pr-10 lg:pt-10 lg:pb-10 xxl:pt-[32.34px] xxl:pl-[50px] xxl:pr-[62.66px] xxl:pb-[60px] 3xl:min-h-[344.28px]">
                <h3 className="mb-[20px] text-30 font-normal leading-[1.333333333333333] "> {item.title} </h3>
                <p className={`text-19 leading-[1.478947368421053]  ${lexend.className}`} >
                  {item.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceResult;