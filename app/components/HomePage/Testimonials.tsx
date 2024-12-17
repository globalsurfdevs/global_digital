import React from 'react'
import TestimonialsSwiper from './TestimonialsSwiper'

const Testimonials = () => {
  return (
    <div className='bg-bglight'>
      <div className="container px-4 mx-auto ">
        <div className="py-[50px] md:py-10 lg:py-12 xl:pt-[138px] xl:pb-[110px]">
          <h1 className="title-65">What they say about us</h1>
          <div>
            <TestimonialsSwiper />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials