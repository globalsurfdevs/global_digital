"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { moveUp } from "../../animations/motionVariants";

const LogoSlider = ({ data }: any) => {
    const logos = data?.logos || [];
    // duplicate the list so the marquee can loop seamlessly
    const track = [...logos, ...logos];

    const sliderRef = useRef<HTMLDivElement>(null);
    const [rightBleed, setRightBleed] = useState(0);

    useEffect(() => {
        const updateBleed = () => {
            if (!sliderRef.current) return;
            const rect = sliderRef.current.getBoundingClientRect();
            const gap = window.innerWidth - rect.right;
            setRightBleed(gap > 0 ? gap : 0);
        };

        updateBleed();
        window.addEventListener("resize", updateBleed);
        return () => window.removeEventListener("resize", updateBleed);
    }, [logos.length]);

    return (
        <section className="bg-white py-120 overflow-hidden">
            <motion.div
                variants={moveUp(0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="container"
            >
                <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[auto_1fr] lg:gap-12 xl:gap-16">
                    {/* Label */}
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-5 bg-primary"></div>
                        <p className="text-28 uppercase text-muted">
                            {data?.label}
                        </p>
                    </div>

                    {/* Slider - bleeds to the right edge of the viewport, left stays put */}
                    <div
                        ref={sliderRef}
                        className="relative overflow-hidden"
                        style={{ marginRight: -rightBleed }}
                    >
                        {/* edge fades so logos disappear/appear smoothly */}
                        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

                        <motion.div
                            className="flex w-max gap-4"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                duration: Math.max(logos.length * 4, 10),
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            {track.map((logo: any, index: number) => (
                                <div
                                    key={`${logo._id}-${index}`}
                                    className="flex h-[96.42px] w-[203.7px] shrink-0 items-center justify-center bg-[#F5F5F5] px-6 rounded-[8px]"
                                >
                                    <Image
                                        src={logo.image}
                                        alt={logo.alt || logo.name}
                                        width={110}
                                        height={40}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default LogoSlider;