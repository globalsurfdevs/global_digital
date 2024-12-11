import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'

const Boost = () => {
  return (
    <div className='bg-gray-200'>
        <div className='container max-auto py-4'>
            
            <div className='py-24'>

            <div className='text-4xl'>
                <h1>Boost. Engage. Convert. Save.</h1>
            </div>

            <div className='grid grid-cols-4 gap-8  items-center py-12'>
            
                <div className='flex flex-col gap-3'>
                    
                    <div className='py-4 border-gray-500'>
                        <Image src={assets.mobile} alt='image'/>
                    </div>

                    <div className='h-1 w-full bg-gray-500 rounded-xl'>

                    </div>
                    
                    <div className='py-4'>
                        <h3>Enhance Visibility & Recognition</h3>
                    </div>
                
                </div>

                <div className='flex flex-col gap-3'>
                    
                    <div className='py-4 border-gray-500'>
                        <Image src={assets.mobile} alt='image'/>
                    </div>

                    <div className='h-1 w-full bg-gray-500 rounded-xl'>

                    </div>
                    
                    <div className='py-4'>
                        <h3>Drive More Visitors & Increase Interactions </h3>
                    </div>
                
                </div>

                <div className='flex flex-col gap-3'>
                    
                    <div className='py-4 border-gray-500'>
                        <Image src={assets.mobile} alt='image'/>
                    </div>

                    <div className='h-1 w-full bg-gray-500 rounded-xl'>

                    </div>
                    
                    <div className='py-4'>
                        <h3>Grow Your Customer Base with Ease</h3>
                    </div>
                
                </div>

                <div className='flex flex-col gap-3'>
                    
                    <div className='py-4 border-gray-500'>
                        <Image src={assets.mobile} alt='image'/>
                    </div>

                    <div className='h-1 w-full bg-gray-500 rounded-xl'>

                    </div>
                    
                    <div className='py-4'>
                        <h3>Big Results, Smarter Spending </h3>
                    </div>
                
                </div>

            </div>

            </div>
            
        </div>
    </div>
  )
}

export default Boost