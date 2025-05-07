"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Portfolio } from "@/app/types/Portfolio";
import parse from "html-react-parser";
import { PortfolioHighlight } from "@/app/types/PortfolioHighlights";

const HeroSection = ({
  data,
}: {
  data: {
    portfolio: Portfolio[];
    portfolioHighlights: PortfolioHighlight[];
  } | null;
}) => {
  if (!data) return null;


  return (
    <div>
      <div className="relative">
        <div className="relative z-1 h-[350px] lg:h-[500px] xl:h-[800px] w-full">
          <Image src={data.portfolio[0].bannerImage} alt="heroImage" className="absolute h-full w-full object-cover object-center" fill />
          <div className="bg-bl-gradient absolute top-0 h-full w-full ">
            <div className="container relative h-full w-full invic flex flex-col justify-end" >
              <h1 className="text-font80 text-white max-w-[70%] leading-lh1p18 pb-10 lg:pb-20 xl:pb-[90px] font-normal">{data.portfolio[0].bannerTitle == null ? "" : data.portfolio[0].bannerTitle}
</h1>
              <Image src={data.portfolio[0].logo} alt="image" className="absolute  bottom-[20px] right-[15px] z-1 md:bottom-[30px] lg:bottom-[50px]  3xl:bottom-[100px]" width={150} height={100} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="container mx-auto py-4">
          <div className="grid gap-5  lg:grid-cols-2 lg:gap-0 ">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
              variants={{
                hidden: { opacity: 0, y: 50 }, // Start below and invisible
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" },
                }, // Slide up and fade in
              }}
            >
              <div className="flex h-full flex-col justify-center py-[50px] lg:py-[102px]">

                <div className="mb-[20px] lg:mb-[48px]">
                  <h1 className="title-80 leading-lh1p18">{data.portfolio[0].companyName}</h1>
                </div>

                <div className="flex flex-col lg:w-[60%] ">
                  <div className="mb-[20px] flex flex-col border-b  border-black pb-[20px] lg:mb-[36px] lg:pb-[40px]">
                    <h5 className="text-19 fnt-lexend pb-[5px] text-gray1 leadeing-[2.105263157894737]">Industry</h5>
                    <h4 className="text-30 leading-lh1p33 font-normal">{data.portfolio[0].industry}</h4>
                  </div>

                  <div className="mb-[20px] flex flex-col border-b border-black pb-[20px] lg:mb-[74px] lg:pb-[40px]">
                    <h5 className="text-19 fnt-lexend pb-[5px] text-gray1 leadeing-[2.105263157894737]">Country</h5>
                    <h4 className="text-30 leading-lh1p33 font-normal">{data.portfolio[0].country}</h4>
                  </div>

                  {/* <div className=" flex flex-col border-black">
                    <h5 className="text-19 fnt-lexend pb-[5px] text-gray1 leadeing-[2.105263157894737]">Services</h5>
                    <h4 className="text-30">{data.portfolio[0].channelsUsed}</h4>
                  </div> */}
                  <button className="btn-outline-black" onClick={() => window.open(data.portfolio[0].websiteLink, "_blank")}>
                  {/* <button className="btn-outline-black" > */}
                    View Live Website
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="right-0 top-0 flex h-full w-full flex-col items-center gap-8 bg-dgray py-[50px] lg:absolute lg:w-1/2 lg:justify-center lg:py-6">
          <div className="container  flex w-full flex-col gap-5 lg:w-[70%] lg:max-w-none lg:p-0">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
              variants={{
                hidden: { opacity: 0, y: 30 }, // Start below and invisible
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, ease: "easeOut" },
                }, // Slide up and fade in
              }}
            >
              <div className="mb-2 flex items-center gap-2 lg:mb-8">
                <h3 className="text-30 leading-lh1p33">STORY</h3>
                <div className="h-4 w-4 bg-primary lg:h-5 lg:w-5 "></div>
              </div>
              <div className='text-19 text-gray1 fnt-lexend'>
                {parse(data.portfolio[0].story)}
              </div>
              <div className="pt-10 lg:pt-[65px]">
                <h5 className="text-19 fnt-lexend pb-[5px] text-gray1 leadeing-[2.105263157894737] mb-3">Services Provided</h5>
                <div className="flex flex-wrap gap-2 lg:gap-4">
                  {data.portfolio[0].channelsUsed.split(",").map((item, index) => (
                    <button className="btn-outline-primary-text-black" key={index}>{item}</button>
                  ))}
                  
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>

      {data.portfolioHighlights.length !== 0 ? (
        <div className='bg-black'>
          <div className='container mx-auto'>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
              variants={{
                hidden: { opacity: 0, y: 50 }, // Start below and invisible
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
              }}>
              <div className='lg:grid lg:grid-cols-3 lg:py-[120px] py-[20px] flex flex-col gap-5 lg:gap-5 lg:gap-x-[50px]'>
                {data.portfolioHighlights.map((item) => (
                  <div className='border-b last:border-b-0 lg:border-b-0 lg:border-r last:border-r-0 border-gray1 py-[20px] lg:py-[44px] group' key={item.customId}>
                    <p className='title-65 text-primary duration-500 group-hover:-translate-y-1'>{item.number}</p>
                    <h3 className='text-30 text-white lg:pt-[30px] pt-[10px] duration-500 group-hover:-translate-y-2'>{item.text}</h3>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HeroSection;
