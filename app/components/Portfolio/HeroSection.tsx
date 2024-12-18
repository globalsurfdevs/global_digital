import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <div>
            <div className='relative'>
                <Image src={assets.heroInnovo} alt='heroImage' className='h-full w-full z-10' />
                <div className='absolute w-[90%] h-full lg:-top-20 -top-5 md:-top-10'>
                <Image src={assets.innvosvg} alt='image' className='z-20 lg:size-36 size-10 md:size-20 absolute right-0 bottom-0'/>
                </div>
            </div>
            <div className='container mx-auto py-4'>
                <div className='grid lg:grid-cols-2 lg:py-24 gap-5 lg:gap-0 py-6'>
                    <div className='flex flex-col justify-center gap-8 h-full'>
                        <div>
                            <h1 className='text-font80'>Innovo Group</h1>
                        </div>

                        <div className='lg:w-[60%] flex flex-col gap-8'>

                            <div className='border-b border-black flex flex-col gap-3 pb-8'>
                                <h5 className='text-font19 text-gray-400'>Industry</h5>
                                <h4 className='text-font30'>Construction</h4>
                            </div>

                            <div className='border-b border-black flex flex-col gap-3 pb-8'>
                                <h5 className='text-font19 text-gray-400'>Country</h5>
                                <h4 className='text-font30'>Global</h4>
                            </div>

                            <div className='border-b border-black flex flex-col gap-3 pb-8'>
                                <h5 className='text-font19 text-gray-400'>Channels Used</h5>
                                <h4 className='text-font30'>Logo - Website - Branding</h4>
                            </div>

                        </div>


                    </div>

                    <div className='flex flex-col lg:justify-center h-full gap-8 bg-dgray items-center py-6'>
                        <div className='w-[70%] flex flex-col gap-5'>
                            <div className='flex items-center gap-2'>
                                <h3 className='text-font30'>STORY</h3>
                                <div className='bg-primary w-5 h-5'></div>
                            </div>
                            <div>
                                <p className='text-font19'>Innovo Group is a global leader in the construction industry,
                                    specializing in delivering innovative solutions for a wide range of projects.
                                    With a commitment to quality and sustainability, they have built a reputation
                                    for excellence. Recognizing their outdated, slow website no longer reflected their
                                    brand&apos;s quality and innovation, they partnered with Global Surf to revamp their
                                    digital presence. The goal was to improve efficiency, enhance user experience, and
                                    align the site with their evolving brand identity. </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className='bg-black'>
                <div className='container mx-auto'>

                    <div className='lg:grid lg:grid-cols-3 lg:py-24 py-12 flex flex-col gap-5'>
                        <div className='border-b lg:border-r lg:border-b-0 border-white'>
                            <span className='text-font65 text-primary'>30.43%</span>
                            <h3 className='text-font30 text-white'>Increase in Avg. Page Speed</h3>
                        </div>

                        <div className='border-b lg:border-r border-white lg:border-b-0'>
                            <div className='mx-auto lg:w-[85%]'>
                                <span className='text-font65 text-primary'>2X</span>
                                <h3 className='text-font30 text-white'>Increase in User Engagement</h3>
                            </div>

                        </div>

                        <div className='border-b lg:border-r border-white lg:border-b-0'>
                            <div className='mx-auto  lg:w-[85%]'>
                                <span className='text-font65 text-primary'>2X</span>
                                <h3 className='text-font30 text-white'>Increase in Session Duration</h3>
                            </div>

                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default HeroSection