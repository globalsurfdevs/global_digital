"use client"
import { motion } from 'framer-motion';


const HeroSection = () => {
  return (
    <>
      <div className='container mx-auto py-4'>
      <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                    variants={{
                      hidden: { opacity: 0, y: 50 }, // Start below and invisible
                      visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                      }}>
         <div className='xl:grid xl:grid-cols-8 items-center border-b lg:pt-[130px] sm:pt-[50px] pt-[20px] pb-[80px] flex flex-col gap-4'>
            <div className='text-font80 lg:col-span-2 xl:col-span-3 lg:text-left w-full h-full'>
              <h1 className='title-80'>Blogs</h1>
            </div>
            <div className='lg:col-span-6 xl:col-span-5 flex   items-center w-full h-full   lg:py-4 pt-4 pb-0'>
              <p className='text-30 text-gray1'>Perspectives on strategy, creativity, and technology — helping brands navigate change and drive measurable growth.</p>
            </div>
          </div>
        </motion.div>
      </div>

    </>
  )
}

export default HeroSection