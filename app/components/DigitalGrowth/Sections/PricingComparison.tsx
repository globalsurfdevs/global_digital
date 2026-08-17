"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";
import { Check } from "lucide-react";
import { assets } from "@/public/assets/assets";

type Feature = {
    title: string;
    description: string;
};

const growthFeatures: Feature[] = [
    { title: "SEO", description: "Google ranking for the terms buyers actually search" },
    { title: "GEO", description: "Named correctly when a buyer asks an AI tool" },
    { title: "Social Media", description: "Named correctly when a buyer asks an AI tool" },
    { title: "Social Media", description: "LinkedIn, eight to ten posts a month" },
    { title: "Content Production", description: "One shoot day a month at your site" },
    { title: "Executive Visibility", description: "Four posts a month for one senior leader" },
    { title: "Website and Technical SEO", description: "Safe, fast, and checked every month" },
    { title: "Analytics, CRO and Reporting", description: "Signed baseline, monthly report, quarterly audit" },
    { title: "Strategy and Benchmarking", description: "One senior strategist, three competitors tracked" },
];

const plusFeatures: Feature[] = [
    { title: "Multi entity coverage", description: "Several companies, brands or countries" },
    { title: "Executive Visibility, expanded", description: "Posts for multiple leaders" },
    { title: "Content Production, extended", description: "More shoot days and more social output" },
    { title: "Competitive Intelligence, expanded", description: "A wider competitor set" },
];

const ArrowIcon = ({ clipId, dark = false }: { clipId: string; dark?: boolean }) => (
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
                stroke={dark ? "black" : "white"}
                strokeWidth="2"
                strokeMiterlimit="10"
            />
            <path
                d="M1.13281 1.26172H8.88346V8.71245"
                stroke={dark ? "black" : "white"}
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

type Props = {
    title: string;
    description: string;
};

const PricingComparison = ({ data }: { data: Props }) => {
    return (
        <section className="bg-white py-16 text-black md:py-20 xl:py-[90px]">
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

                {/* Cards */}
                <div className="mt-10 grid gap-4 md:mt-[60px] lg:grid-cols-2">
                    {/* Growth card */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={moveUp(0.1)}
                        viewport={{ once: true }}
                        className="relative  rounded-2xl bg-black text-white md:pt-[50px] md:px-[40px] p-6"
                    >
                        <span className="absolute fnt-lexend left-1/2 top-[-14px] w-fit -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-[15px] py-[10px] text-18 uppercase tracking-wide text-white">
                            What most firms take
                        </span>

                        <span className="text-12 uppercase leading-[1.444444444444444] text-white/50 fnt-lexend">
                            Growth
                        </span>
                        <h3 className="text-28 mt-[40px] leading-[1.214285714285714]">Growth Partnership</h3>
                        <div className="mt-[30px] flex items-baseline gap-2">
                            <span className="text-60 leading-[1.083333333333333]">
                                AED 10,000
                            </span>
                            <span className="text-18 text-white/50 md:text-16">
                                a month, from
                            </span>
                        </div>
                        <p className="mt-[20px] text-white/50 text-18 leading-[1.444444444444444]">
                            Eight disciplines, one senior team, one monthly figure.
                        </p>

                        <button
                            type="button"
                            className="group mt-6 flex w-full items-center justify-center space-x-[12px] rounded-full border border-primary px-6 py-[15px] text-white transition duration-300 ease-in hover:shadow-lg md:mt-[30px]"
                        >
                            <span className="fnt-lexend uppercase duration-300 ease-in text-16">
                                Book your 20-minute call
                            </span>
                            <div className="bg-primary p-1">
                                <ArrowIcon clipId="clip-book-call" />
                            </div>
                        </button>

                        <div className="mt-8 border-t border-white/10 pt-6 md:mt-[40px] md:pt-[40px]">
                            <span className="text-18  fnt-lexend text-white/50 leading-[1.444444444444444]">
                                What runs every month
                            </span>

                            <ul className="mt-4 space-y-5 md:mt-[24px] md:space-y-[25px] fnt-lexend">
                                {growthFeatures.map((item, i) => (
                                    <li key={i} className="flex flex-col items-start gap-3">
                                        <div className="flex items-center gap-[20px]">
                                            <span className="flex h-4 w-4 shrink-0 items-center justify-center bg-primary">
                                                <Check size={10} strokeWidth={7} className="text-white" />
                                            </span>
                                            <p className="font-normal text-18 leading-[1.444444444444444]">
                                                {item.title}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="mt-[5px] ml-[35px] text-white/50 fnt-lexend text-18">
                                                {item.description}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <p className="mt-8 pt-6 leading-[1.444444444444444] text-white/50 fnt-lexend md:mt-[70px] md:mb-[85px] text-18">
                            12 months. Google ranking work has a 6 month minimum. VAT not
                            included.
                        </p>
                    </motion.div>

                    {/* Plus card */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={moveUp(0.15)}
                        viewport={{ once: true }}
                        className="rounded-2xl bg-[#F6F6F6] md:pt-[50px] md:px-[40px] p-6"
                    >
                        <span className="text-18 uppercase fnt-lexend text-muted leading-[1.444444444444444]">
                            Plus
                        </span>
                        <h3 className="mt-[40px] text-28 leading-[1.214285714285714]">Plus</h3>
                        <div className="mt-[30px] flex items-baseline gap-2">
                            <span className="text-60 leading-[1.083333333333333]">
                                Custom
                            </span>
                            <span className="text-muted text-18 leading-[1.444444444444444]">
                                priced with you
                            </span>
                        </div>
                        <p className="mt-[20px] text-muted text-18 leading-[1.444444444444444]">
                            For groups running several companies, brands or countries at
                            once
                        </p>

                        <button
                            type="button"
                            className="group mt-6 flex w-full items-center justify-center space-x-[12px] rounded-full border border-primary px-6 py-[15px] text-black transition duration-300 ease-in hover:shadow-lg md:mt-[30px]"
                        >
                            <span className="fnt-lexend uppercase duration-300 ease-in text-16">
                                Ask about Plus
                            </span>
                            <div className="bg-primary p-1">
                                <ArrowIcon clipId="clip-ask-plus" />
                            </div>
                        </button>

                        <div className="mt-8 border-t border-black/10 pt-6 md:mt-[40px] md:pt-[40px]">
                            <span className="text-18 text-muted fnt-lexend leading-[1.444444444444444]">
                                What runs every month
                            </span>

                            <ul className="mt-4 space-y-5 md:mt-[24px] md:space-y-[25px] fnt-lexend">
                                {plusFeatures.map((item, i) => (
                                    <li key={i} className="flex flex-col items-start gap-3">
                                        <div className="flex items-center gap-[20px]">
                                            <span className="flex h-4 w-4 shrink-0 items-center justify-center bg-[#77787B]/20">
                                                <Check size={10} strokeWidth={7} className="text-[#77787B]" />
                                            </span>
                                            <p className="font-normal text-18 leading-[1.444444444444444]">
                                                {item.title}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="mt-[5px] ml-[35px] text-muted fnt-lexend text-18">
                                                {item.description}
                                            </p>
                                        </div>
                                    </li>

                                    
                                ))}
                            </ul>
                        </div>

                        <p className="mt-8 border-t border-[#00000033]/20  pt-6 leading-[1.444444444444444] text-[#77787B] fnt-lexend md:mt-[70px] md:mb-[85px] text-18">
                            12 months. Google ranking work has a 6 month minimum. VAT not included.
                        </p>
                    </motion.div>
                </div>

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