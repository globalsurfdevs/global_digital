import React from "react";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { stories } from "../data/stories";

const SuccessStories = () => {
  return (
    <div className="container px-4 mx-auto">
      <div className="py-6 lg:py-12 xl:py-24 flex flex-col gap-12">
        <h1 className="text-font65">Browse our Success Stories</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {stories.map((item, index) => (
            <div className="bg-black 3xl:h-[600px] group ease-in-out duration-300 text-white hover:translate-y-[-5px] hover:cursor-pointer ease-in-out duration-500" key={index}>
              <div className="bg-gray-500 py-6 lg:py-12 h-[45%] flex flex-col gap-5 justify-center px-8 md:px-12 group-hover:bg-primary ease-in-out duration-500">
                <div className="relative h-full flex flex-col justify-between">
                  <h3 className="text-font30 leading-lh1p66 mb-[14px]">{item.title1}</h3>
                  <h3 className="text-white text-font65 leading-lh0p76 mb-[28px]">
                    <span>&#8595;</span>
                    {item.count}
                  </h3>
                  <h3 className="text-font25 w-3/4 leading-lh1p4 ">{item.description1}</h3>
                  <div className="absolute top-0 right-0 hidden group-hover:block ease-in-out duration-500">
                    <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M33.8125 1.7998L1.25977 33.7227" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                      <path d="M1.25977 1.7998H33.8125V33.0929" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="text-white flex flex-col justify-center gap-8 py-12 h-[55%] px-8 md:px-12">
                <h3 className="text-font30 leading-lh1p26">{item.title2}</h3>
                <p className="text-font19 leading-lh1p4">{item.description2}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
