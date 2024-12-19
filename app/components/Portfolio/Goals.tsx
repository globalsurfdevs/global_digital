"use client"
import { motion } from 'framer-motion';
import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'

const Goals = () => {
    return (
        <>
            <div className='container mx-auto py-4'>
                <motion.div className='grid grid-cols-2 gap-5 pt-150 pb-150'
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                              variants={{
                                hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                }}
                                      >
                    <div>
                        <Image src={assets.goalspic1} alt='image1' />
                    </div>
                    <div>
                        <Image src={assets.goalspic2} alt='image2' />
                        </div>

              </motion.div>

                <div className='pb-[50px] lg:pb-150 '>

                         <motion.div className='grid lg:grid-cols-2 border-t border-clrE6E6E6  lg:pt-[50px] lg:pb-[95px] py-[50px]'
                                       initial="hidden"
                                       whileInView="visible"
                                       viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                       variants={{
                                         hidden: { opacity: 0, y: 80 }, // Start below and invisible
                                         visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                         }}>
                        <div className='col-span-1 flex'>
                            <h1 className='text-font65'>Goals</h1>
                        </div>
                        <div className='text-font19 pt-2 lg:pl-5'>
                            <p className='text-19 text-gray1 fnt-lexend'>Innovo Group partnered with Global Surf to achieve several key objectives for their website.
                                The primary goal was to create a website that visually and thematically aligned with Innovo’s
                                innovative brand identity. Additionally, Innovo sought to improve website speed and reduce loading
                                times, enhance user experience to retain visitors longer, and increase conversions by attracting
                                more new users while maintaining a consistent user base.</p>
                            </div>
                        </motion.div>

                    <motion.div className='grid lg:grid-cols-2 border-t lg:pt-[50px] pt-[50px]'
                                       initial="hidden"
                                       whileInView="visible"
                                       viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                       variants={{
                                         hidden: { opacity: 0, y: 80 }, // Start below and invisible
                                         visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                         }}>
                        <div className='col-span-1 flex'>
                            <h1 className='text-font65'>Objectives</h1>
                        </div>
                        <div className='text-font19 pt-2 lg:pl-5'>
                            <p className='text-19 text-gray1 fnt-lexend'>To address goals, Global Surf conducted an in-depth analysis of the website&apos;s performance and speed.
                                We implemented structural changes, optimized the code, and compressed media files to enhance site efficiency.
                                Additionally, Global Surf uplifted the brand image by incorporating high-quality branding materials, ensuring
                                a consistent and professional appearance across all touchpoints.</p>
                        </div>
                        </motion.div>
                </div>

            </div>

            <div className=''>
                <motion.div
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                              variants={{
                                hidden: { opacity: 0, y: 100 }, // Start below and invisible
                                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                }}
                                      >
                    <Image src={assets.webmock} alt='web-mockup' />
                    </motion.div>
            </div>

            <div className='container mx-auto py-4'>
                         <motion.div
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                              variants={{
                                hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                }}
                                      >
                <div className='grid lg:grid-cols-2 lg:space-x-5  py-[50px] space-y-5 md:space-y-0 lg:py-[150px]'>

                    <div className='bg-dgray flex flex-col w-full pt-5 lg:pt-[70px] pb-5 lg:pb-[91px]  lg:px-[80px] px-5'>
                        <div>
                            <h1 className='title-65 mb-[15px] lg:mb-[30px]'>Challenge</h1>
                        </div>
                        <div >
                            <p className='text-gray1 text-19 fnt-lexend'>Redesigning the website brought several challenges. Migrating from an outdated CMS without
                                disruptions was complex, especially given its limitations. Ensuring cross-browser and mobile
                                compatibility, preserving existing organic traffic, and integrating new branding materials
                                for a consistent brand experience were all essential. With a product launch looming, we delivered
                                efficiently within tight deadlines</p>
                        </div>
                    </div>

                    <div className='bg-dgray flex flex-col w-full pt-5 lg:pt-[70px] pb-5 lg:pb-[91px]  lg:px-[80px] px-5'>
                        <div>
                            <h1 className='title-65 mb-[15px] lg:mb-[30px]'>Solutions</h1>
                        </div>
                        <div className='pl-4'>
                            <ul className='list-disc flex flex-col gap-[30px] text-19 text-gray1 fnt-lexend'>
                                <li>Implemented a more robust website platform to enhance scalability and security, resulting in a 50% reduction in downtime and a 30% increase in website performance.</li>
                                <li>Addressed security vulnerabilities to improve load times and resolve issues that had previously compromised secure browsing</li>
                                <li>Enhanced brand consistency by integrating updated branding materials across all digital platforms, ensuring a cohesive and professional brand presence.</li>
                            </ul>
                        </div>
                    </div>


                    </div>
                    </motion.div>
            </div>

        </>

    )
}

export default Goals