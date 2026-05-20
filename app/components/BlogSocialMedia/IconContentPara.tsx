'use client'
import Image from "next/image";
import { assets } from "@/public/assets/assets";
const ContentSectiontwo = () => {
    return (
        <section>
            <div className="container mx-auto ">
                <div className="grid grid-cols-1 pt-[50px] lg:pt-[140px]   ">
                    <div className="col-span-2  mb-5 xl:mb-0">

                    </div>
                    <div className="col-span-5 w-full ">
                        <h2 className="title-65 mb-[40px]">
                            What Full-Service Digital Marketing Looks Like in Practice
                        </h2>
                        <p className="text-font19 text-[#77787B] my-5 lg:my-[40px]">The BAFCO outcome is a demonstration of what a comprehensive <a href="https://www.globalsurf.ae/" className="text-primary hover:underline">digital marketing service in UAE</a> looks like when all components are managed as a connected system over time, not as isolated monthly campaigns.</p>

                        <div className="grid lg:grid-cols-3 gap-[30px]">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4 ">
                                    <Image src={assets.llmicon1} alt="" className="bg-primary w-[50px] h-[50px] p-2" />
                                    <h3 className="text-[25px]">Paid social (Meta)</h3>
                                </div>
                                <div className="border-b border-[#000000] my-[40px]"></div>
                                <p className="text-font19 text-[#77787B]   mb-[16px]">Audience building, creative testing, and consistent demand generation among the right UAE decision-makers</p>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4 ">
                                    <Image src={assets.llmicon2} alt="" className="bg-primary w-[50px] h-[50px] p-2" />
                                    <h3 className="text-[25px]">Paid search (Google Ads)</h3>
                                </div>
                                <div className="border-b border-[#000000] my-[40px]"></div>
                                <p className="text-font19  text-[#77787B]    mb-[16px]">Intent-matched campaigns, aligned landing pages, and dynamic budget allocation based on live performance data
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4 ">
                                    <Image src={assets.llmicon3} alt="" className="bg-primary w-[50px] h-[50px] p-2" />
                                    <h3 className="text-[25px]">Creative strategy</h3>
                                </div>
                                <div className="border-b border-[#000000] my-[40px]"></div>
                                <p className="text-font19  text-[#77787B]    mb-[16px]">Iterative testing of ad formats, messaging angles, and visual approaches to build genuine performance intelligence</p>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4 ">
                                    <Image src={assets.llicon4} alt="" className="bg-primary w-[50px] h-[50px] p-2" />
                                    <h3 className="text-[25px]">Conversion optimisation</h3>
                                </div>
                                <div className="border-b border-[#000000] my-[40px]"></div>
                                <p className="text-font19  text-[#77787B]    mb-[16px]"> Ensuring the post-click experience supports lead quality and volume, not just traffic delivery</p>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4 ">
                                    <Image src={assets.llicon5} alt="" className="bg-primary w-[50px] h-[50px] p-2" />
                                    <h3 className="text-[25px]">Analytics and reporting</h3>
                                </div>
                                <div className="border-b border-[#000000] my-[40px]"></div>
                                <p className="text-font19  text-[#77787B]    mb-[16px]">Every decision driven by real performance data rather than assumptions or habit</p>
                            </div>

                        </div>
                        <p className="text-font19  text-[#77787B] mt-3 lg:mt-[40px]">As a digital marketing agency in Dubai, we build long-term client relationships because the compounding value of this approach only becomes fully visible over time. Month one looks different to month twelve — and that gap in performance is precisely the point.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ContentSectiontwo
