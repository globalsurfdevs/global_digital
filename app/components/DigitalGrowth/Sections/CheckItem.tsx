"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { moveUp } from "../../animations/motionVariants";

const trustPoints: string[] = [
    "A senior strategist, not a salesperson",
    "No deck, no pitch — just the fit conversation",
    "A reply within one business day",
];

const sectors = [
    "E-commerce",
    "SaaS",
    "Healthcare",
    "Real Estate",
    "Manufacturing",
    "Other",
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

const CheckItem = ({ label, index }: { label: string; index: number }) => (
    <motion.div
        initial="hidden"
        whileInView="show"
        variants={moveUp(0.1 + index * 0.05)}
        viewport={{ once: true }}
        className="flex items-center gap-3 rounded-lg bg-[#FFFFFF]/10 px-[21px] py-[18px]"
    >
        <span className="flex h-[15px] w-[15px] shrink-0 items-center justify-center  bg-primary">
            <Check size={13} strokeWidth={3} className="text-white" />
        </span>
        <span className="text-18 fnt-lexend text-[#A3A3A3]">{label}</span>
    </motion.div>
);

const FormField = ({
    label,
    type = "text",
    name,
}: {
    label: string;
    type?: string;
    name: string;
}) => (
    <div className="border-b border-white/20 pb-3 transition-colors focus-within:border-white/60">
        <label htmlFor={name} className="block text-18 text-[#A3A3A3]">
            {label}
        </label>
        <input
            id={name}
            name={name}
            type={type}
            className="mt-2 w-full appearance-none border-0 bg-transparent text-15 text-white outline-none ring-0 placeholder:text-white/30"
        />
    </div>
);

const GetInTouch = ({ data }: { data: { title: string; description: string } }) => {
    const [sectorOpen, setSectorOpen] = useState(false);
    const [sector, setSector] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // TODO: wire to API route / CRM endpoint
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-black pt-[16px] text-white md:pt-20 xl:pt-120">
            <div className="container border-b border-[#77787B] pb-[16px] md:pb-20 xl:pb-[120px]">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-16">
                    <div>
                        <motion.h2
                            initial="hidden"
                            whileInView="show"
                            variants={moveUp(0)}
                            viewport={{ once: true }}
                            className="text-60 lg:max-w-[658px] lg:leading-[65px] "
                        >
                            {data.title}
                        </motion.h2>

                        <motion.p
                            initial="hidden"
                            whileInView="show"
                            variants={moveUp(0.05)}
                            viewport={{ once: true }}
                            className="mt-[40px] max-w-[520px] text-18 leading-[26px] text-[#A3A3A3]"
                        >   
                            {data.description}
                        </motion.p>

                        <div className="mt-8 flex flex-col gap-[15px] max-w-[454px]">
                            {trustPoints.map((point, i) => (
                                <CheckItem key={point} label={point} index={i} />
                            ))}
                        </div>
                    </div>

                    <motion.form
                        initial="hidden"
                        whileInView="show"
                        variants={moveUp(0.15)}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6"
                    >
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            <FormField label="Name" name="name" />
                            <FormField label="Company" name="company" />
                            <FormField label="Work email" name="email" type="email" />
                            <FormField label="Phone" name="phone" type="tel" />
                        </div>

                        <div className="relative border-b border-white/20 pb-3">
                            <button
                                type="button"
                                onClick={() => setSectorOpen((v) => !v)}
                                className="flex w-full items-center justify-between text-left"
                                aria-haspopup="listbox"
                                aria-expanded={sectorOpen}
                            >
                                <div>
                                    <span className="block text-13 text-white/50">Sector</span>
                                    <span className="mt-2 block text-15 text-white">
                                        {sector || "\u00A0"}
                                    </span>
                                </div>
                                <ChevronDown
                                    size={18}
                                    className={`shrink-0 text-white/60 transition-transform ${sectorOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {sectorOpen && (
                                <ul
                                    role="listbox"
                                    className="absolute left-0 top-full z-10 mt-2 w-full overflow-hidden rounded-lg border border-white/10 bg-neutral-900 shadow-lg"
                                >
                                    {sectors.map((s) => (
                                        <li key={s}>
                                            <button
                                                type="button"
                                                role="option"
                                                aria-selected={sector === s}
                                                onClick={() => {
                                                    setSector(s);
                                                    setSectorOpen(false);
                                                }}
                                                className="w-full px-4 py-2.5 text-left text-14 text-white/80 hover:bg-white/10"
                                            >
                                                {s}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="mt-10 lg:mt-[60px] mb-10 lg:mb-0  flex flex-wrap gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`group flex items-center space-x-2 rounded-full border border-primary px-6 py-2 text-white transition duration-300 ease-in hover:shadow-lg ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                <span className="fnt-lexend uppercase duration-300 ease-in">
                                    Submit
                                </span>
                                <div className="bg-primary p-1">
                                    <ArrowIcon clipId="clip-submit" />
                                </div>
                            </button>

                            <button
                                type="button"
                                className="group flex items-center space-x-2 rounded-full border border-primary px-6 py-2 text-white transition duration-300 ease-in hover:shadow-lg"
                            >
                                <span className="fnt-lexend uppercase duration-300 ease-in">
                                    Book My 30-Minute Call
                                </span>
                                <div className="bg-primary p-1">
                                    <ArrowIcon clipId="clip-book-call" />
                                </div>
                            </button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default GetInTouch;