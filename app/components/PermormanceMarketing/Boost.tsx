import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'
import logo1  from '../../../public/assets/logos/boost.svg'
import logo2  from '../../../public/assets/logos/engage.svg'
import logo3  from '../../../public/assets/logos/convert.svg'
import logo4  from '../../../public/assets/logos/save.svg'

const Boost = () => {
  return (
    <div className='bg-dgray'>
        <div className='container max-auto py-4'>

            <div className='pb-[50px] lg:pb-[157px] pt-[50px] lg:pt-[111px]'>

            <div >
                <h1 className='title-65'>Boost. Engage. Convert. Save.</h1>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8  pt-[58px]'>

                <div className='flex flex-col  '>

                    <div className='pb-[30px] md:pb-[65px] border-gray-500'>
                        <Image src={logo1} alt='image'/>
                    </div>

                    <div className='h-[1px] w-full bg-gray-500 rounded-xl'>

                    </div>

                    <div className='pt-[30px] md:pt-[53px] '>
                        <h3 className='text-30'>Enhance Visibility & Recognition</h3>
                    </div>

                </div>

                <div className='flex flex-col '>

                    <div className='pb-[30px] md:pb-[65px] border-gray-500'>
                        <Image src={logo2} alt='image'/>
                    </div>

                    <div className='h-[1px] w-full bg-gray-500 rounded-xl'>

                    </div>

                    <div className='pt-[30px] md:pt-[53px] '>
                        <h3 className='text-30'>Drive More Visitors & Increase Interactions </h3>
                    </div>

                </div>

                <div className='flex flex-col '>

                    <div className='pb-[30px] md:pb-[65px] border-gray-500'>
                        <Image src={logo3} alt='image'/>
                    </div>

                    <div className='h-[1px] w-full bg-gray-500 rounded-xl'>

                    </div>

                    <div className='pt-[30px] md:pt-[53px] '>
                        <h3 className='text-30'>Grow Your Customer Base with Ease</h3>
                    </div>

                </div>

                <div className='flex flex-col '>

                    <div className='pb-[30px] md:pb-[65px] border-gray-500'>
                        <Image src={logo4} alt='image'/>
                    </div>

                    <div className='h-[1px] w-full bg-gray-500 rounded-xl'>

                    </div>

                    <div className='pt-[30px] md:pt-[53px] '>
                        <h3 className='text-30'>Big Results, Smarter Spending </h3>
                    </div>

                </div>

            </div>

            </div>

        </div>
    </div>
  )
}

export default Boost