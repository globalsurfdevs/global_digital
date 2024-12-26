"use client"
import { motion } from 'framer-motion';
import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'
import { Portfolio } from '@/app/types/Portfolio';
import parse from 'html-react-parser';
import { PortfolioHighlight } from '@/app/types/PortfolioHighlights';

const HeroSection = ({data}:{
    data:{
        portfolio:Portfolio[]
        portfolioHighlights:PortfolioHighlight[]
    } | null
}) => {

    if(!data) return null

return (
<div>
    <div className='relative'>
        <div  className='h-[800px] w-full z-10 relative'>
            <Image src={data.portfolio[0].bannerImage} alt='heroImage' className='h-full w-full absolute object-cover object-center' fill/>
            </div>
        <div className='absolute w-full h-full top-0 bg-bl-gradient '>

                <motion.div className='container relative w-full h-full'
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
               variants={{
                 hidden: { opacity: 0, y: 20 }, // Start below and invisible
                 visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                 }}>
                <Image src={assets.innvosvg} alt='image' className='z-20  absolute right-[15px] bottom-[20px] md:bottom-[30px] lg:bottom-[50px]  3xl:bottom-[100px]' />
                </motion.div>
        </div>
        </div>

    <div className='relative'>
        <div className='container mx-auto py-4'>
                <div className='grid lg:grid-cols-2  gap-5 lg:gap-0 '>
                     <motion.div
                                   initial="hidden"
                                   whileInView="visible"
                                   viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                   variants={{
                                     hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                     visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                     }}>
                <div className='flex flex-col justify-center lg:py-[102px] py-[50px] h-full'>
                    <div className='mb-[20px] lg:mb-[81px]'>
                        <h1 className='title-80'>{data.portfolio[0].companyName}</h1>
                    </div>

                    <div className='lg:w-[60%] flex flex-col '>


                            <div className='border-b border-black flex flex-col  pb-[20px] mb-[20px] :lgpb-[40px] lg:mb-[36px]'>
                                <h5 className='text-19 text-gray-400 pb-[5px] fnt-lexend'>Industry</h5>
                                <h4 className='text-30'>{data.portfolio[0].industry}</h4>
                            </div>

                            <div className='border-b border-black flex flex-col  pb-[20px] mb-[20px] :lgpb-[40px] lg:mb-[36px]'>
                                <h5 className='text-19 text-gray-400 pb-[5px] fnt-lexend'>Country</h5>
                                <h4 className='text-30'>{data.portfolio[0].country}</h4>
                            </div>

                            <div className='border-black flex flex-col fnt-lexend'>
                            <h5 className='text-19 text-gray-400 pb-[5px] fnt-lexend'>Channels Used</h5>
                                <h4 className='text-30'>{data.portfolio[0].channelsUsed}</h4>
                            </div>

                    </div>


                        </div>
                        </motion.div>
            </div>

        </div>
        <div
            className='flex flex-col lg:justify-center h-full gap-8 bg-dgray items-center py-[50px] lg:py-6 lg:absolute w-full lg:w-1/2 right-0 top-0'>
                <div className='w-full  lg:w-[70%] flex flex-col gap-5 container lg:max-w-none lg:p-0'>
                    <motion.div
                                   initial="hidden"
                                   whileInView="visible"
                                   viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                   variants={{
                                     hidden: { opacity: 0, y: 30 }, // Start below and invisible
                                     visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                     }}>
                <div className='flex items-center gap-2 mb-2 lg:mb-8'>
                    <h3 className='text-30 leading-lh1p33'>STORY</h3>
                    <div className='bg-primary w-4 h-4 lg:w-5 lg:h-5 '></div>
                </div>
                <div>
                    {/* <p className='text-19 text-gray1 fnt-lexend'>Innovo Group is a global leader in the construction industry,
                        specializing in delivering innovative solutions for a wide range of projects.
                        With a commitment to quality and sustainability, they have built a reputation
                        for excellence. Recognizing their outdated, slow website no longer reflected their
                        brand&apos;s quality and innovation, they partnered with Global Surf to revamp their
                        digital presence. The goal was to improve efficiency, enhance user experience, and
                        align the site with their evolving brand identity. </p> */}
                        {parse(data.portfolio[0].story)}
                        </div>

                        </motion.div>

            </div>
        </div>
    </div>

    <div className='bg-black'>
            <div className='container mx-auto'>
            <motion.div
                                   initial="hidden"
                                   whileInView="visible"
                                   viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                   variants={{
                                     hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                     visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                     }}>
                            <div className='lg:grid lg:grid-cols-3 lg:py-[120px] py-[20px] flex flex-col gap-5 lg:gap-5'>
                                {data.portfolioHighlights.map((item)=>(
                                    <div className='border-b lg:border-r lg:border-b-0 border-gray1 py-[20px] lg:py-[44px] group ' key={item.customId}>
                                    <p className='title-65 text-primary duration-500 group-hover:-translate-y-1'>{item.number}</p>
                                    <h3 className='text-30 text-white lg:pt-[30px] pt-[10px] duration-500 group-hover:-translate-y-2'>{item.text}</h3>
                                    </div>
                                ))}
                                

                                {/* <div className='border-b lg:border-r border-gray1 lg:border-b-0 py-[20px] lg:py-[44px] group '>
                                    <div className='mx-auto lg:w-[85%]'>
                                        <p className='title-65 text-primary duration-500 group-hover:-translate-y-1'>2X</p>
                                        <h3 className='text-30 text-white lg:pt-[30px] pt-[10px] duration-500 group-hover:-translate-y-2'>Increase in User Engagement</h3>
                                    </div>
                                </div>

                                <div className='py-[20px] lg:py-[44px] group '>
                                    <div className='mx-auto lg:w-[85%]'>
                                        <p className='title-65 text-primary duration-500 group-hover:-translate-y-1'>2X</p>
                                        <h3 className='text-30 text-white lg:pt-[30px] pt-[10px] duration-500 group-hover:-translate-y-2'>Increase in User Engagement</h3>
                                    </div>
                                </div> */}
                            </div>

                    </motion.div>
        </div>
    </div>

</div>
)
}

export default HeroSection