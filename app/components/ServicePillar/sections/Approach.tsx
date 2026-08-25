"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";
import { toSentenceCase } from "@/app/helpers/maintainProperWordings";
import Link from "next/link";

const Approach = ({ data }: any) => {
    return (
        <section className="py-8 xl:py-20 3xl:py-[100px]">
            <div className="container">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 xxl:gap-[80px] 3xl:grid-cols-[auto_745px]">
                    <motion.div
                        variants={moveUp(0)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <Image
                            src={data.image}
                            alt={data.imageAlt}
                            width={1500}
                            height={1500}
                            className="h-full max-h-[600px] w-full object-cover"
                        />
                    </motion.div>
                    <motion.div
                        variants={moveUp(0.1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <div className="mb-4 flex items-center gap-3 md:mb-6 xl:mb-8 xxl:mb-12">
                            <p className="text-18 uppercase leading-[1] tracking-[-0.025em] text-muted">
                                {data.title}
                            </p>
                            <div className="h-4 w-4 bg-primary"></div>
                        </div>
                        <h2 className="title-60 mb-4 tracking-[-0.025em] md:mb-5 xl:mb-[40px] ">
                            {data.subTitle}
                        </h2>
                        {data.description.split("\n").map((item:string,index:number) => (
                            <p key={index} className="text-77787B fnt-lexend text-[length:var(--text-18-sm)] leading-[1.444444444444444]">
                                {toSentenceCase(item)}
                            </p>
                        ))}


                        <Link
                            href={data.buttonLink}
                            className="group flex h-fit w-fit items-center space-x-2 rounded-full border border-primary px-[25px] py-[15px] text-black transition duration-300 ease-in mt-[60px] hover:text-black hover:shadow-lg"
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

                    </motion.div>



                </div>
            </div>
        </section>
    );
};

export default Approach;
