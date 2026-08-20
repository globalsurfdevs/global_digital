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
        className="py-120 border-b border-[#00000033]"
      >
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xxl:gap-[80px] 3xl:grid-cols-[auto_745px]">
          <motion.div
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2
              className="title-60  text-[length:var(--text-60-sm)] max-w-[18ch]"
              dangerouslySetInnerHTML={{ __html: data.title }}
            ></h2>
          </motion.div>
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p
              className="fnt-lexend text-[length:var(--text-18-sm)] leading-[1.444444444444444] text-muted 3xl:max-w-[745px]"
              dangerouslySetInnerHTML={{ __html: data.description }}
            >
              {/* {data.description} */}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TitleDesc;
