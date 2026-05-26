"use client";
import Image from "next/image";
import { motion } from "framer-motion";

import React from "react";

  const SectionThree = () => {
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
      <h2 className="title-65 mb-[40px]">Understanding the UAE construction tender process</h2>
              <Image alt="UAE construction tender process stages" loading="lazy" width="1100" height="500" decoding="async" data-nimg="1" className="my-[40px] m-auto"   src="../../assets/blogs/uae-construction-tender-process-stages.webp" />
              
              <p className="text-font19 text-[#77787B] my-4">Understanding where digital presence fits into the tender process helps you prioritise where to invest. Here is how the standard UAE tender process flows and where your digital footprint is actively assessed.</p>
            
    <div className="border border-gray-200 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#F2F2F2]">
          <tr><th className="px-6 py-3 text-left text-font19 font-medium text-dark capitalize tracking-wider border-r border-gray-200">Feature</th>
          <th className="px-6 py-3 text-left text-font19 font-medium text-dark capitalize tracking-wider border-r border-gray-200">Search Engine</th>
          <th className="px-6 py-3 text-left text-font19 font-medium text-dark capitalize tracking-wider ">LLM (ChatGPT / Claude / Gemini)</th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
  <tr>
    <td className="px-6 py-4 border-r border-gray-200">
      <div className="text-font19 text-[#77787B] capitalize">Tender Notification</div>
    </td>
    <td className="px-6 py-4 border-r border-gray-200">
      <div className="text-font19 text-[#77787B] capitalize">Published on government portals including RTA, DEWA, Dubai Municipality, Etimad (the UAE federal e-procurement platform), and Abu Dhabi entity-specific portals, as well as private channels and subscription services.</div>
    </td>
    <td className="px-6 py-4">
      <div className="text-font19 text-[#77787B] capitalize">Low direct impact</div>
    </td>
  </tr>
  <tr>
    <td className="px-6 py-4 border-r border-gray-200">
      <div className="text-font19 text-[#77787B] capitalize">Pre-Qualification</div>
    </td>
    <td className="px-6 py-4 border-r border-gray-200">
      <div className="text-font19 text-[#77787B] capitalize">Document submission, financial and technical assessment, past performance review</div>
    </td>
    <td className="px-6 py-4">
      <div className="text-font19 text-[#77787B] capitalize">High: online research happens here</div>
    </td>
  </tr>
  <tr>
    <td className="px-6 py-4 border-r border-gray-200">
      <div className="text-font19 text-[#77787B] capitalize">Tender Document Collection</div>
    </td>
    <td className="px-6 py-4 border-r border-gray-200">
      <div className="text-font19 text-[#77787B] capitalize">Site visits, pre-bid meetings, clarification requests</div>
    </td>
    <td className="px-6 py-4">
      <div className="text-font19 text-[#77787B] capitalize">Medium: reputation matters in meetings</div>
    </td>
  </tr>
  <tr>
    <td className="px-6 py-4 border-r border-gray-200">
      <div className="text-font19 text-[#77787B] capitalize">Bid Preparation and Submission</div>
    </td>
    <td className="px-6 py-4 border-r border-gray-200">
      <div className="text-font19 text-[#77787B] capitalize">Technical and commercial proposals submitted</div>
    </td>
    <td className="px-6 py-4">
      <div className="text-font19 text-[#77787B] capitalize">Low direct impact</div>
    </td>
  </tr>
  <tr>
    <td className="px-6 py-4 border-r border-gray-200">
      <div className="text-font19 text-[#77787B] capitalize">Evaluation</div>
    </td>
    <td className="px-6 py-4 border-r border-gray-200">
      <div className="text-font19 text-[#77787B] capitalize">Technical scoring, commercial review, sometimes presentations</div>
    </td>
    <td className="px-6 py-4">
      <div className="text-font19 text-[#77787B] capitalize">High: background checks and due diligence</div>
    </td>
  </tr>
  <tr>
    <td className="px-6 py-4 border-r border-gray-200">
      <div className="text-font19 text-[#77787B] capitalize">Negotiation and Award</div>
    </td>
    <td className="px-6 py-4 border-r border-gray-200">
      <div className="text-font19 text-[#77787B] capitalize">Clarifications, contract negotiations, mobilisation</div>
    </td>
    <td className="px-6 py-4">
      <div className="text-font19 text-[#77787B] capitalize">High: stakeholder confidence verification</div>
    </td>
  </tr>
</tbody>
              </table>
              </div>
              <p className="text-font19 text-[#77787B] mt-4">The pre-qualification stage and the evaluation stage are where your digital presence is most actively scrutinised. These are the two moments where investing in your online credibility delivers the most direct return.</p>
</motion.div>
  </div>
</section>
  );
};

export default SectionThree;