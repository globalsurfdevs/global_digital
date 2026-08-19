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
          <h2 className="title-65 mb-[40px]">
            Understanding the UAE construction tender process
          </h2>
          <Image
            alt="UAE construction tender process stages"
            loading="lazy"
            width="1100"
            height="500"
            decoding="async"
            data-nimg="1"
            className="m-auto my-[40px]"
            src="../../assets/blogs/uae-construction-tender-process-stages.webp"
          />

          <p className="my-4 text-font19 text-[#77787B]">
            Understanding where digital presence fits into the tender process
            helps you prioritise where to invest. Here is how the standard UAE
            tender process flows and where your digital footprint is actively
            assessed.
          </p>

          <div className="overflow-x-auto border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#F2F2F2]">
                <tr>
                  <th className="text-dark border-r border-gray-200 px-6 py-3 text-left text-font19 font-medium capitalize tracking-wider">
                    Feature
                  </th>
                  <th className="text-dark border-r border-gray-200 px-6 py-3 text-left text-font19 font-medium capitalize tracking-wider">
                    Search Engine
                  </th>
                  <th className="text-dark px-6 py-3 text-left text-font19 font-medium capitalize tracking-wider ">
                    LLM (ChatGPT / Claude / Gemini)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="border-r border-gray-200 px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      Tender Notification
                    </div>
                  </td>
                  <td className="border-r border-gray-200 px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      Published on government portals including RTA, DEWA, Dubai
                      Municipality, Etimad (the UAE federal e-procurement
                      platform), and Abu Dhabi entity-specific portals, as well
                      as private channels and subscription services.
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      Low direct impact
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-gray-200 px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      Pre-Qualification
                    </div>
                  </td>
                  <td className="border-r border-gray-200 px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      Document submission, financial and technical assessment,
                      past performance review
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      High: online research happens here
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-gray-200 px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      Tender Document Collection
                    </div>
                  </td>
                  <td className="border-r border-gray-200 px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      Site visits, pre-bid meetings, clarification requests
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      Medium: reputation matters in meetings
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-gray-200 px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      Bid Preparation and Submission
                    </div>
                  </td>
                  <td className="border-r border-gray-200 px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      Technical and commercial proposals submitted
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      Low direct impact
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-gray-200 px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      Evaluation
                    </div>
                  </td>
                  <td className="border-r border-gray-200 px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      Technical scoring, commercial review, sometimes
                      presentations
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      High: background checks and due diligence
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-gray-200 px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      Negotiation and Award
                    </div>
                  </td>
                  <td className="border-r border-gray-200 px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      Clarifications, contract negotiations, mobilisation
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-font19 capitalize text-[#77787B]">
                      High: stakeholder confidence verification
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-font19 text-[#77787B]">
            The pre-qualification stage and the evaluation stage are where your
            digital presence is most actively scrutinised. These are the two
            moments where investing in your online credibility delivers the most
            direct return.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionThree;
