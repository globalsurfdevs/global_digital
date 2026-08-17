"use client";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ChannelItem = {
    _id: string;
    label: string;
    icon: string;
    iconBg: string;
};

const rowOne: ChannelItem[] = [
    { _id: "gsc", label: "Google Analytics 4", icon: assets.googleAnalytics2, iconBg: "bg-amber-50" },
    { _id: "gsc", label: "Google Search Console", icon: assets.gsc, iconBg: "bg-blue-50" },
    { _id: "lockerStudio", label: "Looker Studio", icon: assets.lockerStudio, iconBg: "bg-emerald-50" },
    { _id: "linkedin", label: "LinkedIn Analytics", icon: assets.linkedin2, iconBg: "bg-[#0A66C2]" },
    { _id: "zoho", label: "Zoho CRM", icon: assets.zohoCrm, iconBg: "bg-red-50" },
];

const rowTwo: ChannelItem[] = [
    { _id: "schema", label: "Schema.org", icon: assets.schema, iconBg: "bg-rose-50" },
    { _id: "chatgpt", label: "ChatGPT", icon: assets.chatgpt, iconBg: "bg-neutral-100" },
    { _id: "ai-overviews", label: "AI Overviews", icon: assets.ainew, iconBg: "bg-fuchsia-50" },
    { _id: "perplexity", label: "Perplexity", icon: assets.perplexity, iconBg: "bg-teal-50" },
    { _id: "claude", label: "Claude", icon: assets.claude, iconBg: "bg-orange-50" },
    { _id: "wordpress", label: "WordPress", icon: assets.wordpress, iconBg: "bg-sky-50" },
];

const Pill = ({ item }: { item: ChannelItem }) => (
    <div className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-white px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#F6F6F6]">
            <Image
                src={item.icon}
                alt={item.label}
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
            />
        </span>
        <span className="whitespace-nowrap text-28 text-black">
            {item.label}
        </span>
    </div>
);

const Row = ({
    items,
    direction = "left",
    speed = 32,
}: {
    items: ChannelItem[];
    direction?: "left" | "right";
    speed?: number;
}) => {
    const track = [...items, ...items];
    const animationName =
        direction === "left" ? "marquee-left" : "marquee-right";

    return (
        <div className="group relative overflow-hidden">
            {/* edge fades so pills disappear/appear smoothly against the section bg */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-16 bg-gradient-to-r from-[#f4f4f4] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-40 xl:w-56 bg-gradient-to-l from-[#f4f4f4] to-transparent" />

            <div
                className="flex w-max shrink-0 gap-3 group-hover:[animation-play-state:paused]"
                style={{
                    animation: `${animationName} ${speed}s linear infinite`,
                }}
            >
                {track.map((item, i) => (
                    <Pill key={`${item._id}-${i}`} item={item} />
                ))}
            </div>
        </div>
    );
};

type Props = {
    title: string;
    description: string;
};

const FullFunnelChannels = ({ data }: { data: Props }) => {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [rightBleed, setRightBleed] = useState(0);

    useEffect(() => {
        const updateBleed = () => {
            if (!marqueeRef.current) return;
            const rect = marqueeRef.current.getBoundingClientRect();
            const gap = window.innerWidth - rect.right;
            setRightBleed(gap > 0 ? gap : 0);
        };

        updateBleed();
        window.addEventListener("resize", updateBleed);
        return () => window.removeEventListener("resize", updateBleed);
    }, []);

    return (
        <section className="py-16 md:py-20 xl:py-[90px] bg-[#f4f4f4] text-black overflow-hidden">
            <div className="container">
                <motion.h2
                    initial="hidden"
                    whileInView="show"
                    variants={moveUp(0)}
                    viewport={{ once: true }}
                    className="title-60 lg:max-w-[1100px]"
                >
                    {data.title}
                </motion.h2>

                <motion.p
                    initial="hidden"
                    whileInView="show"
                    variants={moveUp(0.1)}
                    viewport={{ once: true }}
                    className="mt-6 lg:mt-[80px] mb-6 lg:mb-[60px] text-28 text-black "
                >
                    {data.description}
                </motion.p>

                {/* Starts at container left, bleeds to the viewport's right edge */}
                <motion.div
                    ref={marqueeRef}
                    initial="hidden"
                    whileInView="show"
                    variants={moveUp(0.2)}
                    viewport={{ once: true }}
                    className="relative flex flex-col gap-3"
                    style={{ marginRight: -rightBleed }}
                >
                    <Row items={rowOne} direction="left" speed={30} />
                    <Row items={rowTwo} direction="right" speed={34} />
                </motion.div>
            </div>

            <style jsx>{`
    @keyframes marquee-left {
        from {
            transform: translateX(0);
        }

        to {
            transform: translateX(-50%);
        }
    }

    @keyframes marquee-right {
        from {
            transform: translateX(-50%);
        }

        to {
            transform: translateX(0);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        :global(.group) > div {
            animation: none !important;
        }
    }
`}</style>
        </section>
    );
};

export default FullFunnelChannels;