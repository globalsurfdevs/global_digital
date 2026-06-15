"use client";

import { motion } from "framer-motion";
import React from "react";

const SectionThree = () => {
    const steps = [
        {
            number: "1",
            heading: "Start with the winnable terms, not the head terms",
            body: (
                <>
                    On a site that is not yet optimised, ranking for a fiercely contested head term is not
                    realistic in the early months. Begin with keyword research that surfaces specific,
                    lower-competition terms you can genuinely win, build authority, and work toward the harder
                    terms over time. This is the heart of <a
                        href="https://www.globalsurf.ae/b2b-seo-agency-dubai"
                        className="text-inherit underline underline-offset-2 hover:opacity-70 transition-opacity"
                    >
                        B2B SEO for construction companies
                    </a>

                </>
            ),
        },
        {
            number: "2",
            heading: "Build a dedicated page for each capability",
            body: 'Give every core service its own page, with real depth and the detail a serious buyer expects. Then do the same for the locations you work in, so a search like "warehouse construction Dubai South" has a page built to match it.',
        },
        {
            number: "3",
            heading: "Fix the technical foundations in parallel",
            body: "This is the technical SEO that construction websites most often neglect: site speed, mobile performance, crawlability, and clean structure, fixed alongside the content work. These basics decide whether your good pages are allowed to rank at all.",
        },
        {
            number: "4",
            heading: "Write pages that prove real expertise",
            body: "A page that simply names a service ranks for very little. The pages that win show the work: project types, scope, materials, certifications, and the kind of specific detail a buyer recognises as the real thing. Search engines and AI tools increasingly reward content that clearly comes from people who do this work, not general filler that exists everywhere.",
        },
        {
            number: "5",
            heading: "Turn your site into the industry go-to source",
            body: "The larger goal is to make your website the place people in your sector turn to for both services and answers. As that authority builds, rankings, traffic, and enquiries follow. It is slower than paid ads, but it lasts. Ads stop the moment you stop paying, while a page that earns its position keeps working for years.",
        },
    ];

    return (
        <section>
            <div className="container mx-auto pt-[50px] lg:pt-[100px]">
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

                            <h2 className="title-65 mb-[40px]">
                                How to Rank for High-Intent B2B Keywords: A Practical Approach
                            </h2>
                            <p className="text-font19 text-[#77787B] mt-4">
                                Ranking for these terms follows a clear sequence. It is the{" "}
                                <a
                                    href="https://www.globalsurf.ae/industry/construction"
                                    className="text-primary hover:underline"
                                >
                                    construction SEO strategy
                                </a>{" "}
                                we have refined across years of SEO work for built environment brands in the UAE,
                                and the order matters as much as the steps.
                            </p>

                            {steps.map((step) => (
                                <div key={step.number}>
                                    <h3 className="text-[30px] mb-2 mt-4">
                                        {step.number}. {step.heading}
                                    </h3>
                                    <p className="text-font19 text-[#77787B] mt-4">{step.body}</p>
                                </div>
                            ))}

                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SectionThree;