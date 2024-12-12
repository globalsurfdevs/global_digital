import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'
import Button from '../Button/Button'

const Ready = () => {
  return (
    <div className='container mx-auto py-4'>
        <div className='py-12 grid grid-cols-2 gap-8'>
            
            <div className='bg-black'>
                <Image src={assets.seleo1} alt='image1'/>
            </div>

            <div className='bg-black'>
                <Image src={assets.seleo2} alt='image2'/>
            </div>

        </div>

        <div className='py-24 border-b'>
            <h1 className='text-[65px]'>We’re Ready - Are You?</h1>
            <p className='text-[19px]'>If you&apos;re looking forward to growing your digital presence with fresh and effective strategies, 
                you’re in the right place. With our experience and a personal touch, we’ll help your brand connect 
                with the right audience in a way that truly resonates. </p>
                <Button text='LET&apos;S COLLABORATE'/>
        </div>
    
    </div>
  )
}

export default Ready