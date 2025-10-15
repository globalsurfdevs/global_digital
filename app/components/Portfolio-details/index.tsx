"use client"

import React, { useEffect, useState } from 'react'
import HeroSection from './HeroSection'
import Goals from './Goals'
import Result from './Result'
import { useParams } from 'next/navigation'
import { Portfolio } from '@/app/types/Portfolio'
import { PortfolioHighlight } from '@/app/types/PortfolioHighlights'
import MainSection from './MainSection'

const PortfolioDetails = () => {

    const {companyName} = useParams()

    const [data, setData] = useState<{ portfolio: Portfolio[]; portfolioHighlights: PortfolioHighlight[]; } | null>(null)

    useEffect(() => {
        
        const fetchPortfolioDetails = async () => {
            const response = await fetch(`/api/portfolio?slug=${companyName}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setData(data)
            }
        }

        fetchPortfolioDetails()

    }, [])


    return (
        <>
            <MainSection data={data}/>
            <HeroSection data={data}/>
            <Goals data={data} companyName={companyName?.toString() ?? null}/>
            <Result data={data}/>
        </>
    )
}

export default PortfolioDetails