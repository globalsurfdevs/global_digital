import React from 'react'
import HeroSection from '../Portfolio/HeroSectionCaseStudy'
import CaseStudyList from './CaseStudyList'

const LandingCaseStudy = ({data}:any) => {
  return (
    <>
        <HeroSection/>
        <CaseStudyList data={data}/>
    </>
  )
}

export default LandingCaseStudy