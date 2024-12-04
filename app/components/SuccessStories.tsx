import React from 'react'
import { assets } from '@/public/assets/assets'
import Image from 'next/image'

const SuccessStories = () => {
  return (
    <div className='container px-4 mx-auto'>
        <div className='py-24'>
            <h1 className='text-4xl'>Browse our Success Stories</h1>            
            <div className='grid grid-cols-3 gap-8'>
                <div className='bg-black h-[600px]'>
                    <div className='bg-gray-500 h-[45%] flex flex-col gap-5 justify-center px-12'>
                        <h3 className='text-xl'>Bafco</h3>
                        <Image src={assets.ninety} alt='ninety'></Image>
                        <h3 className='text-xl w-3/4'>Lower CPC compared to Social campaigns</h3>
                    </div>
                    <div className='text-white flex flex-col justify-center gap-8 h-[55%] px-12'>
                        <h3 className='text-2xl'>DEMAND GEN CAMPAIN DRIVES SIGNIFICANT ENGAGEMENT</h3>
                        <p>Explore how YSL Beauty launched a first-of-its-kind Demand Gen campaign in the UAE market, successfully driving a 178% increase in website interaction.</p>
                    </div>
                </div>
                <div className='bg-black'>
                    Saleo
                </div>
                <div className='bg-black'>
                    Innovo
                </div>
            </div>
        </div>
    </div>
  )
}

export default SuccessStories