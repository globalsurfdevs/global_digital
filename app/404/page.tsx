"use client";
import React from "react";
import Image from "next/image";
import "../../app/globals.css";

import { MdOutlineArrowBack, MdOutlineDoneOutline } from "react-icons/md";
import Link from "next/link";


export const dynamic = "force-dynamic";

const page = () => {
  return (
    <div className="er-pg">
      <div className="text-center cdedd">
        <div className="flex justify-center h-[62dvh] alnbase">
          <Image
            src="/assets/404/404-im.svg"
            alt=""
            width="700"
            height="100"
            className="transition-transform duration-500 group-hover:scale-110 group-hover:opacity-50 "
          />
        </div>
        <div className="h-[38dvh] h38dd">
          <div>
          <h2 className="mb-3 flex items-center justify-center uppercase md:text-[35px]  lg:mb-[17px] lg:text-[47px] ">
            <span className="font-bold">Pixel Perfect </span>
            <span className="mr-3 text-[#E63E31]">?</span> Not This Time{" "}
            <Image
              src="/assets/404/sad-emo.png"
              alt="years"
              width={38}
              height={52}
              className="ml-2 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-50"
            />
          </h2>

          <p className="fnt-lexend fnt404 mb-3 pe-2 ps-2 text-font16 text-[#909496] md:text-[20px] lg:mb-[57px]">
            Looks like this page missed the mark. But don’t worry—every other
            pixel is right where it should be.<br></br> Let’s get you back to a
            flawless experience.
          </p>
          <div className="mt-4 flex justify-center">
            <Link
              href="/"
              className=" p404 flex w-fit items-center justify-between gap-10 rounded-full border border-primary
                        px-[25px] py-[15px] text-font16 uppercase leading-lh1p66 text-black transition-all   duration-300 ease-in hover:shadow-lg"
            >
              <span className="flex items-center justify-center gap-3 text-[14px] transition-transform duration-300 ease-in-out hover:-translate-x-1 hover:text-gray1 md:text-font16">
                Back to home
                <MdOutlineArrowBack className="bg-[#E63E31] text-white" />
              </span>
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
