"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { assets } from "@/public/assets/assets";

interface FrameworkSectionProps {
  Becomebrand: {
    title: string;
    image: StaticImageData;
    alt: string;
    paragraph: string[];
  }[];
}
const BecomePartner: React.FC<FrameworkSectionProps> = ({ Becomebrand }) => {
  return (
    <div className="py-[50px]   lg:py-[140px]">
      <div className="container mx-auto ">
        {Becomebrand.map((item, index) => (
          <div className="gap3 items-center md:flex lg:gap-[75px]" key={index}>
            <div className="mb-6 w-full md:mb-0 md:w-1/2">
              <h2 className="title-65 ">{item.title}</h2>
              <div className="fnt-lexend my-4 xxl:my-[75px] ">
                {item.paragraph.map((item, index) => (
                  <div key={index}>
                    <p className="text-19 fnt-lexend mb-3 text-gray1 transition-colors duration-300 group-hover:text-gray-700 lg:mb-[30px] ">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <div className="h-[5px] max-w-[450px] bg-primary"></div>
            </div>
            <div className="h-full w-full md:w-1/2">
              <Image src={item.image} alt={item.alt} className="h-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BecomePartner;
