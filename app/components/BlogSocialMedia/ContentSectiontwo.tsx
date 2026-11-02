"use client";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
const ContentSectiontwo = () => {
  return (
    <section>
      <div className="container mx-auto ">
        <div className="grid  py-[50px] lg:py-[100px] ">
          <div className="col-span-2  mb-5 xl:mb-0"></div>
          <div className="col-span-5 w-full ">
            <h2 className="title-65 mb-[40px]">
              Why Social Video Works Better Now Than Ever
            </h2>
            <p className="mb-[16px]  text-font19 text-[#77787B]">
              Let’s break down the urgency behind investing in video
              content:{" "}
            </p>
            <div className="grid gap-[30px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div className="flex flex-col">
                <div>
                  <Image
                    src={assets.message}
                    alt=""
                    className="h-[50px] w-[50px] bg-primary p-2"
                  />
                </div>
                <div className="my-[40px] border-b border-[#000000]"></div>
                <p className="mb-[16px]   text-font19">
                  You keep 95% of a message when watching vs. just 10% through
                  text.
                </p>
              </div>
              <div className="flex flex-col">
                <div>
                  <Image
                    src={assets.videoblg}
                    alt=""
                    className="h-[50px] w-[50px] bg-primary p-2"
                  />
                </div>
                <div className="my-[40px] border-b border-[#000000]"></div>
                <p className="mb-[16px]   text-font19">
                  Video posts generally receive twice the engagement of static
                  images or text.
                </p>
              </div>
              <div className="flex flex-col">
                <div>
                  <Image
                    src={assets.algo}
                    alt=""
                    className="h-[50px] w-[50px] bg-primary p-2"
                  />
                </div>
                <div className="my-[40px] border-b border-[#000000]"></div>
                <p className="mb-[16px]   text-font19">
                  Algorithms reward video content by keeping users inside apps
                  longer.
                </p>
              </div>
              <div className="flex flex-col">
                <div>
                  <Image
                    src={assets.platform}
                    alt=""
                    className="h-[50px] w-[50px] bg-primary p-2"
                  />
                </div>
                <div className="my-[40px] border-b border-[#000000]"></div>
                <p className="mb-[16px]   text-font19">
                  Platforms like TikTok and YouTube Shorts build entirely around
                  video.
                </p>
              </div>
            </div>
            <div className="mt-[40px] bg-[#F2F2F2] p-[30px]   lg:max-w-[80%]">
              <p className="text-30 mb-2 ">
                “Story-driven video ads on social platforms boost purchase
                intent by 34%.”
              </p>
              <p className="text-30 ">
                — Sprout Social, 2024 Social Video Trends Report.
              </p>
            </div>
            <p className="mb-[16px] mt-[40px] text-font19 text-[#77787B]">
              Success Story: Real-World Example{" "}
            </p>
            <p className="mb-[16px]   text-font19 text-[#77787B]">
              Sweet & Simple, a local bakery, shared fun Instagram Reels. They
              featured “a day in the bakery” and customer celebrations. Result:
              25% more weekly orders and 70% of new followers gained in 3
              months.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContentSectiontwo;
