'use client'
import Image from "next/image";
import { assets } from "@/public/assets/assets";
const ContentSectiontwo = () => {
    return (
        <section>
            <div className="container mx-auto ">
                <div className="grid grid-cols-1 py-[50px] lg:py-[140px] xl:grid-cols-7   ">
                    <div className="col-span-2  mb-5 xl:mb-0">

                    </div>
                    <div className="col-span-5 w-full ">
                        <h2 className="title-65 mb-[40px]">
                        Why You Might Be Invisible in LLMs 
                        </h2>
                      
                        <div className="grid lg:grid-cols-2 gap-[30px]">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4 ">
                                    <Image src={assets.structure} alt="" className="bg-primary w-[50px] h-[50px] p-2"/>
                                    <h3 className="text-[25px]">Your website lacks structure.</h3>
                                </div>
                                <div className="border-b border-[#000000] my-[40px]"></div>
                                <p className="text-font19 text-[#77787B]   mb-[16px]">Without schema markup or clear entity data, AI models can’t properly understand who you are.</p>
                            </div>
                            <div className="flex flex-col">
                                <div  className="flex items-center gap-4 ">
                                    <Image src={assets.content} alt="" className="bg-primary w-[50px] h-[50px] p-2"/>
                                      <h3 className="text-[25px]">Your content is too generic.</h3>
                                </div>
                                <div className="border-b border-[#000000] my-[40px]"></div>
                                <p className="text-font19  text-[#77787B]    mb-[16px]">Posts like “10 Tips for Better Marketing” don’t build authority. LLMs value depth - detailed insights, credible data, and original thought.</p>
                            </div>
                            <div className="flex flex-col">
                                <div  className="flex items-center gap-4 ">
                                    <Image src={assets.ecosys} alt="" className="bg-primary w-[50px] h-[50px] p-2"/>
                                      <h3 className="text-[25px]">You have no ecosystem mentions.</h3>
                                </div>
                                <div className="border-b border-[#000000] my-[40px]"></div>
                                <p className="text-font19  text-[#77787B]    mb-[16px]">If your brand isn’t cited, reviewed, or discussed outside your own site, AI assumes you lack credibility.</p>
                            </div>
                            <div className="flex flex-col">
                                <div  className="flex items-center gap-4 ">
                                    <Image src={assets.seonew} alt="" className="bg-primary w-[50px] h-[50px] p-2"/>
                                      <h3 className="text-[25px]">Your SEO strategy is outdated.</h3>
                                </div>
                                <div className="border-b border-[#000000] my-[40px]"></div>
                                <p className="text-font19  text-[#77787B]    mb-[16px]">Ranking for “cheap office furniture in Dubai” doesn’t help if AI tools can’t identify what makes you the right choice contextually.</p>
                            </div>
                        </div>
                                           
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ContentSectiontwo
