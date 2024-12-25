import React from 'react'
import HeroSection from '@/app/components/CaseStudy/HeroSection'
import Goals from '@/app/components/CaseStudy/Goals'
import Percentages from '@/app/components/CaseStudy/Percentages'
import Ready from '@/app/components/CaseStudy/Ready'
import SuccessStories from '@/app/components/CaseStudy/SuccessStories'

const page = () => {
  return (
    <>
    <HeroSection/>
    <Goals/>
    <Percentages/>
    <Ready/>
    <SuccessStories/>
    </>
  )
}

export default page