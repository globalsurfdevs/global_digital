import React from 'react'
import TestimonialsSwiper from './TestimonialsSwiper'

const Testimonials = () => {
  return (
    <div className='bg-bglight'>
      <div className="container px-4 mx-auto ">
        <div className="py-6 md:py-24">
          <h1 className="text-font65 leading-lh1p76">What they say about us</h1>
          <div>
            <TestimonialsSwiper />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials