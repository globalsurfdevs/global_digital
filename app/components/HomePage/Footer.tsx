"use client"

import React, { useEffect, useState } from "react";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import {Lexend} from "next/font/google";
const lexend = Lexend({subsets: ['latin'] ,weight:["300","400","500","600","700"] });
import { usePathname } from "next/navigation";
import { motion } from 'framer-motion';

const Footer = () => {

  const [GetInTouch,setGetInTouch] = useState(false)

  const pathName = usePathname();

  useEffect(()=>{
    if(pathName.startsWith('/performance-marketing') || pathName.startsWith('/case-study') || pathName.startsWith('/portfolio')){
      setGetInTouch(false)
    }else{
      setGetInTouch(true)
    }
  },[])



  return (
    <>
      <div className="bg-black py-6 xs:py-10 lg:py-14 xl:pt-[109px] xl:pb-[131px]">
        <div className="container px-4 mx-auto text-white">
          <div className="flex flex-col">
        <motion.div
                  initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                          variants={{
                            hidden: { opacity: 0, y: 100 }, // Start below and invisible
                            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                          }}
                >
            {GetInTouch && <div className="border-b border-gray-400  flex flex-col justify-center h-1/2  ">
              <h1 className="text-font65 leading-lh1p07">
                <span className="text-primary">Get in touch </span>today to discuss how we can help your brand stay ahead
              </h1>
              <div>
                <button className="text-font30 leading-lh1p66 border border-primary px-24 rounded-full py-3 mt-10 lg:mt-[57px] mb-10  lg:mb-[120px]">LET&apos;S TALK</button>
              </div>
              </div>}

            </motion.div>
            <motion.div
                      initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                              variants={{
                                hidden: { opacity: 0, y: 150 }, // Start below and invisible
                                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                              }}
                    >
            <div className={`grid md:grid-cols-5 pt-12 ${GetInTouch ? "xl:pt-[121px]" : ""} `}>
              <div className="h-full flex flex-col justify-between col-span-2">
                <Image src={assets.footerLogo} alt="logo" className="" width={220} height={48.49} />

              </div>
              <div className="md:col-span-3 flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <h1 className="text-font65">
                    hello<span className="text-primary">@</span>globalsurf.ae
                  </h1>
                  <h1 className="text-font65">+971 4 582 1133</h1>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-5 pt-[121px]">
              <div className={`h-full flex flex-col justify-between col-span-2 ${lexend.className}`}>
                <p className="text-font19 text-gray-500">
                  P.O.Box 13653, 901 - SIT Tower
                  <br />
                  Dubai Silion Oasis
                  <br />
                  Dubai, UAE
                </p>
              </div>
              <div className="col-span-3 flex flex-col gap-8">
                <div className="text-font19 flex flex-col">
                  Facebook
                  <br />
                  Instagram
                  <br />
                  X<br />
                  LinkedIn
                </div>
              </div>
            </div>
            </motion.div>
            </div>
        </div>
      </div>

      <div className="container">
        <div className="flex flex-wrap gap-5 justify-between  items-center py-5">
          <div className="flex w-1/2 gap-10">
            <Image src={assets.footer1} alt="image"></Image>
            <Image src={assets.footer2} alt="image"></Image>
            <Image src={assets.footer3} alt="image"></Image>
          </div>
          <div className="flex gap-2 md:gap-5 flex-wrap text-sm text-gray1">
            <p className="text-font14 leading-lh1p78 fw-[400]">Legal Page</p>
            <p className="text-font14 leading-lh1p78 fw-[400]">Privacy</p>
            <p className="text-font14 leading-lh1p78 fw-[400]">Modern Slavery Statement</p>
            <p className="text-font14 leading-lh1p78 fw-[400]">|</p>
            <p className="text-font14 leading-lh1p78 fw-[400]">©2024 Global Surf Digital. All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
