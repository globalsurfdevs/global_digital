import { assets } from "@/public/assets/assets";
import Image from "next/image";
import {Lexend} from "next/font/google";
const lexend = Lexend({subsets: ['latin'] ,weight:["300","400","500","600","700"] });

import React from "react";

const OurAchievements = () => {
  return (
    <div className="bg-black text-white xl:px-16 xl:mt-20 py-0 xl:py-0 mt-10">
      <div className="grid md:grid-cols-3 gap-8 md:min-h-[300px] lg:min-h-[450px] xl:min-h-[598px]">
        <div className="border-b border-b-[#77787B] md:border-none">
          <div className="flex flex-col items-start h-[100%] justify-between p-4 lg:py-10 xl:pt-[50px] xl:pb-[100px]">
            <div className="mb-8">
              <Image src={assets.years} alt="years" width={50} height={50} />
            </div>
            <div>
              <h4 className="text-font65 font-[400] mt-4 leading-lh1p07">10 Years</h4>
              <p className={`text-font30 opacity-60 leading-lh2p3 ${lexend.className}`}>and Counting</p>
            </div>
          </div>
        </div>

        <div className="border-b border-b-[#77787B] md:border-b-0 md:border-l p-4 lg:p-0 lg:px-4 md:border-l-[#77787B]  xl:pl-10 ">
          <div className="flex flex-col items-start h-[100%] justify-between lg:py-10 xl:pt-[50px] xl:pb-[100px]">
            <div className="mb-8">
              <Image src={assets.clients} alt="years" width={84} height={84} />
            </div>
            <div>
              <h1 className="text-font65 font-[400] mt-4 leading-lh1p07">
                <span className="text-primary">125</span> Clients
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
              <h1 className="text-font65 font-[400] mt-4 leading-lh1p07">250 Projects</h1>
              <p className={`text-font30 opacity-60 leading-lh2p3 ${lexend.className}`}>and More to Come</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAchievements;
