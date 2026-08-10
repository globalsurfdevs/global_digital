"use client";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";
import {
    BarChart3,
    PieChart,
    Linkedin,
    Link2,
    FileText,
    Sparkles,
    Brain,
    MessageSquareText,
    Globe,
} from "lucide-react";

type ChannelItem = {
    _id: string;
    label: string;
    icon: React.ReactNode;
    iconBg: string;
};

const rowOne: ChannelItem[] = [
    {
        _id: "ga4",
        label: "Google Analytics 4",
        icon: <BarChart3 size={16} className="text-amber-500" />,
        iconBg: "bg-amber-50",
    },
    {
        _id: "gsc",
        label: "Google Search Console",
        icon: <PieChart size={16} className="text-blue-500" />,
        iconBg: "bg-blue-50",
    },
    {
        _id: "looker",
        label: "Looker Studio",
        icon: <PieChart size={16} className="text-emerald-500" />,
        iconBg: "bg-emerald-50",
    },
    {
        _id: "linkedin",
        label: "LinkedIn Analytics",
        icon: <Linkedin size={16} className="text-white" />,
        iconBg: "bg-[#0A66C2]",
    },
    {
        _id: "zoho",
        label: "Zoho CRM",
        icon: <Link2 size={16} className="text-red-400" />,
        iconBg: "bg-red-50",
    },
];

const rowTwo: ChannelItem[] = [
    {
        _id: "schema",
        label: "Schema.org",
        icon: <FileText size={16} className="text-rose-400" />,
        iconBg: "bg-rose-50",
    },
    {
        _id: "chatgpt",
        label: "ChatGPT",
        icon: <MessageSquareText size={16} className="text-black" />,
        iconBg: "bg-neutral-100",
    },
    {
        _id: "ai-overviews",
        label: "AI Overviews",
        icon: <Sparkles size={16} className="text-fuchsia-500" />,
        iconBg: "bg-fuchsia-50",
    },
    {
        _id: "perplexity",
        label: "Perplexity",
        icon: <Brain size={16} className="text-teal-500" />,
        iconBg: "bg-teal-50",
    },
    {
        _id: "claude",
        label: "Claude",
        icon: <Sparkles size={16} className="text-orange-500" />,
        iconBg: "bg-orange-50",
    },
    {
        _id: "wordpress",
        label: "WordPress",
        icon: <Globe size={16} className="text-[#21759B]" />,
        iconBg: "bg-sky-50",
    },
];

const Pill = ({ item }: { item: ChannelItem }) => (
    <div className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-white px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <span
            className={`flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#F6F6F6]`}
        >
            {item.icon}
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
    // Duplicate the items so the track can loop seamlessly with no visible seam.
    const track = [...items, ...items];
    const animationName =
        direction === "left" ? "marquee-left" : "marquee-right";

    return (
        <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_48px,black_calc(100%-48px),transparent)]">
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
    return (
        <section className="py-16 md:py-20 xl:py-120 bg-[#f4f4f4] text-black overflow-hidden">
            <div className="container">
                <motion.h2
                    initial="hidden"
                    whileInView="show"
                    variants={moveUp(0)}
                    viewport={{ once: true }}
                    className="text-32 sm:text-40 xl:title-60 leading-[1.1] tracking-[-0.025em] max-w-[720px]"
                >
                    {data.title}
                </motion.h2>
                <motion.p
                    initial="hidden"
                    whileInView="show"
                    variants={moveUp(0.1)}
                    viewport={{ once: true }}
                    className="mt-4 text-16 text-black/60 md:mt-5"
                >
                    {data.description}
                </motion.p>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    variants={moveUp(0.2)}
                    viewport={{ once: true }}
                    className="relative mt-10 flex flex-col gap-3"
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