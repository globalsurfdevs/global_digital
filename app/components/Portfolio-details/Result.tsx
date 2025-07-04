"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { SuccessStories } from "../SuccessStories/SuccessStories";
import { Portfolio } from "@/app/types/Portfolio";
import parse from "html-react-parser";
import LetsTalk from "@/app/components/common/LetsConnect";

const Result = ({
  data,
}: {
  data: {
    portfolio: Portfolio[];
  } | null;
}) => {
  console.log("ResultData",data)

  const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
      if (modalOpen) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        // disables scroll
      } else {
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto"; // resets to default
      }
  
      return () => {
        document.body.style.overflow = "";
      };
    }, [modalOpen]);

  return (
    <>
    {modalOpen && (
              <div className="fixed left-0 top-0 z-[1000] w-screen overflow-y-auto bg-white">
                <LetsTalk onClose={() => setModalOpen(false)} />
              </div>
            )}

    <div className="container mx-auto py-4">
      {data?.portfolio[0].result=="<p><br></p>" || data?.portfolio[0].result=="<p>undefined</p>" || data?.portfolio[0].result=="undefined" ? null :  <div className="flex flex-col gap-4 lg:gap-[30px] ">
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
          <h2 className="title-65 pb-3 lg:pb-[30px]">Lets Create Something Iconic Together</h2>
          <p className="text-19 lg-mb-[64px] fnt-lexend mb-0 text-gray1">
            Every great brand has a story. See how we’ve turned challenges into
            triumphs for our clients. Your brand could be next.{" "}
          </p>
          <div className="innerfnont mt-[20px] lg:mt-[64px] relative w-fit">
            <Button text="LET'S COLLABORATE" textcolor={'black'} onClick={() => {
                  setModalOpen(true);
                  document.body.style.overflow = "hidden";
                }}/>
            {/* <Link href="/lets-talk" className="absolute left-0 top-0 w-full h-full"></Link> */}
          </div>
        </div>
      </motion.div>

      <div>
        <SuccessStories companyId={data?.portfolio[0].id}/>
      </div>
    </div>
    </>
  );
};

export default Result;
