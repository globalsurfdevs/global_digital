"use client"
import { motion } from 'framer-motion';
import { data } from "./data"
import React from 'react'
import Image from "next/image"

export const SuccessStories = () => {
    return (
        <div className='pt-[50px] lg:pt-[50px] flex flex-col   lg:pb-[140px] pb-[52px]'>
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
                <h1 className='title-65 pb-5 lg:pb-[48px]'>Success Stories We&apos;re Proud of</h1>
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
            <div className='grid lg:grid-cols-3 gap-8'>

                {data.map((item,index) => (
                    <div className='flex flex-col ' key={index}>
                        <div className='bg-black h-96 relative mb-4 lg:mb-[31px]'>
                            <Image src={item.image} alt="image" className="absolute object-cover w-full h-full"/>
                        </div>
                        <div className=' '>
                            <Image src={item.companyLogo} alt='logo' className='' />
                        </div>
                        <div className='bg-black h-[.5px] w-full mt-[10px] lg:mt-[32px] mb-[10px] lg:mb-[42px]'>

                        </div>
                        <div>
                            <h4 className='text-font30'>{item.text}</h4>
                        </div>



                    </div>

                ))}
            </div>
            </motion.div>

        </div>
    )
}

