import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'
import Button from '../Button/Button'

const Ready = () => {
  return (
    <div className='container mx-auto py-4'>
        <div className='pt-[50px] lg:pt-[100px] grid grid-cols-2 gap-[20px]'>

            <div className=''>
                <Image src={assets.seleo1} alt='image1'/>
            </div>

            <div className=''>
                <Image src={assets.seleo2} alt='image2'/>
            </div>

        </div>

        <div className='lg:pb-[150px] pb-[50px] lg:pt-[138px] pt-[50px] border-b flex flex-col   '>
            <h1 className='title-65 mb-7'>We’re Ready - Are You?</h1>
            <p className='text-19 text-gray1 max-w-[113ch]'>If you&apos;re looking forward to growing your digital presence with fresh and effective strategies,
                you’re in the right place. With our experience and a personal touch, we’ll help your brand connect
                with the right audience in a way that truly resonates. </p>
              <div >
                  <button className="w-fit text-font30 leading-lh1p66 border border-primary px-12 lg:px-24 rounded-full py-3 mt-[25px]  lg:mt-[63px]">LET&apos;S COLLABORATE</button>
    </div>
        </div>

    </div>
  )
}

export default Ready