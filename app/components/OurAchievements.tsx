import { assets } from '@/public/assets/assets'
import Image from 'next/image'

import React from 'react'

const OurAchievements = () => {
  return (
    <div className="bg-black text-white px-16 mt-20">
    <div className="grid md:grid-cols-3 gap-8">
      <div className="flex flex-col items-start py-16">
        <div className="mb-8">
        <Image src={assets.years} alt='years'/>
        </div>
        <h4 className="text-3xl font-bold mt-4">10 Years</h4>
        <p className="text-sm">and Counting</p>
      </div>

      <div className="flex flex-col items-start py-16 border-l border-l-[#77787B]  pl-10">
      <div className="mb-8">
        <Image src={assets.clients} alt='years'/>
        </div>
        <h1 className="text-3xl font-bold mt-4"><span className='text-primary'>125</span> Clients</h1>
        <p className="text-sm">and <span className='text-primary'>Growing</span></p>
      </div>

      <div className="flex flex-col items-start py-16 border-l border-l-[#77787B]  pl-10">
      <div className="mb-8">
        <Image src={assets.projects} alt='years'/>
        </div>
        <h1 className="text-3xl font-bold mt-4">250 Projects</h1>
        <p className="text-sm">and More to Come</p>
      </div>
    </div>
  </div>
  )
}

export default OurAchievements