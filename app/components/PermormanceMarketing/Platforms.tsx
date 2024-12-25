"use client"
import   twitterx   from '@/public/assets/logos/socialmedia/x.svg'
import   amazon   from '@/public/assets/logos/socialmedia/amazon.svg'
import   google   from '@/public/assets/logos/socialmedia/google.svg'
import   linkedin   from '@/public/assets/logos/socialmedia/linkedin.svg'
import   meta   from '@/public/assets/logos/socialmedia/meta.svg'
import   ticktok   from '@/public/assets/logos/socialmedia/ticktok.svg'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion';

const Platforms = () => {
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
                      <h2 className='title-65'>Our Platforms</h2>
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
                {[ // List of items for mapping
                    { icon: google, title: "Google Marketing", description: "We dig into your business through a comprehensive assessment. You get an in-depth report on what’s working, what’s." },
                    { icon: linkedin, title: "LinkedIn Ads", description: "Unlock the number one B2B social platform to reach and engage your target audience. With LinkedIn Ads management, you can run." },
                    { icon: twitterx, title: "X Ads", description: "Reach over 500 million users and tap into the power of real-time marketing with Twitter Advertising." },
                    { icon: amazon, title: "Amazon Ads", description: "We dig into your business through a comprehensive assessment. You get an in-depth report on what’s working, what’s." },
                    { icon: ticktok, title: "TikTok Ads", description: "Get noticed on this highly-targeted, fresh platform with video and image ads that are designed to capture the attention." },
                    { icon: meta, title: "Meta Ads", description: "Capture the attention and interest of potential customers on Facebook, the world’s leading social media channel." },
                ].map((item, index) => (
                    <div
                    key={index}
                    className="flex flex-col group transition-all duration-300  "
                    >
                    <div className="flex gap-3 items-center">
                        <Image src={item.icon} alt="icon" className='w-[25px] lg:w-auto'/>
                        <h3 className="text-30 transition-colors duration-300 group-hover:text-primary">
                        {item.title}
                        </h3>
                    </div>

                    <div className="relative h-[1px] bg-black rounded-xl mt-5 mb-5 lg:mt-[30px] lg:mb-[43px] overflow-hidden">
                    <div className="absolute inset-0 bg-primary scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                    </div>


                    <div>
                        <p className="text-19 fnt-lexend text-gray1 group-hover:text-gray-700 transition-colors duration-300">
                        {item.description}
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