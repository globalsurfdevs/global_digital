import React from "react";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import Link from "next/link";

export default function AuthorBioCard({ data }: { data: any }) {
  return (
    <div className="container w-full ">
      <div className="flex items-end gap-5  border-t border-black/20 pt-[70px]">
        <div className="flex items-end gap-[31px]">
          <div className="group relative h-[150.35px] w-[150px] overflow-hidden duration-300 ease-in-out">
            <div className="relative h-full w-full">
              <div className="before:absolute before:bottom-0  before:left-0 before:h-[75%] before:w-full  before:bg-[#b8bbbd] before:content-['']"></div>
              <Image
                src={data.imageBig}
                alt="image"
                fill
                className="absolute object-cover"
              />
            </div>
          </div>

          <div className="flex h-full flex-col gap-[10px]">
            <div className="flex flex-col gap-[5px]">
              <Link href={`/author/${data.slug}`}>
                <div className="text-[30px] leading-[40px]  text-gray-900">
                  {data.name}
                </div>
              </Link>
              <p className="text-[16px] leading-[24px] text-gray-500">
                {data.designation}
              </p>
            </div>

            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${data.name} on LinkedIn`}
              className="flex h-[50px] w-[50px] items-center justify-center rounded-[14px] bg-gray-100 transition-colors hover:bg-gray-200"
            >
              {/* <Linkedin size={16} className="text-gray-800" fill="currentColor" /> */}
              <Image
                src={"/images/blog-new/linkedin.svg"}
                width={18}
                height={18}
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
      <p className="mt-5 pb-[140px] text-font19 text-[#77787B]">
        {data.description}
      </p>
    </div>
  );
}
