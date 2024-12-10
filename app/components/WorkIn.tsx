"use client"

import React from 'react'
import WorkSwiper from './WorkSwiper'
import { motion } from 'framer-motion'

const WorkIn = () => {

  return (
    <div className='bg-gray-100 overflow-hidden'>
      <div className='container mx-auto px-4 py-4 !overflow-visible'>
        <div className='py-10 lg:py-12 xl:py-20 flex flex-col gap-12 xl:gap-24'>
          <motion.h1 initial={{ x: "-100%" }} whileInView={{ x: 0 }} transition={{ duration: 1, ease: "easeInOut" }} viewport={{ once: true }} className='text-font65 leading-lh1p07'>We Work In</motion.h1>
          <WorkSwiper />
        </div>
      </div>
    </div>
  )
}

export default WorkIn