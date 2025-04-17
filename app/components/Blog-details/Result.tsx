"use client";
import { motion } from "framer-motion";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import React from "react";
import Button from "../Button/Button";
import { SuccessStories } from "../SuccessStories/SuccessStories";
import { Portfolio } from "@/app/types/Portfolio";
import parse from "html-react-parser";

const Result = ({
  data,
}: {
  data: {
    portfolio: Portfolio[];
  } | null;
}) => {
  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-col gap-4 pb-[50px] lg:gap-[30px] lg:pb-[143px]">
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
      </div>

      <motion.div
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
        <div>
          <Image
            src={data?.portfolio[0].resultImage1 ?? assets.success1}
            alt="image"
            width={900}
            height={900}
          />
        </div>

        <div>
          <Image
            src={data?.portfolio[0].resultImage2 ?? assets.success1}
            alt="image"
            width={900}
            height={900}
          />
        </div>
      </motion.div>

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
          <div className="innerfnont mt-[20px] lg:mt-[64px]">
            <Button text="LET'S COLLABORATE" color={'text-black'}/>
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
