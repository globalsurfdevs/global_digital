"use client";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";

type RoadmapItem = {
    _id: string;
    badge: string;
    description: string;
    highlighted?: boolean;
};

type Props = {
    title: string;
    items: RoadmapItem[];
};

const ExecutionRoadmap = ({ data }: { data: Props }) => {
    return (
        <section className="pb-16 md:pb-20 xl:pb-[120px] bg-white text-black overflow-hidden">
            <div className="container">
                <motion.h2
                    initial="hidden"
                    whileInView="show"
                    variants={moveUp(0)}
                    viewport={{ once: true }}
                    className="title-60"
                >
                    {data.title}
                </motion.h2>

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-5 lg:gap-0 lg:overflow-hidden">
                    {data.items.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial="hidden"
                            whileInView="show"
                            variants={moveUp(index * 0.08)}
                            viewport={{ once: true }}
                            className="group flex flex-col gap-4 border border-black/10 px-[26px] pt-[20px] pb-[40px] rounded-[15px] lg:border lg:border-black/10 bg-white transition-colors duration-300 hover:bg-[#E53E31]/15"
                        >
                            <span
                                className="inline-flex w-fit items-center rounded-full border border-primary px-[15px] py-[10px] text-18 uppercase text-muted transition-colors duration-300 group-hover:bg-primary group-hover:!text-white"
                            >
                                {item.badge}
                            </span>
                            <h4 className="text-28 leading-snug text-black mt-[68px]">
                                {item.description}
                            </h4>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExecutionRoadmap;
