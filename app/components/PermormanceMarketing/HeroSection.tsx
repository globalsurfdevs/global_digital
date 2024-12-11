import Image from 'next/image'
import React from 'react'
import logo1 from '../../../public/assets/logos/002.png'
import logo2 from '../../../public/assets/logos/003.png'
import logo3  from '../../../public/assets/logos/006.png'
import logo4  from '../../../public/assets/logos/004.png'

const HeroSection = () => {
    return (
        <>
            <div className='container mx-auto py-2'>
                <div className='py-24'>

                    <div className='border-b flex justify-between py-5 items-center'>
                        <div className='text-[80px]'><h1>Data Driven Performance Marketing Solutions</h1></div>
                        <div>01</div>
                    </div>

                    <div className='grid grid-cols-2 py-24'>

                        <div className='col-span-1'>
                            <div className='flex gap-2 items-center'>
                                <h3 className='text-[30px]'>OUR APPROACH</h3>
                                <div className='w-5 h-5 bg-primary'></div>
                            </div>
                        </div>

                        <div className='text-[19px]'>
                            <p>Our team will work with you to understand your goals and identify the
                                channels that will give you the best ROI. We’ll help you develop a custom
                                ads strategy to make sure that your marketing budget is spent effectively.
                                We then design creative for your ads and provide ongoing optimization and
                                management in order to achieve sustainable, growth-focused results.</p>
                        </div>

                    </div>

                </div>
            </div>

            <div className='w-[1750px]'>
                <div className='flex gap-5 bg-gray-300 pl-40 py-2'>
                    <div className='flex justify-between w-1/2'>
                        <Image src={logo1 } alt='image'></Image>
                        <Image src={logo2} alt='image'></Image>
                        <Image src={logo3} alt='image'></Image>
                        <Image src={logo4} alt='image'></Image>
                    </div>
                    
                </div>

                <div className='bg-black w-full h-[500px]'>

                </div>

            </div>



        </>
    )
}

export default HeroSection