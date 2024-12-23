"use client"
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion';
import logo1  from '../../../public/assets/logos/boost.svg'
import logo2  from '../../../public/assets/logos/engage.svg'
import logo3  from '../../../public/assets/logos/convert.svg'
import logo4  from '../../../public/assets/logos/save.svg'

const Boost = () => {
  return (
    <div className='bg-dgray'>
        <div className='container max-auto py-4'>

            <div className='pb-[50px] lg:pb-[157px] pt-[50px] lg:pt-[111px]'>

            <motion.div
                          initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                  variants={{
                                    hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                  }}
                        >
                <h2 className='title-65'>Boost. Engage. Convert. Save.</h2>
            </motion.div>
            <motion.div
                                initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                        variants={{
                                            hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                            visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }, // Slide up and fade in
                                        }}
                                >
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8  pt-8 lg:pt-[58px]'>

                    <div className='flex flex-col  '>

                        <div className='pb-[20px] md:pb-[65px] border-gray-500 imsr'>
                            <Image src={logo1} alt='image'/>
                        </div>

                        <div className='h-[1px] w-full bg-gray-500 rounded-xl'>

                        </div>

                        <div className='pt-[17px] md:pt-[53px] '>
                            <h3 className='text-30'>Enhance Visibility & Recognition</h3>
                        </div>

                    </div>

                    <div className='flex flex-col '>

                        <div className='pb-[20px] md:pb-[65px] border-gray-500 imsr'>
                            <Image src={logo2} alt='image'/>
                        </div>

                        <div className='h-[1px] w-full bg-gray-500 rounded-xl'>

                        </div>

                        <div className='pt-[17px] md:pt-[53px] '>
                            <h3 className='text-30'>Drive More Visitors & Increase Interactions </h3>
                        </div>

                    </div>

                    <div className='flex flex-col '>

                        <div className='pb-[20px] md:pb-[65px] border-gray-500 imsr'>
                            <Image src={logo3} alt='image'/>
                        </div>

                        <div className='h-[1px] w-full bg-gray-500 rounded-xl'>

                        </div>

                        <div className='pt-[17px] md:pt-[53px] '>
                            <h3 className='text-30'>Grow Your Customer Base with Ease</h3>
                        </div>

                    </div>

                    <div className='flex flex-col '>

                        <div className='pb-[20px] md:pb-[65px] border-gray-500 imsr'>
                            <Image src={logo4} alt='image'/>
                        </div>

                        <div className='h-[1px] w-full bg-gray-500 rounded-xl'>

                        </div>

                        <div className='pt-[17px] md:pt-[53px] '>
                            <h3 className='text-30'>Big Results, Smarter Spending </h3>
                        </div>

                    </div>

                </div>
            </motion.div>

            </div>

        </div>
    </div>
  )
}

export default Boost