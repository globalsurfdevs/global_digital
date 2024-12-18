"use client"
import React from 'react'
import TestimonialsSwiper from './TestimonialsSwiper';
import { motion } from 'framer-motion';

const Testimonials = () => {
  return (
    <div className='bg-bglight'>
      <div className="container px-4 mx-auto ">
        <div className="py-[50px] md:py-10 lg:py-12 xl:pt-[138px] xl:pb-[110px]">
        <motion.div
          initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                  variants={{
                    hidden: { opacity: 0, y: 100 }, // Start below and invisible
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                  }}
        >
            <h1 className="title-65">What they say about us</h1>

        </motion.div>
          <div>
          <motion.div
          initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                  variants={{
                    hidden: { opacity: 0, y: 150 }, // Start below and invisible
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                  }}
        >
              <TestimonialsSwiper />

        </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials