"use client";
import React from "react";
import { motion } from "framer-motion";
interface FrameworkItem {
  id: number;
  title: string;
  dec: string;
}

interface FrameworkSectionProps {
  title: string;
  bgcolor?: string;
  description?: string;
  colcount?: number;
  data: FrameworkItem[];
}

const Framework: React.FC<FrameworkSectionProps> = ({ title, data ,description, bgcolor,colcount}) => {
  return (
    <div className={` ${bgcolor ? `${bgcolor}` : 'bg-dgray'}`}>
        <div className='container mx-auto py-4'>
            <div className='py-[50px] lg:py-[111px] flex flex-col '>

                  <div className='text-4xl'>
                  <motion.div
          initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                  variants={{
                    hidden: { opacity: 0, y: 50 }, // Start below and invisible
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                  }}
            >
              {description &&
                <div>
                <h2 className='title-65 pb-6 lg:pb-[25px]'>{title}</h2>
                <p className="text-gray1 text-font19 leading-[1.2] font-[500] pb-6 lg:pb-[58px] fnt-lexend">{description}</p>
                </div>
              }
              {!description &&
                <h2 className='title-65 pb-6 lg:pb-[58px]'>{title}</h2>
              }
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
                        <div className={`grid grid-cols-1 md:grid-cols-2  gap-6 lg:gap-10 xl:grid-cols-${colcount ? `${colcount}` : '4'}` } >
                        {data.map((framework) => (
                                <div
                                key={framework.id}
                                className='flex flex-col    relative group overflow-hidden'
                              >
                                    {/* Animated Red Border */}
                                    <div className="relative h-[1px] bg-black rounded-xl  overflow-hidden">
                                    <div className="absolute inset-0 bg-primary scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                                    </div>
                                <div className='bg-primary mb-4 lg:mb-8 mt-6  lg:mt-10 w-[50px] h-[50px] flex   items-center justify-center  transition-transform duration-500'>
                                  <p className='text-white  transition-transform duration-500 text-30'>{String(framework.id ).padStart(2, "0")}</p>
                                </div>
                                <div className='text-2xl'>
                                  <p className='text-30 pb-3 lg:pb-6 text-black' dangerouslySetInnerHTML={{ __html: framework.title }}></p>
                                </div>
                                <div>
                                  <p className='fnt-lexend text-gray1 text-19 font-medium'>{framework.dec}</p>
                                </div>
                              </div>

                            ))}
                            </div>

                </motion.div>

            </div>
        </div>
    </div>
  );
};

export default Framework;
