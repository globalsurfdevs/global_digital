"use client";
import Image from "next/image";

import React from "react";
import { motion } from "framer-motion";

  const TitleImagecontent = () => {
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
        <div className="grid grid-cols-1 gap-4"><div className="col-span-2 mb-5 xl:mb-0"></div>
        <div className="col-span-5 w-full" id="most-office-fit-out-brands-try-to-win-in-january-bafco-prepared-all-year">
          <h2 className="title-65 mb-[40px]">How digital presence influences tender outcomes</h2>
          <Image alt="Comparison of weak versus strong contractor website" loading="lazy" width="1100" height="500" decoding="async" data-nimg="1" className="my-[40px] m-auto"   src="../../assets/blogs/contractor-website-comparison-strong-vs-weak-digital-presence.webp" />
          <h3 className="text-[30px] mb-2">At the pre-qualification stage</h3>
          <p className="text-font19 text-[#77787B] mt-4">Many contractors never get past pre-qualification, and the reason is rarely a technical deficiency. It is a credibility and stability perception problem. Consider two contractors applying for the same pre-qualification:</p>
          <p className="text-font19 text-[#77787B] mt-4">Company A has 15 years of experience. Their website was last updated in 2019. They have no social media presence. Their contact page has a generic email address. Company B has 12 years of experience. Their website features recent projects with photos and client names. Their LinkedIn page posts weekly. Their leadership team is visible and professionally presented. Which company appears more stable and capable? Which would you prequalify?</p>
          <p className="text-font19 text-[#77787B] mt-4">A professional digital presence communicates stability, active operations, and a track record that can be independently verified. Without it, claims made in a pre-qualification document are harder to trust.</p> </div></div>
          <h3 className="text-[30px] mb-2 mt-4">During technical evaluation</h3> 
          <p className="text-font19 text-[#77787B] mt-4">In the UAE context, where large government tenders often involve ADNOC, RTA, DEWA, or Abu Dhabi's GPG procurement teams, evaluators are experienced professionals who conduct structured background research. A contractor with no digital footprint creates an information vacuum and procurement professionals fill information vacuums with doubt.</p>
           <div className="flex-1">
                  <ul className="list-disc pl-6 text-font19 text-[#77787B] space-y-2">
                    <li> Whether past projects are documented with scope, scale, and outcomes - not just a list of names
                    </li>
                    <li>
                     Whether the leadership and technical team are visible and professionally credible
                    </li>
                    <li>
                     Whether the company demonstrates current industry knowledge and active sector engagement
                    </li>
                    <li>
                     Whether the business shows signs of growth and operational stability
                    </li> 
                  </ul>
                </div>
                 <h3 className="text-[30px] mb-2 mt-4">At the negotiation and award stage</h3> 
           <div className="flex-1">
                  <ul className="list-disc pl-6 text-font19 text-[#77787B] space-y-2">
                    <li>Even after selection, clients want reassurance that they have made the right choice
                    </li>
                    <li>
                     A strong digital presence reinforces confidence during contract negotiations
                    </li>
                    <li>
                     Stakeholders who need to sign off on the award can quickly verify your reputation independently
                    </li>
                    <li>
                     It reduces the perceived risk of awarding a significant contract to your company
                    </li> 
                  </ul>
                </div>
                <h3 className="text-[30px] mb-2 mt-4"> For long-term relationship building</h3> 
           <div className="flex-1">
                  <ul className="list-disc pl-6 text-font19 text-[#77787B] space-y-2">
                    <li>Even after selection, clients want reassurance that they have made the right choice
                    </li>
                    <li>
                    Winning a tender is not a one-off event; repeat business comes from staying visible between projects
                    </li>
                    <li>
                     Content marketing keeps you present in the minds of clients who are planning future projects
                    </li>
                    <li>
                     LinkedIn activity and project updates ensure you are remembered when the next opportunity arises
                    </li> 
                  </ul>
                </div>
          </motion.div>
          </div>
          </section>
  );
};

export default TitleImagecontent;