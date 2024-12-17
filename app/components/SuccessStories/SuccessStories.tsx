import { data } from "./data"
import React from 'react'
import Image from "next/image"

export const SuccessStories = () => {
    return (
        <div className='py-8 lg:py-12 flex flex-col gap-4 lg:pb-24 pb-12'>

            <div>
                <h1 className='text-font65'>Success Stories We&apos;re Proud of</h1>
            </div>

            <div className='grid lg:grid-cols-3 gap-8'>

                {data.map((item,index) => (
                    <div className='flex flex-col lg:gap-8 gap-1' key={index}>
                        <div className='bg-black h-96 relative'>
                            <Image src={item.image} alt="image" className="absolute object-cover w-full h-full"/>
                        </div>
                        <div className='min-h-20'>
                            <Image src={item.companyLogo} alt='innovo' className='w-20 md:w-40' />
                        </div>
                        <div className='bg-black h-[.5px] w-full'>

                        </div>
                        <div>
                            <h4 className='text-font30'>{item.text}</h4>
                        </div>

                        <div className='bg-black h-1 w-full shadow-lg lg:hidden'>

                        </div>

                    </div>
                ))}



            </div>

        </div>
    )
}

