"use client";
import { motion } from "motion/react";
import { Portfolio } from "@/app/types/Portfolio";
import { PortfolioHighlight } from "@/app/types/PortfolioHighlights";
import Image from "next/image";
import Link from "next/link";  
 

  const MainSection = ({
    data,
  }: {
    data: {
      portfolio: Portfolio[];
      portfolioHighlights: PortfolioHighlight[];
    } | null;
  }) => {
    if (!data) return null;
  

  return (
    <section>
       <div className="container mx-auto py-2"  >
          <div className=" ptcs0 border-b pb-10  lg:pb-[80px] xl:pb-[100px]  2xl:pb-[140px]  pt-[20px] sm:pt-[50px] lg:pt-[100px] ">
              <div className="md:flex items-end justify-between pb-5 lg:pb-[60px]  mb-5 lg:mb-[50px] border-b">
                <div className=" xxl:max-w-[120ch]"  >
                  <h1 className="title-80">{data.portfolio[0].bannerTitle == "null" || data.portfolio[0].bannerTitle == "undefined" ? "" : data.portfolio[0].bannerTitle}</h1>
              </div> 
              <div className="w-fit ml-auto mt-3 md:mt-0"><Image src={data.portfolio[0].logo} alt={data.portfolio[0].companyName}  width={150} height={100} className="max-w-[100px] md:max-w-[150px]" /></div>
              </div>
              <div className="flex flex-col lg:flex-row  gap-4   justify-between">
                <div className="flex gap-5 lg:gap-10 xl:gap-[120px]  justify-between">
                  <div>
                    <p className="text-19 fnt-lexend pb-[5px] text-gray1 leadeing-[2.105263157894737]">Industry</p>
                    <p className="text-30 leading-lh1p33 font-normal">{data.portfolio[0].industry}</p>
                  </div>
                  <div>
                    <p className="text-19 fnt-lexend pb-[5px] text-gray1 leadeing-[2.105263157894737]">Country</p>
                    <p className="text-30 leading-lh1p33 font-normal">{data.portfolio[0].country}</p>
                  </div>
                </div>
                <div>
                  <div>
                  <p className="text-19 fnt-lexend pb-[5px] text-gray1 leadeing-[2.105263157894737]">Services</p>
                  <div className="flex flex-wrap gap-2 max-w-md">
                    {data.portfolio[0].channels.map((item, index) => (
                    <Link href={item.channelLink} key={index}><button className="btn-outline-primary-text-black">{item.channelName}</button></Link>
                  ))} 
                  </div>

                  
                  </div>
                </div> 
              </div>
          </div>
        </div>
    </section>
  );
};

export default MainSection;
