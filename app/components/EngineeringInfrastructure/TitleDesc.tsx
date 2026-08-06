"use client";
import { motion } from "framer-motion";
import { moveUp } from "../animations/motionVariants";

const TitleDesc = ({ data }: any) => {
  return (
    <section className="container">
      <motion.div variants={moveUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="py-120" >
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> */}
            <div className="mb-4 flex items-center gap-3 md:mb-3 xl:mb-4 xxl:mb-5 3xl:mb-[30px]">
              <motion.h3
                variants={moveUp(0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-28 leading-[1.5] text-muted uppercase"
              >
                {data.title}
              </motion.h3>
              <div className="h-5 w-5 bg-primary"></div>
            </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]  3xl:grid-cols-[792px_auto] lg:gap-20 2xl:grid-cols-2 2xl:gap-8 3xl:gap-[139px]">
          <div>
            <motion.div variants={moveUp(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }} >
              <h2 className="title-60" dangerouslySetInnerHTML={{ __html: data.subTitle }} ></h2>
            </motion.div>
          </div>
          <motion.div variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }} >
            <div className="text-18 [&_p]:mb-3 xl:[&_p]:mb-[25px] last:[&_p]:mb-0 fnt-lexend leading-[1.444444444444444]
             text-muted 3xl:max-w-[745px] 3xl:pr-[2px] fnt-lexend font-medium" dangerouslySetInnerHTML={{ __html: data.description }} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TitleDesc;
