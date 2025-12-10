"use client";

import React from "react";

const AiToolsPreferenceSection: React.FC = () => {
  return (
    <section className="bg-[#F4F4F4] py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Top row */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Left big title */}
          <div className="lg:w-5/12">
            <h2 className="title-65 text-black">
              What AI Tools Prefer
              <br className="hidden md:block" />
              &nbsp;Today
            </h2>
          </div>

          {/* Right side columns */}
          <div className="lg:w-6/12 flex-col lg:justify-end">
          <div className="flex flex-col gap-[80px] lg:flex-row ">
            {/* What They Avoid */}
            <div className="space-y-4">
              <div className="flex items-center gap-[30px]">
                <span className="h-[14px] w-[14px] bg-[#F04B37]" />
                <h3 className="text-font30 text-black">
                  What They Avoid
                </h3>
              </div>
              <ul className="list-disc pl-[65px] text-19 text-[#77787B]">
                <li>keyword stuffing</li>
                <li>generic articles</li>
                <li>surface-level information</li>
                <li>unverified claims</li>
              </ul>
            </div>

            {/* What They Prefer */}
            <div className="space-y-4">
              <div className="flex items-center gap-[30px]">
                <span className="h-[14px] w-[14px] bg-[#F04B37]" />
                <h3 className="text-font30 text-black">
                  What They Prefer
                </h3>
              </div>
              <ul className="list-disc pl-[65px] text-19 text-[#77787B]">
                <li>clarity</li>
                <li>genuine expertise</li>
                <li>clear structure</li>
                <li>reliable, well-supported facts</li>
              </ul>
            </div>
            </div>
            <p className="mt-10 text-font30  text-left text-black">
          GEO makes sure your content fits these expectations.
        </p>
          </div>
        </div>

  
        
      </div>
    </section>
  );
};

export default AiToolsPreferenceSection;
