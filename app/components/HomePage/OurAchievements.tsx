"use client"

import { assets } from "@/public/assets/assets";
import Image from "next/image";
import {Lexend} from "next/font/google";
const lexend = Lexend({subsets: ['latin'] ,weight:["300","400","500","600","700"] });

import React, { useEffect, useRef, useState } from "react";
import { useInView, useSpring } from "motion/react";
import {motion} from 'framer-motion'

const OurAchievements = () => {

  const [yearCount,setYearCount] = useState(0)
  const [clientCount,setClientCount] = useState(0)
  const [projectCount,setProjectCount] = useState(0)

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const springYearCount = useSpring(0,{
    bounce:0,
    duration:2000,
  })

  const springClientCount = useSpring(0,{
    bounce:0,
    duration:2000
  })

  const springProjectCount = useSpring(0,{
    bounce:0,
    duration:2000
  })

  springYearCount.on('change',(value)=>{
    setYearCount(Math.round(value))
  })

  springClientCount.on('change',(value)=>{
    setClientCount(Math.round(value))
  })

  springProjectCount.on('change',(value)=>{
    setProjectCount(Math.round(value))
  })

  useEffect(()=>{
    if(isInView){
      springYearCount.set(10)
      springClientCount.set(125)
      springProjectCount.set(250)
    }
  },[isInView, springYearCount])




  return (
    <motion.div
    initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
            variants={{
              hidden: { opacity: 0, y: 150 }, // Start below and invisible
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
            }}
  >
    <div className="bg-black text-white xl:px-16 xl:mt-20 py-0 xl:py-0 mt-10">
      <div className="grid md:grid-cols-3 gap-8 md:min-h-[300px] lg:min-h-[450px] xl:min-h-[598px]">
        <div className="border-b border-b-[#77787B] md:border-none">
          <div className="flex flex-col items-start h-[100%] justify-between p-4 lg:py-10 xl:pt-[50px] xl:pb-[100px]">
            <div className="mb-8">
              <Image src={assets.years} alt="years" width={50} height={50} />
            </div>
            <div>
              <h4 className="text-font65 font-[400] mt-4 leading-lh1p07">{yearCount} Years</h4>
              <p className={`text-font30 opacity-60 leading-lh2p3 ${lexend.className}`}>and Counting</p>
            </div>
          </div>
        </div>

        <div className="border-b border-b-[#77787B] md:border-b-0 md:border-l p-4 lg:p-0 lg:px-4 md:border-l-[#77787B]  xl:pl-10 "  ref={ref}>
          <div className="flex flex-col items-start h-[100%] justify-between lg:py-10 xl:pt-[50px] xl:pb-[100px]">
            <div className="mb-8">
              <Image src={assets.clients} alt="years" width={84} height={84} />
            </div>
            <div>
              <h1 className="text-font65 font-[400] mt-4 leading-lh1p07">
                <span className="text-primary">{clientCount}</span> Clients
              </h1>
              <p className={`text-font30 leading-lh2p3 ${lexend.className}`}>
                {" "}
                and <span className="text-primary ">Growing</span>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="md:border-l p-4 lg:p-0 lg:px-4 md:border-l-[#77787B]  xl:pl-10">
          <div className="flex flex-col items-start h-[100%] justify-between lg:py-10 xl:pt-[50px] xl:pb-[100px]">
            <div className="mb-8">
              <Image src={assets.projects} alt="years" width={50} height={50} />
            </div>
            <div>
              <h1 className="text-font65 font-[400] mt-4 leading-lh1p07">{projectCount} Projects</h1>
              <p className={`text-font30 opacity-60 leading-lh2p3 ${lexend.className}`}>and More to Come</p>
            </div>
          </div>
        </div>
      </div>
      </div>

    </motion.div>
  );
};

export default OurAchievements;
