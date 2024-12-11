import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
  return (
    <div className='container mx-auto py-4'>
        <div className='flex justify-between items-center gap-48'>
            
            <div className='text-[80px]'>
                <h1>How Saleo Achieved 10x Revenue Growth</h1>
            </div>

            <div>
                <Image src={assets.logo} alt='image'/>
                <h3>Refreshing, Sparkling, Uplifting</h3>
            </div>
        
        </div>
    </div>
  )
}

export default HeroSection