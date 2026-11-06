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
import SocialMediaInstagram from "./SocialMediaInstagram";
import portfolioListRaw from "@/portfolios_rows_converted.json";
import portfolioHighlightsRaw from "@/portfolioHighlights_rows.json";

import { assets } from "@/public/assets/assets";
import { Gauge, ShieldCheck } from "lucide-react";
import { SuccessStoriesPortfolio } from "../SuccessStories/SuccessStoriesPortfolio";

const PortfolioDetails = ({
  data,
  endpoint,
  successStories,
  instagramPosts,
  instagramFlush,
}: any) => {
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
      data.portfolio.previewImage?.images.filter(Boolean) ?? []
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
        : [];
        
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
            data.portfolio.whatWeDeliveredTitle 
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
        {data?.portfolio.section == "case study new" &&
          // Only the /v2 and /v3 pages pass `instagramPosts`; every other page
          // keeps the original section with the uploaded images.
          (instagramPosts !== undefined ? (
            <SocialMediaInstagram
              data={data}
              instagramPosts={instagramPosts}
              flush={instagramFlush === true}
            />
          ) : (
            <SocialMedia data={data} />
          ))}
        <Result data={data} successStories={successStories} />
      </>
    );
  }
};

export default PortfolioDetails;
