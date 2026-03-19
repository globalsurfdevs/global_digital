"use client";
import { motion } from "motion/react";
import { Portfolio } from "@/app/types/Portfolio";
import { PortfolioHighlight } from "@/app/types/PortfolioHighlights";
import Image from "next/image";
import Link from "next/link";


const MainSectionDetails = ({
  data,
}: {
  data: {
    portfolio: Portfolio;
    portfolioHighlights: PortfolioHighlight[];
  } | null;
}) => {
  if (!data) return null;


  return (
    <section>
      <div className="relative">
              <div className="z-1 relative h-[350px] w-full lg:h-[450px] xl:h-screen">
                <Image
                  src={data.portfolio.bannerImage}
                  alt="heroImage"
                  className="absolute h-full w-full object-cover object-center"
                  fill
                />
                <div className="bg-bl-gradient absolute top-0 h-full w-full "></div>
              </div>
            </div>
            <div className="bg-dgray">
      <div className="container mx-auto py-2"  >
        <div className=" ptcs0   pb-10  lg:pb-[80px] xl:pb-[100px]  2xl:pb-[140px]  pt-[20px] sm:pt-[50px] lg:pt-[100px] ">
          <div className="md:flex items-end justify-between pb-5 lg:pb-[60px]  mb-5 lg:mb-[50px] border-b border-black/20">
            <div className=" xxl:max-w-[120ch]"  >
              <h1 className="title-80">{data.portfolio.bannerTitle == "null" || data.portfolio.bannerTitle == "undefined" ? "" : data.portfolio.bannerTitle}</h1>
            </div>
            <div className="w-fit ml-auto mt-3 md:mt-0"><Image src={data.portfolio.logo} alt={data.portfolio.companyName} width={150} height={100} className="max-w-[100px] md:max-w-[150px]" /></div>
          </div>
          <div className="flex flex-col lg:flex-row  gap-4   justify-between">
            <div className="flex gap-5 lg:gap-10 xl:gap-[120px]  justify-between">
              <div>
                <p className="text-19 fnt-lexend pb-[5px] text-gray1 leadeing-[2.105263157894737]">Industry</p>
                <p className="text-30 leading-lh1p33 font-normal">{data.portfolio.industry}</p>
              </div>
              <div>
                <p className="text-19 fnt-lexend pb-[5px] text-gray1 leadeing-[2.105263157894737]">Country</p>
                <p className="text-30 leading-lh1p33 font-normal">{data.portfolio.country}</p>
              </div>
              <div>
                <p className="text-19 fnt-lexend pb-[5px] text-gray1 leadeing-[2.105263157894737]">Year</p>
                <p className="text-30 leading-lh1p33 font-normal">2025</p>
              </div>
            </div>
            <div>
              <div>
                <p className="text-19 fnt-lexend pb-[5px] text-gray1 leadeing-[2.105263157894737]">Services</p>
                <div className="flex flex-wrap gap-2 max-w-md">
                  {data.portfolio.channels.map((item, index) => (
                    <Link href={item.channelLink} key={index}><button className="btn-outline-primary-text-black">{item.channelName}</button></Link>
                  ))}
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default MainSectionDetails;
