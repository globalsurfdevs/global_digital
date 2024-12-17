import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'
import Button from '../Button/Button'
import { SuccessStories } from '../SuccessStories/SuccessStories'

const Result = () => {
  return (
    <div className='container mx-auto py-4'>
        <div className='py-6 lg:py-24 flex flex-col gap-5'>
            <div>
                <h1 className='text-font65'>Result</h1>
            </div>
            <div className='pl-4 lg:pl-5'>
                <ul className='list-disc flex flex-col gap-8 text-font19'>
                    <li>Optimized SEO strategy and keywords to drive a 107.3% increase in new user traffic and a 125.5% boost in page views.</li>
                    <li>Redesigned the website and optimized user flow, resulting in a 102.35% increase in engaged sessions and a 125.5% boost in user engagement.</li>
                    <li>Revamped marketing materials with updated design and messaging to boost brand visibility and strengthen brand perception.</li>
                </ul>
            </div>
        </div>

        <div className='grid grid-cols-2  mx-auto py-4 gap-5'>
            
            <div>
                <Image src={assets.suscom} alt='image'/>
            </div>

            <div>
                <Image src={assets.tablemockup} alt='image'/>
            </div>

        </div>

        <div className='lg:py-24 border-b flex flex-col gap-3 py-4'>
            <h1 className='text-font65'>Lets Create Something Iconic Together</h1>
            <p className='text-font19'>Every great brand has a story. See how we’ve turned challenges into triumphs for our clients. Your brand could be next. </p>
                <Button text='LET&apos;S COLLABORATE'/>
        </div>

        <div>
            <SuccessStories/>
        </div>
    
    </div>
  )
}

export default Result