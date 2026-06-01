"use client";

import { motion } from "framer-motion";

import React from "react";

  const SectionTwo = () => {
  return (
   <section>
  <div className="container mx-auto pt-[50px] lg:pt-[100px]">
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
    <div className="grid grid-cols-1 gap-4">
      <div className="col-span-2 mb-5 xl:mb-0"></div>
      <div className="col-span-5 w-full">

        <h2 className="title-65 mb-[40px]">What "strong digital presence" actually means for contractors</h2>
        <p className="text-font19 text-[#77787B] mt-4">
          "Digital presence" sounds vague. Here is exactly what it means for UAE construction contractors, broken down into the components that actually move the needle with tender committees.
        </p>

        {/* Component 1 */}
        <h3 className="text-[30px] mb-2 mt-4">Component 1: Professional, modern website</h3>
        <div className="flex-1">
          <ul className="list-disc pl-6 text-font19 text-[#77787B] space-y-2">
            <li>Mobile-responsive design with fast loading speed</li>
            <li>Clear services and capabilities overview</li>
            <li>Comprehensive project portfolio with photos, project value, scope, duration, and client names where permitted</li>
            <li>Team and leadership profiles with photos and credentials</li>
            <li>Certifications, partnerships, and industry registrations clearly visible</li>
            <li>Active blog or news section showing ongoing operations</li>
            <li>Prominent contact information with a working contact form</li>
          </ul>
        </div>

        {/* Component 2 */}
        <h3 className="text-[30px] mb-2 mt-4">Component 2: Active LinkedIn presence</h3>
        <div className="flex-1">
          <ul className="list-disc pl-6 text-font19 text-[#77787B] space-y-2">
            <li>Complete company page with up-to-date description and contact information</li>
            <li>Minimum weekly posting covering project updates, company news, and industry commentary</li>
            <li>CEO or GM actively posting and engaging with industry content</li>
            <li>Employee profiles connected to the company page, reinforcing team credibility</li>
            <li>LinkedIn is where UAE construction decision-makers spend their professional networking time</li>
          </ul>
        </div>

        {/* Component 3 */}
        <h3 className="text-[30px] mb-2 mt-4">Component 3: Detailed project portfolio</h3>
        <div className="flex-1">
          <ul className="list-disc pl-6 text-font19 text-[#77787B] space-y-2">
            <li>Detailed case studies with before, during, and after photos</li>
            <li>Video documentation and walkthroughs where possible</li>
            <li>Project specifications, scope, value, and key challenges overcome</li>
            <li>Safety and quality records where available</li>
            <li>Downloadable PDF case studies for offline reference</li>
          </ul>
        </div>

        {/* Component 4 */}
        <h3 className="text-[30px] mb-2 mt-4">Component 4: Content marketing and thought leadership</h3>
        <div className="flex-1">
          <ul className="list-disc pl-6 text-font19 text-[#77787B] space-y-2">
            <li>Blog posts covering UAE construction topics, regulatory updates, and technical insights</li>
            <li>Sustainability and safety initiative content</li>
            <li>Project milestone updates showing active and ongoing delivery</li>
            <li>Industry news commentary demonstrating sector awareness</li>
          </ul>
        </div>

        {/* Component 5 */}
        <h3 className="text-[30px] mb-2 mt-4">Component 5: Credentials and Certifications</h3>
        <p className="text-font19 text-[#77787B] mt-4">
          ISO certifications (9001, 14001, 45001), safety records, and industry award mentions prominently displayed. In the UAE context, relevant credentials include Trakhees approvals, DMCC certifications, Abu Dhabi Municipality registrations, and contractor classifications from the relevant emirate authority. These should be listed clearly, not buried in a PDF available only on request.
        </p>

        {/* Component 6 */}
        <h3 className="text-[30px] mb-2 mt-4">Component 6: PR and Media Presence</h3>
        <p className="text-font19 text-[#77787B] mt-4">
          Press releases and industry publication features for major project wins, submitted to Gulf Construction, Construction Week Middle East, and Zawya where appropriate. Being quoted or featured in a recognised UAE construction publication is one of the strongest E-E-A-T signals a contractor can build.
        </p>

        {/* Component 7 */}
        <h3 className="text-[30px] mb-2 mt-4">Component 7: Reputation Management</h3>
        <div className="flex-1">
          <ul className="list-disc pl-6 text-font19 text-[#77787B] space-y-2">
            <li>Google Business Profile kept current with accurate information</li>
            <li>LinkedIn recommendations and client testimonials visible on website and social profiles</li>
            <li>Active monitoring and professional response to any online mentions</li>
          </ul>
        </div>

      </div>
    </div>
    </motion.div>
  </div>
</section>
  );
};

export default SectionTwo;