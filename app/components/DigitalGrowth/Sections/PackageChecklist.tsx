"use client";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";

type ChecklistItem = {
    _id: string;
    title: string;
    subText: string;
};

type ChecklistColumn = {
    _id: string;
    heading: string;
    items: ChecklistItem[];
};

type Props = {
    title: string;
    description: string;
    columns: ChecklistColumn[];
};

const PackageChecklist = ({ data }: { data: Props }) => {
    return (
        <section className="py-16 md:py-20 xl:py-120 bg-white">
            <div className="container">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-10 mb-8 md:mb-10 xl:mb-[52px]">
                    <motion.h2
                        initial="hidden"
                        whileInView="show"
                        variants={moveUp(0)}
                        viewport={{ once: true }}
                        className="text-32 sm:text-40 xl:title-60 leading-[1.1] tracking-[-0.025em] max-w-[12ch]"
                    >
                        {data.title}
                    </motion.h2>
                    <motion.p
                        initial="hidden"
                        whileInView="show"
                        variants={moveUp(0.1)}
                        viewport={{ once: true }}
                        className="text-14 leading-[1.6] text-black/50 md:max-w-[340px] xl:max-w-[400px]"
                    >
                        {data.description}
                    </motion.p>
                </div>

                {/* Columns */}
                <div className="flex flex-wrap items-stretch -mx-[7px] xl:-mx-[15px]">
                    {data.columns.map((col, colIndex) => (
                        <motion.div
                            key={col._id}
                            initial="hidden"
                            whileInView="show"
                            variants={moveUp(colIndex * 0.1)}
                            viewport={{ once: true }}
                            className="flex w-full flex-col px-[7px] sm:w-1/2 lg:w-1/4 xl:px-[15px] mb-[14px] xl:mb-[30px]"
                        >
                            {/* Column header */}
                            <div className="rounded-[7px] border border-primary/20 bg-gradient-to-b from-primary/[0.06] to-transparent px-4 py-4 xl:px-6 xl:py-[22px] mb-3 xl:mb-4">
                                <h3 className="text-20 xl:text-24 tracking-[-0.02em]">
                                    {col.heading}
                                </h3>
                            </div>

                            {/* Column body */}
                            <div className="flex-1 rounded-[7px] bg-[#f6f6f6] px-4 py-2 xl:px-6 xl:py-4">
                                {col.items.map((item, itemIndex) => (
                                    <div
                                        key={item._id}
                                        className={`flex items-start gap-2.5 xl:gap-3 py-3 xl:py-[18px] ${itemIndex < col.items.length - 1
                                                ? "border-b border-black/10"
                                                : ""
                                            }`}
                                    >
                                        <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] bg-primary">
                                            <svg
                                                width="10"
                                                height="8"
                                                viewBox="0 0 10 8"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1 4L3.5 6.5L9 1"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                        <div>
                                            <p className="text-14 leading-[1.3] text-black">
                                                {item.title}
                                            </p>
                                            <p className="mt-0.5 text-13 leading-[1.3] text-black/45">
                                                {item.subText}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PackageChecklist;