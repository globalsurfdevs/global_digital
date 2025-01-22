"use client";

import React, { useEffect, useState } from "react";
import { assets } from "@/public/assets/assets";
import Link from "next/link";
import Image from "next/image";
import { Lexend } from "next/font/google";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
import { motion } from "framer-motion";

const Footer = () => {

  return (
    <>
      <div className="bg-black py-[50px] xs:py-10 lg:py-14 xl:pb-[131px] xl:pt-[109px]">
        <div className="container mx-auto px-4 text-white">
          <div className="flex flex-col">

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
              <div
                // className={`grid pt-12 md:grid-cols-5 lg:pt-12 ${GetInTouch ? "xl:pt-[121px]" : ""} `}
                className={`grid   md:grid-cols-5   `}
              >
                <div className="col-span-2 flex h-full flex-col justify-between">
                  <Image
                    src={assets.footerLogo}
                    alt="logo"
                    className=""
                    width={220}
                    height={48.49}
                  />
                </div>
                <div className="flex flex-col gap-8 md:col-span-3">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-font65">
                    <a href="mailto:hello@globalsurf.ae" > hello<span className="text-primary">@</span>globalsurf.ae</a>
                    </h2>
                    <h2 className="text-font65"><a href="tel:+97145821133" >+971 4 582 1133</a></h2>
                  </div>
                </div>
              </div>
              <div className="grid pt-8 md:grid-cols-5 lg:pt-[121px] gap-5 md:gap-0">
                <div
                  className={`col-span-2 flex h-full flex-col justify-between ${lexend.className}`}
                >
                  <p className="text-font19 text-gray-500">
                    Global Surf Digital Media L.L.C
                    <br />
                    P.O.Box 13653, 901 - SIT Tower
                    <br />
                    Dubai Silicon Oasis
                    <br />
                    Dubai, UAE
                  </p>
                </div>
                <div className="col-span-3 flex flex-col gap-8">
                  <div className="flex flex-col text-font19">
                   <a href="https://www.facebook.com/globalsurf.digital" target="_blank" rel="nofollow" className="hover:text-primary"> Facebook</a>
                    <a href="https://www.instagram.com/globalsurf.digital/" target="_blank" rel="nofollow" className="hover:text-primary"> Instagram</a>
                    <a href="https://x.com/GlobalSurf_D" target="_blank" rel="nofollow" className="hover:text-primary"> X</a>
                    <a href="https://www.linkedin.com/company/globalsurfdigital" target="_blank"  rel="nofollow"className="hover:text-primary"> LinkedIn</a>
                    <a href="https://www.tiktok.com/@globalsurf.digital" target="_blank" rel="nofollow" className="hover:text-primary"> Tiktok</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-5 py-5 md:justify-between">
          <div className="flex w-1/3 justify-center gap-10 md:justify-start">
            <Image src={assets.footer1} alt="image"></Image>
            <Image src={assets.footer2} alt="image"></Image>
            <Image src={assets.footer3} alt="image"></Image>
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray1 md:gap-5">
            <p className="fw-[400] text-font14 leading-lh1p78 hover:text-primary"><Link href="legal">Legal Page</Link></p>
            <p className="fw-[400] text-font14 leading-lh1p78 hover:text-primary"><Link href="privacy-policy">Privacy</Link></p>
            <p className="fw-[400] text-font14 leading-lh1p78 hover:text-primary"><Link href="cookie-policy">Cookie Policy</Link></p>
            <p className="fw-[400] text-font14 leading-lh1p78 hover:text-primary">
              <Link href="modern-slavery-statement">Modern Slavery Statement</Link>
            </p>
            <p className="fw-[400] xshd text-font14 leading-lh1p78">|</p>
            <p className="fw-[400] text-font14 leading-lh1p78">
              ©2024 Global Surf Digital. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;