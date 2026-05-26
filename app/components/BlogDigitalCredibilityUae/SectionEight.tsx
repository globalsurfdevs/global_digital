"use client";
import Image from "next/image";

import React from "react";
  
  const SectionEight = () => {
  return (
  <section>
  <div className="container mx-auto">
    <div className="grid grid-cols-1 gap-4 pt-[50px] lg:pt-[100px] pb-0">
      <div className="w-full">

        <h2 className="title-65 mb-[40px]">The digital edge in UAE construction tenders</h2>
        <p className="text-font19 text-[#77787B] mb-4">
          The UAE construction market is competitive by any global standard. Technical excellence is no longer a differentiator. It is the entry requirement. Every contractor shortlisted for a major project has technical capability. What separates the ones who win from the ones who do not is increasingly about perceived credibility, visible track record, and digital professionalism.
        </p>
        <p className="text-font19 text-[#77787B] mb-8">
          Here is the choice every UAE contractor faces:
        </p>

        {/* Choice cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-[40px]">
          <div className="border border-gray-200 p-[30px]">
            <div className="flex gap-4 items-start">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-1">
                <path d="M4 12L9 17L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-font19 text-[#77787B]">
                Continue competing solely on technical merits and pricing while watching projects go to contractors who look more established online
              </p>
            </div>
          </div>
          <div className="border border-gray-200 border-l-0 p-[30px] bg-black">
            <div className="flex gap-4 items-start">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-1">
                <path d="M4 12L9 17L20 6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-font19 text-[#77787B]">
                Recognise that in 2026, your digital presence is part of your qualification, and invest accordingly
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className=" "> 
              <div className="flex-1">
                <p className="text-font19 text-[#77787B] mb-4">
                  The contractors winning the most valuable tenders in the UAE right now are not necessarily the most capable. They are the most visible, the most credible, and the most top-of-mind when opportunities arise.
                </p>
                <p className="text-font19 text-[#77787B]">
                  Because in UAE construction, the best company does not always win the tender. The best-positioned company does.
                </p>
              </div>
            </div>
          </div>
        </div>

        

        <div className="mt-[40px] mb-[40px]">
          <hr className="border-t border-gray-200" />
        </div>

        {/* CTA Section */}
        <div className="mt-[40px] " id="section10">
          <h2 className="title-65 mb-[40px]">Ready to see how a stronger digital presence could improve your tender success rate?</h2>

          <div className="flex gap-6 items-start">
            <div className="bg-primary w-[14px] h-[14px] mt-4 shrink-0"></div>
            <div className="flex-1">
              <p className="text-font19 text-[#77787B] mb-4">
                Global Surf Digital offers a complimentary digital presence audit for UAE construction and contracting companies. We tell you exactly where the gaps are and what fixing them could mean for your project pipeline.
              </p>
              
               <a href="/contact-us"
                className="inline-flex items-center gap-2 mt-4 bg-black text-white text-font19 px-[30px] py-[16px] hover:bg-primary transition-colors duration-300"
              >
                Schedule a Free Digital Presence Audit
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
  );
};

export default SectionEight;