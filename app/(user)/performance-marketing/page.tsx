import React from 'react'
import HeroSection from '@/app/components/PermormanceMarketing/HeroSection'
import Expertise from '@/app/components/PermormanceMarketing/Expertise'
import Boost from '@/app/components/PermormanceMarketing/Boost'
import Services from '@/app/components/PermormanceMarketing/Services'
import Framework from '@/app/components/PermormanceMarketing/Framework'
import Industries from '@/app/components/PermormanceMarketing/Industries'
import Results from '@/app/components/PermormanceMarketing/Results'
import Platforms from '@/app/components/PermormanceMarketing/Platforms'
import Partner from '@/app/components/PermormanceMarketing/Partner'
import Testimonials from '@/app/components/HomePage/Testimonials'
import FAQ from '@/app/components/PermormanceMarketing/FAQ'
import GetInTouch from '@/app/components/PermormanceMarketing/GetInTouch'

const page = () => {
  return (
    <div>
        <HeroSection/>
        <Expertise/>
        <Boost/>
        <Services/>
        <Framework/>
        <Industries/>
        <Results/>
        <Platforms/>
        <Partner/>
        <Testimonials/>
        <GetInTouch/>
        <FAQ/>
    </div>
  )
}

export default page