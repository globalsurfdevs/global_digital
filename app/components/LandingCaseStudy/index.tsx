import React from 'react'
import HeroSection from '../Portfolio/HeroSectionCaseStudy'
import CaseStudyList from './CaseStudyList'

const LandingCaseStudy = ({data, industries}:any) => {
  return (
    <>
        <HeroSection/>
        <CaseStudyList data={data} industries={industries}/>
    </>
  )
}

export default LandingCaseStudy