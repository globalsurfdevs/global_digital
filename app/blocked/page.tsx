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
        <div className="flex justify-center h-[53dvh] alnbase ">
          {/* <Image
            src="/assets/404/404-im.svg"
            alt=""
            width="700"
            height="100"
            className="transition-transform duration-500 group-hover:scale-110 group-hover:opacity-50 "
          /> */}
          <p className="rtts">4</p>
            <div className="xemn "><p className="zerost"><span>0</span></p></div>
          <p className="rtts">4</p>
        </div>
        <div className="h-[38dvh] h38dd">
          <div>
          <h2 className="mb-3 flex items-center justify-center uppercase md:text-[35px]  lg:mb-[17px] lg:text-[47px] ">
            <span className="font-bold">Pixel Perfect </span>
            <span className="mr-3 text-[#E63E31]">?</span> Not This Time{" "}
            
          </h2>

          <p className="fnt-lexend fnt404 mb-3 pe-2 ps-2 text-font16 text-[#909496] md:text-[20px] lg:mb-[57px]">
            Looks like this page missed the mark. But don’t worry—every other
            pixel is right where it should be.<br></br> Let’s get you back to a
            flawless experience.
          </p>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
