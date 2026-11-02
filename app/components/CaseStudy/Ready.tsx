"use client";
import { motion } from "framer-motion";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import Button from "../Button/Button";
import React from "react";
import { CaseStudy } from "@/app/types/CaseStudy";
import Link from "next/link";

const Ready = ({
  data,
}: {
  data: {
    caseStudy: CaseStudy;
  } | null;
}) => {
  if (!data) {
    return null;
  }

  return (
    <div className="container mx-auto py-4">
      {data.caseStudy.image1 || data.caseStudy.image2 ? (
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
          <div className=" grid grid-cols-2 gap-[20px]">
            {data.caseStudy.image1 && (
              <div className="">
                <Image
                  src={data.caseStudy.image1}
                  alt="image1"
                  width={800}
                  height={500}
                />
              </div>
            )}

            {data.caseStudy.image2 && (
              <div className="">
                <Image
                  src={data.caseStudy.image2}
                  alt="image2"
                  width={800}
                  height={500}
                />
              </div>
            )}
          </div>
        </motion.div>
      ) : null}
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
        <div className="flex flex-col border-b pb-[50px] pt-[30px] lg:pb-[150px] lg:pt-[138px]   ">
          <h2 className="title-65 mb-4 lg:mb-7">
            Lets Create Something Iconic Together
          </h2>
          <p className="text-19 fnt-lexend max-w-[113ch] text-gray1">
            Every great brand has a story. See how we’ve turned challenges into
            triumphs for our clients. Your brand could be next.
          </p>
          <div>
            <div className="innerfnont relative mt-[20px] lg:mt-[64px]">
              <Button text="LET'S COLLABORATE" textcolor={"black"} />

              <Link
                href="/lets-talk"
                className="absolute left-0 top-0 h-full w-full"
              ></Link>
            </div>{" "}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Ready;
