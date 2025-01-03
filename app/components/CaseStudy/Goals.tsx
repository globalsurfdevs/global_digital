"use client";
import { CaseStudy } from "@/app/types/CaseStudy";
import { motion } from "framer-motion";
import React from "react";
import parse from 'html-react-parser'

const Goals = ({data}:{
  data:{
    caseStudy:CaseStudy[]
  }|null
}) => {
  if(!data){
    return null
  }

  return (
    <div className="container mx-auto py-4">
      <div className="py-[50px] lg:py-[150px]">
        {data.caseStudy[0].goals=="<p><br></p>" || data.caseStudy[0].goals=="<p>undefined</p>" || data.caseStudy[0].goals=="undefined" ? null : <motion.div
          className="grid border-t pb-[25px]  pt-[50px] lg:grid-cols-2 lg:pb-[95px] lg:pt-[53px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
          variants={{
            hidden: { opacity: 0, y: 50 }, // Start below and invisible
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            }, // Slide up and fade in
          }}
        >
          <div className="col-span-1 flex">
            <h2 className="title-65">Goals</h2>
          </div>
          <div className=" pt-3 lg:pl-5">
            {/* <p className="text-19 fnt-lexend text-gray1">
              Innovo Group partnered with Global Surf to achieve several key
              objectives for their website. The primary goal was to create a
              website that visually and thematically aligned with Innovo’s
              innovative brand identity. Additionally, Innovo sought to improve
              website speed and reduce loading times, enhance user experience to
              retain visitors longer, and increase conversions by attracting
              more new users while maintaining a consistent user base.
            </p> */}
            {parse(data.caseStudy[0].goals)}
          </div>
        </motion.div>}
        {data.caseStudy[0].objectives=="<p><br></p>" || data.caseStudy[0].objectives=="<p>undefined</p>" || data.caseStudy[0].objectives=="undefined" ? null : <motion.div
          className="grid border-t py-[25px]   lg:grid-cols-2 lg:pb-[95px] lg:pt-[53px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
          variants={{
            hidden: { opacity: 0, y: 50 }, // Start below and invisible
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            }, // Slide up and fade in
          }}
        >
          <div className="col-span-1 flex">
            <h2 className="title-65">Objectives</h2>
          </div>
          <div className="pt-3 text-font19 lg:pl-5">
            {/* <p className="text-19 fnt-lexend text-gray1 ">
              To address goals, Global Surf conducted an in-depth analysis of
              the website&apos;s performance and speed. We implemented
              structural changes, optimized the code, and compressed media files
              to enhance site efficiency. Additionally, Global Surf uplifted the
              brand image by incorporating high-quality branding materials,
              ensuring a consistent and professional appearance across all
              touchpoints.
            </p> */}
            {parse(data.caseStudy[0].objectives)}
          </div>
        </motion.div>}

        {data.caseStudy[0].challenge=="<p><br></p>" || data.caseStudy[0].challenge=="<p>undefined</p>" || data.caseStudy[0].challenge=="undefined" ? null : <motion.div
          className="grid border-t py-[25px] pb-[0px] lg:grid-cols-2 lg:pb-[0px] lg:pt-[95px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
          variants={{
            hidden: { opacity: 0, y: 50 }, // Start below and invisible
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            }, // Slide up and fade in
          }}
        >
          <div className="col-span-1 flex">
            <h2 className="title-65">Challenge</h2>
          </div>
          <div className=" pt-3 lg:pl-5">
            {/* <p className="text-19 fnt-lexend text-gray1">
              Redesigning the website brought several challenges. Migrating from
              an outdated CMS without disruptions was complex, especially with
              its limitations. Ensuring cross-browser and mobile compatibility,
              preserving existing organic traffic, and integrating new branding
              materials, for a consistent brand experience were all essential.
              With a product launch looming, we delivered efficiently within
              tight deadlines.
            </p> */}
            {parse(data.caseStudy[0].challenge)}
          </div>
        </motion.div>}

        {data.caseStudy[0].overcomingChallenges=="<p><br></p>" || data.caseStudy[0].overcomingChallenges=="<p>undefined</p>" || data.caseStudy[0].overcomingChallenges=="undefined"
        && data.caseStudy[0].achievements=="<p><br></p>" || data.caseStudy[0].achievements=="<p>undefined</p>" || data.caseStudy[0].achievements=="undefined" ? null :
        <motion.div
          className="grid gap-2 space-y-5  pt-[50px] md:space-y-0 lg:grid-cols-2 lg:gap-[0px] lg:space-x-5 lg:pt-[146px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
          variants={{
            hidden: { opacity: 0, y: 50 }, // Start below and invisible
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            }, // Slide up and fade in
          }}
        >
          {data.caseStudy[0].overcomingChallenges && <div className="flex w-full flex-col gap-4   bg-dgray p-6 lg:gap-[41px] lg:p-[75px]">
            <div>
              <h2 className="title-65">Overcoming Challenges</h2>
            </div>
            <div className="pl-4">
              {/* <ul className="flex list-disc flex-col gap-6 text-font19">
                <li className="fnt-lexend text-gray1">
                  Implemented a more robust website platform to enhance
                  scalability and security, resulting in a 50% reduction in
                  downtime and a 30% increase in performance.
                </li>
                <li className="fnt-lexend text-gray1">
                  Addressed security vulnerabilities to improve load times and
                  resolve issues that previously compromised the secure browsing
                  experience.
                </li>
              </ul> */}
              {parse(data.caseStudy[0].overcomingChallenges)}
            </div>
          </div>}

          {data.caseStudy[0].achievements && <div className="flex w-full flex-col gap-6  bg-dgray p-6 lg:gap-[41px] lg:p-[75px]">
            <div>
              <h2 className="title-65">Key Achievements</h2>
            </div>
            <div className="pl-4">
              {/* <ul className="fnt-lexend flex list-disc flex-col gap-4 text-font19">
                <li className="text-gray1">
                  Optimized keywords to drive a 107.3% increase in new user
                  traffic and a 125.5% boost in page views.
                </li>
                <li className="text-gray1">
                  Redesigned the website and optimized user flow, resulting in a
                  102.35% growth in engaged sessions and a 125.5% increase in
                  user engagement.
                </li>
                <li className="text-gray1">
                  Revamped marketing materials with updated design and messaging
                  to boost brand visibility and strengthen brand perception.
                </li>
              </ul> */}
              {parse(data.caseStudy[0].achievements)}
            </div>
          </div>}
        </motion.div>}
      </div>
    </div>
  );
};

export default Goals;
