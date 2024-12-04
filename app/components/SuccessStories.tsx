import React from 'react'
import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import { stories } from '../data/stories'

const SuccessStories = () => {
  return (
    <div className='container px-4 mx-auto'>
        <div className='py-24 flex flex-col gap-12'>
            <h1 className='text-4xl'>Browse our Success Stories</h1>            
            <div className='grid grid-cols-3 gap-8'>
                {stories.map((item,index)=>(
                    <div className='bg-black h-[600px]' key={index}>
                    <div className='bg-gray-500 h-[45%] flex flex-col gap-5 justify-center px-12'>
                        <h3 className='text-xl'>{item.title1}</h3>
                        <Image src={item.svg} alt='ninety'></Image>
                        <h3 className='text-xl w-3/4'>{item.description1}</h3>
                    </div>
                    <div className='text-white flex flex-col justify-center gap-8 h-[55%] px-12'>
                        <h3 className='text-2xl'>{item.title2}</h3>
                        <p>{item.description2}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default SuccessStories