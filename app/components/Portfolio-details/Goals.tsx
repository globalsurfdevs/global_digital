"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Portfolio } from "@/app/types/Portfolio";
import parse from "html-react-parser";

const Goals = ({
  data,
  companyName
}: {
  data: {
    portfolio: Portfolio[];
  } | null;
  companyName: string | null;
}) => {

  console.log("CompanyName", companyName !== "bec-arabia")

  return (
    <>
      <div className="container mx-auto py-4">
        {companyName && companyName !== "bec-arabia" && data?.portfolio[0].section2Image1 ||
          data?.portfolio[0].section2Image2 ? (
          companyName && companyName !== "bec-arabia" && <motion.div
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
            {companyName && companyName !== "bec-arabia" && data.portfolio[0].section2Image1 && (
              <Image src={data?.portfolio[0].section2Image1 || ""} alt="image1" width={800} height={900} />
            )}

            {companyName && companyName !== "bec-arabia" && data.portfolio[0].section2Image2 && (
              <Image src={data?.portfolio[0].section2Image2 || ""} alt="image1" width={800} height={900} />
            )}
          </motion.div>
        ) : null}

        {data?.portfolio[0].goals !== "undefined" &&
          data?.portfolio[0].goals !== "<p><br></p>" &&
          data?.portfolio[0].goals !== "<p>undefined</p>" || data?.portfolio[0].objectives !== "undefined" &&
          data?.portfolio[0].objectives !== "<p><br></p>" &&
          data?.portfolio[0].objectives !== "<p>undefined</p>" ?
          <div className="lg:pb-150 pb-[50px]">
            {data?.portfolio[0].goals !== "undefined" &&
              data?.portfolio[0].goals !== "<p><br></p>" &&
              data?.portfolio[0].goals !== "<p>undefined</p>" ? (
              <motion.div
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
                <div className="">
                  <h2 className="text-font65">Goals</h2>  
                </div>
                <div className="fnt-lexend pt-2 text-font19  text-gray1">
                  {parse(data?.portfolio[0].goals || "")}
                </div>
              </motion.div>
            ) : null}

            {data?.portfolio[0].objectives == "undefined" ||
              data?.portfolio[0].objectives == "<p><br></p>" ||
              data?.portfolio[0].objectives == "<p>undefined</p>" ? (
              null
            ) : <motion.div
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
              <div className="">
                <h2 className="text-font65">Objectives</h2>
              </div>
              <div className="fnt-lexend pt-2 text-font19 text-gray1">
                {parse(data?.portfolio[0].objectives || "")}
              </div>
            </motion.div>}
          </div> : null}
      </div>

      {data?.portfolio[0].section2BannerImage ? (
        <div className="">
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
            className="w-full h-[70vh] lg:h-max">
            <Image src={data?.portfolio[0].section2BannerImage || ""} alt="web-mockup" width={1500} height={900} className="h-full w-full object-cover" />
          </motion.div>
        </div>
      ) : null}

      {data?.portfolio[0].challenge !== "undefined" &&
        data?.portfolio[0].challenge !== "<p><br></p>" &&
        data?.portfolio[0].challenge !== "<p>undefined</p>" ||
        data?.portfolio[0].solutions !== "undefined" &&
        data?.portfolio[0].solutions !== "<p><br></p>" &&
        data?.portfolio[0].solutions !== "<p>undefined</p>" ? (
        <div className="container mx-auto py-4">
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
              {data?.portfolio[0].challenge == "undefined" ||
                data?.portfolio[0].challenge == "<p>undefined</p>" ||
                data?.portfolio[0].challenge == "<p><br></p>" ? (
                null
              ) : <div className="flex w-full flex-col bg-dgray px-5 pb-5 pt-5 lg:px-[80px]  lg:pb-[91px] lg:pt-[70px]">
                <div>
                  <h2 className="title-65 mb-3 lg:mb-[30px]">Challenge</h2>
                </div>
                <div className="text-19 fnt-lexend text-gray1">
                  {parse(data?.portfolio[0].challenge || "")}
                </div>
              </div>}

              {data?.portfolio[0].solutions == "undefined" ||
                data?.portfolio[0].solutions == "<p>undefined</p>" ||
                data?.portfolio[0].solutions == "<p><br></p>" ? (
                null
              ) : <div className="flex w-full flex-col bg-dgray px-5 pb-5 pt-5 lg:px-[80px]  lg:pb-[91px] lg:pt-[70px]">
                <div>
                  <h2 className="title-65 mb-3 lg:mb-[30px]">Solutions</h2>
                </div>
                <div className="fnt-lexend text-19 ollist pl-4 text-gray1">
                  {parse(data?.portfolio[0].solutions || "")}
                </div>
              </div>}
            </div>
          </motion.div>
        </div>
      ) : null}
    </>
  );
};

export default Goals;
