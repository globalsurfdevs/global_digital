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
           hidden: { opacity: 0, y: 50 }, // Start below and invisible
            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
            }}
              >
        <div className=' pt-[50px] lg:pt-[140px] pb-[60px] lg:pb-[150px] grid grid-cols-1 xl:grid-cols-7 gap-5 lg:gap-10 gap-xl-0'>



                  <div className='col-span-2 text-5xl'>
                      <h2 className='title-65 pb-2'>Our Services Included</h2>

            </div>

            <div className="w-full col-span-5 ps-0 xl:ps-12 text-font30 serv-mn">
  {[
    "Media Strategy Consulting",
    "Campaign Planning & Execution",
    "Audience Targeting & Segmentation",
    "Platform Setup & Optimization",
    "Campaign Execution & Management",
    "A/B Testing & Performance Improvement",
    "Data-Driven Reporting & Analysis",
    "Creative Content Development & Curation",
  ].map((item, index) => (
    <div
      key={index}
      className=" border-t last:border-b "
    >
          <div className='flex py-[15px] lg:py-[34px]  gap-4 md:gap-7  lg:gap-10 group items-center hover:translate-x-2 transition-all duration-300 ease-in-out'>
            <p className="text-gray1 transition-all duration-300 group-hover:text-primary">
            {String(index + 1).padStart(2, "0")}
            </p>
            <div className="consu">
            <p className="text-30 transition-all duration-300 group-hover:text-primary">
            {item}
            </p>
            </div>
          </div>
    </div>
  ))}
</div>


        </div>
        </motion.div>
    </div>
  )
}

export default Services