import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'

const SuccessStories = () => {
  return (
    <div className='container mx-auto py-4'>
        <div className='py-12 flex flex-col gap-8 pb-24'>
            
            <div>
                <h1 className='text-[65px]'>Success Stories We&apos;re Proud of</h1>
            </div>
            
            <div className='grid grid-cols-3 gap-5'>
                
                <div className='flex flex-col gap-8'>
                    <div className='bg-black h-96'>

                    </div>
                    <div>
                        <Image src={assets.innovo} alt='innovo'/>
                    </div>
                    <div className='bg-black h-[.5px] w-full'>

                    </div>
                    <div>
                        <h4 className='text-[30px]'>How Innovo Achieved 10x Revenue Growth</h4>
                    </div>
                </div>

                <div className='flex flex-col gap-8'>
                    <div className='bg-black h-96'>

                    </div>
                    <div>
                        <Image src={assets.bafco} alt='innovo'/>
                    </div>
                    <div className='bg-black h-[.5px] w-full'>

                    </div>
                    <div>
                        <h4 className='text-[30px]'>How Bafco Achieved 10x Revenue Growth</h4>
                    </div>
                </div>

                <div className='flex flex-col gap-8'>
                    <div className='bg-black h-96'>

                    </div>
                    <div>
                        <Image src={assets.bec} alt='innovo'/>
                    </div>
                    <div className='bg-black h-[.5px] w-full'>

                    </div>
                    <div>
                        <h4 className='text-[30px]'>How BEC Achieved 10x Revenue Growth</h4>
                    </div>
                </div>


            
            </div>
        
        </div>
    </div>
  )
}

export default SuccessStories