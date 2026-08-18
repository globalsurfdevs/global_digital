"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";

type Sector = {
    title: string;
    description: string;
    image: string;
    link: string;
};

const ArrowIcon = ({ active }: { active: boolean }) => (
    <Image
        src="/images/industry_new/arrow.svg"
        alt=""
        width={20}
        height={20}
        className={`transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
            active ? "grayscale-0" : "grayscale group-hover:grayscale-0"
        }`}
    />
);

function SectorCard({
    sector,
    delay,
    active,
    onHover,
    onLeave,
}: {
    sector: Sector;
    delay: number;
    active: boolean;
    onHover: () => void;
    onLeave: () => void;
}) {
    return (
        <motion.div
            variants={moveUp(delay)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className="h-full overflow-hidden rounded-[10px]"
        >
            <Link href={sector.link} className="group flex h-full flex-col bg-[#F6F6F6]">
                <div className="relative h-[268px] w-full shrink-0 overflow-hidden rounded-b-[10px]">
                    <Image
                        src={sector.image}
                        alt={sector.title}
                        fill
                        className={`object-cover transition-all duration-500 ${
                            active ? "" : "grayscale"
                        } group-hover:grayscale-0`}
                    />
                </div>
                <div
                    className={`flex flex-1 flex-col p-6 md:pt-[30px] md:pb-[59px]  md:px-[30px] transition-colors duration-300 ${
                        active ? "bg-primary/[0.06]" : "bg-[#F6F6F6] group-hover:bg-primary/[0.06]"
                    }`}
                >
                    <h3
                        className={`text-28 mb-[20px] transition-colors duration-300 ${
                            active ? "text-primary" : "text-black group-hover:text-primary"
                        }`}
                    >
                        {sector.title}
                    </h3>
                    <p className="fnt-lexend text-18 leading-[1.5] text-muted">
                        {sector.description}
                    </p>
                    <span className="mt-[30px] inline-block">
                        <ArrowIcon active={active} />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}

const SectorsWeWorkWith = ({ data }: any) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

    return (
        <section className="container">
            <hr className="border-black/10" />
            <div className="py-16 md:py-20 xl:py-[120px]">
            <motion.div
                variants={moveUp(0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mb-4 flex items-center gap-3 md:mb-6 xl:mb-8 xxl:mb-12"
            >
                <h3 className="text-18 uppercase leading-[1] tracking-[-0.025em] text-muted">
                    {data?.title ?? "Sectors we work with"}
                </h3>
                <div className="h-4 w-4 bg-primary" />
            </motion.div>

            <motion.h2
                variants={moveUp(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="title-60 text-[length:var(--text-60-sm)] mb-4 md:mb-[40px] max-w-[20ch]"
            >
                {data?.subTitle ?? "The sectors we know."}
            </motion.h2>

            <motion.p
                variants={moveUp(0.15)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="fnt-lexend max-w-[46ch] text-14 leading-[1.444444444444444] text-muted mb-4 md:mb-[60px]"
            >
                {data?.description ??
                    "Our work spans multiple industries, each with distinct market dynamics and decision processes."}
            </motion.p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
                {data?.items?.slice(0, data?.items.length-1).map((sector: any, i: number) => (
                    <SectorCard
                        key={sector.title}
                        sector={sector}
                        delay={0.05 * i}
                        active={hoveredIndex === i}
                        onHover={() => setHoveredIndex(i)}
                        onLeave={() => setHoveredIndex(null)}
                    />
                ))}

                <SectorCard
                    sector={data?.items[data?.items.length - 1]}
                    delay={0.05 * (data?.items.length - 1)}
                    active={hoveredIndex === data?.items.length - 1}
                    onHover={() => setHoveredIndex(data?.items.length - 1)}
                    onLeave={() => setHoveredIndex(null)}
                />

                <motion.div
                    variants={moveUp(0.05 * 7)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex h-full flex-col rounded-[10px] border border-black/10 p-8 sm:col-span-2 md:py-[63px] md:px-[60px] space-y-[50px] md:space-y-[100px]"
                >
                    <h3 className="title-60 text-[length:var(--text-60-sm)]">
                        Seven Sectors One Agency
                    </h3>
                    <p className="max-w-[42ch] text-28 leading-[1.214285714285714]">
                        We combine strategy, creativity, technology, and
                        performance-driven marketing to build brands that
                        grow with clarity and consistency.
                    </p>
                </motion.div>
            </div>
            </div>
        </section>
    );
};

export default SectorsWeWorkWith;