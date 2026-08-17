"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

type TabId = "google" | "ai" | "report";

interface TabConfig {
    id: TabId;
    label: string;
    icon: string; // path to icon image
}

interface ComparisonRow {
    before: string;
    after: string;
}

const TABS: TabConfig[] = [
    { id: "google", label: "A Google search", icon: "/images/end-to-end-digitalmarketing/search.svg" },
    { id: "ai", label: "Asking an AI", icon: "/images/end-to-end-digitalmarketing/ai.svg" },
    { id: "report", label: "Your monthly report", icon: "/images/end-to-end-digitalmarketing/report.svg" },
];

const CONTENT: Record<TabId, ComparisonRow[]> = {
    google: [
        { before: "An old listing from 2019", after: "Verified Google listing" },
        { before: "A LinkedIn page nobody has touched in a year", after: "An active LinkedIn page with twelve posts a month" },
        { before: "Your website on page three", after: "Your work on page one" },
        { before: "Nothing else on page one", after: "Real projects, photographed on site" },
    ],
    ai: [
        { before: "It names four competitors", after: "Your company, named" },
        { before: "You are not mentioned", after: "Clear pages mentioned about your work" },
        { before: "The buyer never sees you", after: "A list of real questions" },
    ],
    report: [
        { before: "Posts published", after: "Every number against its target" },
        { before: "No starting point to compare against", after: "Where every number came from" },
        { before: "No explanation when numbers move", after: "Why every number moved" },
    ],
};

export default function WhatTheyFind() {
    const [active, setActive] = React.useState<TabId>("google");
    const rows = CONTENT[active];

    return (
        <section className="bg-white py-[50px] lg:py-[90px]">
            <div className="container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 1, ease: "easeOut" },
                        },
                    }}
                >
                    {/* Heading row */}
                    <div className="flex flex-col gap-8 lg:flex-row ">
                        <div className="lg:w-3/5">
                            <h2 className="title-60 ">
                                What they find today. what<br></br> they see after.
                            </h2>
                            
                            <div className="flex items-baseline gap-[15px] mt-[40px]"><div className="h-[15px] w-[15px] bg-primary"></div>
                                <p className="fnt-lexend text-18 text-muted lg:max-w-[657px]">
                                    Pick a moment and see what happens once all fourteen services are
                                    running together.
                                </p>
                            </div>
                        </div>
                        
                    </div>

                    {/* Tabs */}
                    <div className="mt-10 flex flex-wrap gap-3 lg:mt-[60px]">
                        {TABS.map((tab) => {
                            const isActive = tab.id === active;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActive(tab.id)}
                                    className={[
                                        " flex items-center gap-2 rounded-full border px-[25px] py-[15px] text-28 transition-colors duration-300",
                                        isActive
                                            ? "border-black bg-black text-white"
                                            : "border-[#E2E2E2] bg-white text-black hover:border-black/40",
                                    ].join(" ")}
                                >
                                    <img
                                        src={tab.icon}
                                        alt=""
                                        className={[
                                            "h-[30px] w-[30px] object-contain",
                                            isActive ? "" : "",
                                        ].join(" ")}
                                    />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Comparison panels */}
                    <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-2 lg:gap-8">
                        {/* Before */}
                        <div className="rounded-[10px] bg-[#F1F1F1] px-[30px] pt-[30px] pb-[80px]">
                            <div className="rounded-[8px] bg-[#000000]/10 p-[30px]">
                                <h3 className="text-28 text-black">
                                    What they find today
                                </h3>
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.ul
                                    key={`before-${active}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className=" pt-[30px]"
                                >
                                    {rows.map((row, i) => (
                                        <li
                                            key={i}
                                            className={[
                                                "flex items-center gap-3 py-[20px]",
                                                i !== rows.length - 1 ? "border-b border-black/10" : "",
                                            ].join(" ")}
                                        >
                                            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-[4px] bg-[#C7C7C7]">
                                                <X className="h-3 w-3 text-white" strokeWidth={3} />
                                            </span>
                                            <span className="fnt-lexend text-18 text-muted  ">
                                                {row.before}
                                            </span>
                                        </li>
                                    ))}
                                </motion.ul>
                            </AnimatePresence>
                        </div>

                        {/* After */}
                        <div className="rounded-[10px] bg-black p-[30px]">
                            <div className="rounded-[8px] bg-[#FFFFFF]/20 p-[30px]">
                                <h3 className="text-28 text-white">
                                    After six months with us
                                </h3>
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.ul
                                    key={`after-${active}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, delay: 0.08 }}
                                    className="pt-[30px]"
                                >
                                    {rows.map((row, i) => (
                                        <li
                                            key={i}
                                            className={[
                                                "flex items-center gap-3 py-[20px]",
                                                i !== rows.length - 1 ? "border-b border-white/10" : "",
                                            ].join(" ")}
                                        >
                                            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-[4px] bg-primary">
                                                <Check className="h-3 w-3 text-white" strokeWidth={3} />
                                            </span>
                                            <span className="fnt-lexend text-18 text-[#A3A3A3]">
                                                {row.after}
                                            </span>
                                        </li>
                                    ))}
                                </motion.ul>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}