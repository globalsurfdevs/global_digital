import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'

const SuccessStories = () => {
  return (
    <div className='container mx-auto py-4'>
        <div className='py-8 lg:py-12 flex flex-col gap-4 lg:pb-24 pb-12'>
            
            <div>
                <h1 className='text-font65'>Success Stories We&apos;re Proud of</h1>
            </div>
            
            <div className='grid lg:grid-cols-3 gap-8'>
                
                <div className='flex flex-col lg:gap-8 gap-1'>
                    <div className='bg-black h-96'>

                    </div>
                    <div className='min-h-12'>
                        <Image src={assets.innovo} alt='innovo' className='w-20 md:w-40'/>
                    </div>
                    <div className='bg-black h-[.5px] w-full'>

                    </div>
                    <div>
                        <h4 className='text-font30'>How Innovo Achieved 10x Revenue Growth</h4>
                    </div>

                    <div className='bg-black h-1 w-full shadow-lg lg:hidden'>

                    </div>

                </div>

                <div className='flex flex-col lg:gap-8 gap-1'>
                    <div className='bg-black h-96'>

                    </div>
                    <div className='min-h-12'>
                        <Image src={assets.bafco} alt='innovo' className='w-20 md:w-40'/>
                    </div>
                    <div className='bg-black h-[.5px] w-full'>

                    </div>
                    <div>
                        <h4 className='text-font30'>How Bafco Achieved 10x Revenue Growth</h4>
                    </div>

                    <div className='bg-black h-1 w-full shadow-lg lg:hidden'>

                    </div>

                </div>

                <div className='flex flex-col lg:gap-8 gap-1'>
                    <div className='bg-black h-96'>

                    </div>
                    <div className='min-h-12'>
                        <Image src={assets.bec} alt='innovo' className='w-20 md:w-40'/>
                    </div>
                    <div className='bg-black h-[.5px] w-full'>

                    </div>
                    <div>
                        <h4 className='text-font30'>How BEC Achieved 10x Revenue Growth</h4>
                    </div>

                    <div className='bg-black h-1 w-full shadow-lg lg:hidden'>

                    </div>
                </div>

            
            </div>
        
        </div>
    </div>
  )
}

export default SuccessStories