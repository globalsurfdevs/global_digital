"use client"

import React, { useEffect, useState } from 'react'
import HeroSection from './HeroSection'
import Goals from './Goals'
import Result from './Result'
import { useParams } from 'next/navigation'
import { Portfolio } from '@/app/types/Portfolio'
import { PortfolioHighlight } from '@/app/types/PortfolioHighlights'
import MainSection from './MainSection'
import YtVideo from './YtVideo'
import SocialMedia from './SocialMedia'
import portfolioListRaw from "@/portfolios_rows_converted.json";
import portfolioHighlightsRaw from "@/portfolioHighlights_rows.json";

const PortfolioDetails = () => {

    const { companyName } = useParams()

    const parseJSON = (value: any) => {
        if (!value) return [];
        if (Array.isArray(value)) return value;

        try {
            return JSON.parse(value);
        } catch {
            return [];
        }
    };


    const portfolioList: Portfolio[] = portfolioListRaw.map((item: any) => ({
        ...item,
        categories: parseJSON(item.categories),
        channels: parseJSON(item.channels),
        channelsUsed: parseJSON(item.channelsUsed),
    }));

    const portfolioHighlightsList: PortfolioHighlight[] =
        portfolioHighlightsRaw.map((item: any) => ({
            ...item,
            companyId: Number(item.companyId), // 🔥 force to number
        }));

    // ✅ Mimic Supabase `.select().eq()` (returns array)
    const portfolio = portfolioList.filter(
        (item) => item.slug === companyName
    )[0];



    // const [data, setData] = useState<{ portfolio: Portfolio; portfolioHighlights: PortfolioHighlight[]; } | null>(null)

    // useEffect(() => {

    //     const fetchPortfolioDetails = async () => {
    //         const response = await fetch(`/api/portfolio?slug=${companyName}`);
    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log(data)
    //             setData(data)
    //         }
    //     }

    //     fetchPortfolioDetails()

    // }, [])

    // if (!data) {
    //     return null
    // }

    let portfolioHighlights: PortfolioHighlight[] = [];

    if (portfolio) {
        portfolioHighlights = portfolioHighlightsList.filter(
            (item) => item.companyId === portfolio.id
        );
    }

    const data = {
        portfolio,
        portfolioHighlights,
    };


    return (
        <>
            <MainSection data={data} />
            <HeroSection data={data} />
            <Goals data={data} companyName={companyName?.toString() ?? null} />
            <YtVideo data={data} />
            {data?.portfolio.section == "case study new" && <SocialMedia data={data} />}
            <Result data={data} />
        </>
    )
}

export default PortfolioDetails