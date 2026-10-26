"use client";

import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import Goals from "./Goals";
import Result from "./Result";
import { useParams } from "next/navigation";
import { Portfolio } from "@/app/types/Portfolio";
import { PortfolioHighlight } from "@/app/types/PortfolioHighlights";
import MainSection from "./MainSection";
import MainSectionDetails from "./MainSectionDetails";
import HeroSectionDetails from "./HeroSectionDetails";
import ResultDetails from "./ResultDetails";
import CtaDetailsone from "./CtaDetailsone";
import CtaDetailsTwo from "./CtaDetailsTwo";
import WhatWeDelivered from "./WhatWeDelivered";
import YtVideo from "./YtVideo";
import SocialMedia from "./SocialMedia";
import portfolioListRaw from "@/portfolios_rows_converted.json";
import portfolioHighlightsRaw from "@/portfolioHighlights_rows.json";

import { assets } from "@/public/assets/assets";
import { Gauge, ShieldCheck } from "lucide-react";
const Frameworkdata = {
  title: "What We Delivered",
  data: [
    {
      id: 1,
      title: "Website redesign",
      dec: "",
      icn: assets.icss1,
      urllink: "",
    },
    {
      id: 2,
      title: "Performance optimisation",
      dec: "",
      icn: assets.icss2,
      urllink: "",
    },
    {
      id: 3,
      title: "Brand identity system",
      dec: "",
      icn: assets.icss3,
      urllink: "",
    },
    {
      id: 4,
      title: "Mobile UX overhaul",
      dec: "",
      icn: assets.icss4,
      urllink: "",
    },
  ],
};


export const FrameworkdataShoba = {
  title: "What We Delivered",
  data: [
    {
      id: 1,
      title: "Website design & development from ground up",
      dec: "Custom end-to-end design and engineering built specifically to align with business objectives and scale seamless user experiences.",
      icn: assets.icss1,
      urllink: "",
    },
    {
      id: 2,
      title: "Information architecture & content structuring",
      dec: "Logical page hierarchy and structured content layouts ensuring users find essential service details effortlessly.",
      icn: assets.icss2,
      urllink: "",
    },
    {
      id: 3,
      title: "User experience & navigation planning",
      dec: "Intuitive user journeys and seamless navigation flows designed to reduce bounce rates and boost user engagement.",
      icn: assets.icss3,
      urllink: "",
    },
    {
      id: 4,
      title: "Mobile & cross-device compatibility",
      dec: "Fully responsive designs tailored across all viewports to guarantee visual and functional consistency on every screen.",
      icn: assets.icss4,
      urllink: "",
    },
    {
      id: 5,
      title: "Site speed & performance optimisation",
      dec: "Optimized asset delivery, light DOM structure, and clean code implementation for ultra-fast page load speeds.",
      icn:Gauge,
      urllink: "",
    },
    {
      id: 6,
      title: "Secure & scalable platform setup",
      dec: "Future-proof infrastructure and security standards ready to scale alongside growing business demands.",
      icn: ShieldCheck,
      urllink: "",
    },
  ],
};
const   PortfolioDetails = ({ data,endpoint }: any) => {
  // const { companyName } = useParams()

  // const parseJSON = (value: any) => {
  //     if (!value) return [];
  //     if (Array.isArray(value)) return value;

  //     try {
  //         return JSON.parse(value);
  //     } catch {
  //         return [];
  //     }
  // };

  // const portfolioList: Portfolio[] = portfolioListRaw.map((item: any) => ({
  //     ...item,
  //     categories: parseJSON(item.categories),
  //     channels: parseJSON(item.channels),
  //     channelsUsed: parseJSON(item.channelsUsed),
  // }));

  // const portfolioHighlightsList: PortfolioHighlight[] =
  //     portfolioHighlightsRaw.map((item: any) => ({
  //         ...item,
  //         companyId: Number(item.companyId), // 🔥 force to number
  //     }));


  // const portfolio = portfolioList.filter(
  //     (item) => item.slug === companyName
  // )[0];

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

  // let portfolioHighlights: PortfolioHighlight[] = [];

  // if (portfolio) {
  //     portfolioHighlights = portfolioHighlightsList.filter(
  //         (item) => item.companyId === portfolio.id
  //     );
  // }

  // const data = {
  //     portfolio,
  //     portfolioHighlights,
  // };
  // console.log("portfolio data :",data.portfolio)
  if (
    data.portfolio?.slug === "innovo-group" ||
    endpoint === "sobha-constructions-v2"
  ) {
    const defaultDelivered =
      data.portfolio.slug === "innovo-group" ? Frameworkdata : FrameworkdataShoba;
    const deliveredData =
      Array.isArray(data.portfolio.whatWeDeliveredData) &&
      data.portfolio.whatWeDeliveredData.length > 0
        ? data.portfolio.whatWeDeliveredData
        : defaultDelivered.data;

    return (
      <>
        <MainSectionDetails data={data} />
        <HeroSectionDetails data={data} />
        {endpoint != "sobha-constructions-v2"&&(

        <ResultDetails data={data} />
        )}
        <WhatWeDelivered
          title={data.portfolio.whatWeDeliveredTitle || defaultDelivered.title}
          data={deliveredData}
          endpoint={endpoint}
          colcount={4}
        />
        <CtaDetailsone data={data} endpoint={endpoint} />
        <CtaDetailsTwo data={data} />
      </>
    );
  } else {
    return (
      <>
        <MainSection data={data} />
        <HeroSection data={data} />
        <Goals data={data} companyName={data.companyName?.toString() ?? null} />
        <YtVideo data={data} />
        {data?.portfolio.section == "case study new" && (
          <SocialMedia data={data} />
        )}
        <Result data={data} />
      </>
    );
  }
};

export default PortfolioDetails;
