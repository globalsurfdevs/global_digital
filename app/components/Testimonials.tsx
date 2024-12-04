import React from 'react'
import TestimonialsSwiper from './TestimonialsSwiper'

const Testimonials = () => {
  return (
    <div className='container px-4 mx-auto'>
        <div className='py-24'>
            <h1 className='text-4xl'>What they say about us</h1>
            <div>
                <TestimonialsSwiper/>
            </div>
        </div>
    </div>
  )
}

export default Testimonials