"use client"

import React, { useEffect, useState } from 'react'
import HeroSection from './HeroSection'
import Goals from './Goals'
import Result from './Result'
import { useParams } from 'next/navigation'
import { Portfolio } from '@/app/types/Portfolio'
import { PortfolioHighlight } from '@/app/types/PortfolioHighlights'

const PortfolioDetails = () => {

    const {companyId} = useParams()

    const [data, setData] = useState<{ portfolio: Portfolio[]; portfolioHighlights: PortfolioHighlight[]; } | null>(null)

    useEffect(() => {
        
        const fetchPortfolioDetails = async () => {
            const response = await fetch(`/api/portfolio?id=${companyId}`);
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
            <HeroSection data={data}/>
            <Goals data={data} />
            <Result data={data}/>
        </>
    )
}

export default PortfolioDetails