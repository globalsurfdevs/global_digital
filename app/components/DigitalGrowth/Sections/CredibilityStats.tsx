"use client";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";
import Image from "next/image";

type StatItem = {
    _id: string;
    value: string;
    label: string;
};

type Props = {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    stats: StatItem[];
};

const CredibilityStats = ({ data }: { data: Props }) => {
    return (
        <section className="py-16 md:py-20 xl:py-120 bg-black text-white overflow-hidden">
            <div className="container">
                <div className="flex flex-col gap-10 lg:flex-row lg:gap-20 xl:gap-32">
                    {/* Left */}
                    <div className="col-span-2">
                        <motion.h2
                            initial="hidden"
                            whileInView="show"
                            variants={moveUp(0)}
                            viewport={{ once: true }}
                            className="text-32 sm:text-40 xl:title-60 leading-[1.1]"
                        >
                            {data.title}
                        </motion.h2>
                        <motion.p
                            initial="hidden"
                            whileInView="show"
                            variants={moveUp(0.1)}
                            viewport={{ once: true }}
                            className="mt-4 text-16 text-white/70 md:mt-5"
                        >
                            {data.description}
                        </motion.p>
                        <motion.a
                            href={data.buttonLink}
                            initial="hidden"
                            whileInView="show"
                            variants={moveUp(0.2)}
                            viewport={{ once: true }}
                            className="group mt-6 inline-flex items-center gap-3 rounded-full border border-primary/50 py-2.5 pl-5 pr-2.5 text-11 uppercase tracking-wide transition-colors duration-300 hover:border-primary md:mt-8"
                        >
                            {data.buttonText}
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                <Image
                                    src="/assets/icons/engineering-and-infrastructure/top-right-arrow-thick-primary.svg"
                                    alt="arrow-right"
                                    width={12}
                                    height={12}
                                    className="invert"
                                />
                            </span>
                        </motion.a>
                    </div>

                    {/* Right - Stats grid */}
                    <div className="col-span-3">
                        <div className="grid grid-cols-2 gap-x-8">
                            {data.stats.map((stat, index) => (
                                <motion.div
                                    key={stat._id}
                                    initial="hidden"
                                    whileInView="show"
                                    variants={moveUp(index * 0.08)}
                                    viewport={{ once: true }}
                                    className={`pb-6 ${index < data.stats.length - 2
                                            ? "border-b border-white/10"
                                            : ""
                                        }`}
                                >
                                    <span className="block text-[40px] sm:text-[52px] xl:text-[64px] leading-none text-primary">
                                        {stat.value}
                                    </span>
                                    <p className="mt-2 text-11 uppercase tracking-wide text-white/70 xl:text-12">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CredibilityStats;