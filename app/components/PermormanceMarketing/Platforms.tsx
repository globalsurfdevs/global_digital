import { assets } from '@/public/assets/assets'
import   twitterx   from '@/public/assets/logos/socialmedia/x.svg'
import   amazon   from '@/public/assets/logos/socialmedia/amazon.svg'
import   google   from '@/public/assets/logos/socialmedia/google.svg'
import   linkedin   from '@/public/assets/logos/socialmedia/linkedin.svg'
import   meta   from '@/public/assets/logos/socialmedia/meta.svg'
import   ticktok   from '@/public/assets/logos/socialmedia/ticktok.svg'
import Image from 'next/image'
import React from 'react'

const Platforms = () => {
  return (
    <div className='container mx-auto py-4'>
        <div className='bg-dgray flex flex-col gap-12 p-[35px] md:p-[100px]'>

            <div >
                <h1 className='title-65'>Our Platforms</h1>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-[95px]'>
                <div className='flex flex-col  '>

                    <div className='flex gap-3'>
                        <Image src={google} alt='image'/>
                        <h3 className='text-30'>Google Marketing</h3>
                    </div>

                    <div className='h-[1px] bg-black rounded-xl mt-[30px] mb-[43px]'></div>

                    <div className=''>
                        <p className='text-19'>We dig into your business through a comprehensive assessment. You get an in-depth report on what’s working, what’s.</p>
                    </div>
                </div>
                <div className='flex flex-col  '>

                    <div className='flex gap-3'>
                        <Image src={linkedin} alt='image'/>
                        <h3 className='text-30'>LinkedIn Ads</h3>
                    </div>

                    <div className='h-[1px] bg-black rounded-xl mt-[30px] mb-[43px]'></div>

                    <div className=''>
                        <p className='text-19'>Unlock the number one B2B social platform to reach and engage your target audience. With LinkedIn Ads management, you can run.</p>
                    </div>
                </div>
                <div className='flex flex-col  '>

                    <div className='flex gap-3'>
                        <Image src={twitterx} alt='image'/>
                        <h3 className='text-30'>X Ads</h3>
                    </div>

                    <div className='h-[1px] bg-black rounded-xl mt-[30px] mb-[43px]'></div>

                    <div className=''>
                        <p className='text-19'>Reach over 500 million users and tap into the power of real-time marketing with Twitter Advertising.</p>
                    </div>
                </div>
                <div className='flex flex-col  '>

                    <div className='flex gap-3'>
                        <Image src={amazon} alt='image'/>
                        <h3 className='text-30'>Amazon Ads</h3>
                    </div>

                    <div className='h-[1px] bg-black rounded-xl mt-[30px] mb-[43px]'></div>

                    <div className=''>
                        <p className='text-19'>We dig into your business through a comprehensive assessment. You get an in-depth report on what’s working, what’s.</p>
                    </div>
                </div>
                <div className='flex flex-col  '>

                    <div className='flex gap-3'>
                        <Image src={ticktok} alt='image'/>
                        <h3 className='text-30'>TikTok Ads</h3>
                    </div>

                    <div className='h-[1px] bg-black rounded-xl mt-[30px] mb-[43px]'></div>

                    <div className=''>
                        <p className='text-19'>Get noticed on this highly-targeted, fresh platform with video and image ads that are designed to capture the attention.</p>
                    </div>
                </div>
                <div className='flex flex-col  '>

                    <div className='flex gap-3'>
                        <Image src={meta} alt='image'/>
                        <h3 className='text-30'>Meta Ads</h3>
                    </div>

                    <div className='h-[1px] bg-black rounded-xl mt-[30px] mb-[43px]'></div>

                    <div className=''>
                        <p className='text-19'>Capture the attention and interest of potential customers on Facebook, the world’s leading social media channel.</p>
                    </div>
                </div>

            </div>

        </div>
    </div>
  )
}

export default Platforms