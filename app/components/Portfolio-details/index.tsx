"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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
import { SuccessStoriesPortfolio } from "../SuccessStories/SuccessStoriesPortfolio";
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
      icn: Gauge,
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
const PortfolioDetails = ({ data, endpoint, successStories }: any) => {
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

  const isModernPortfolio =
    data.portfolio?.portfolioType === "modern" ||
    (!data.portfolio?.portfolioType &&
      (data.portfolio?.slug === "innovo-group" ||
        endpoint === "sobha-constructions"));

  if (isModernPortfolio) {
    const previewImages =
      data.portfolio.previewImage?.images.filter(Boolean) ?? [];
    const defaultDelivered =
      endpoint === "sobha-constructions" ||
      data.portfolio.slug === "sobha-constructions"
        ? FrameworkdataShoba
        : Frameworkdata;
    const savedDeliveredItems =
      data.portfolio.whatWeDeliveredSec?.data?.length > 0
        ? data.portfolio.whatWeDeliveredSec.data
        : data.portfolio.whatWeDeliveredData;
    const deliveredData =
      Array.isArray(savedDeliveredItems) && savedDeliveredItems.length > 0
        ? savedDeliveredItems.map((item: any, index: number) => ({
            _id: item._id ?? item.id ?? index + 1,
            title: item.title,
            dec: item.dec || "",
            icn: item.icn || "",
            urllink: Array.isArray(item.urllink)
              ? item.urllink.find((link: string) => Boolean(link))
              : item.urllink,
          }))
        : defaultDelivered.data.map((item, index) => ({
            ...item,
            _id: index + 1,
          }));
    const modernData = {
      ...data,
      portfolio: {
        ...data.portfolio,
        detailsCtaOneTitle:
          data.portfolio.detailsCtaOne?.title ||
          data.portfolio.detailsCtaOneTitle,
        detailsCtaOneLinkText:
          data.portfolio.detailsCtaOne?.ctaText ||
          data.portfolio.detailsCtaOneLinkText,
        detailsCtaTwoTitle:
          data.portfolio.detailsCtaTwo?.title ||
          data.portfolio.detailsCtaTwoTitle,
        detailsCtaTwoButtonText:
          data.portfolio.detailsCtaTwo?.ctaText ||
          data.portfolio.detailsCtaTwoButtonText,
      },
    };

    return (
      <>
        <MainSectionDetails data={modernData} />
        <HeroSectionDetails data={modernData} />
        {endpoint != "sobha-constructions" && (
          <ResultDetails data={modernData} />
        )}
        {endpoint === "sobha-constructions" && previewImages.length > 0 && (
          <section className="container mx-auto grid grid-cols-1 gap-5 py-8 md:grid-cols-2">
            {previewImages.map((imageUrl: string, index: number) => (
              <Image
                key={`preview-${index}`}
                src={imageUrl}
                alt={`Portfolio work preview ${index + 1}`}
                width={900}
                height={746}
                className="h-auto w-full"
              />
            ))}
          </section>
        )}
        <WhatWeDelivered
          title={
            data.portfolio.whatWeDeliveredSec?.title ||
            data.portfolio.whatWeDeliveredTitle ||
            defaultDelivered.title
          }
          data={deliveredData}
          endpoint={endpoint}
          colcount={3}
        />
        {/* <CtaDetailsone data={modernData} /> */}
        <div className="container mx-auto py-4 border-t border-gray-400">

          <div>
            <SuccessStoriesPortfolio data={successStories} colCount={3} />
          </div>
        </div>
        <CtaDetailsTwo data={modernData} />
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
        <Result data={data} successStories={successStories} />
      </>
    );
  }
};

export default PortfolioDetails;
