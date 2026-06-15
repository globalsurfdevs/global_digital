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
                    <div className="grid grid-cols-1 gap-4">
                        <div className="col-span-2 mb-5 xl:mb-0"></div>
                        <div className="col-span-5 w-full">

                            <p className="text-font19 text-[#77787B] mt-4">
                                Working on search engine visibility for your construction brand in the UAE?{" "}
                                <a
                                    href="https://www.globalsurf.ae/seo-agency-dubai"
                                    className="text-primary hover:underline "
                                >
                                    GS Digital is an SEO agency in Dubai
                                </a>{" "}
                                that helps built environment companies turn construction SEO into qualified
                                enquiries, not just traffic. If your site is ranking for the wrong terms, or not
                                ranking at all, we can show you where the gap is.
                            </p>

                            <div className="mt-8">
                                <a href="https://www.globalsurf.ae/contact-us">
                                    <button className="text-30 w-fit rounded-full border border-primary px-6 py-3 leading-lh1p66 text-black transition-all duration-300 ease-in hover:bg-primary hover:text-white hover:shadow-lg lg:px-24">
                                        <span className="duration-300 ease-in group-hover:text-black">Get in touch with GS Digital</span>
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