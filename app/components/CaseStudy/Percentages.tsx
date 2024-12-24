"use client"
import { motion } from 'framer-motion';
import React from 'react'

const Percentages = () => {
  return (
          <motion.div className='bg-black'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                    variants={{
                      hidden: { opacity: 0, y: 50 }, // Start below and invisible
                      visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                      }}
                            >
        <div className='container mx-auto py-4'>


            <motion.div className='lg:pt-[110px]  lg:pb-[141px] py-[50px] grid lg:grid-cols-2 lg:gap-[300px] gap-[45px]'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                    variants={{
                      hidden: { opacity: 0, y: 50 }, // Start below and invisible
                      visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                      }}
                            >
            <div className='flex flex-col justify-between lg:gap-14 lg:gap-[100px] gap-[45px]'>
                <div className='flex flex-col group'>
                    <h3 className='text-primary title-65 pb-[15px] lg:pb-[19px] duration-500 group-hover:-translate-y-1'>30.43%</h3>
                    <div className='w-full bg-gray1 rounded-xl h-[1px] mb-[15px] lg:mb-[33px] duration-300 group-hover:-translate-y-1'></div>
                    <h3 className='text-white text-30 duration-500 group-hover:-translate-y-2'>Increase in Avg. Page Speed</h3>
                </div>

                <div className='flex flex-col group'>
                    <h3 className='text-primary title-65 pb-[15px] lg:pb-[19px] duration-500 group-hover:-translate-y-1'>2X</h3>
                    <div className='w-full bg-gray1 rounded-xl h-[1px] mb-[15px] lg:mb-[33px] duration-300 group-hover:-translate-y-1'></div>
                    <h3 className='text-white text-30 duration-500 group-hover:-translate-y-2'>Increase in Session Duration</h3>
                </div>

            </div>

            <div className='flex flex-col justify-between lg:gap-24 lg:gap-[100px] gap-[45px]'>
                <div className='flex flex-col group'>
                    <h3 className='text-primary title-65 pb-[15px] lg:pb-[19px] duration-500 group-hover:-translate-y-1'>88.20%</h3>
                    <div className='w-full bg-gray1 rounded-xl h-[1px] mb-[15px] lg:mb-[33px] duration-300 group-hover:-translate-y-1'></div>
                    <h3 className='text-white text-30 duration-500 group-hover:-translate-y-2'>Increase in Returning Users</h3>
                    </div>


                <div className='flex flex-col group'>
                    <h3 className='text-primary title-65 pb-[15px] lg:pb-[19px] duration-500 group-hover:-translate-y-1'>30X</h3>
                    <div className='w-full bg-gray1 rounded-xl h-[1px] mb-[15px] lg:mb-[33px] duration-300 group-hover:-translate-y-1'></div>
                    <h3 className='text-white text-30 duration-500 group-hover:-translate-y-2'>Increase in Avg. Page Speed</h3>
                </div>

            </div>

            </motion.div>


        </div>

</motion.div>
  )
}

export default Percentages