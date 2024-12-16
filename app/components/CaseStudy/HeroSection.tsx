
import { assets } from '@/public/assets/assets'
import Image from 'next/image'

const HeroSection = () => {
  
  return (
    <>
      <div className='container mx-auto py-4'>
        <div className='lg:grid lg:grid-cols-8 items-center border-b pt-5 lg:pt-16 flex flex-col gap-2'>

          <div className='text-font80 lg:col-span-5 xl:col-span-5 lg:text-left w-full h-full'>
            <h1 className='leading-lh1p18'>How Seleo Achieved 10x Revenue Growth</h1>
          </div>

          <div className='lg:col-span-3 xl:col-span-3 flex flex-col gap-5 lg:gap-18 lg:items-end w-full h-full justify-between py-4'>
            <Image src={assets.seleoLogo} alt='image' className='w-20 md:w-48'/>
            <h3 className='text-font30 text-gray1'>Refreshing, Sparkling, Uplifting</h3>
          </div>

        </div>

        <div className='py-6 lg:py-24 flex flex-col lg:w-[70%] gap-6'>

          <div className='flex items-center gap-2'>
            <h4 className='text-font30'>STORY</h4>
            <div className='size-3 md:size-4 lg:size-6 bg-primary'></div>
          </div>

          <div className='text-font19'>
            <p>Seleo, a prominent Middle Eastern beverage brand, sought to expand its
            digital footprint across the UAE, Kuwait, and Qatar. To achieve this,
            they partnered with Global Surf to revitalize their online presence and
            optimize marketing campaigns. The goal was to create a compelling digital
            experience that resonated with their target audience and drove customer engagement.</p>
          </div>
        </div>

      </div>

      <div className='bg-bglight w-full flex flex-col  overflow-hidden'>
        
        <div className='container relative'>

          <div className={"flex h-full py-2"}>
            <div className='flex flex-col lg:gap-8 py-6 lg:py-24 gap-4 lg:w-1/4'>

              <div className='border-b border-black flex flex-col gap-3 pb-8'>
                <h5 className='text-font19 text-gray-400'>Industry</h5>
                <h4 className='text-font30'>Food & Beverage</h4>
              </div>

              <div className='border-b border-black flex flex-col gap-3 pb-8'>
                <h5 className='text-font19 text-gray-400'>Country</h5>
                <h4 className='text-font30'>UAE, Kuwait, Qatar</h4>
              </div>

              <div className='border-b border-black flex flex-col gap-3 pb-8'>
                <h5 className='text-font19 text-gray-400'>Channels Used</h5>
                <h4 className='text-font30'>Website - Google Ads - META Ads</h4>
              </div>

            </div>
          </div>

          {<div className='bg-black h-full absolute top-0 right-[-145px] left-1/3 hidden lg:block'>
              <Image src={assets.seleoCover} alt='cover-image' className='object-cover h-full w-full'/>
          </div>}

        </div>

        {<div className='bg-black h-full lg:hidden'>
              <Image src={assets.seleoCover} alt='cover-image' className='object-cover h-full w-full'/>
          </div>}

      </div>

    </>
  )
}

export default HeroSection