"use client"
import React from 'react'
import { motion } from 'framer-motion';

const Services = () => {
  return (
      <div className='container mx-auto py-4'>
          <motion.div  initial="hidden"
            whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
            variants={{
           hidden: { opacity: 0, y: 100 }, // Start below and invisible
            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
            }}
              >
        <div className=' pt-[50px] lg:pt-[140px] pb-[60px] lg:pb-[150px] grid grid-cols-1 xl:grid-cols-7 gap-10 gap-xl-0'>



                  <div className='col-span-2 text-5xl'>
                      <h1 className='title-65'>Our Services Included</h1>

            </div>

            <div className='w-full col-span-5 ps-0 xl:ps-12 text-font30 serv-mn'>

                <div className='flex gap-10 py-[34px] border-t border-b'>
                    <p className='text-gray1'>01</p>
                    <div className='consu'><p>Media Strategy Consulting</p></div>
                </div>

                <div className='flex gap-10 py-[34px] border-t border-b'>
                <p className='text-gray1'>02</p>
                    <div className='consu'><p>Campaign Planning & Execution</p></div>
                </div>

                <div className='flex gap-10 py-[34px] border-t border-b'>
                <p className='text-gray1'>03</p>
                    <div  className='consu'><p>Audience Targeting & Segmentation</p></div>
                </div>

                <div className='flex gap-10 py-[34px] border-t border-b'>
                <p className='text-gray1'>04</p>
                    <div  className='consu'><p>Platform Setup & Optimization</p></div>
                </div>

                <div className='flex gap-10 py-[34px] border-t border-b'>
                <p className='text-gray1'>05</p>
                    <div  className='consu'><p>Campaign Execution & Management</p></div>
                </div>

                <div className='flex gap-10 py-[34px] border-t border-b'>
                <p className='text-gray1'>06</p>
                    <div  className='consu'><p>A/B Testing & Performance Improvement</p></div>
                </div>

                <div className='flex gap-10 py-[34px] border-t border-b'>
                <p className='text-gray1'>07</p>
                    <div  className='consu'><p>Data-Driven Reporting & Analysis</p></div>
                </div>

                <div className='flex gap-10 py-[34px] border-t border-b'>
                <p className='text-gray1'>08</p>
                    <div  className='consu'><p>Creative Content Development & Curation</p></div>
                </div>

              </div>

        </div>
        </motion.div>
    </div>
  )
}

export default Services