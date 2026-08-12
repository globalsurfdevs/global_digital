"use client";
import Image from "next/image";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";
import { Check, X } from "lucide-react";
import { assets } from "@/public/assets/assets";

type Cell = boolean; // true = included (check), false = not included (dot)

type Row = {
    label: string;
    growth: Cell;
    plus: Cell;
};

const rows: Row[] = [
    { label: "All 14 services", growth: true, plus: true },
    { label: "Signed baseline in week two", growth: true, plus: true },
    { label: "Six reported numbers", growth: true, plus: true },
    { label: "Six reported numbers", growth: true, plus: true },
    { label: "Monthly report and senior call", growth: true, plus: true },
    { label: "Quarterly deep review", growth: true, plus: true },
    { label: "LinkedIn posts for one leader", growth: true, plus: true },
    { label: "Several companies, brands or countries", growth: false, plus: true },
    { label: "More content and more site visits", growth: false, plus: true },
    { label: "Posts for several leaders", growth: false, plus: true },
    { label: "Tender and bid content", growth: false, plus: true },
    { label: "Named senior contact, priority turnaround", growth: false, plus: true },
];

const infoCards = [
    {
        icon: assets.gurantee,
        title: "The guarantee",
        description:
            "If targets are substantially missed on our side, you get a term extension at no fee, or a documented scope reset. Not a discount. Accountability.",
    },
    {
        icon: assets.capacity2,
        title: "Capacity is capped",
        description:
            "We intentionally hold a limited number of built environment partners. Senior attention doesn't scale post a certain point, so we don't pretend it does.",
    },
];

