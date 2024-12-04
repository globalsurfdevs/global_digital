import React from 'react'
import WorkSwiper from './WorkSwiper'

const WorkIn = () => {
  return (
    <div className='bg-gray-100'>
    <div className='container mx-auto px-4 py-4'>
        <div className='py-20 flex flex-col gap-12'>
            <h1 className='text-4xl'>We Work In</h1>
            <WorkSwiper/>
        </div>
    </div>
    </div>
  )
}

export default WorkIn