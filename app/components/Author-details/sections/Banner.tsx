import React from "react";
import { Linkedin } from "lucide-react";
import Image from "next/image";

type Props = {
  name: string;
  designation: string;
  linkedin: string;
  image: string;
};

export default function AuthorBanner({
  name,
  designation,
  linkedin,
  image,
}: Props) {
  return (
    <div className="w-full bg-[#F2F2F2] pt-[80px]">
      <div className="container relative flex flex-col gap-[100px] lg:flex-row lg:items-center">
        {/* Text block */}
        <div className="order-1 flex h-full flex-col gap-[20px] lg:order-2">
          <div className="grid grid-cols-2 lg:grid-cols-1">
            <h2 className="text-[35px] leading-[45px] text-gray-900 lg:text-[65px] lg:leading-[70px]">
              {name.split(" ").map((word, i) => (
                <React.Fragment key={i}>
                  {word}
                  <br />
                </React.Fragment>
              ))}
            </h2>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on LinkedIn`}
              className="flex items-center gap-2 rounded-[6px] border p-[10px] transition-colors lg:hidden"
            >
              <span className="flex h-[50px] w-[50px] items-center justify-center rounded-[7px] bg-[#C1C1C14D]">
                <Image
                  src={"/images/blog-new/linkedin.svg"}
                  width={18}
                  height={18}
                  alt=""
                />
              </span>
              <span className="text-[19px] text-[#77787B]">LinkedIn</span>
            </a>
          </div>

          <div className="flex h-full flex-col gap-[30px] lg:flex-row lg:items-center">
            <p className="text-[16px] leading-[28px] text-[#77787B] lg:text-[30px] lg:leading-[40px]">
              {designation}
            </p>

            <span className="h-[1px] w-full bg-[#00000033] lg:h-[78px] lg:w-[1px]"></span>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on LinkedIn`}
              className="hidden items-center gap-2 rounded-[6px] border p-[10px] transition-colors lg:flex"
            >
              <span className="flex h-[50px] w-[50px] items-center justify-center rounded-[7px] bg-[#C1C1C14D]">
                <Image
                  src={"/images/blog-new/linkedin.svg"}
                  width={18}
                  height={18}
                  alt=""
                />
              </span>
              <span className="text-[19px] text-[#77787B]">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="relative order-2 h-[426px] w-full overflow-hidden lg:order-1 lg:w-[434.35px]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain object-bottom lg:object-cover lg:object-center"
          />
        </div>
      </div>
    </div>
  );
}
