import React from 'react'
import HeroSection from '../components/PermormanceMarketing/HeroSection'
import Expertise from '../components/PermormanceMarketing/Expertise'
import Boost from '../components/PermormanceMarketing/Boost'
import Services from '../components/PermormanceMarketing/Services'
import Framework from '../components/PermormanceMarketing/Framework'
import Industries from '../components/PermormanceMarketing/Industries'
import Results from '../components/PermormanceMarketing/Results'
import Platforms from '../components/PermormanceMarketing/Platforms'
import Partner from '../components/PermormanceMarketing/Partner'
import Testimonials from '../components/HomePage/Testimonials'
import FAQ from '../components/PermormanceMarketing/FAQ'
import GetInTouch from '../components/PermormanceMarketing/GetInTouch'

// import { Employees } from "../data/employees";
const page = () => {
  return (
    <div>
        <HeroSection  />
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