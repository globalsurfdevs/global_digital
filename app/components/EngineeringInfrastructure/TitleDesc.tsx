"use client";
import { motion } from "framer-motion";
import { moveUp } from "../animations/motionVariants";

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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[auto_minmax(0,1.2fr)] lg:gap-20 2xl:grid-cols-2 2xl:gap-8">
          <motion.div
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2
              className="title-60"
              dangerouslySetInnerHTML={{ __html: data.title }}
            ></h2>
          </motion.div>
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-18 fnt-lexend leading-[1.444444444444444] text-muted 3xl:max-w-[745px]">
              {data.description}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TitleDesc;
