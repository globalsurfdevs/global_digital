"use client"
import React from 'react'
import { motion } from 'framer-motion';

const Framework = () => {
  return (
    <div className='bg-dgray '>
        <div className='container mx-auto py-4'>
            <div className='py-[50px] lg:py-[111px] flex flex-col '>

                  <div className='text-4xl'>
                  <motion.div
          initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                  variants={{
                    hidden: { opacity: 0, y: 50 }, // Start below and invisible
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                  }}
        >
                    <h2 className='title-65 pb-6 lg:pb-[58px]'>The Framework for Achieving More</h2>
                    </motion.div>
                </div>
                <motion.div
                        initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                variants={{
                                    hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }, // Slide up and fade in
                                }}
                        >
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-10'>
                            {[
                                {
                                number: "01",
                                title: "Insightful Business Analysis",
                                description:
                                    "We dive deep into your business to uncover what drives success, identify gaps, and pinpoint opportunities for exponential growth.",
                                },
                                {
                                number: "02",
                                title: "Tailored Performance Strategies",
                                description:
                                    "Custom-crafted marketing blueprints designed to align with your objectives and deliver measurable results across every channel.",
                                },
                                {
                                number: "03",
                                title: "Seamless Campaign Execution",
                                description:
                                    "From launch to optimization, we ensure your campaigns deliver peak performance with data-driven adjustments.",
                                },
                                {
                                number: "04",
                                title: "Continuous Growth Tracking",
                                description:
                                    "We measure success, refine strategies, and keep you on an upward trajectory toward sustained profitability.",
                                },
                            ].map((item, index) => (
                                <div
                                key={index}
                                className='flex flex-col    relative group overflow-hidden'
                              >
                                    {/* Animated Red Border */}
                                    <div className="relative h-[1px] bg-black rounded-xl  overflow-hidden">
                                    <div className="absolute inset-0 bg-primary scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                                    </div>
                                <div className='bg-primary mb-4 lg:mb-8 mt-6  lg:mt-10 w-[50px] h-[50px] flex   items-center justify-center  transition-transform duration-500'>
                                  <p className='text-white  transition-transform duration-500 text-30'>{item.number}</p>
                                </div>
                                <div className='text-2xl'>
                                  <p className='text-30 pb-3 lg:pb-6 text-black'>{item.title}</p>
                                </div>
                                <div>
                                  <p className='fnt-lexend text-gray1 text-19 font-medium'>{item.description}</p>
                                </div>
                              </div>

                            ))}
                            </div>

                </motion.div>

            </div>
        </div>
    </div>
  )
}

export default Framework