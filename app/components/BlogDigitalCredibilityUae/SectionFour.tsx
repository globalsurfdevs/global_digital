"use client";
import Image from "next/image";
import { motion } from "framer-motion";

import React from "react";
  const SectionFour = () => {
const tick = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="min-w-[24px]">
    <path d="M4 12L9 17L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const cross=(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="min-w-[24px]">
  <path d="M6 6L18 18M6 18L18 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>)
  return (
   <section>
  <div className="container mx-auto">
      <motion.div
                                                    initial="hidden"
                                                    whileInView="visible"
                                                    viewport={{ once: true, amount: 0.3 }}
                                                    variants={{
                                                      hidden: { opacity: 0, y: 50 },
                                                      visible: {
                                                        opacity: 1,
                                                        y: 0,
                                                        transition: { duration: 1, ease: "easeOut" },
                                                      },
                                                    }}
                                                  >
    <div className="grid grid-cols-1 gap-4 pt-[50px] lg:pt-[100px] pb-0">
      <div className="w-full">
        <h2 className="title-65 mb-[40px]">7 digital presence mistakes UAE contractors make and how to avoid them</h2>
 <Image alt="UAE contractor digital presence mistakes" loading="lazy" width="1100" height="500" decoding="async" data-nimg="1" className="my-[40px] m-auto"   src="../../assets/blogs/uae-contractor-digital-presence-mistakes.webp" />
         
        <div className="  grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Mistake 1 */}
          <div className="border-b border-gray-200">
            <div className="flex gap-6 items-start">
              
              <div className="flex-1 pb-5">
                <p className="text-[30px] mb-2">1. Outdated Website or No Website</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{cross} Website last updated 2019 to 2021 with broken links and old team photos</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{cross} Suggests the company is stagnant or struggling financially</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{tick} Minimum quarterly updates, current project additions, active blog or news section</p>
              </div>
            </div>
            
          </div>

          {/* Mistake 2 */}
          <div className="border-b border-gray-200">
            <div className="flex gap-6 items-start">
              
              <div className="flex-1 pb-5">
                <p className="text-[30px] mb-2">2. Generic Template-Based Content</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{cross} Stock photos of random construction sites and vague capability statements with no UAE specifics</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{cross} No differentiation, no local credibility, looks low-effort to anyone who knows the market</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{tick} Use your actual projects, your actual team, and reference your UAE-specific experience throughout</p>
              </div>
            </div>
            
          </div>

          {/* Mistake 3 */}
          <div className="border-b border-gray-200">
            <div className="flex gap-6 items-start">
              
              <div className="flex-1 pb-5">
                <p className="text-[30px] mb-2">3. Ignoring LinkedIn</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{cross} Company page with 50 followers, no posts in six months, leadership with 100 connections</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{cross} Completely invisible in the professional conversations where procurement decisions are influenced</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{tick} Weekly company posts, leadership actively sharing insights, employee advocacy programme in place</p>
              </div>
            </div>
            
          </div>

          {/* Mistake 4 */}
          <div className="border-b border-gray-200">
            <div className="flex gap-6 items-start">
              
              <div className="flex-1 pb-5">
                <p className="text-[30px] mb-2">4. No Project Portfolio or Poor Presentation</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{cross} Claims extensive experience but shows only a list of project names with no details or documentation</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{cross} Tender committees want proof they can verify, not claims they have to take on trust</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{tick} Detailed case studies with photos, project value, scope, duration, and key challenges overcome</p>
              </div>
            </div>
            
          </div>

          {/* Mistake 5 */}
          <div className="border-b border-gray-200">
            <div className="flex gap-6 items-start">
              
              <div className="flex-1 pb-5">
                <p className="text-[30px] mb-2">5. Inconsistent Branding Across Platforms</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{cross} Different logos on website versus LinkedIn, varying company names, unprofessional email addresses</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{cross} Looks disorganised and raises questions about internal operational standards</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{tick} Unified brand identity, consistent visuals, professional email domains across all channels</p>
              </div>
            </div>
            
          </div>

          {/* Mistake 6 */}
          <div className="border-b border-gray-200">
            <div className="flex gap-6 items-start">
              
              <div className="flex-1 pb-5">
                <p className="text-[30px] mb-2">6. Neglecting the Mobile Experience</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{cross} Website does not work properly on smartphones with tiny text and sideways scrolling</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{cross} In the UAE, where smartphone penetration exceeds 97%, a significant proportion of procurement research happens on mobile, and Google penalises non-responsive sites in search rankings</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{tick} Mobile-responsive design tested across multiple devices with fast loading on all connections</p>
              </div>
            </div>
            
          </div>

          {/* Mistake 7 */}
          <div className="border-b border-gray-200">
            <div className="flex gap-6 items-start">
              
              <div className="flex-1 pb-5">
                <p className="text-[30px] mb-2">7. No Clear Call to Action</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{cross} No contact form, no visible phone number, no clear path to get in touch or request information</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{cross} Interested prospects leave without engaging, and you have no way to track or follow up on interest</p>
                <p className="text-font19 text-[#77787B] mb-3 flex items-top gap-2">{tick} Prominent contact information, multiple CTA buttons, a working contact form, WhatsApp Business</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </motion.div>
  </div>
</section>
  );
};

export default SectionFour;