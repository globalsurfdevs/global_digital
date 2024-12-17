import { assets } from '@/public/assets/assets'
import Image from 'next/image'
import React from 'react'

const Expertise = () => {
  return (
    <div className='container mx-auto py-4'>
        <div className='pt-[50px] lg:pt-[136px] pb-[50px] lg:pb-[150px] flex flex-col '>

            <div className='mb-[30px] lg:mb-[56px]'>
                <h1 className='title-65 '>Area of Expertise</h1>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-0 bdrsm'>
  {/* Item 1 */}
  <div className='h-[414px] flex flex-col p-10 justify-between border border-r-0 border-b-0'>
    <div className='p-2 bg-primary w-fit h-fit'>
      <Image src={assets.sea} alt='image' />
    </div>
    <div>
      <p className='text-30 max-w-60'>Search Engine Advertising</p>
    </div>
  </div>

  {/* Item 2 */}
  <div className='h-[414px] flex flex-col p-10 justify-between border border-r-0 border-b-0 hover:bg-primary group'>
    <div className='p-2 bg-primary w-fit h-fit group-hover:bg-white'>
      <Image
        className='group-hover:invert group-hover:brightness-0 ease-linear'
        src={assets.socialMediaNew}
        alt='image'
      />
    </div>
    <div>
      <p className='text-30 max-w-60'>Social Media Marketing</p>
    </div>
  </div>

  {/* Item 3 */}
  <div className='h-[414px] flex flex-col p-10 justify-between border '>
    <div className='p-2 bg-primary w-fit h-fit'>
      <Image src={assets.influencer} alt='image' />
    </div>
    <div>
      <p className='text-30 max-w-60'>Influencer Marketing</p>
    </div>
  </div>

  {/* Item 4 */}
  <div className='h-[414px] flex flex-col p-10 justify-between border '>
    <div className='p-2 bg-primary w-fit h-fit'>
      <Image src={assets.programmatic} alt='image' />
    </div>
    <div>
      <p className='text-30 max-w-60'>Programmatic Advertising</p>
    </div>
  </div>

  {/* Item 5 */}
  <div className='h-[414px] flex flex-col p-10 justify-between border border-r-0'>
    <div className='p-2 bg-primary w-fit h-fit'>
      <Image src={assets.videoAd} alt='image' />
    </div>
    <div>
      <p className='text-30 max-w-60'>Video ads & Display</p>
    </div>
  </div>

  {/* Item 6 */}
  <div className='h-[414px] flex flex-col p-10 justify-between border '>
    <div className='p-2 bg-primary w-fit h-fit'>
      <Image src={assets.appStore} alt='image' />
    </div>
    <div>
      <p className='text-30 max-w-60'>App Store advertising</p>
    </div>
  </div>
            </div>


        </div>
    </div>
  )
}

export default Expertise