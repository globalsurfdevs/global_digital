import React from "react";
import { assets } from "@/public/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <div className="bg-black pt-[109px] pb-[131px]">
        <div className="container px-4 mx-auto text-white">
          <div className="flex flex-col h-[600px]">
            <div className="border-b border-gray-400  flex flex-col justify-center h-1/2 gap-8">
              <h1 className="text-font65 leading-lh1p07">
                <span className="text-primary">Get in touch </span>today to discuss how we can help your brand stay ahead
              </h1>
              <div>
                <button className="border border-primary px-24 rounded-full py-3">LET'S TALK</button>
              </div>
            </div>
            <div className="grid grid-cols-12 py-16">
              <div className="h-full flex flex-col justify-between col-span-5">
                <Image src={assets.footerLogo} alt="logo" className="w-40" />
                <p className="text-sm text-gray-500">
                  P.O.Box 13653, 901 - SIT Tower
                  <br />
                  Dubai Silion Oasis
                  <br />
                  Dubai, UAE
                </p>
              </div>
              <div className="col-span-7 flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <h1 className="text-4xl">
                    hello<span className="text-primary">@</span>globalsurf.ae
                  </h1>
                  <h1 className="text-4xl">+971 4 582 1133</h1>
                </div>
                <div className="text-sm flex flex-col">
                  Facebook
                  <br />
                  Instagram
                  <br />
                  X<br />
                  LinkedIn
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="flex justify-between  items-center py-5">
          <div className="flex w-1/2 gap-10">
            <Image src={assets.footer1} alt="image"></Image>
            <Image src={assets.footer2} alt="image"></Image>
            <Image src={assets.footer3} alt="image"></Image>
          </div>
          <div className="flex gap-5 text-sm text-gray-400">
            <p>Legal Page</p>
            <p>Privacy</p>
            <p>Modern Slavery Statement</p>
            <p>|</p>
            <p>©2024 Global Surf Digital. All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
