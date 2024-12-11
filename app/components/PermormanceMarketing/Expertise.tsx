import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'

const Expertise = () => {
  return (
    <div className='container mx-auto py-4'>
        <div className='py-24 flex flex-col gap-16'>
            
            <div className='text-4xl'>
                <h1>Area of Expertise</h1>
            </div>
            
            <div className='grid grid-cols-4'>
                <div className='h-80 flex flex-col p-10 justify-between border'>
                <div className='p-2 bg-primary w-fit h-fit'><Image src={assets.sea} alt='image'/></div>
                    <div>Search Engine Advertising</div>
                </div>
                
                <div className='h-80 flex flex-col p-10 justify-between border hover:bg-primary group'>
                <div className='p-2 bg-primary w-fit h-fit group-hover:bg-white'><Image className="group-hover:invert group-hover:brightness-0 ease-linear" src={assets.socialMediaNew} alt='image'/></div>
                    <div>Social Media Marketing</div>
                </div>
                
                <div className='h-80 flex flex-col p-10 justify-between border'>
                    <div className='p-2 bg-primary w-fit h-fit'><Image src={assets.influencer} alt='image'/></div>
                    <div>Influencer Marketing </div>
                </div>

                <div className='h-80 flex flex-col p-10 justify-between border'>
                <div className='p-2 bg-primary w-fit h-fit'><Image src={assets.programmatic} alt='image'/></div>
                    <div>Programmatic  Advertising</div>
                </div>

                <div className='h-80 flex flex-col p-10 justify-between border'>
                <div className='p-2 bg-primary w-fit h-fit'><Image src={assets.videoAd} alt='image'/></div>
                    <div>Video ads & Display</div>
                </div>

                <div className='h-80 flex flex-col p-10 justify-between border'>
                <div className='p-2 bg-primary w-fit h-fit'><Image src={assets.appStore} alt='image'/></div>
                    <div>App Store advertising</div>
                </div>

            </div>
        
        </div>
    </div>
  )
}

export default Expertise