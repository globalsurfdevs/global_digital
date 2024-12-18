import React from 'react'

const Percentages = () => {
  return (
    <div className='bg-black'>
        <div className='container mx-auto py-4'>

            <div className='lg:pt-[110px]  lg:pb-[141px] py-[50px] grid lg:grid-cols-2 lg:gap-[300px] gap-5'>


            <div className='flex flex-col justify-between lg:gap-14 lg:gap-[100px] gap-[35px]'>
                <div className='flex flex-col'>
                    <h1 className='text-primary title-65 pb-[19px]'>30.43%</h1>
                    <div className='w-full bg-gray1 rounded-xl h-[1px] mb-[33px]'></div>
                    <h3 className='text-white text-30'>Increase in Avg. Page Speed</h3>
                </div>

                <div className='flex flex-col'>
                    <h1 className='text-primary title-65 pb-[19px]'>2X</h1>
                    <div className='w-full bg-gray1 rounded-xl h-[1px] mb-[33px]'></div>
                    <h3 className='text-white text-30'>Increase in Session Duration</h3>
                </div>

            </div>

            <div className='flex flex-col justify-between lg:gap-24 lg:gap-[100px] gap-[35px]'>
                <div className='flex flex-col'>
                    <h1 className='text-primary title-65 pb-[19px]'>88.20%</h1>
                    <div className='w-full bg-gray1 rounded-xl h-[1px] mb-[33px]'></div>
                    <h3 className='text-white text-30'>Increase in Returning Users</h3>
                </div>

                <div className='flex flex-col'>
                    <h1 className='text-primary title-65 pb-[19px]'>30X</h1>
                    <div className='w-full bg-gray1 rounded-xl h-[1px] mb-[33px]'></div>
                    <h3 className='text-white text-30'>Increase in Avg. Page Speed</h3>
                </div>

            </div>


            </div>

        </div>

    </div>
  )
}

export default Percentages