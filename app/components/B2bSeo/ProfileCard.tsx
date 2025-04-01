import Image from "next/image";
import { assets } from "@/public/assets/assets";

export default function ProfileCard() {
  return (
    <div className="container py-[50px] lg:py-[140px]">
      <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-[100px]">
        {/* Profile Card */}
        <div className="flex justify-center p-4 md:flex lg:flex-[4]">
          <div className="group w-fit bg-dgray duration-300 ease-in-out hover:bg-primary">
            <div className="absolute mb-3 p-4 md:px-[40px] md:py-[22px]">
              <p className="text-30 text-black duration-300  ease-in-out group-hover:text-white">
                Faisal Ahmed
              </p>
              <p className="text-19 text-gray1 duration-300  ease-in-out group-hover:text-white">
                Digital Account Director
              </p>
            </div>
            <div className="">
              <div className="relative top-5">
                <Image src={assets.faisalimage} alt="image" />
              </div>
            </div>
          </div>
          {/* <div className="max-w-xs lg:max-w-none">
            <Image
              src={assets.faisalimage}
              alt="Faisal Ahmed"
              className="h-auto w-full"
            />
          </div> */}
        </div>
        {/* Quote Section */}
        <div className="p-4 text-center lg:flex-[8] lg:text-left">
          <div className="flex w-full items-center justify-center gap-4 lg:justify-start">
            <p className="m-0 p-0 text-[53px] font-bold leading-none text-red-500">
              ❝
            </p>
            <div className="mb-4 h-[1px] w-full bg-[#E6E6E6]"></div>
          </div>
          <p className="text-[25px] text-[#77787B] lg:py-[40px]">
            Our focus is on driving meaningful growth, helping business succeed
            long-term. Whether it’s expert SEO guidance or a customized
            strategy, my team and I collaborate to create solutions that align
            with your goals. We combine data-driven insights with market
            understanding to ensure real, measurable impact.
          </p>
          <div className="flex w-full items-center justify-center gap-4 lg:justify-end">
            <div className="mb-4 h-[1px] w-full bg-[#E6E6E6]"></div>
            <p className="m-0 p-0 text-[53px] font-bold leading-none text-red-500">
              ❞
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
