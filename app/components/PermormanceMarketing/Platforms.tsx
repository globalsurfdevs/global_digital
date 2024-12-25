"use client"

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion';
interface PlatformsItem {
  id: number;
  icon: string;
  title: string;
  dec: string;
}

interface PlatformsSectionProps {
  title: string;
  data: PlatformsItem[];
}

const Platforms: React.FC<PlatformsSectionProps> = ({ title, data }) => {
  return (
    <div className='container mx-auto py-4'>
        <div className='bg-dgray flex flex-col gap-7 lg:gap-12 p-[25px] lg:p-[100px]'>

              <div >
                  <motion.div
                                      initial="hidden"
                                              whileInView="visible"
                                              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                              variants={{
                                                hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                              }}
                                    >
                      <h2 className='title-65'>{title} </h2>
                      </motion.div>
            </div>

            <motion.div initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                        variants={{
                                            hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                            visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }, // Slide up and fade in
                                        }} >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 lg:gap-y-[95px] gap-y-[45px]">

                        {data.map((platform) => (
                    <div
                    key={platform.id}
                    className="flex flex-col group transition-all duration-300  "
                    >
                    <div className="flex gap-3 items-center">
                        <Image src={platform.icon} alt="icon" className='w-[25px] lg:w-auto'/>
                        <h3 className="text-30 transition-colors duration-300 group-hover:text-primary">
                        {platform.title}
                        </h3>
                    </div>

                    <div className="relative h-[1px] bg-black rounded-xl mt-5 mb-5 lg:mt-[30px] lg:mb-[43px] overflow-hidden">
                    <div className="absolute inset-0 bg-primary scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                    </div>


                    <div>
                        <p className="text-19 fnt-lexend text-gray1 group-hover:text-gray-700 transition-colors duration-300">
                        {platform.dec}
                        </p>
                    </div>
                    </div>
                ))}
                </div>

                            </motion.div>

                        </div>
                    </div>
                )
                }

                export default Platforms