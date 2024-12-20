"use client"
import React from 'react'
import Button from '../Button/Button'
import { motion } from 'framer-motion';

const GetInTouch = () => {
  return (
      <div className="flex flex-col bg-black py-[50px] lg:py-[150px]">
      <div className="container px-4 mx-auto text-white">
        <div className="flex flex-col justify-center h-1/3 ">

      <motion.div
                  initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                          variants={{
                            hidden: { opacity: 0, y: 50 }, // Start below and invisible
                            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                          }}
                >
              <h2 className="title-65 leading-[1.15]">
                <span className="text-primary">Get in touch </span>today to discuss how we can help your brand stay ahead
              </h2>
          </motion.div>

      <motion.div
                  initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                          variants={{
                            hidden: { opacity: 0, y: 50 }, // Start below and invisible
                            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                          }}
                >
          <div className='mt-10 lg:mt-[57px]'><Button text='LET&apos;S TALK GROWTH' /></div>

          </motion.div>
            </div>
          </div>
        </div>
  )
}

export default GetInTouch