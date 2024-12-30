"use client";
import { motion } from "framer-motion";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import React from "react";
import { Portfolio } from "@/app/types/Portfolio";
import parse from "html-react-parser";

const Goals = ({
  data,
}: {
  data: {
    portfolio: Portfolio[];
  } | null;
}) => {
  return (
    <>
      <div className="container mx-auto py-4">
        {data?.portfolio[0].section2Image1 || data?.portfolio[0].section2Image2 ? (<motion.div
          className="pt-150 pb-150 grid grid-cols-2 gap-5"
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
          {data.portfolio[0].section2Image1 && <Image
            src={data?.portfolio[0].section2Image1 || ""}
            alt="image1"
            width={800}
            height={900}
          />}

          {data.portfolio[0].section2Image2 &&<Image
            src={data?.portfolio[0].section2Image1 || ""}
            alt="image1"
            width={800}
            height={900}
          />}
        </motion.div>) : null }

        <div className="lg:pb-150 pb-[50px] ">
          {data?.portfolio[0].goals!=="undefined" && data?.portfolio[0].goals!=="<p><br></p>" ? (<motion.div
            className="grid border-t border-clrE6E6E6 py-[50px]  pb-[25px] pt-[35px] lg:grid-cols-2 lg:pb-[95px] lg:pt-[50px]"
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
              <h2 className="text-font65">Goals</h2>
            </div>
            <div className="pt-2 text-font19 lg:pl-5  text-gray1 fnt-lexend">
              {/* <p className='text-19 text-gray1 fnt-lexend'>Innovo Group partnered with Global Surf to achieve several key objectives for their website.
                                The primary goal was to create a website that visually and thematically aligned with Innovo’s
                                innovative brand identity. Additionally, Innovo sought to improve website speed and reduce loading
                                times, enhance user experience to retain visitors longer, and increase conversions by attracting
                                more new users while maintaining a consistent user base.</p> */}
              {parse(data?.portfolio[0].goals || "")}
            </div>
          </motion.div>) : null } 

          {data?.portfolio[0].objectives!=="undefined" && data?.portfolio[0].objectives!=="<p><br></p>" ? (<motion.div
            className="grid border-t pt-[25px] lg:grid-cols-2 lg:pt-[50px]"
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
              <h2 className="text-font65">Objectives</h2>
            </div>
            <div className="pt-2 text-font19 lg:pl-5 text-gray1 fnt-lexend">
              {/* <p className='text-19 text-gray1 fnt-lexend'>To address goals, Global Surf conducted an in-depth analysis of the website&apos;s performance and speed.
                                We implemented structural changes, optimized the code, and compressed media files to enhance site efficiency.
                                Additionally, Global Surf uplifted the brand image by incorporating high-quality branding materials, ensuring
                                a consistent and professional appearance across all touchpoints.</p> */}
              {parse(data?.portfolio[0].objectives || "")}
            </div>
          </motion.div>) : null } 
        </div>
      </div>

      {data?.portfolio[0].section2BannerImage ? (<div className="">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
          variants={{
            hidden: { opacity: 0, y: 100 }, // Start below and invisible
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            }, // Slide up and fade in
          }}
        >
          <Image
            src={data?.portfolio[0].section2BannerImage || ""}
            alt="web-mockup"
            width={1500}
            height={900}
            className="h-full w-full"
          />
        </motion.div>
      </div>) : null }

      {data?.portfolio[0].challenge!== "undefined" && data?.portfolio[0].challenge!=="<p><br></p>" && data?.portfolio[0].solutions !== "undefined" && data?.portfolio[0].solutions!=="<p><br></p>" ? (<div className="container mx-auto py-4">
        <motion.div
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
          <div className="grid space-y-5 py-[50px]  md:space-y-0 lg:grid-cols-2 lg:space-x-5 lg:py-[150px]">
            {data?.portfolio[0].challenge!=="undefined" ? (<div className="flex w-full flex-col bg-dgray px-5 pb-5 pt-5 lg:px-[80px]  lg:pb-[91px] lg:pt-[70px]">
              <div>
                <h2 className="title-65 mb-3 lg:mb-[30px]">Challenge</h2>
              </div>
              <div className='text-gray1 text-19 fnt-lexend'>
                 {parse(data?.portfolio[0].challenge || "")}
              </div>
            </div>) : null } 

            {data?.portfolio[0].solutions!=="undefined" ? (<div className="flex w-full flex-col bg-dgray px-5 pb-5 pt-5 lg:px-[80px]  lg:pb-[91px] lg:pt-[70px]">
              <div>
                <h2 className="title-65 mb-3 lg:mb-[30px]">Solutions</h2>
              </div>
              <div className="fnt-lexend text-19 pl-4 text-gray1 ollist">

                {parse(data?.portfolio[0].solutions || "")}
              </div>
            </div>) : null }
          </div>
        </motion.div>
      </div>) : null } 
    </>
  );
};

export default Goals;
