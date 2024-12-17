import React from 'react'

const Percentages = () => {
  return (
    <div className='bg-black'>
        <div className='container mx-auto py-4'>

            <div className='lg:py-24 py-12 grid lg:grid-cols-2 lg:gap-8 gap-5'>


            <div className='flex flex-col justify-between lg:gap-14 gap-5'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-primary text-font65'>30.43%</h1>
                    <div className='w-full bg-white rounded-xl h-0.5'></div>
                    <h3 className='text-white text-font30'>Increase in Avg. Page Speed</h3>
                </div>

                <div className='flex flex-col gap-3'>
                    <h1 className='text-primary text-font65'>2X</h1>
                    <div className='w-full bg-white rounded-xl h-0.5'></div>
                    <h3 className='text-white text-font30'>Increase in Session Duration</h3>
                </div>

            </div>

            <div className='flex flex-col justify-between lg:gap-24 gap-5'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-primary text-font65'>88.20%</h1>
                    <div className='w-full bg-white rounded-xl h-0.5'></div>
                    <h3 className='text-white text-font30'>Increase in Returning Users</h3>
                </div>

                <div className='flex flex-col gap-3'>
                    <h1 className='text-primary text-font65'>30X</h1>
                    <div className='w-full bg-white rounded-xl h-0.5'></div>
                    <h3 className='text-white text-font30'>Increase in Avg. Page Speed</h3>
                </div>

            </div>


            </div>

        </div>

    </div>
  )
}

export default Percentages