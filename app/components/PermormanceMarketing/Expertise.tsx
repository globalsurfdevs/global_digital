"use client"
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion';

interface ExpertiseItem {
    id: number;
    icon: string;
    iconhov: string;
    title: string;
    desc: string;
  }

  interface ExpertiseSectionProps {
    title: string;
    data: ExpertiseItem[];
  }

  const Expertise: React.FC<ExpertiseSectionProps> = ({ title, data }) => {

return (
<div className='container mx-auto py-4'>
    <div className='pt-[50px] lg:pt-[136px] pb-[50px] lg:pb-[150px] flex flex-col '>

            <div className='mb-5 lg:mb-[56px]'>
                <motion.div
                          initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                  variants={{
                                    hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                  }}
                        >
                    <h2 className='title-65 '>{title}</h2>
                    </motion.div>
        </div>

            <div >
            <motion.div className='grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 xxl:grid-cols-4 gap-5 xl:gap-0 '
                          initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                  variants={{
                                    hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                  }}
                        >
                    {/* Item 1 */}
                    {data.map((expertise) => (
                    <div key={expertise.id}
                        className="md:h-[300px] lg:h-[340px] xl:h-[414px] flex flex-col gap-3 lg:gap-0 p-5 lg:p-10 justify-between border  group transition-all duration-500 hover:bg-primary">
                        {/* Image Wrapper */}
                        <div className="p-2 bg-primary w-fit h-fit group-hover:bg-white transition-colors duration-500">
                                <Image src= {expertise.icon} alt="image"
                            className="group-hover:invert group-hover:hidden  transition duration-500" />
                            <Image src= {expertise.iconhov} alt="image"
                                className=" hidden   group-hover:block  transition duration-500" />
                        </div>

                        {/* Content */}
                        <div>
                            {/* Title */}
                            <p className="text-30 lg:max-w-60 titlesp group-hover:text-white transition-colors duration-300">
                            {expertise.title}
                            </p>

                            <p className="text-19 pt-2 fnt-lexend hided-content opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 text-white">
                                {expertise.desc}
                            </p>
                        </div>
                    </div>

                ))}

                    </motion.div>
                </div>


    </div>
</div>
)
}

export default Expertise