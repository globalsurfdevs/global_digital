import { assets } from "@/public/assets/assets";
import Image from "next/image";

import React from "react";

const OurAchievements = () => {
  return (
    <div className="bg-black text-white xl:px-16 mt-20 py-8 xl:py-0">
      <div className="grid md:grid-cols-3 gap-8 min-h-[598px]">
        <div className="border-b border-b-[#77787B] xl:border-none">
        <div className="flex flex-col items-start justify-between p-4 xl:pt-[50px] xl:pb-[100px]">
          <div className="mb-8">
            <Image src={assets.years} alt="years" width={50} height={50} />
          </div>
          <div>
            <h4 className="text-font65 font-[400] mt-4 leading-lh1p07">10 Years</h4>
            <p className="text-font30 opacity-60 leading-lh2p3">and Counting</p>
          </div>
        </div>
        </div>

        <div className="border-b border-b-[#77787B] xl:border-l p-4 xl:border-l-[#77787B]  xl:pl-10 ">
          <div className="flex flex-col items-start h-[100%] justify-between xl:pt-[50px] xl:pb-[100px]">
            <div className="mb-8">
              <Image src={assets.clients} alt="years" width={84} height={84} />
            </div>
            <div>
              <h1 className="text-font65 font-[400] mt-4 leading-lh1p07">
                <span className="text-primary">125</span> Clients
              </h1>
              <p className="text-font30 leading-lh2p3">
                {" "}
                and <span className="text-primary ">Growing</span>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="xl:border-l p-4 xl:border-l-[#77787B]  xl:pl-10">
          <div className="flex flex-col items-start h-[100%] justify-between xl:pt-[50px] xl:pb-[100px]">
            <div className="mb-8">
              <Image src={assets.projects} alt="years" width={50} height={50} />
            </div>
            <div>
              <h1 className="text-font65 font-[400] mt-4 leading-lh1p07">250 Projects</h1>
              <p className="text-font30 opacity-60 leading-lh2p3">and More to Come</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAchievements;
