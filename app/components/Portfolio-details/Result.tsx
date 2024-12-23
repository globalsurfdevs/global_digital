"use client"
import { motion } from 'framer-motion';
import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'
import Button from '../Button/Button'
import { SuccessStories } from '../SuccessStories/SuccessStories'

const Result = () => {
  return (
    <div className='container mx-auto py-4'>
          <div className='pb-[50px] lg:pb-[143px] flex flex-col gap-4 lg:gap-[30px]'>
          <motion.div
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                              variants={{
                                hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                }}
                                      >
            <div>
                <h1 className='title-65 mb-3 lg:mb-5'>Result</h1>
            </div>
            <div className='pl-4 lg:pl-5'>
                <ul className='list-disc flex flex-col gap-4 lg:gap-8 text-19 text-gray1 fnt-lexend'>
                    <li>Optimized SEO strategy and keywords to drive a 107.3% increase in new user traffic and a 125.5% boost in page views.</li>
                    <li>Redesigned the website and optimized user flow, resulting in a 102.35% increase in engaged sessions and a 125.5% boost in user engagement.</li>
                    <li>Revamped marketing materials with updated design and messaging to boost brand visibility and strengthen brand perception.</li>
                </ul>
            </div>
            </motion.div>
        </div>

        <motion.div className='grid grid-cols-2  mx-auto   gap-5'
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                              variants={{
                                hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                visible: { opacity: 1, y: 0, transition: { duration: 1.3, ease: "easeOut" } }, // Slide up and fade in
                                }}
                                      >
            <div>
                <Image src={assets.suscom} alt='image'/>
            </div>

            <div>
                <Image src={assets.tablemockup} alt='image'/>
            </div>
            </motion.div>

            <motion.div
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                              variants={{
                                hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                visible: { opacity: 1, y: 0, transition: { duration: 1.3, ease: "easeOut" } }, // Slide up and fade in
                                }}
                                      >
        <div className='lg:pt-[136px] lg:pb-[150px] py-[50px] border-b flex flex-col  '>
            <h1 className='title-65 lg:pb-[30px] pb-3'>Lets Create Something Iconic Together</h1>
            <p className='text-19 text-gray1 mb-0 lg-mb-[64px] fnt-lexend'>Every great brand has a story. See how we’ve turned challenges into triumphs for our clients. Your brand could be next. </p>
                <div className='mt-[20px] lg:mt-[64px] innerfnont'><Button text='LET&apos;S COLLABORATE' /></div>
              </div>

            </motion.div>

        <div>
            <SuccessStories/>
        </div>

    </div>
  )
}

export default Result