"use client"
import { motion } from 'framer-motion';
import React from 'react'

const Goals = () => {
  return (
    <div className='container mx-auto py-4'>
        <div className='lg:py-[150px] py-[50px]'>


              <motion.div className='grid lg:grid-cols-2 border-t  lg:pt-[53px] lg:pb-[95px] pt-[50px] pb-[25px]'
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
               variants={{
                 hidden: { opacity: 0, y: 50 }, // Start below and invisible
                 visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                 }}>
                      <div className='col-span-1 flex'>
                <h2 className='title-65'>Goals</h2>
            </div>
            <div className=' pt-3 lg:pl-5'>
                <p className='text-19 text-gray1 fnt-lexend' >Innovo Group partnered with Global Surf to achieve several key objectives for their website.
                The primary goal was to create a website that visually and thematically aligned with Innovo’s
                innovative brand identity. Additionally, Innovo sought to improve website speed and reduce loading
                times, enhance user experience to retain visitors longer, and increase conversions by attracting
                more new users while maintaining a consistent user base.</p>
                      </div>

        </motion.div>
              <motion.div className='grid lg:grid-cols-2 border-t   lg:pt-[53px] lg:pb-[95px] py-[25px]'
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
               variants={{
                 hidden: { opacity: 0, y: 50 }, // Start below and invisible
                 visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                 }}>
            <div className='col-span-1 flex'>
                <h2 className='title-65'>Objectives</h2>
            </div>
            <div className='text-font19 pt-3 lg:pl-5'>
                <p className='text-19 text-gray1 fnt-lexend '>To address goals, Global Surf conducted an in-depth analysis of the website&apos;s performance and speed.
                We implemented structural changes, optimized the code, and compressed media files to enhance site efficiency.
                Additionally, Global Surf uplifted the brand image by incorporating high-quality branding materials, ensuring
                a consistent and professional appearance across all touchpoints.</p>
            </div>
            </motion.div>


              <motion.div className='grid lg:grid-cols-2 border-t lg:pb-[0px] lg:pt-[95px] py-[25px] pb-[0px]'
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
               variants={{
                 hidden: { opacity: 0, y: 50 }, // Start below and invisible
                 visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                 }}>
            <div className='col-span-1 flex'>
                <h2 className='title-65'>Challenge</h2>
            </div>
            <div className=' pt-3 lg:pl-5'>
                <p className='text-19 text-gray1 fnt-lexend'>Redesigning the website brought several challenges. Migrating from an outdated CMS without disruptions was complex,
                especially with its limitations. Ensuring cross-browser and mobile compatibility, preserving existing organic traffic,
                and integrating new branding materials, for a consistent brand experience were all essential. With a product launch
                looming, we delivered efficiently within tight deadlines.</p>
            </div>
            </motion.div>

        <motion.div className='grid lg:grid-cols-2 lg:space-x-5  space-y-5 md:space-y-0 pt-[50px] lg:pt-[146px] gap-2 lg:gap-[0px]'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                    variants={{
                      hidden: { opacity: 0, y: 50 }, // Start below and invisible
                      visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                      }}
                            >
            <div className='bg-dgray flex flex-col w-full   gap-4 lg:gap-[41px] lg:p-[75px] p-6'>
            <div>
                <h2 className='title-65'>Overcoming Challenges</h2>
            </div>
            <div className='pl-4'>
                <ul className='list-disc flex flex-col gap-4 text-font19'>
                    <li className='text-gray1 fnt-lexend'>Implemented a more robust website platform to enhance scalability and security, resulting in a 50% reduction in downtime and a 30% increase in performance.</li>
                    <li className='text-gray1 fnt-lexend'>Addressed security vulnerabilities to improve load times and resolve issues that previously compromised the secure browsing experience.</li>
                </ul>
            </div>
            </div>

            <div className='bg-dgray flex flex-col w-full  gap-4 lg:gap-[41px] lg:p-[75px] p-6'>
            <div>
                <h2 className='title-65'>Key Achievements</h2>
            </div>
            <div className='pl-4'>
                <ul className='list-disc flex flex-col gap-4 text-font19 fnt-lexend'>
                    <li className='text-gray1'>Optimized keywords to drive a 107.3% increase in new user traffic and a 125.5% boost in page views.</li>
                    <li className='text-gray1'>Redesigned the website and optimized user flow, resulting in a 102.35% growth in engaged sessions and a 125.5% increase in user engagement.</li>
                    <li className='text-gray1'>Revamped marketing materials with updated design and messaging to boost brand visibility and strengthen brand perception.</li>
                </ul>
            </div>
            </div>
            </motion.div>




        </div>

    </div>
  )
}

export default Goals