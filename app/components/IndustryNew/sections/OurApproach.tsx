"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";
import { toSentenceCase } from "@/app/helpers/maintainProperWordings";


const OurApproach = ({ data }: any) => {
    return (
        <div className="container mx-auto py-120">
            <motion.div
                variants={moveUp(0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mb-4 flex items-center gap-3 md:mb-6 xl:mb-8 xxl:mb-12"
            >
                <h3 className="text-18 uppercase leading-[1] tracking-[-0.025em] text-muted">
                    {data.title}
                </h3>
                <div className="h-4 w-4 bg-primary"></div>
            </motion.div>

            <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
                <div className="max-w-[50ch]">
                    <motion.h2
                        variants={moveUp(0.1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="title-60 text-[length:var(--text-60-sm)] max-w-[30ch]"
                    >
                        {data.subTitle}
                    </motion.h2>
                </div>

                <div className="lg:w-5/12">
                    {data.description.split("\n").map((item:string, index:number) => (
                        <motion.p
                            key={index}
                            variants={moveUp(0.2 + index * 0.1)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="text-[length:var(--text-18-sm)] fnt-lexend mb-4 xxl:mb-6 text-muted last:mb-0"
                            dangerouslySetInnerHTML={{ __html: toSentenceCase(item) }}
                        >
                            {/* {toSentenceCase(item)} */}
                        </motion.p>
                    ))}

                    <Link
                        href={data.buttonLink}
                        className="group flex h-fit w-fit items-center space-x-2 rounded-full border border-primary px-[25px] py-[15px] text-black transition duration-300 ease-in mt-[40px] hover:text-black hover:shadow-lg"
                    >
                        <span className="fnt-lexend text-font16 uppercase duration-300 ease-in group-hover:text-black">
                            {data.buttonText}
                        </span>
                        <div className="bg-primary p-1">
                            <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="group-hover:scale-105"
                            >
                                <g clipPath="url(#clip0_65_39)">
                                    <path
                                        d="M8.88346 1.26172L1.13281 8.8624"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeMiterlimit="10"
                                    ></path>
                                    <path
                                        d="M1.13281 1.26172H8.88346V8.71245"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeMiterlimit="10"
                                    ></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_65_39">
                                        <rect width="10" height="10" fill="white"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OurApproach;