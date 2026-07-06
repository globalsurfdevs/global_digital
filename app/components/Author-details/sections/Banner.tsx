import React from "react";
import { Linkedin } from "lucide-react";
import Image from "next/image";

type Props = {
    name:string;
    designation:string;
    linkedin:string;
    image:string;
}

export default function AuthorBanner({name,designation,linkedin,image}:Props) {
    return (
        <div className="w-full bg-[#F2F2F2] pt-[80px]">
            <div className="flex flex-col lg:flex-row lg:items-center gap-[100px] container relative">

                {/* Text block */}
                <div className="order-1 lg:order-2 flex flex-col gap-[20px] h-full">
                    <div className="grid grid-cols-2 lg:grid-cols-1">
                        <h2 className="text-[35px] leading-[45px] lg:text-[65px] lg:leading-[70px] text-gray-900">
                            {name.split(" ").map((word, i) => (
                                <React.Fragment key={i}>
                                    {word}
                                    <br />
                                </React.Fragment>
                            ))}
                        </h2>

                        <a href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${name} on LinkedIn`}
                            className="flex items-center gap-2 transition-colors p-[10px] border rounded-[6px] lg:hidden"
                        >
                            <span className="flex items-center justify-center bg-[#C1C1C14D] w-[50px] h-[50px] rounded-[7px]">
                                <Image src={'/images/blog-new/linkedin.svg'} width={18} height={18} alt="" />
                            </span>
                            <span className="text-[#77787B] text-[19px]">LinkedIn</span>
                        </a>

                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center gap-[30px] h-full">
                        <p className="text-[#77787B] text-[16px] leading-[28px] lg:text-[30px] lg:leading-[40px]">
                            {designation}
                        </p>

                        <span className="lg:w-[1px] lg:h-[78px] w-full h-[1px] bg-[#00000033]"></span>

                        <a href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${name} on LinkedIn`}
                            className="lg:flex items-center gap-2 transition-colors p-[10px] border rounded-[6px] hidden"
                        >
                            <span className="flex items-center justify-center bg-[#C1C1C14D] w-[50px] h-[50px] rounded-[7px]">
                                <Image src={'/images/blog-new/linkedin.svg'} width={18} height={18} alt="" />
                            </span>
                            <span className="text-[#77787B] text-[19px]">LinkedIn</span>
                        </a>
                    </div>
                </div>

                {/* Image */}
                <div className="order-2 lg:order-1 relative w-full h-[426px] lg:w-[434.35px] overflow-hidden">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-contain object-bottom lg:object-center lg:object-cover"
                    />
                </div>

            </div>
        </div>
    );
}