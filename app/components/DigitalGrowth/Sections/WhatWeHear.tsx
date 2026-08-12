"use client";
import * as React from "react";
import { motion } from "framer-motion";
import Button from "../../common/buttons/PrimaryButton";

interface FrameworkItem {
    id: number;
    title: string;
    desc?: string;
    link?: string;
}

interface ServicesSectionProps {
    title: string;
    colcount?: number;
    description?: string;
    hrcontent?: boolean;
    data: FrameworkItem[];
}

const WhatWeHear: React.FC<ServicesSectionProps> = ({
    title,
    colcount = 4,
    description,
    data,
}) => {
    const [modalOpen, setModalOpen] = React.useState(false);
    // Group items into rows of 2
    const rows: FrameworkItem[][] = [];
    for (let i = 0; i < data.length; i += 2) {
        rows.push(data.slice(i, i + 2));
    }

    return (
        <section className="bg-[#F6F6F6] py-[50px] lg:py-[140px]">
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
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                        <div className="lg:w-3/5">
                            <h2 className="title-65 pb-2">{title}</h2>
                            {description && (
                                <p className="text-19 fnt-lexend pt-4 text-[#77787B] md:pt-6 xl:pt-14">
                                    {description}
                                </p>
                            )}
                            <div className="flex flex-wrap gap-4 pt-6 lg:pt-[60px]">
                              
                                    <Button
                                        className="max-h-[50px] w-[465px]"
                                        variant="outline"
                                        href="/contact"
                                    >
                                        Click to fix your marketing challenges 
                                    </Button>
                                
                            </div>
                            
                        </div>

                        <div className="w-full lg:w-3/5">
                            <div className="flex flex-col">
                                {rows.map((row, rowIndex) => (
                                    <div key={rowIndex} className="group/row relative">
                                        {/* Full-width animated top border for this row */}
                                        {/* <div className="relative h-[1px] w-full overflow-hidden bg-black/20">
                                            <div className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover/row:scale-x-100"></div>
                                        </div> */}

                                        <div
                                            className={
                                                rowIndex === rows.length - 1
                                                    ? "grid grid-cols-1   pb-0 sm:grid-cols-2"
                                                    : "grid grid-cols-1  sm:grid-cols-2 "
                                            }
                                        >
                                            {row.map((framework) => (
                                                <div
                                                    key={framework.id}
                                                    className="group relative flex flex-col overflow-hidden border border-black/10 rounded-[10px] pt-[40px] pr-[36px] pb-[60px] pl-[36px]"
                                                >
                                                    <div className="">
                                                        <h3 className="text-28 pb-3 text-black lg:pb-[40px] leading-[34px]">
                                                            {framework.title}
                                                        </h3>
                                                    </div>
                                                    <div>
                                                        <p className="fnt-lexend text-18 font-medium text-gray1">
                                                            {framework.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhatWeHear;