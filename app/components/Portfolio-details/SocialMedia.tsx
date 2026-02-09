"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { workSvgs } from "../../data/works";
import Link from "next/link";
import { motion } from 'framer-motion'
import { Portfolio } from "@/app/types/Portfolio";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const SocialMedia = ({ data }: { data: { portfolio: Portfolio[] } }) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const [leftOffset, setLeftOffset] = useState(0);

    useEffect(() => {
        const updateOffset = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                console.log(containerRef.current.getBoundingClientRect());
                setLeftOffset(rect.left + 15);
            }
        };
        updateOffset();
        window.addEventListener("resize", updateOffset);
        return () => window.removeEventListener("resize", updateOffset);
    }, []);

    return (
        <div className='overflow-hidden'>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                variants={{
                    hidden: { opacity: 0, y: 50 }, // Start below and invisible
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                }}
            >
                <div
                    ref={containerRef}
                    className="container invisible pointer-events-none"
                />
                <div className='xl:pb-[140px] max-lg:py-5 overflow-hidden' style={{ marginLeft: `${leftOffset}px` }}>
                    <div className='flex flex-col gap-6 xl:gap-[60px]'>
                        <motion.h2 className='text-font65 leading-lh1p07'>Social Media</motion.h2>
                        <div className="">
                            <Swiper
                                className="!overflow-visible"
                                modules={[Autoplay]}
                                autoplay={{
                                    delay: 0,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                freeMode={true}
                                speed={5000} // Slide transition duration (500ms)
                                slidesPerView="auto"
                                loop={true} // Enable infinite looping
                                breakpoints={{
                                    320: { slidesPerView: 2, spaceBetween: 10 },
                                    400: { slidesPerView: 2, spaceBetween: 10 },
                                    640: { slidesPerView: 3, spaceBetween: 10 },
                                    768: { slidesPerView: 3, spaceBetween: 15 },
                                    1024: { slidesPerView: 4, spaceBetween: 25 },
                                    1600: { slidesPerView: 4, spaceBetween: 30 },
                                }}
                            >
                                {data?.portfolio[0].socialMediaImages.map((item, index) => (
                                    <SwiperSlide key={index}>


                                        <div className="flex min-h-[30px] min-w-[30px] bg-[#F2F2F2] duration-200 ease-linear lg:min-h-[50px] lg:min-w-[50px] xl:p-[40px] p-5">
                                            <div className="h-full w-full">
                                                <Image
                                                    src={item}
                                                    alt={item}
                                                    width={700}
                                                    height={500}
                                                    className="duration-200 ease-linear lg:w-full lg:h-full object-cover"
                                                />
                                            </div>
                                        </div>

                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>

    );
};

export default SocialMedia;
