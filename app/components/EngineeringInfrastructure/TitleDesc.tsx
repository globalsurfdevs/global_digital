"use client";
import { motion } from "framer-motion";
import { moveUp } from "../animations/motionVariants";
import { toSentenceCase } from "@/app/helpers/maintainProperWordings";

const TitleDesc = ({ data }: any) => {
  return (
    <section className="container">
      <motion.div
        variants={moveUp(0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-120"
      >
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> */}
        <div className="mb-4 flex items-center gap-3 md:mb-3 xl:mb-4 xxl:mb-5 3xl:mb-[30px]">
          <motion.p
            variants={moveUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-18 uppercase leading-[1.5] text-muted"
          >
            {data.title}
          </motion.p>
          <div className="h-4 w-4 bg-primary"></div>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]  lg:gap-20 2xl:grid-cols-2 2xl:gap-8 3xl:grid-cols-[792px_auto] 3xl:gap-[139px]">
          <div>
            <motion.div
              variants={moveUp(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h2
                className="title-60 text-[length:var(--text-60-sm)]"
                dangerouslySetInnerHTML={{ __html: data.subTitle }}
              ></h2>
            </motion.div>
          </div>
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {data.description.split("\n").map((line: string, index: number) => (
              <div
                key={index}
                className="fnt-lexend fnt-lexend text-[length:var(--text-18-sm)] font-[400] leading-[1.444444444444444] text-muted
             3xl:max-w-[745px] 3xl:pr-[2px] [&_p]:mb-3 last:[&_p]:mb-0 xl:[&_p]:mb-[25px]"
                dangerouslySetInnerHTML={{
                  __html: toSentenceCase(
                    line +
                      (index !== data.description.split("\n").length - 1
                        ? "</br>"
                        : ""),
                  ),
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TitleDesc;
