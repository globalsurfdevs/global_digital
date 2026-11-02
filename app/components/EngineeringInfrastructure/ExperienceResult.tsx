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
      accent: string;
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
          className="title-60 mb-8 text-[length:var(--text-60-sm)] xl:mb-12"
        >
          {data.title}
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xxl:gap-8">
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
              <div
                className={`px-6 py-4 lg:px-10 lg:py-8 xl:px-6 xl:py-5 3xl:px-[50px] 3xl:pb-[50px] 3xl:pt-[37px]  ${item.accent === "primary" ? "bg-primary" : "bg-[#424242]"}`}
              >
                <p
                  className={`text-30 mb-2 font-normal leading-[1.666666666666667] xl:mb-[8px]`}
                >
                  {item.topTitle}
                </p>

                <h3 className="text-65 mb-2 font-light leading-[1] xl:mb-[28px]">
                  {item.stat}
                </h3>

                <p
                  className={`text-19 xxl:text-25 font-normal leading-[1.268] ${lexend.className}`}
                >
                  {item.statLabel}
                </p>
              </div>

              {/* Bottom */}
              <div className="flex min-h-[220px] flex-col pb-8 pl-6 pr-6 pt-4 lg:pb-10 lg:pl-10 lg:pr-10 lg:pt-10 xxl:pb-[60px] xxl:pl-[50px] xxl:pr-[62.66px] xxl:pt-[32.34px] 3xl:min-h-[344.28px]">
                <h3 className="text-30 mb-[20px] font-normal leading-[1.333333333333333] ">
                  {" "}
                  {item.title}{" "}
                </h3>
                <p
                  className={`text-19 leading-[1.478947368421053]  ${lexend.className}`}
                >
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
