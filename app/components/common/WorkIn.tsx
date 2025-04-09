"use client"

import React from 'react'
import { motion } from 'framer-motion'
import WorkSwiper from './WorkSwiper'

const WorkIn = () => {

  return (
    <div className=' overflow-hidden'>
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
        <div className='  flex flex-col gap-12 xl:gap-[90px] home-slide'>
          <motion.h2  className='text-font65 leading-lh1p07'>Web Development Technology Stack </motion.h2>
          <WorkSwiper />
        </div>
        </div>
        </motion.div>
    </div>
  )
}

export default WorkIn