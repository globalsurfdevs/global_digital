"use client";

import React from "react";

  const TextUi = () => {
  return (
    <section>
      <div className="container mx-auto pt-[20px] lg:pt-[40px]">
        <div className="w-full">
          <p className="text-font19 text-[#77787B] mb-8">
            Traditional tender success has always rested on the same
            foundations:
          </p>

          <div className="space-y-8">
            {/* First Block */}
            <div>
              <div className="flex gap-6 items-start">
                <div className="flex-1">
                  <ul className="list-disc pl-6 text-font19 text-[#77787B] space-y-2">
                    <li>
                      Technical expertise and relevant qualifications
                    </li>
                    <li>
                      Financial capacity and bonding ability
                    </li>
                    <li>
                      Project experience and verifiable track record
                    </li>
                    <li>
                      Competitive pricing within specification
                    </li>
                    <li>
                      Compliance with all regulatory and documentation
                      requirements
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-[40px] mb-[40px]">
                <hr className="border-t border-gray-200" />
              </div>
            </div>

            {/* Second Block */}
            <div>
              <div className="flex gap-6 items-start">
                <div className="flex-1">
                  <p className="text-font19 text-[#77787B] mb-3">
                    Those factors still matter. But something has changed in
                    the past five years. Before a tender evaluation committee
                    scores your technical submission, they research your
                    company online. Your digital presence, or the lack of it,
                    creates a first impression that colours everything that
                    follows.
                  </p>

                  <ul className="list-disc pl-6 text-font19 text-[#77787B] space-y-2">
                    <li>
                      Research consistently shows that the majority of B2B
                      procurement teams conduct online supplier research before
                      shortlisting - a pattern that accelerated significantly
                      post-2020 as digital due diligence became standard
                      practice
                    </li>

                    <li>
                      Tender committees search company names during
                      pre-qualification and due diligence
                    </li>

                    <li>
                      They check LinkedIn profiles of leadership and key
                      personnel
                    </li>

                    <li>
                      They look for project portfolios that verify the
                      experience you claim
                    </li>

                    <li>
                      They seek evidence of ongoing operations, industry
                      engagement, and professional standing
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 lg:mt-12 bg-[#F2F2F2] p-[20px] md:p-[30px]">
            <div className="flex gap-2 "><div className="bg-primary   w-[14px] h-[14px]  mt-3 shrink-0">
              </div><h3 className="text-30 mt-0 ml-3 lg:ml-[40px]">The new reality: Technical qualification gets you into the room. Digital credibility determines whether you are taken seriously  
                 before you get there</h3>
          </div></div>
        </div>
      </div>
    </section>
  );
};

export default TextUi;