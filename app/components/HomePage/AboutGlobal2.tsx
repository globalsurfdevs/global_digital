"use client";
import React from "react";
import Link from "next/link";

type ExpertiseSectionProps = {};

const Expertise: React.FC<ExpertiseSectionProps> = () => {
    return (
        <div className="container mx-auto py-4">
            <div className="flex flex-col lg:flex-row  border-b py-120  gap-[50px] ">
                <div className="lg:w-6/12">
                    <h2 className="title-65">
                        Digital Marketing Agency in Dubai for Industry-Specific Growth
                    </h2>
                </div>
                <div className="lg:w-6/12">
                    <h3 className="text-28 text-black">
                        Senior-Led Expertise. Sector-Specific Strategies. Trusted by
                        140+ UAE Brands Since 2013.
                    </h3>

                    <p className="text-19 fnt-lexend  text-muted py-6 lg:py-[30px] ">
                        We&rsquo;re GS Digital, a full-service digital marketing agency
                        in Dubai delivering digital marketing services to brands across
                        the UAE. With extensive experience across construction, real
                        estate, B2B, education, retail, and other key industries, we
                        work with organisations where long sales cycles, tender
                        processes, and technical buyers demand a different digital
                        approach. By combining data driven strategy, creative thinking,
                        and business focused execution, we turn digital investment into
                        measurable business results.
                    </p>

                    <Link
                        href="/contact-us"
                        className="group flex h-fit w-fit items-center space-x-2 rounded-full border border-primary px-6 py-2 text-black transition duration-300 ease-in  hover:text-black hover:shadow-lg"
                    >
                        <span className="fnt-lexend uppercase duration-300 ease-in group-hover:text-black">
                            contact us
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

export default Expertise;