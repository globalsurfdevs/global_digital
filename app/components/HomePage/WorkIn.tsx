"use client"

import React from 'react'
import WorkSwiper from './WorkSwiper'
import { motion } from 'framer-motion'

const WorkIn = () => {

  return (
    <div className='bg-gray-100 overflow-hidden'>
       <motion.div
          initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                  variants={{
                    hidden: { opacity: 0, y: 50 }, // Start below and invisible
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                  }}
        >
      <div className='container mx-auto px-4 py-4 !overflow-visible'>
        <div className='py-[50px] lg:py-[140px]  flex flex-col gap-12 xl:gap-[90px] home-slide'>
          <motion.h1  className='text-font65 leading-lh1p07'>We Work In</motion.h1>
          <WorkSwiper />
        </div>
        </div>
        </motion.div>
    </div>
  )
}

export default WorkIn