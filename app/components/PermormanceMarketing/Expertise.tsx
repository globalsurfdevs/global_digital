"use client"
import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion';

const Expertise = () => {
return (
<div className='container mx-auto py-4'>
    <div className='pt-[50px] lg:pt-[136px] pb-[50px] lg:pb-[150px] flex flex-col '>

            <div className='mb-[30px] lg:mb-[56px]'>
                <motion.div
                          initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                  variants={{
                                    hidden: { opacity: 0, y: 100 }, // Start below and invisible
                                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                  }}
                        >
                    <h1 className='title-65 '>Area of Expertise</h1>
                    </motion.div>
        </div>
            <motion.div
                    initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                            variants={{
                                hidden: { opacity: 0, y: 150 }, // Start below and invisible
                                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                            }}
                    >
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-0 bdrsm'>
                    {/* Item 1 */}
                    <div
                        className="h-[414px] flex flex-col p-10 justify-between border border-r-0 border-b-0 group transition-all duration-500 hover:bg-primary">
                        {/* Image Wrapper */}
                        <div className="p-2 bg-primary w-fit h-fit group-hover:bg-white transition-colors duration-500">
                                <Image src={assets.sea} alt="image"
                            className="group-hover:invert group-hover:hidden  transition duration-500" />
                            <Image src={assets.seahov} alt="image"
                                className=" hidden   group-hover:block  transition duration-500" />
                        </div>

                        {/* Content */}
                        <div>
                            {/* Title */}
                            <p className="text-30 max-w-60 titlesp group-hover:text-white transition-colors duration-300">
                                Search Engine Advertising
                            </p>

                            <p
                                className="fnt-lexend hided-content opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 text-white">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at urna lorem. Ut accumsan eros
                                at turpis.
                            </p>
                        </div>
                    </div>


                    {/* Item 2 */}
                    <div
                        className="h-[414px] flex flex-col p-10 justify-between border border-r-0 border-b-0 group transition-all duration-500 hover:bg-primary">
                        {/* Image Wrapper */}
                        <div className="p-2 bg-primary w-fit h-fit group-hover:bg-white transition-colors duration-500">
                    <Image src={assets.socialMediaNew} alt="image"
                    className="group-hover:invert group-hover:hidden  transition duration-500" />
                    <Image src={assets.socialMediaNewhov} alt="image"
                        className=" hidden   group-hover:block  transition duration-500" />
                        </div>

                        {/* Content */}
                        <div>
                            {/* Title */}
                            <p className="text-30 max-w-60 titlesp group-hover:text-white transition-colors duration-300">
                            Social Media Marketing
                            </p>

                            <p
                                className="fnt-lexend hided-content opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 text-white">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at urna lorem. Ut accumsan eros
                                at turpis.
                            </p>
                        </div>
                    </div>

                    {/* Item 3 */}

                    <div
                        className="h-[414px] flex flex-col p-10 justify-between border border-r-0   group transition-all duration-500 hover:bg-primary">
                        {/* Image Wrapper */}
                        <div className="p-2 bg-primary w-fit h-fit group-hover:bg-white transition-colors duration-500">
                        <Image src={assets.influencer} alt="image"
                            className="group-hover:invert group-hover:hidden  transition duration-500" />
                            <Image src={assets.influencerhov} alt="image"
                                className=" hidden   group-hover:block  transition duration-500" />
                        </div>

                        {/* Content */}
                        <div>
                            {/* Title */}
                            <p className="text-30 max-w-60 titlesp group-hover:text-white transition-colors duration-300">
                            Influencer Marketing
                            </p>

                            <p
                                className="fnt-lexend hided-content opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 text-white">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at urna lorem. Ut accumsan eros
                                at turpis.
                            </p>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div
                        className="h-[414px] flex flex-col p-10 justify-between border     group transition-all duration-500 hover:bg-primary">
                        {/* Image Wrapper */}
                        <div className="p-2 bg-primary w-fit h-fit group-hover:bg-white transition-colors duration-500">

                    <Image src={assets.programmatic} alt="image"
                    className="group-hover:invert group-hover:hidden  transition duration-500" />
                    <Image src={assets.programmatichov} alt="image"
                        className=" hidden   group-hover:block  transition duration-500" />
                        </div>

                        {/* Content */}
                        <div>
                            {/* Title */}
                            <p className="text-30 max-w-60 titlesp group-hover:text-white transition-colors duration-300">
                            Programmatic Advertising
                            </p>

                            <p
                                className="fnt-lexend hided-content opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 text-white">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at urna lorem. Ut accumsan eros
                                at turpis.
                            </p>
                        </div>
                    </div>
                    {/* Item 5 */}
                    <div
                        className="h-[414px] flex flex-col p-10 justify-between border border-r-0    group transition-all duration-500 hover:bg-primary">
                        {/* Image Wrapper */}
                        <div className="p-2 bg-primary w-fit h-fit group-hover:bg-white transition-colors duration-500">

                    <Image src={assets.videoAd} alt="image"
                    className="group-hover:invert group-hover:hidden  transition duration-500" />
                    <Image src={assets.videoAdhov} alt="image"
                        className=" hidden   group-hover:block  transition duration-500" />
                        </div>

                        {/* Content */}
                        <div>
                            {/* Title */}
                            <p className="text-30 max-w-60 titlesp group-hover:text-white transition-colors duration-300">
                            Video ads & Display
                            </p>

                            <p
                                className="fnt-lexend hided-content opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 text-white">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at urna lorem. Ut accumsan eros
                                at turpis.
                            </p>
                        </div>
                    </div>

                    {/* Item 6 */}
                    <div
                        className="h-[414px] flex flex-col p-10 justify-between border 0    group transition-all duration-500 hover:bg-primary">
                        {/* Image Wrapper */}
                        <div className="p-2 bg-primary w-fit h-fit group-hover:bg-white transition-colors duration-500">
                    <Image src={assets.appStore} alt="image"
                    className="group-hover:invert group-hover:hidden  transition duration-500" />
                    <Image src={assets.appStorehov} alt="image"
                        className=" hidden   group-hover:block  transition duration-500" />
                        </div>

                        {/* Content */}
                        <div>
                            {/* Title */}
                            <p className="text-30 max-w-60 titlesp group-hover:text-white transition-colors duration-300">
                            App Store advertising
                            </p>

                            <p
                                className="fnt-lexend hided-content opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 text-white">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at urna lorem. Ut accumsan eros
                                at turpis.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>


    </div>
</div>
)
}

export default Expertise