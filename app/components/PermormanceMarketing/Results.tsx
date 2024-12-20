"use client"
import React from 'react'

import { motion } from 'framer-motion';
const Results = () => {
  return (
    <div className='pb-[50px] lg:pb-[147px]'>
    <div className='container mx-auto py-4'>
        <div className='pt-[50px] lg:pt-[69px]  flex flex-col  '>

          <div className='text-4xl mb-6 lg:mb-[32px]'>
          <motion.div
                    initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                            variants={{
                              hidden: { opacity: 0, y: 50 }, // Start below and invisible
                              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                            }}
                  >
              <h2 className='title-65'>Results</h2>

            </motion.div>
            </div>
            <motion.div
                                initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                        variants={{
                                            hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                            visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }, // Slide up and fade in
                                        }}
                                >
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">

              <div className="bg-black  group text-white hover:cursor-pointer ease-linear duration-300 pb-0 xl:pb-[57px]">
                <div className="bg-gray2 pt-5 pb-6 px-6 lg:pt-[37px] lg:pb-[50px]  md:px-8 md:pt-8 md:pb-8  flex flex-col   group-hover:bg-primary ease-in-out duration-300">
                  <div className="relative  flex flex-col  ">
                    <h3 className="text-30 leading-lh1p66 mb-[14px]">Garden Concept</h3>
                    <h3 className="text-white title-65 leading-lh0p76 mb-[15px] lg:mb-[28px] ">
                    42.66<span>%</span></h3>
                    <h3 className={`fnt-lexend text-font25  leading-lh1p26`}>Increase in Organic Traffic</h3>
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 ease-in-out duration-500">
                      <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.8125 1.7998L1.25977 33.7227" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1.25977 1.7998H33.8125V33.0929" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="text-white flex flex-col pt-6 px-6 md:px-8 md:pt-8 pb-8 ">
                  <h3 className="text-30 mb-[10px] md:mb-[19px]">SEO Overhaul Boosts Visibility and User Engagement  </h3>
                  <p className={`text-19 text-white fnt-lexend  `}>Explore The Garden Concept’s SEO strategy for boosting organic traffic and enhancing user experience through a redesigned website.</p>
                </div>
              </div>

              <div className="bg-black  group text-white hover:cursor-pointer ease-linear duration-300 pb-0 xl:pb-[57px]">
                <div className="bg-gray2 pt-5 pb-6 px-6 lg:pt-[37px] lg:pb-[50px]  md:px-8 md:pt-8 md:pb-8  flex flex-col   group-hover:bg-primary ease-in-out duration-300">
                  <div className="relative  flex flex-col  ">
                    <h3 className="text-30 leading-lh1p66 mb-[14px]">Seleo</h3>
                    <h3 className="text-white title-65 leading-lh0p76 mb-[15px] lg:mb-[28px] ">
                    28<span>X</span></h3>
                    <h3 className={`fnt-lexend text-font25  leading-lh1p26`}>Increase Overall Traffic Growth</h3>
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 ease-in-out duration-500">
                      <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.8125 1.7998L1.25977 33.7227" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1.25977 1.7998H33.8125V33.0929" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="text-white flex flex-col pt-6 px-6 md:px-8 md:pt-8 pb-8">
                  <h3 className="text-30 mb-[10px] md:mb-[19px]">Demand Gen Campaign Drives Unprecedented Growth </h3>
                  <p className={`text-19 text-white fnt-lexend`}>Discover how Seleo achieved remarkable success with a highly targeted Demand Gen campaign, driving a 6,031.30% surge in returning users and a 2,595% increase in new users, significantly expanding its digital presence. </p>
                </div>
              </div>

              <div className="bg-black  group text-white hover:cursor-pointer ease-linear duration-300 pb-0 xl:pb-[57px]">
                  <div className="bg-gray2 pt-5 pb-6 px-6 lg:pt-[37px] lg:pb-[50px]  md:px-8 md:pt-8 md:pb-8  flex flex-col   group-hover:bg-primary ease-in-out duration-300">
                    <div className="relative  flex flex-col  ">
                      <h3 className="text-30 leading-lh1p66 mb-[14px]">Assent Steel </h3>
                      <h3 className="text-white title-65 leading-lh0p76 mb-[15px] lg:mb-[28px] ">
                      2<span>X</span></h3>
                      <h3 className={`fnt-lexend text-font25  leading-lh1p26`}>Increase in Organic Traffic </h3>
                      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 ease-in-out duration-500">
                        <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M33.8125 1.7998L1.25977 33.7227" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                          <path d="M1.25977 1.7998H33.8125V33.0929" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="text-white flex flex-col pt-6 px-6 md:px-8 md:pt-8 pb-8">
                    <h3 className="text-30 mb-[10px] md:mb-[19px]">Enhanced Traffic with Strategic SEO and Google Ads Optimization</h3>
                    <p className={`text-19 text-white fnt-lexend  `}>Explore how Assent Steel regained organic traffic and achieved significant growth by implementing targeted SEO strategies and restructuring Google Ads campaigns for optimal performance. </p>
                  </div>
              </div>

            </div>
            </motion.div>
        </div>
    </div>
    </div>
  )
}

export default Results