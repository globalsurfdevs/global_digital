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
                    hidden: { opacity: 0, y: 100 }, // Start below and invisible
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                  }}
        >
                    <h1 className='title-65 pb-[40px] lg:pb-[58px]'>The Framework for Achieving More</h1>
                    </motion.div>
                </div>
                <motion.div
                        initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                variants={{
                                    hidden: { opacity: 0, y: 150 }, // Start below and invisible
                                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                }}
                        >
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10'>

                            <div className='border-t  flex flex-col pt-10 border-black'>
                                <div className='bg-primary w-[50px] h-[50px] flex items-center justify-center mb-8'>
                                <p className='text-white text-30'>01</p>
                                </div>
                                <div className='text-2xl'>

                                <p className='text-30 pb-6 text-black'>Insightful Business Analysis</p>
                                </div>
                                <div>
                                    <p className='fnt-lexend text-gray1 text-19 font-medium'>We dive deep into your business to uncover what drives success,
                                        identify gaps, and pinpoint opportunities for exponential growth. </p>
                                </div>
                            </div>

                            <div className='border-t  flex flex-col pt-10 border-black'>
                                <div className='bg-primary w-[50px] h-[50px] flex items-center justify-center  mb-8'>
                                <p className='text-white text-30'>02</p>
                                </div>
                                <div className='text-2xl'>
                                <p className='text-30 pb-6 text-black'>Tailored Performance Strategies </p>
                                </div>
                                <div>
                                    <p className='fnt-lexend text-gray1 text-19 font-medium'>Custom-crafted marketing blueprints designed to align with your objectives and deliver measurable results across every channel. </p>
                                </div>
                            </div>

                            <div className='border-t  flex flex-col pt-10 border-black'>
                                <div className='bg-primary w-[50px] h-[50px] flex items-center justify-center  mb-8'>
                                <p className='text-white text-30'>03</p>
                                </div>
                                <div className='text-2xl'>
                                <p className='text-30 pb-6 text-black'>Seamless Campaign Execution</p>
                                </div>
                                <div>
                                    <p className='fnt-lexend text-gray1 text-19 font-medium'>From launch to optimization, we ensure your campaigns deliver peak performance with data-driven adjustments. </p>
                                </div>
                            </div>

                            <div className='border-t  flex flex-col pt-10 border-black'>
                                <div className='bg-primary w-[50px] h-[50px] flex items-center justify-center  mb-8'>
                                    <p className='text-white text-30'>04</p>
                                </div>
                                <div className='text-2xl'>
                                <p className='text-30 pb-6 text-black'>Continuous Growth Tracking</p>
                                </div>
                                <div>
                                    <p className='fnt-lexend text-gray1 text-19 font-medium'>We measure success, refine strategies, and keep you on an upward trajectory toward sustained profitability. </p>
                                </div>
                            </div>

                        </div>
                </motion.div>

            </div>
        </div>
    </div>
  )
}

export default Framework