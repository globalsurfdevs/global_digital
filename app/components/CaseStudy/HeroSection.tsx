"use client";
import { motion } from "framer-motion";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { CaseStudy } from "@/app/types/CaseStudy";
import parse from 'html-react-parser'

const HeroSection = ({data}:{
  data:{
    caseStudy:CaseStudy[],
  }|null
}) => {

  console.log(data)
  if(!data){
    return null
  }

    return (
      <>
        <div className="container mx-auto py-4">
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
            <div className="flex flex-col items-center gap-2 border-b pb-10 pt-[20px] sm:pt-[50px] lg:grid lg:grid-cols-8 lg:pt-[130px]">
              <div className="h-full w-full text-font80 lg:col-span-5 lg:text-left xl:col-span-5">
                <h1 className="title-80">
                  {/* How Seleo Achieved 10x Revenue Growth */}
                  {data.caseStudy[0].heading}
                </h1>
              </div>

              <div className="lg:gap-18 flex h-full w-full flex-col justify-between gap-5 pb-0 pt-4 lg:col-span-3 lg:items-end lg:py-4 xl:col-span-3">
                <Image
                  src={data.caseStudy[0].logo}
                  alt="image"
                  className="w-20 md:w-48"
                  width={10}
                  height={10}
                />
                <h3 className="text-30 text-gray1">
                  {/* Refreshing, Sparkling, Uplifting */}
                  {data.caseStudy[0].sHeading}
                </h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
            variants={{
              hidden: { opacity: 0, y: 50 }, // Start below and invisible
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.3, ease: "easeOut" },
              }, // Slide up and fade in
            }}
          >
            <div className="flex flex-col gap-2 py-[50px] lg:w-[70%] lg:gap-6 lg:py-[142px]">
              <div className="flex items-center gap-2">
                <h4 className="text-30 leading-[1.5]">STORY</h4>
                <div className="h-4 w-4 bg-primary lg:h-5 lg:w-5 "></div>
              </div>

              <div className="fnt-lexend text-font19 text-gray1">
                {/* <p className="fnt-lexend text-font19 text-gray1">
                  Seleo, a prominent Middle Eastern beverage brand, sought to
                  expand its digital footprint across the UAE, Kuwait, and Qatar.
                  To achieve this, they partnered with Global Surf to revitalize
                  their online presence and optimize marketing campaigns. The goal
                  was to create a compelling digital experience that resonated
                  with their target audience and drove customer engagement.
                </p> */}
                {parse(data.caseStudy[0].story)}
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
          variants={{
            hidden: { opacity: 0, y: 50 }, // Start below and invisible
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.3, ease: "easeOut" },
            }, // Slide up and fade in
          }}
        >
          <div className="flex w-full flex-col overflow-hidden  bg-bglight">
            <div className="container relative">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                variants={{
                  hidden: { opacity: 0, y: 50 }, // Start below and invisible
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1.5, ease: "easeOut" },
                  }, // Slide up and fade in
                }}
              >
                <div className={"flex h-full "}>
                  <div className="flex w-full  flex-col py-[50px]  lg:w-1/4 lg:py-[150px]">
                    <div className=" mb-[20px] flex flex-col border-b border-black pb-[20px] lg:mb-[36px]  lg:pb-[40px]">
                      <h5 className="text-19 fnt-lexend pb-[5px] text-gray-400">
                        Industry
                      </h5>
                      {/* <h4 className="text-30">Food & Beverage</h4> */}
                      <h4 className="text-30"> {data.caseStudy[0].industry}</h4>
                    </div>

                    <div className="mb-[20px] flex flex-col border-b border-black pb-[20px] lg:mb-[36px] lg:pb-[40px]">
                      <h5 className="text-19 fnt-lexend pb-[5px] text-gray-400">
                        Country
                      </h5>
                      {/* <h4 className="text-30">UAE, Kuwait, Qatar</h4> */}
                      <h4 className="text-30">{data.caseStudy[0].country}</h4>
                    </div>

                    <div className="flex flex-col border-black  ">
                      <h5 className="text-19 fnt-lexend pb-[5px] text-gray-400">
                      Services
                      </h5>
                      {/* <h4 className="text-30">Website - Google Ads - META Ads</h4> */}
                      <h4 className="text-30">{data.caseStudy[0].channelsUsed}</h4>
                    </div>
                  </div>
                </div>
              </motion.div>

              {
                <div className="absolute left-1/3 right-[-145px] top-0 hidden h-full bg-black lg:block">
                  <Image
                    src={data.caseStudy[0].coverImage}
                    alt="cover-image"
                    className="h-full w-full object-cover"
                    width={800}
                    height={500}
                  />
                </div>
              }
            </div>

            {
              <div className="h-full bg-black lg:hidden">
                <img
                  src={data.caseStudy[0].coverImage}
                  alt="cover-image"
                  className="h-full w-full object-cover"
                />
              </div>
            }
          </div>
        </motion.div>
      </>
    );
  }



export default HeroSection;
