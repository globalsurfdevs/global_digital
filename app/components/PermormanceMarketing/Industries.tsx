import React from 'react'
import WorkSwiper from '../HomePage/WorkSwiper'

const Industries = () => {
  return (
    <div className='container mx-auto py-4'>
        <div className='py-24 flex flex-col gap-10 border-b-2'>
            
            <div className='text-4xl'>
                <h1>Industries We Serve</h1>
            </div>

            <WorkSwiper/>
        </div>
    </div>
  )
}

export default Industries