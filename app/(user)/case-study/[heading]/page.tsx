"use client"

import React, { useEffect, useState } from 'react'
import HeroSection from '@/app/components/CaseStudy/HeroSection'
import Goals from '@/app/components/CaseStudy/Goals'
import Percentages from '@/app/components/CaseStudy/Percentages'
import Ready from '@/app/components/CaseStudy/Ready'
import SuccessStories from '@/app/components/CaseStudy/SuccessStories'
import { useParams } from 'next/navigation'
import { CaseStudy } from '@/app/types/CaseStudy'
import { CaseStudyHighlights } from '@/app/types/CaseStudyHighlights'


const page = () => {
  const [data,setData] = useState<{caseStudy:CaseStudy[] , caseStudyHighlights:CaseStudyHighlights[] } | null>(null)

  const {heading} = useParams()

  useEffect(()=>{
    const fetchCaseStudyData = async() =>{
      try {
        const response = await fetch(`/api/case-study?slug=${heading}`)
        if(response.ok){
          const data = await response.json()
          console.log(data)
          if(!data.error){
            setData(data)
          }
        }
      } catch (error) {
        console.log("Error fetching case study data",error)
      }
    }

    fetchCaseStudyData()
    
  },[])

  return (
    <>
    <HeroSection data={data}/>
    <Goals data={data}/>
    <Percentages data={data}/>
    <Ready data={data}/>
    <SuccessStories/>
    </>
  )
}

export default page