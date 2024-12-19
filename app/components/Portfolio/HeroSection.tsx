import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <div>
             <div className='relative'>
                <Image src={assets.heroInnovo} alt='heroImage' className='h-full w-full z-10' />
                <div className='absolute w-full h-full top-0 bg-bl-gradient '>
                    <div className='container relative w-full h-full'>
                        <Image src={assets.innvosvg} alt='image' className='z-20  absolute right-[15px] bottom-[100px]' />
                    </div>
                </div>
            </div>
            <div className='container mx-auto py-4'>
                    <div className='grid lg:grid-cols-2  gap-5 lg:gap-0 '>
                    <div className='flex flex-col justify-center lg:py-[102px] py-6 h-full'>
                    <div className='mb-[40px] md:mb-[81px]'>
                            <h1 className='title-80'>Innovo Group</h1>
                        </div>

                        <div className='lg:w-[60%] flex flex-col gap-[36px]'>

                            <div className='border-b border-black flex flex-col gap-[5px] pb-10'>
                                <h5 className='text-19 text-gray1 leading-[2.1]'>Industry</h5>
                                <h4 className='text-30 leading-[1.35]'>Construction</h4>
                            </div>

                            <div className='border-b border-black flex flex-col gap-[5px] pb-10'>
                                <h5 className='text-19 text-gray1 leading-[2.1]'>Country</h5>
                                <h4 className='text-30 leading-[1.35]'>Global</h4>
                            </div>

                            <div className='  flex flex-col gap-[5px]  '>
                                <h5 className='text-19 text-gray1 leading-[2.1]'>Channels Used</h5>
                                <h4 className='text-30 leading-[1.35]'>Logo - Website - Branding</h4>
                            </div>

                        </div>


                    </div>

                    <div className='flex flex-col lg:justify-center h-full gap-8 bg-dgray items-center py-6'>
                        <div className='w-[70%] flex flex-col gap-5'>
                            <div className='flex items-center gap-2'>
                            <h3 className='text-30 leading-lh1p33'>STORY</h3>
                                <div className='bg-primary w-5 h-5'></div>
                            </div>
                            <div>
                            <p className='text-19 text-gray1'>Innovo Group is a global leader in the construction industry,
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

                <div className='lg:grid lg:grid-cols-3 lg:py-[120px] py-12 flex flex-col gap-5'>
                <div className='border-b lg:border-r lg:border-b-0 border-gray1 py-[44px]'>
                            <p className='title-65 text-primary'>30.43%</p>
                            <h3 className='text-30 text-white pt-[30px]'>Increase in Avg. Page Speed</h3>
                        </div>

                        <div className='border-b lg:border-r border-gray1 lg:border-b-0 py-[44px]'>
                        <div className='mx-auto lg:w-[85%]'>
                                <p className='title-65 text-primary'>2X</p>
                                <h3 className='text-30 text-white pt-[30px]'>Increase in User Engagement</h3>
                            </div>

                        </div>

                        <div className='border-b lg:border-r border-gray1 lg:border-b-0 py-[44px]'>
                            <div className='mx-auto  lg:w-[85%]'>
                            <p className='title-65 text-primary'>2X</p>
                            <h3 className='text-30 text-white pt-[30px]'>Increase in User Engagement</h3>
                            </div>

                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default HeroSection