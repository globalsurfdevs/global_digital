import React from 'react'

export default function CountBox() {
  return (
    <section className='pb-140'>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-8 border-r border-black/10 last:border-r-0 pl-10 first:pl-0">
            <h3 className='text-font65 font-normal leading-[1.076923076923077]'>25 <span className='text-primary'>+</span></h3>
            <p className='text-font25 font-normal leading-[1.3] text-gray1'>Active Campaigns</p>
          </div>
          <div className="flex flex-col gap-8 border-r border-black/10 last:border-r-0 pl-10 first:pl-0">
            <h3 className='text-font65 font-normal leading-[1.076923076923077]'>35 <span>+</span></h3>
            <p className='text-font25 font-normal leading-[1.3] text-gray1'>Experts Across Disciplines</p>
          </div>
          <div className="flex flex-col gap-8 border-r border-black/10 last:border-r-0 pl-10 first:pl-0">
            <h3 className='text-font65 font-normal leading-[1.076923076923077]'>80 <span>%</span></h3>
            <p className='text-font25 font-normal leading-[1.3] text-gray1'>Projects Achieved 8x–12x ROAS </p>
          </div>
        </div>
      </div>
    </section>
  )
}
