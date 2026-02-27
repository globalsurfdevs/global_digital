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
import portfolioListRaw from "@/portfolios_rows_converted.json";
import portfolioHighlightsRaw from "@/portfolioHighlights_rows.json";


const CaseStudyPage = () => {
  // const [data, setData] = useState<{ caseStudy: CaseStudy[], caseStudyHighlights: CaseStudyHighlights[] } | null>(null)

  const { companyName } = useParams()

  // useEffect(() => {
  //   const fetchCaseStudyData = async () => {
  //     try {
  //       const response = await fetch(`/api/case-study?slug=${companyName}`, {
  //         cache: "no-cache"
  //       })
  //       if (response.ok) {
  //         const data = await response.json()
  //         // console.log(data)
  //         if (!data.error) {
  //           setData(data)
  //         }
  //       }
  //     } catch (error) {
  //       console.log("Error fetching case study data", error)
  //     }
  //   }

  //   if (companyName !== "quad-dream") {
  //     fetchCaseStudyData()
  //   }

  // }, [])

  const parseJSON = (value: any) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;

    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  };

  const caseStudyList: CaseStudy[] = portfolioListRaw.map((item: any) => ({
    ...item,
    categories: parseJSON(item.categories),
    channels: parseJSON(item.channels),
    channelsUsed: parseJSON(item.channelsUsed),
  }));

  const caseStudyHighlightsList: CaseStudyHighlights[] =
    portfolioHighlightsRaw.map((item: any) => ({
      ...item,
      companyId: Number(item.companyId), // 🔥 force to number
    }));

  // ✅ Mimic Supabase `.select().eq()` (returns array)
  const caseStudy = caseStudyList.filter(
    (item) => item.slug === companyName
  );

  let caseStudyHighlights: CaseStudyHighlights[] = [];

  if (caseStudy.length > 0) {
    caseStudyHighlights = caseStudyHighlightsList.filter(
      (item) => item.companyId === caseStudy[0].id
    );
  }

  if (caseStudy.length === 0) {
    return <div>Portfolio not found</div>;
  }

  const data = {
    caseStudy,
    caseStudyHighlights,
  };


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