"use client";
import Image from "next/image";

import React from "react";
  
  const SectionSix = () => {
  return (
 <section>
  <div className="container mx-auto">
    <div className="grid grid-cols-1 gap-4 pt-[50px] lg:pt-[100px] pb-0">
      <div className="w-full">

        <h2 className="title-65 mb-[40px]">How to measure the ROI of your digital presence investment</h2>
        <p className="text-font19 text-[#77787B] mb-8">
          Digital marketing investment is only defensible if it is measurable. Here are the metrics that connect directly to tender performance, not just website traffic.
        </p>

        <div className="space-y-8">

          {/* Tender-specific metrics */}
          <div>
            <div className=" ">
              <div className="flex-1">
            <div className="flex gap-6 items-start">
              <div className="bg-primary w-[14px] h-[14px] mt-4 shrink-0"></div>
                <h3 className="text-[30px] mb-2">Tender-specific metrics</h3>
                </div>
                <div className="flex-1">
                  <ul className="list-disc pl-6 text-font19 text-[#77787B] space-y-2">
                    <li>Tender success rate: track your pre-digital baseline and measure quarterly improvement</li>
                    <li>Pre-qualification acceptance rate: before and after digital improvements</li>
                    <li>Tender invitation volume: how many opportunities are you being invited to versus having to chase</li>
                    <li>Average project size: stronger credibility often leads to being considered for larger value tenders</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-[40px] mb-[40px]">
              <hr className="border-t border-gray-200" />
            </div>
          </div>

          {/* Digital performance metrics */}
          <div>
            <div className="">
              <div className="flex-1">
            <div className="flex gap-6 items-start">
              <div className="bg-primary w-[14px] h-[14px] mt-4 shrink-0"></div>
                <h3 className="text-[30px] mb-2">Digital performance metrics</h3>
                </div>
                <div className="flex-1">
                  <ul className="list-disc pl-6 text-font19 text-[#77787B] space-y-2">
                    <li>Monthly unique website visitors and time spent on key pages</li>
                    <li>LinkedIn follower growth and post engagement rates</li>
                    <li>Inbound inquiry volume from website contact forms, LinkedIn messages, and direct calls</li>
                    <li>Google search rankings for your company name plus UAE and your key service terms</li>
                  </ul>
                </div>
                <p className="text-font19 text-[#77787B] mt-4">
                  To illustrate the scale of potential return: a mid-sized UAE contractor (identity anonymised at client request) invested approximately AED 120,000 in a full digital presence overhaul over six months. Within 18 months, their measured tender win rate improved from 12% to 19%, with three additional project wins totalling AED 45 million in contract value attributed in part to stronger pre-qualification credibility.
               Individual results will vary based on sector, project type, and quality of implementation - but the underlying logic holds: in a market where a single project win typically runs into the tens of millions, a well-executed digital investment pays for itself many times over.  </p>
              </div>
            </div>
            <div className="mt-[40px] mb-[40px]">
              <hr className="border-t border-gray-200" />
            </div>
          </div>

          {/* Realistic timeline expectations */}
          <div>
            <div  >
              <div className="flex-1">
            <div className="flex gap-6 items-start">
              <div className="bg-primary w-[14px] h-[14px] mt-4 shrink-0"></div>
                <h3 className="text-[30px] mb-2">Realistic timeline expectations</h3>
                </div>
                <div className="flex-1">
                  <ul className="list-disc pl-6 text-font19 text-[#77787B] space-y-2">
                    <li>Months 1 to 3: foundation building, minimal direct ROI but visible credibility improvement</li>
                    <li>Months 4 to 6: increased search visibility, early inbound inquiries, improved pre-qual acceptance</li>
                    <li>Months 7 to 12: measurable tender success improvements, growing inbound pipeline</li>
                    <li>Year 2 onwards: compounding benefits as content library, backlinks, and reputation grow</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
 

      </div>
    </div>
  </div>
</section>
  );
};

export default SectionSix;