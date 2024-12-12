import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
  return (
    <>
      <div className='container mx-auto py-4'>
        <div className='lg:grid lg:grid-cols-5 items-center border-b pt-16 flex flex-col gap-5'>

          <div className='text-font80 lg:col-span-3 text-center lg:text-left w-full'>
            <h1>How Saleo Achieved 10x Revenue Growth</h1>
          </div>

          <div className='lg:col-span-2 flex flex-col gap-20 lg:items-end w-full items-center'>
            <Image src={assets.seleoLogo} alt='image' />
            <h3 className='text-[30px]'>Refreshing, Sparkling, Uplifting</h3>
          </div>

        </div>

        <div className='py-24 flex flex-col w-[70%] gap-6'>

          <div className='flex items-center gap-2'>
            <h4 className='text-[30px]'>STORY</h4>
            <div className='w-6 h-6 bg-primary'></div>
          </div>

          <div className='text-[19px]'>
            Seleo, a prominent Middle Eastern beverage brand, sought to expand its
            digital footprint across the UAE, Kuwait, and Qatar. To achieve this,
            they partnered with Global Surf to revitalize their online presence and
            optimize marketing campaigns. The goal was to create a compelling digital
            experience that resonated with their target audience and drove customer engagement.
          </div>
        </div>

      </div>

      <div className='flex bg-gray-200 w-full'>
        <div className='w-1/2 container'>

          <div className='flex justify-center h-full items-center'>
            <div className='flex flex-col gap-8'>

              <div className='border-b border-black flex flex-col gap-3 pb-8'>
                <h5 className='text-[19px] text-gray-400'>Industry</h5>
                <h4 className='text-[30px]'>Food & Beverage</h4>
              </div>

              <div className='border-b border-black flex flex-col gap-3 pb-8'>
                <h5 className='text-[19px] text-gray-400'>Country</h5>
                <h4 className='text-[30px]'>UAE, Kuwait, Qatar</h4>
              </div>

              <div className='border-b border-black flex flex-col gap-3 pb-8'>
                <h5 className='text-[19px] text-gray-400'>Channels Used</h5>
                <h4 className='text-[30px]'>Website - Google Ads - META Ads</h4>
              </div>

            </div>
          </div>

        </div>
        <div className='bg-black w-3/4 col-span-3 h-full'>
              <Image src={assets.seleoCover} alt='cover-image'/>
          </div>
      </div>

    </>
  )
}

export default HeroSection