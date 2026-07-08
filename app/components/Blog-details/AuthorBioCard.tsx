import React from "react";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import Link from "next/link";

export default function AuthorBioCard({data}:{data:any}) {
  return (
    <div className="container w-full ">
      <div className="flex gap-5 items-end  pt-[70px] border-t border-black/20">
        <div className="flex items-end gap-[31px]">
          <div className="relative w-[150px] h-[150.35px] group ease-in-out duration-300 overflow-hidden">

            <div className="w-full h-full relative">
              <div className="before:content-[''] before:absolute  before:h-[75%] before:bg-[#b8bbbd] before:w-full  before:left-0 before:bottom-0"></div>
              <Image src={data.imageBig} alt="image" fill className="absolute object-cover" />
            </div>

          </div>

                  <div className="flex flex-col h-full gap-[10px]">
          <div className="flex flex-col gap-[5px]">
            <Link href={`/author/${data.slug}`}><div className="text-[30px] text-gray-900  leading-[40px]">{data.name}</div></Link>
            <p className="text-gray-500 text-[16px] leading-[24px]">
              {data.designation}
            </p>
          </div>

          <a
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${data.name} on LinkedIn`}
            className="w-[50px] h-[50px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors rounded-[14px]"
          >
            {/* <Linkedin size={16} className="text-gray-800" fill="currentColor" /> */}
            <Image src={'/images/blog-new/linkedin.svg'} width={18} height={18} alt=""/>
          </a>
        </div>

        </div>

      </div>
      <p className="mt-5 text-font19 text-[#77787B] pb-[140px]">{data.description}</p>
    </div>
  );
}
