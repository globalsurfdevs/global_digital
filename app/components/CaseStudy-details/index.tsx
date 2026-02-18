"use client"
import React, { useEffect, useState } from 'react'
import HeroSection from '../../components/CaseStudy/HeroSection'
import Goals from '../../components/CaseStudy/Goals'
import Percentages from '../../components/CaseStudy/Percentages'
import Ready from '../../components/CaseStudy/Ready'
import { SuccessStories } from '@/app/components/SuccessStories/SuccessStories'
import { useParams } from 'next/navigation'
import { CaseStudy } from '@/app/types/CaseStudy'
import { CaseStudyHighlights } from '@/app/types/CaseStudyHighlights'
import PortfolioDetails from '@/app/components/Portfolio-details'


const CaseStudyPage = () => {
  const [data, setData] = useState<{ caseStudy: CaseStudy[], caseStudyHighlights: CaseStudyHighlights[] } | null>(null)

  const { companyName } = useParams()

  useEffect(() => {
    const fetchCaseStudyData = async () => {
      try {
        const response = await fetch(`/api/case-study?slug=${companyName}`, {
          cache: "no-cache"
        })
        if (response.ok) {
          const data = await response.json()
          // console.log(data)
          if (!data.error) {
            setData(data)
          }
        }
      } catch (error) {
        console.log("Error fetching case study data", error)
      }
    }

    if (companyName !== "quad-dream") {
      fetchCaseStudyData()
    }

  }, [])

  if (companyName == "quad-dream") {
    return (
      <>
        <PortfolioDetails />
      </>
    )
  } else {
    return (
      <>
        <HeroSection data={data} />
        <Goals data={data} />
        <Percentages data={data} />
        <Ready data={data} />
        <div className='container mx-auto py-4'>
          <SuccessStories companyId={data?.caseStudy[0].id} />
        </div>
      </>
    )
  }
}

export default CaseStudyPage