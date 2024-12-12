"use client"

import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const HeroSection = () => {
  
  const [mobileView,setMobileView] = useState(false)

  useEffect(()=>{

    if(window.innerWidth < 994){
      setMobileView(true)
    }else{
      setMobileView(false)
    }

    const handleChangingClass = () =>{
      if(window.innerWidth < 994){
        setMobileView(true)
      }else{
        setMobileView(false)
      }
    }

    window.addEventListener("resize",handleChangingClass)

    return () => window.removeEventListener("resize",handleChangingClass)

  },[])

  return (
    <>
      <div className='container mx-auto py-4'>
        <div className='lg:grid lg:grid-cols-6 items-center border-b pt-5 lg:pt-16 flex flex-col gap-5'>

          <div className='text-font80 lg:col-span-4  lg:text-left w-full'>
            <h1 className=''>How Seleo Achieved 10x Revenue Growth</h1>
          </div>

          <div className='lg:col-span-2 flex flex-col gap-8 lg:gap-20 lg:items-end w-full'>
            <Image src={assets.seleoLogo} alt='image' className='w-20 md:w-48'/>
            <h3 className='text-font30'>Refreshing, Sparkling, Uplifting</h3>
          </div>

        </div>

        <div className='py-12 lg:py-24 flex flex-col lg:w-[70%] gap-6'>

          <div className='flex items-center gap-2'>
            <h4 className='text-font30'>STORY</h4>
            <div className='w-6 h-6 bg-primary'></div>
          </div>

          <div className='text-font19'>
            Seleo, a prominent Middle Eastern beverage brand, sought to expand its
            digital footprint across the UAE, Kuwait, and Qatar. To achieve this,
            they partnered with Global Surf to revitalize their online presence and
            optimize marketing campaigns. The goal was to create a compelling digital
            experience that resonated with their target audience and drove customer engagement.
          </div>
        </div>

      </div>

      <div className='lg:grid grid-cols-5 bg-gray-200 w-full flex flex-col'>
        
        <div className='col-span-2'>

          <div className={mobileView ? "container" : "flex h-full items-center justify-center py-12 lg:w-full lg:px-4"}>
            <div className='flex flex-col lg:gap-8 py-6 lg:py-0 gap-4'>

              <div className='border-b border-black flex flex-col gap-3 pb-8'>
                <h5 className='text-font19 text-gray-400'>Industry</h5>
                <h4 className='text-font30'>Food & Beverage</h4>
              </div>

              <div className='border-b border-black flex flex-col gap-3 pb-8'>
                <h5 className='text-font19 text-gray-400'>Country</h5>
                <h4 className='text-font30'>UAE, Kuwait, Qatar</h4>
              </div>

              <div className='border-b border-black flex flex-col gap-3 pb-8'>
                <h5 className='text-font19 text-gray-400'>Channels Used</h5>
                <h4 className='text-font30'>Website - Google Ads - META Ads</h4>
              </div>

            </div>
          </div>

        </div>

        <div className='bg-black col-span-3 h-full'>
              <Image src={assets.seleoCover} alt='cover-image' className='object-cover h-full w-full'/>
          </div>

      </div>

    </>
  )
}

export default HeroSection