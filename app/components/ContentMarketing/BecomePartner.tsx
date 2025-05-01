"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { assets } from "@/public/assets/assets";



interface FrameworkSectionProps {
  Becomebrand: {
    title: string;
    image: StaticImageData;
    paragraph: string[];
  }[];
}
const BecomePartner: React.FC<FrameworkSectionProps> = ({ Becomebrand
}) => {
  return (
    <div className="py-[50px]   lg:py-[140px]">
      <div className="container mx-auto ">
        {Becomebrand.map((item ,index) => (
          <div className="gap3 md:flex items-center lg:gap-[75px]" key={index}>
            <div className="mb-6 md:mb-0 w-full md:w-1/2">
              <h2 className="title-65 ">
                {item.title}
              </h2>
              <div className="fnt-lexend my-4 xxl:my-[75px] ">
                {item.paragraph.map((item, index) => (
                <div key={index} >
                <p className="text-19 fnt-lexend mb-3 lg:mb-[30px] text-gray1 transition-colors duration-300 group-hover:text-gray-700 ">
                 {item}
                </p>
                </div>
                ))}
              </div>
              <div className="max-w-[450px] h-[5px] bg-primary"></div>
            </div>
            <div className="w-full md:w-1/2 h-full">
              <Image src={item.image} alt="" className="h-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BecomePartner;