const ArrowIcon = ({ clipId }: { clipId: string }) => (
    <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:scale-105"
    >
        <g clipPath={`url(#${clipId})`}>
            <path
                d="M8.88346 1.26172L1.13281 8.8624"
                stroke="white"
                strokeWidth="2"
                strokeMiterlimit="10"
            />
            <path
                d="M1.13281 1.26172H8.88346V8.71245"
                stroke="white"
                strokeWidth="2"
                strokeMiterlimit="10"
            />
        </g>
        <defs>
            <clipPath id={clipId}>
                <rect width="10" height="10" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

const Mark = ({ included }: { included: boolean }) => (
    <div className="flex justify-center">
        {included ? (
            <span className="flex h-4 w-4 shrink-0 items-center justify-center bg-red-600">
                <Check size={10} strokeWidth={3} className="text-white" />
            </span>
        ) : (
            <span className="flex h-4 w-4 shrink-0 items-center justify-center bg-[#77787B]/20">
                <X size={14} strokeWidth={2} className="text-black/25" />
            </span>
        )}
    </div>
);

type Props = {
    title: string;
    description: string;
};

const PricingComparison = ({ data }: { data: Props }) => {
    return (
        <section className="bg-white py-16 text-black md:py-20 xl:py-[120px]">
            <div className="container">
                {/* Header */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end md:justify-between">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={moveUp(0)}
                        viewport={{ once: true }}
                        className="md:max-w-[831px]"
                    >
                        <h2 className="title-60">{data.title}</h2>
                        <p className="mt-6 text-16 leading-[1.6] text-muted md:mt-[40px] md:text-18">
                            {data.description}
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={moveUp(0.1)}
                        viewport={{ once: true }}
                        className="flex flex-col gap-3 lg:shrink-0 lg:flex-row lg:items-center"
                    >
                        <button
                            type="button"
                            className="group flex items-center justify-center space-x-2 rounded-full border border-primary px-6 py-2 text-black transition duration-300 ease-in hover:shadow-lg"
                        >
                            <span className="fnt-lexend text-14 uppercase duration-300 ease-in md:text-16">
                                Book your 20-minute call
                            </span>
                            <div className="bg-primary p-1">
                                <ArrowIcon clipId="clip-book-call" />
                            </div>
                        </button>

                        <button
                            type="button"
                            className="group flex items-center justify-center space-x-2 rounded-full border border-primary px-6 py-2 text-black transition duration-300 ease-in hover:shadow-lg"
                        >
                            <span className="fnt-lexend text-14 uppercase duration-300 ease-in md:text-16">
                                Talk to sales
                            </span>
                            <div className="bg-primary p-1">
                                <ArrowIcon clipId="clip-talk-sales" />
                            </div>
                        </button>
                    </motion.div>
                </div>

                {/* Table */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    variants={moveUp(0.15)}
                    viewport={{ once: true }}
                    className="mt-10 overflow-hidden rounded-2xl border border-black/10"
                >
                    <div className="relative w-full">
                        {/* Red overlay wash over the middle column only — matches column widths at each breakpoint */}
                        <div
                            className="pointer-events-none absolute inset-y-0 z-10 bg-[#E53E31]/[0.02]
                left-[46%] w-[27%]
                md:left-[43%] md:w-[29%]
                lg:left-[45%] lg:w-[28%]
                xl:left-[45.5%] xl:w-[24.5%]"
                        />

                        <div
                            className="grid
                grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)]
                md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]
                lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]
                xl:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)_minmax(0,1.1fr)]"
                        >
                            {/* Column headers */}
                            <div className="flex items-end bg-[#F6F6F6] px-3 py-4 sm:px-6 sm:py-5 md:px-[80px]">
                                <span className="text-12 uppercase text-muted sm:text-16 md:text-18">
                                    What you get
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-1 bg-[#F6F6F6] px-2 py-4 text-center sm:gap-1.5 sm:px-4 sm:py-5">
                                <span className="text-[10px] uppercase text-muted sm:text-14 md:text-18">
                                    Where most firms start
                                </span>
                                <span className="rounded-full border border-primary px-2 py-0.5  text-primary sm:px-3 sm:py-1 text-[13px] md:text-28 leading-normal md:leading-[34px]">
                                    Growth Partnership
                                </span>
                                <span className="text-[10px] uppercase text-muted sm:text-14 md:text-18">
                                    From AED 10,000/mo
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-1 bg-[#F6F6F6] px-2 py-4 text-center sm:gap-1.5 sm:px-4 sm:py-5">
                                <span className="text-[10px] uppercase text-muted sm:text-14 md:text-18">
                                    Go wider
                                </span>
                                <span className="rounded-full border border-primary px-2 py-0.5  text-primary sm:px-3 sm:py-1 text-[13px] md:text-28 leading-[34px]">
                                    Plus
                                </span>
                                <span className="text-[10px] uppercase text-muted sm:text-14 md:text-18">
                                    Custom price
                                </span>
                            </div>

                            {/* Rows */}
                            {rows.map((row, i) => (
                                <Fragment key={i}>
                                    <div
                                        className={`flex items-center px-3 py-4 text-13 text-black sm:px-6 sm:py-6 sm:text-14 md:px-[80px] md:py-[30px] md:text-18 ${i % 2 === 1 ? "bg-[#F6F6F6]" : "bg-white"
                                            }`}
                                    >
                                        {row.label}
                                    </div>
                                    <div
                                        className={`flex items-center justify-center px-2 py-4 sm:px-4 sm:py-6 md:py-[30px] ${i % 2 === 1 ? "bg-[#F6F6F6]" : "bg-white"
                                            }`}
                                    >
                                        <Mark included={row.growth} />
                                    </div>
                                    <div
                                        className={`flex items-center justify-center px-2 py-4 sm:px-4 sm:py-6 md:py-[30px] ${i % 2 === 1 ? "bg-[#F6F6F6]" : "bg-white"
                                            }`}
                                    >
                                        <Mark included={row.plus} />
                                    </div>
                                </Fragment>
                            ))}

                            {/* Footer row */}
                            <div className="flex items-center px-3 py-4 text-13 leading-[1.5] text-muted fnt-lexend sm:px-6 sm:text-14 md:px-[80px] md:py-[30px] md:text-18 md:leading-[26px]">
                                Term and billing
                            </div>
                            <div className="flex items-center justify-center px-2 py-4 text-center text-[10px] leading-[1.4] text-muted fnt-lexend sm:px-4 sm:text-12 md:px-[30px] md:py-[30px] md:text-18 md:leading-[26px]">
                                12 months. Google ranking work has a 6 month minimum. VAT not
                                included.
                            </div>
                            <div className="flex items-center justify-center px-2 py-4 text-center text-[10px] leading-[1.4] text-muted fnt-lexend sm:px-4 sm:text-12 md:px-[30px] md:py-[30px] md:text-18 md:leading-[26px]">
                                Set with you, always in a written proposal.
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Info cards */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-[40px]">
                    {infoCards.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={card.title}
                                initial="hidden"
                                whileInView="show"
                                variants={moveUp(0.2 + i * 0.05)}
                                viewport={{ once: true }}
                                className={`rounded-[10px] border border-black/10 p-6 md:p-[30px] ${i === 1 ? "bg-[#F6F6F6]" : "bg-white"
                                    }`}
                            >
                                <span className="flex h-[60px] w-[60px] items-center justify-center rounded-[7px] border border-primary/12 bg-primary/5">
                                    <Image
                                        src={card.icon}
                                        alt={card.title}
                                        className="h-full w-full object-contain p-[10px]"
                                    />
                                </span>
                                <h3 className="mt-6 text-22 text-black md:mt-[30px] md:text-28">
                                    {card.title}
                                </h3>
                                <p className="mt-4 text-16 leading-[1.5] text-muted fnt-lexend md:mt-[20px] md:text-18 md:leading-[26px]">
                                    {card.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PricingComparison;