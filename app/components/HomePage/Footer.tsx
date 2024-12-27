"use client";

import React, { useEffect, useState } from "react";
import { assets } from "@/public/assets/assets";
import Link from "next/link";
import Button from '../Button/Button'; 
import Image from "next/image";
import { Lexend } from "next/font/google";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Footer = () => {
  const [GetInTouch, setGetInTouch] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    if (
      pathName.startsWith("/performance-marketing") ||
      pathName.startsWith("/case-study") ||
      pathName.startsWith("/portfolio")
    ) {
      setGetInTouch(false);
    } else {
      setGetInTouch(true);
    }
  }, [pathName]);

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
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
              }}
            >
              {GetInTouch && (
                <div className="border-b border-gray-400 flex flex-col justify-center h-1/2">
                  <h2 className="text-font65 leading-lh1p07">
                    <span className="text-primary">Get in touch </span>today to discuss how we can help your brand stay ahead
                  </h2>
                  <div className='mt-10 lg:mt-[57px] mb-10 lg:mb-[120px] innerfnont'>
                    <Link href="lets-talk">
                      <Button text='LET&apos;S TALK' />
                    </Link>
                  </div>
                </div>
              )}
              <div className="innerfnont mb-10 mt-10 lg:mb-[120px] lg:mt-[57px]">
                <Button text="LET'S TALK" />
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
                  transition: { duration: 1, ease: "easeOut" },
                }, // Slide up and fade in
              }}
            >
              <div className={`grid pt-12 md:grid-cols-5 lg:pt-12 ${GetInTouch ? "xl:pt-[121px]" : ""}`}>
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
                      hello<span className="text-primary">@</span>globalsurf.ae
                    </h2>
                    <h2 className="text-font65">+971 4 582 1133</h2>
                  </div>
                </div>
              </div>
              <div className="grid pt-8 md:grid-cols-5 lg:pt-[121px]">
                <div className={`col-span-2 flex h-full flex-col justify-between ${lexend.className}`}>
                  <p className="text-font19 text-gray-500">
                    P.O.Box 13653, 901 - SIT Tower
                    <br />
                    Dubai Silion Oasis
                    <br />
                    Dubai, UAE
                  </p>
                </div>
                <div className="col-span-3 flex flex-col gap-8">
                  <div className="flex flex-col text-font19 uppercase">
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
        <div className="flex flex-wrap items-center justify-center gap-5 py-5 md:justify-between">
          <div className="flex w-1/2 justify-center gap-10 md:justify-start">
            <Image src={assets.footer1} alt="image"></Image>
            <Image src={assets.footer2} alt="image"></Image>
            <Image src={assets.footer3} alt="image"></Image>
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray1 md:gap-5">
            <p className="fw-[400] text-font14 leading-lh1p78">Legal Page</p>
            <p className="fw-[400] text-font14 leading-lh1p78">Privacy</p>
            <p className="fw-[400] text-font14 leading-lh1p78">
              Modern Slavery Statement
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