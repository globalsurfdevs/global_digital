"use client";
import { motion } from "framer-motion";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import React from "react";
import Button from "../Button/Button";
import { SuccessStories } from "../SuccessStories/SuccessStories";
import { Portfolio } from "@/app/types/Portfolio";
import parse from "html-react-parser";
import { Link } from "@mui/material";

const Result = ({
  data,
}: {
  data: {
    portfolio: Portfolio[];
  } | null;
}) => {
  console.log("ResultData",data)

  return (
    <div className="container mx-auto py-4">
      {data?.portfolio[0].result=="<p><br></p>" || data?.portfolio[0].result=="<p>undefined</p>" || data?.portfolio[0].result=="undefined" ? null :  <div className="flex flex-col gap-4 pb-[50px] lg:gap-[30px] lg:pb-[143px]">
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
          <div>
            <h2 className="title-65 mb-3 lg:mb-5">Result</h2>
          </div>
          <div className="text-19 fnt-lexend text-gray1 ollist pl-5">
            {parse(data?.portfolio[0].result || "")}
          </div>
        </motion.div>
      </div> }

      {data?.portfolio[0].resultImage1 || data?.portfolio[0].resultImage2 ? (<motion.div
        className="mx-auto grid  grid-cols-2   gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
        variants={{
          hidden: { opacity: 0, y: 50 }, // Start below and invisible
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.3, ease: "easeOut" },
          }, // Slide up and fade in
        }}
      >
        {data.portfolio[0].resultImage1 && <div>
          <Image src={data?.portfolio[0].resultImage1 || ""} alt="image" width={900} height={900} />
        </div>}

        {data.portfolio[0].resultImage2 &&<div>
          <Image src={data?.portfolio[0].resultImage2 || ""} alt="image" width={900} height={900} />
        </div>}

      </motion.div>) : null }

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
        variants={{
          hidden: { opacity: 0, y: 50 }, // Start below and invisible
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.3, ease: "easeOut" },
          }, // Slide up and fade in
        }}
      >
        <div className="flex flex-col border-b py-[50px] lg:pb-[150px] lg:pt-[136px]  ">
          <h2 className="title-65 pb-3 lg:pb-[30px]">
            Lets Create Something Iconic Together
          </h2>
          <p className="text-19 lg-mb-[64px] fnt-lexend mb-0 text-gray1">
            Every great brand has a story. See how we’ve turned challenges into
            triumphs for our clients. Your brand could be next.{" "}
          </p>
          <div className="innerfnont mt-[20px] lg:mt-[64px] relative w-fit">
            <Button text="LET'S COLLABORATE" textcolor={'black'}/>
            <Link href="/lets-talk" className="absolute left-0 top-0 w-full h-full"></Link>
          </div>
        </div>
      </motion.div>

      <div>
        <SuccessStories companyId={data?.portfolio[0].id}/>
      </div>
    </div>
  );
};

export default Result;
