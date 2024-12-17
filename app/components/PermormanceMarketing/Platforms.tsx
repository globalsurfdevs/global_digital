import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'

const Platforms = () => {
  return (
    <div className='container mx-auto py-4'>
        <div className='bg-dgray flex flex-col gap-12 p-[100px]'>

            <div className='text-5xl'>
                <h1>Our Platforms</h1>
            </div>

            <div className='grid grid-cols-3 gap-8'>
                <div className='flex flex-col gap-8'>

                    <div className='text-3xl flex gap-3'>
                        <Image src={assets.reputation} alt='image'/>
                        <h3>Google Marketing</h3>
                    </div>

                    <div className='h-1 bg-gray-500 rounded-xl'></div>

                    <div className='py-6'>
                        <p>We dig into your business through a comprehensive assessment. You get an in-depth report on what’s working, what’s.</p>
                    </div>
                </div>

                <div className='flex flex-col gap-8'>

                    <div className='text-3xl flex gap-3'>
                        <Image src={assets.reputation} alt='image'/>
                        <h3>Google Marketing</h3>
                    </div>

                    <div className='h-1 bg-gray-500 rounded-xl'></div>

                    <div className='py-6'>
                        <p>We dig into your business through a comprehensive assessment. You get an in-depth report on what’s working, what’s.</p>
                    </div>
                </div>

                <div className='flex flex-col gap-8'>

                    <div className='text-3xl flex gap-3'>
                        <Image src={assets.reputation} alt='image'/>
                        <h3>Google Marketing</h3>
                    </div>

                    <div className='h-1 bg-gray-500 rounded-xl'></div>

                    <div className='py-6'>
                        <p>We dig into your business through a comprehensive assessment. You get an in-depth report on what’s working, what’s.</p>
                    </div>
                </div>

                <div className='flex flex-col gap-8'>

                    <div className='text-3xl flex gap-3'>
                        <Image src={assets.reputation} alt='image'/>
                        <h3>Google Marketing</h3>
                    </div>

                    <div className='h-1 bg-gray-500 rounded-xl'></div>

                    <div className='py-6'>
                        <p>We dig into your business through a comprehensive assessment. You get an in-depth report on what’s working, what’s.</p>
                    </div>
                </div>

                <div className='flex flex-col gap-8'>

                    <div className='text-3xl flex gap-3'>
                        <Image src={assets.reputation} alt='image'/>
                        <h3>Google Marketing</h3>
                    </div>

                    <div className='h-1 bg-gray-500 rounded-xl'></div>

                    <div className='py-6'>
                        <p>We dig into your business through a comprehensive assessment. You get an in-depth report on what’s working, what’s.</p>
                    </div>
                </div>

            </div>

        </div>
    </div>
  )
}

export default Platforms