"use client"

import React, { useEffect, useState } from 'react'
import HeroSection from '@/app/components/CaseStudy/HeroSection'
import Goals from '@/app/components/CaseStudy/Goals'
import Percentages from '@/app/components/CaseStudy/Percentages'
import Ready from '@/app/components/CaseStudy/Ready'
import SuccessStories from '@/app/components/CaseStudy/SuccessStories'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { CaseStudy } from '@/app/types/CaseStudy'


const page = () => {
  // const [data,setData] = useState<CaseStudy | null>(null)

  // const {id} = useParams()

  // useEffect(()=>{
  //   const fetchCaseStudyData = async() =>{
  //     try {
  //       const response = await fetch(`/api/case-study?id=${id}`)
  //       if(response.ok){
  //         const data = await response.json()
  //         if(!data.error){
  //           setData(data.caseStudy)
  //         }
  //       }
  //     } catch (error) {
  //       console.log("Error fetching case study data",error)
  //     }
  //   }

  //   fetchCaseStudyData()
    
  // },[])

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