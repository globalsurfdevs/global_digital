import React from 'react'
import WorkSwiper from './WorkSwiper'

const WorkIn = () => {
  return (
    <div className='bg-gray-100 overflow-hidden'>
    <div className='container mx-auto px-4 py-4'>
        <div className='py-10 md:py-20 flex flex-col gap-12'>
            <h1 className='text-font65 leading-lh1p07'>We Work In</h1>
            <WorkSwiper/>
        </div>
    </div>
    </div>
  )
}

export default WorkIn