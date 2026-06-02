"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
  
  const SectionSeven = () => {
  return (
 <section>
  <div className="container mx-auto">
    <div className="grid grid-cols-1 gap-4 pt-[50px] lg:pt-[100px] pb-0">
      <div className="w-full">

        <h2 className="title-65 mb-[40px]">Why construction companies partner with digital marketing specialists</h2>
        <p className="text-font19 text-[#77787B] mb-8">
          Most construction companies build excellent buildings. They do not necessarily build excellent digital presences. That is not a criticism. It is simply that digital marketing requires a different set of skills, and the learning curve is expensive when you are trying to maintain it alongside a demanding project pipeline.
        </p>

        {/* In-house vs Partner — side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-[40px]">

          {/* Keep in-house */}
          <div className="border border-gray-200 p-[30px]">
            <div className="flex items-center gap-3 mb-6">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12L9 17L20 6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="text-[30px]">When to keep it in-house</h3>
            </div>
            <ul className="list-disc pl-6 text-font19 text-[#77787B] space-y-2">
              <li>You are a very small company with a limited budget and the basics will suffice for now</li>
              <li>Someone on your team has genuine, current digital marketing expertise and the time to apply it</li>
            </ul>
          </div>

          {/* Partner with specialist */}
          <div className="border border-gray-200 border-l-0 p-[30px] bg-[#000]">
            <div className="flex items-center gap-3 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12L9 17L20 6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="text-[30px] text-white">When to partner with a specialist</h3>
            </div>
            <ul className="list-disc pl-6 text-font19 text-[#77787B] space-y-2">
              <li>You want professional results faster than internal learning allows</li>
              <li>You lack the in-house expertise in SEO, content strategy, <Link className="text-primary hover:underline" href="/web-development-agency-dubai">web development</Link>, or analytics</li>
              <li>You want to measure success by tender outcomes, not by follower counts</li>
              <li>You need someone who already understands UAE construction, not one learning it on your account</li>
            </ul>
          </div>
        </div>

        {/* What to look for */}
        <div className="mt-[40px] mb-[40px]">
          <div className=" ">
            <div className="flex-1">

          <div className="flex gap-6 items-start">
            <div className="bg-primary w-[14px] h-[14px] mt-4 shrink-0"></div>
              <h3 className="text-[30px] mb-6">What to look for in a digital partner for construction</h3>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 items-start border-b border-gray-200 pb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-1">
                    <path d="M4 12L9 17L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-font19 text-[#77787B]">Can you show examples of construction or heavy industry clients you have worked with in the UAE?</p>
                </div>
                <div className="flex gap-4 items-start border-b border-gray-200 pb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-1">
                    <path d="M4 12L9 17L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-font19 text-[#77787B]">What is your process for learning our specific tender categories and project types?</p>
                </div>
                <div className="flex gap-4 items-start border-b border-gray-200 pb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-1">
                    <path d="M4 12L9 17L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-font19 text-[#77787B]">How do you measure success — by traffic, by leads, or by business outcomes?</p>
                </div>
                <div className="flex gap-4 items-start">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-1">
                    <path d="M4 12L9 17L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-font19 text-[#77787B]">The answers will tell you quickly whether you are speaking to a general agency or a genuine sector specialist</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[40px] mb-[40px]">
          <hr className="border-t border-gray-200" />
        </div>

        {/* Global Surf Perspective */}
        <div className="mt-[40px] bg-[#000000] p-[30px]">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-primary w-[14px] h-[14px]"></div>
            <h3 className="text-[#77787B] text-font19">Global Surf Perspective</h3>
          </div>
          <p className="text-white text-30 leading-[40px] mt-3 lg:mt-[37px]">
            At GS Digital, we specialise in UAE construction and contracting because we understand how the industry actually works. We know what tender committees look for. We know what pre-qualification documents need to be supported by. And we know that for a construction company, a "like" on Instagram is meaningless but a qualified inbound inquiry from a developer worth AED 20 million is everything.
          </p>
          <p className="text-white text-30 leading-[40px] mt-4">
            We build digital presences that change that equation. Our work is specific to the construction and contracting sector because a specialist agency that already understands UAE tender processes, pre-qualification requirements, and sector buyer behaviour will consistently outperform a generalist agency learning it on your account.
          </p>
        </div>

        {/* We work with */}
        <div className="mt-[40px]">
          <div className=" ">
            <div className="flex-1">
          <div className="flex gap-6 items-start">
            <div className="bg-primary w-[14px] h-[14px] mt-4 shrink-0"></div>
              <p className="text-[30px] mb-6">We work with</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Building and general contractors",
                  "Civil engineering companies",
                  "MEP contractors",
                  "Fit-out and interior contracting specialists",
                  "Specialty and subcontractors",
                  "Construction material suppliers and manufacturers",
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 items-center border border-gray-200 p-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                      <path d="M4 12L9 17L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-font19 text-[#77787B]">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-font19 text-[#77787B] mt-8">
                If your company is technically strong but digitally underrepresented, and you are ready to invest in the credibility your capabilities deserve, that is the conversation we are built for.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
  );
};

export default SectionSeven;