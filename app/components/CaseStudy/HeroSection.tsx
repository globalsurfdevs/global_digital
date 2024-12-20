"use client"
import { motion } from 'framer-motion';
import { assets } from '@/public/assets/assets'
import Image from 'next/image'

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
                      }}
        >
        <div className='lg:grid lg:grid-cols-8 items-center border-b lg:pt-[130px] sm:pt-[50px] pt-[20px] pb-10 flex flex-col gap-2'>

          <div className='text-font80 lg:col-span-5 xl:col-span-5 lg:text-left w-full h-full'>
            <h1 className='title-80'>How Seleo Achieved 10x Revenue Growth</h1>
          </div>

          <div className='lg:col-span-3 xl:col-span-3 flex flex-col gap-5 lg:gap-18 lg:items-end w-full h-full justify-between lg:py-4 pt-4 pb-0'>
            <Image src={assets.seleoLogo} alt='image' className='w-20 md:w-48'/>
            <h3 className='text-30 text-gray1'>Refreshing, Sparkling, Uplifting</h3>
          </div>

        </div>
        </motion.div>

        <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
        variants={{
          hidden: { opacity: 0, y: 100 }, // Start below and invisible
          visible: { opacity: 1, y: 0, transition: { duration: 1.3, ease: "easeOut" } }, // Slide up and fade in
          }}
              >
        <div className='lg:py-[142px] py-[50px] flex flex-col lg:w-[70%] gap-2 lg:gap-6'>

          <div className='flex items-center gap-2'>
            <h4 className='text-30 leading-[1.5]'>STORY</h4>
            <div className='w-4 h-4 lg:w-5 lg:h-5 bg-primary'></div>
          </div>

          <div  >
            <p className='text-gray1 fnt-lexend text-font19'>Seleo, a prominent Middle Eastern beverage brand, sought to expand its digital footprint across the UAE, Kuwait, and Qatar. To achieve this, they partnered with Global Surf to revitalize their online presence and optimize marketing campaigns. The goal was to create a compelling digital experience that resonated with their target audience and drove customer engagement.</p>
          </div>
        </div>

        </motion.div>

      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
        variants={{
          hidden: { opacity: 0, y: 50 }, // Start below and invisible
          visible: { opacity: 1, y: 0, transition: { duration: 1.3, ease: "easeOut" } }, // Slide up and fade in
          }}
              >
      <div className='bg-bglight w-full flex flex-col  overflow-hidden'>

        <div className='container relative'>

        <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
        variants={{
          hidden: { opacity: 0, y: 100 }, // Start below and invisible
          visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } }, // Slide up and fade in
          }}
              >
          <div className={"flex h-full "}>
            <div className='flex flex-col  py-[50px] lg:py-[150px]  w-full lg:w-1/4'>

              <div className='border-b border-black flex flex-col pb-[20px] mb-[20px] :lgpb-[40px] lg:mb-[36px]'>
                <h5 className='text-19 text-gray-400 pb-[5px] fnt-lexend'>Industry</h5>
                <h4 className='text-30'>Food & Beverage</h4>
              </div>

              <div className='border-b border-black flex flex-col pb-[20px] mb-[20px] :lgpb-[40px] lg:mb-[36px]'>
                <h5 className='text-19 text-gray-400 pb-[5px] fnt-lexend'>Country</h5>
                <h4 className='text-30'>UAE, Kuwait, Qatar</h4>
              </div>

              <div className='border-black flex flex-col  '>
                <h5 className='text-19 text-gray-400 pb-[5px] fnt-lexend'>Channels Used</h5>
                <h4 className='text-30'>Website - Google Ads - META Ads</h4>
              </div>

            </div>
          </div>
          </motion.div>

          {<div className='bg-black h-full absolute top-0 right-[-145px] left-1/3 hidden lg:block'>
              <Image src={assets.seleoCover} alt='cover-image' className='object-cover h-full w-full'/>
          </div>}

        </div>

        {<div className='bg-black h-full lg:hidden'>
              <Image src={assets.seleoCover} alt='cover-image' className='object-cover h-full w-full'/>
          </div>}

      </div>

      </motion.div>
    </>
  )
}

export default HeroSection