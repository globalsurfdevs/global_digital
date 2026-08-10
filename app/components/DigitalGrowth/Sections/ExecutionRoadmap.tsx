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
        <section className="py-16 md:py-20 xl:py-120 bg-white text-black overflow-hidden">
            <div className="container">
                <motion.h2
                    initial="hidden"
                    whileInView="show"
                    variants={moveUp(0)}
                    viewport={{ once: true }}
                    className="text-32 sm:text-40 xl:title-60 leading-[1.1] tracking-[-0.025em]"
                >
                    {data.title}
                </motion.h2>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:rounded-2xl lg:border lg:border-black/10 lg:overflow-hidden">
                    {data.items.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial="hidden"
                            whileInView="show"
                            variants={moveUp(index * 0.08)}
                            viewport={{ once: true }}
                            className={`flex flex-col gap-4 rounded-2xl border border-black/10 p-6 lg:rounded-none lg:border-y-0 lg:border-l-0 lg:first:border-l lg:border-r ${item.highlighted
                                    ? "bg-primary/10"
                                    : "bg-white"
                                }`}
                        >
                            <span
                                className={`inline-flex w-fit items-center rounded-full border px-3.5 py-1 text-11 uppercase tracking-wide ${item.highlighted
                                        ? "border-primary bg-primary text-white"
                                        : "border-black/20 text-black/70"
                                    }`}
                            >
                                {item.badge}
                            </span>
                            <p className="text-16 leading-snug text-black">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExecutionRoadmap;