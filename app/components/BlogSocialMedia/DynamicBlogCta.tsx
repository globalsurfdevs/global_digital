"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionCTAProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

const SectionCTA = ({
    title,
    description,
    buttonText,
    buttonLink,
}: SectionCTAProps) => {
    return (
        <section>
            <div className="container mx-auto pb-[50px] lg:pb-[100px]">
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
                    <div className="grid grid-cols-1">
                        <div className="w-full">
                            <h2 className="title-65 mb-5 lg:mb-[40px]">
                                {title}
                            </h2>

                            <p className="text-font19 text-[#77787B] mt-4">
                                {description}
                            </p>

                            <div className="mt-8">
                                <a href={buttonLink}>
                                    <button className="text-30 w-fit rounded-full border border-primary px-6 py-3 leading-lh1p66 text-black transition-all duration-300 ease-in hover:bg-primary hover:text-white hover:shadow-lg lg:px-24">
                                        <span>{buttonText}</span>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SectionCTA;