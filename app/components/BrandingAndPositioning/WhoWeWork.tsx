"use client";

import { toSentenceCase } from "@/app/helpers/maintainProperWordings";
import { moveUp } from "../animations/motionVariants";
import { motion } from "framer-motion";
import Image from "next/image";

interface WhoWeWorkData {
    tag: string;
    title: string;
    items: {
        id: number;
        label: string;
        icon: string;
    }[];
}

export const data: WhoWeWorkData = {
    tag: "Who we work",
    title: "Who we work with in manufacturing",
    items: [
        {
            id: 1,
            label: "UAE residential and commercial property developers",
            icon: "/images/industry/who_we_work_1.svg",
        },
        {
            id: 2,
            label: "Off-plan developers launching new projects",
            icon: "/images/industry/who_we_work_2.svg",
        },
        {
            id: 3,
            label: "Master developers managing phased developments",
            icon: "/images/industry/who_we_work_3.svg",
        },
        {
            id: 4,
            label: "Real estate groups attracting global investors",
            icon: "/images/industry/who_we_work_4.svg",
        },
        {
            id: 5,
            label: "Mixed-use developers promoting integrated projects",
            icon: "/images/industry/who_we_work_5.svg",
        },
    ],
};

const WhoWeWork = () => {
    return (
        <section className="py-120">
            <div className="container">
                <div className="mb-8 flex items-center gap-3 md:mb-10 xl:mb-12">
                    <motion.h3
                        initial="hidden"
                        whileInView="show"
                        variants={moveUp(0)}
                        viewport={{ once: true }}
                        className="text-28 uppercase leading-[1] tracking-[-0.025em] text-muted"
                    >
                        {data.tag}
                    </motion.h3>
                    <div className="h-5 w-5 bg-primary"></div>
                </div>

                <motion.h2
                    initial="hidden"
                    whileInView="show"
                    variants={moveUp(0)}
                    viewport={{ once: true }}
                    className="title-60 mb-8 max-w-[20ch] tracking-[-0.025em] md:mb-10 xl:mb-14"
                    dangerouslySetInnerHTML={{ __html: data.title }}
                />

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {data.items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial="hidden"
                            whileInView="show"
                            variants={moveUp(index * 0.1)}
                            viewport={{ once: true }}
                        >
                            <div className="mb-4 h-[80px] w-[80px] rounded-lg border border-primary/30 p-3">
                                <div className="relative h-full w-full">
                                    <Image src={item.icon} alt={item.label} fill className="object-contain" />
                                </div>
                            </div>
                            <div className="border-t border-black/20 pt-3">
                                <p className="text-14 md:text-28 fnt-lexend leading-[1.444444444444444] text-[#77787B]">
                                    {toSentenceCase(item.label)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhoWeWork;