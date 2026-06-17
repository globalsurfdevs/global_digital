"use client";

import { motion } from "framer-motion";
import React from "react";

const SectionCTA = () => {
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
                        <div className="col-span-2 mb-5 xl:mb-0"></div>
                        <div className="col-span-5 w-full">
                            <h2 className="title-65 mb-5 lg:mb-[40px]">Ready to Understand What Performance Marketing Can Deliver for Your Business?</h2>
                            <p className="text-font19 text-[#77787B] mt-4">
                                If you are evaluating performance marketing for your UAE business and want an honest assessment of what it could generate based on your sector, your target audience, and your current digital baseline that conversation starts with a no-obligation audit.
                            </p>

                            <div className="mt-8">
                                <a href="https://www.globalsurf.ae/contact-us">
                                    <button className="text-30 w-fit rounded-full border border-primary px-6 py-3 leading-lh1p66 text-black transition-all duration-300 ease-in hover:bg-primary hover:text-white hover:shadow-lg lg:px-24">
                                        <span className="duration-300 ease-in group-hover:text-black">Talk to Global Surf Digital </span>
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