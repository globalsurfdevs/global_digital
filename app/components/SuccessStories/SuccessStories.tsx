import { data } from "./data"
import React from 'react'
import Image from "next/image"

export const SuccessStories = () => {
    return (
        <div className='pt-[50px] lg:pt-[61px] flex flex-col   lg:pb-[140px] pb-[52px]'>

            <div>
                <h1 className='title-65 pb-[35px] lg:pb-[48px]'>Success Stories We&apos;re Proud of</h1>
            </div>

            <div className='grid lg:grid-cols-3 gap-8'>

                {data.map((item,index) => (
                    <div className='flex flex-col ' key={index}>
                        <div className='bg-black h-96 relative mb-[31px]'>
                            <Image src={item.image} alt="image" className="absolute object-cover w-full h-full"/>
                        </div>
                        <div className=' '>
                            <Image src={item.companyLogo} alt='innovo' className='w-20 md:w-40' />
                        </div>
                        <div className='bg-black h-[.5px] w-full mt-[10px] lg:mt-[32px] mb-[10px] lg:mb-[42px]'>

                        </div>
                        <div>
                            <h4 className='text-font30'>{item.text}</h4>
                        </div>



                    </div>
                ))}



            </div>

        </div>
    )
}

