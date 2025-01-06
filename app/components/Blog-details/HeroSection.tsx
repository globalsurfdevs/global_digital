"use client";
import { motion } from "framer-motion";
import { assets } from "@/public/assets/assets";
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
          <Image
            src={data.portfolio[0].bannerImage}
            alt="heroImage"
            className="absolute h-full w-full object-cover object-center"
            fill
          />
          <div className="bg-bl-gradient absolute top-0 h-full w-full ">
          <motion.div
            className="container relative h-full w-full invic"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
            variants={{
              hidden: { opacity: 0, y: 20 }, // Start below and invisible
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1, ease: "easeOut" },
              }, // Slide up and fade in
            }}
          >
            <Image
              src={data.portfolio[0].logo}
              alt="image"
              className="absolute  bottom-[20px] right-[15px] z-1 md:bottom-[30px] lg:bottom-[50px]  3xl:bottom-[100px]"
              width={50}
              height={50}
            />
          </motion.div>
        </div>
        </div>

      </div>

      <div className="relative">
        <div className="container mx-auto py-4">
          <div className="grid gap-5  lg:grid-cols-2 lg:gap-0 ">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
              variants={{
                hidden: { opacity: 0, y: 50 }, // Start below and invisible
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, ease: "easeOut" },
                }, // Slide up and fade in
              }}
            >
              <div className="flex h-full flex-col justify-center py-[50px] lg:py-[102px]">
                <div className="mb-[20px] lg:mb-[81px]">
                  <h1 className="title-80">{data.portfolio[0].companyName}</h1>
                </div>

                <div className="flex flex-col lg:w-[60%] ">
                  <div className="mb-[20px] flex flex-col border-b  border-black pb-[20px] lg:mb-[36px] lg:pb-[40px]">
                    <h5 className="text-19 fnt-lexend pb-[5px] text-gray-400">
                      Industry
                    </h5>
                    <h4 className="text-30">{data.portfolio[0].industry}</h4>
                  </div>

                  <div className="mb-[20px] flex flex-col border-b  border-black pb-[20px] lg:mb-[36px] lg:pb-[40px]">
                    <h5 className="text-19 fnt-lexend pb-[5px] text-gray-400">
                      Country
                    </h5>
                    <h4 className="text-30">{data.portfolio[0].country}</h4>
                  </div>

                  <div className="fnt-lexend flex flex-col border-black">
                    <h5 className="text-19 fnt-lexend pb-[5px] text-gray-400">
                      Services
                    </h5>
                    <h4 className="text-30">
                      {data.portfolio[0].channelsUsed}
                    </h4>
                  </div>
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
                {/* <p className='text-19 text-gray1 fnt-lexend'>Innovo Group is a global leader in the construction industry,
                        specializing in delivering innovative solutions for a wide range of projects.
                        With a commitment to quality and sustainability, they have built a reputation
                        for excellence. Recognizing their outdated, slow website no longer reflected their
                        brand&apos;s quality and innovation, they partnered with Global Surf to revamp their
                        digital presence. The goal was to improve efficiency, enhance user experience, and
                        align the site with their evolving brand identity. </p> */}
                {parse(data.portfolio[0].story)}
              </div>
            </motion.div>
          </div>
        </div>

    </div>

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
                            <div className='lg:grid lg:grid-cols-3 lg:py-[120px] py-[20px] flex flex-col gap-5 lg:gap-5'>
                                {data.portfolioHighlights.map((item)=>(
                                    <div className='border-b last:border-b-0 lg:border-b-0   lg:border-r last:border-r-0 border-gray1 py-[20px] lg:py-[44px] group ' key={item.customId}>
                                    <p className='title-65 text-primary duration-500 group-hover:-translate-y-1'>{item.number}</p>
                                    <h3 className='text-30 text-white lg:pt-[30px] pt-[10px] duration-500 group-hover:-translate-y-2'>{item.text}</h3>
                                    </div>
                                ))}



              {/* <div className='border-b lg:border-r border-gray1 lg:border-b-0 py-[20px] lg:py-[44px] group '>
                                    <div className='mx-auto lg:w-[85%]'>
                                        <p className='title-65 text-primary duration-500 group-hover:-translate-y-1'>2X</p>
                                        <h3 className='text-30 text-white lg:pt-[30px] pt-[10px] duration-500 group-hover:-translate-y-2'>Increase in User Engagement</h3>
                                    </div>
                                </div>

                                <div className='py-[20px] lg:py-[44px] group '>
                                    <div className='mx-auto lg:w-[85%]'>
                                        <p className='title-65 text-primary duration-500 group-hover:-translate-y-1'>2X</p>
                                        <h3 className='text-30 text-white lg:pt-[30px] pt-[10px] duration-500 group-hover:-translate-y-2'>Increase in User Engagement</h3>
                                    </div>
                                </div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
