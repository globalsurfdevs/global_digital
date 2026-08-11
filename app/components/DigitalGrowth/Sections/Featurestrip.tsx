"use client";

import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";

const FeatureStrip = ({ data }: any) => {
    return (
        <section className="bg-black py-[40px]">
            <motion.div
                variants={moveUp(0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="container "
            >
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0 xl:divide-x xl:divide-white/15">
                    {data?.items?.map((item: any, index: number) => (
                        <motion.div
                            key={item._id || index}
                            variants={moveUp(0.1 * index)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="flex flex-col gap-4 xl:px-[90px] xl:first:pl-0 xl:last:pr-0"
                        >
                            <span className="flex h-[60px] w-[60px] items-center justify-center rounded-[7px] border border-primary/30 bg-primary/20">
                                <img
                                    src={item.icon?.src || item.icon}
                                    alt=""
                                    className="h-[40px] w-[40px]"
                                />
                            </span>

                            <p className="text-18 uppercase leading-[26px] text-white">
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default FeatureStrip;