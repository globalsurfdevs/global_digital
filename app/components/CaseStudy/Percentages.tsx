import React from 'react'

const Percentages = () => {
  return (
    <div className='bg-black'>
        <div className='container mx-auto py-4'>
            
            <div className='py-24 grid grid-cols-2 gap-8'>

            
            <div className='flex flex-col justify-between gap-14'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-primary text-[65px]'>30.43%</h1>
                    <div className='w-full bg-white rounded-xl h-0.5'></div>
                    <h3 className='text-white text-[30px]'>Increase in Avg. Page Speed</h3>
                </div>

                <div className='flex flex-col gap-3'>
                    <h1 className='text-primary text-[65px]'>2X</h1>
                    <div className='w-full bg-white rounded-xl h-0.5'></div>
                    <h3 className='text-white text-[30px]'>Increase in Session Duration</h3>
                </div>

            </div>

            <div className='flex flex-col justify-between gap-24'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-primary text-[65px]'>88.20%</h1>
                    <div className='w-full bg-white rounded-xl h-0.5'></div>
                    <h3 className='text-white text-[30px]'>Increase in Returning Users</h3>
                </div>

                <div className='flex flex-col gap-3'>
                    <h1 className='text-primary text-[65px]'>30X</h1>
                    <div className='w-full bg-white rounded-xl h-0.5'></div>
                    <h3 className='text-white text-[30px]'>Increase in Avg. Page Speed</h3>
                </div>

            </div>


            </div>
        
        </div>

    </div>
  )
}

export default Percentages