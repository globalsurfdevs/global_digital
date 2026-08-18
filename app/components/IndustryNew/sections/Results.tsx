"use client";
import { motion } from "framer-motion";
import PlatformSwiper from "./PlatformSwiper";
import React from "react";
import { StaticImageData } from "next/image";
import { moveUp } from "../../animations/motionVariants";
interface ClientsformsItem {
    id: number;
    image: string | StaticImageData;
    title: string;

    btntext: string;
    btnurl?: string;
    subdesc?: string;
}

interface ClientsformsSectionProps {
    Clientsformsdata: ClientsformsItem[];
    padding?: string; // New padding prop
    title?: string; // New padding prop
    title1?: string;
    pt?: string; // New padding-top prop
    pb?: string; // New padding-bottom prop
    subdesc?: string;
}

const Results: React.FC<ClientsformsSectionProps> = ({
    Clientsformsdata,
    subdesc,
    padding = "",
    pt = "",
    pb = "",
    title1, // Added title1 to destructured props
    title,
}) => {
    return (
        <div className="py-120 bg-[#F6F6F6]">
            <div className={`container mx-auto`}>
                <div className=" ">
                    <motion.div
                        variants={moveUp(0)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="mb-4 flex items-center gap-3 md:mb-[60px]"
                    >
                        <h3 className="text-18 uppercase leading-[1] tracking-[-0.025em] text-muted">
                            {title ?? "Sectors we work with"}
                        </h3>
                        <div className="h-4 w-4 bg-primary" />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                        variants={{
                            hidden: { opacity: 0, y: 50 }, // Start below and invisible
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 1, ease: "easeOut" },
                            }, // Slide up and fade in
                        }}
                    >
                        <div className="mb-4 mt-6 grid lg:mb-[60px] lg:mt-0">
                            {title1 && (
                                <h2
                                    className="text-60 text-[length:var(--text-60-sm)]"
                                    dangerouslySetInnerHTML={{ __html: title1 }}
                                ></h2>
                            )}
                            
                        </div>
                    </motion.div>
                </div>
            </div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                variants={{
                    hidden: { opacity: 0, y: 50 }, // Start below and invisible
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1.3, ease: "easeOut" },
                    }, // Slide up and fade in
                }}
            >
                <PlatformSwiper Clientsformsdata={Clientsformsdata} />
            </motion.div>
        </div>
    );
};

export default Results;
