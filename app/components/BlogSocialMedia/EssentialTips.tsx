'use client'
import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface PlatformDetail {
    platform: string;
    duration: string;
    icon: StaticImageData;
    title ?: string;
}

interface Tip {
  no: number;
  tip: string;
  keyDetails: string;
  image?: StaticImageData; 
  keyDetailsList?: string[];
  keyDetailsList2?: PlatformDetail[]; // Use the new structured type
  keyDetailsList3?: string[];
}

interface VideoTipsSectionProps {
  tipsData: Tip[]; // This is the array of all 10 tips
  title: string;
}

const VideoTipsSection: React.FC<VideoTipsSectionProps> = ({ tipsData ,title}) => {


    return (
      <section className="">
        <div className="container mx-auto ">
          {/* Main Grid Structure */}
          <div className="grid grid-cols-1 xl:grid-cols-7 py-[50px] lg:py-[140px]">
            {/* Empty Space/Image Column (col-span-2) */}
            <div className="col-span-2 mb-8 xl:mb-0">
             
            </div>
            
            {/* Content Column (col-span-5) */}
            <div className="col-span-5 w-full space-y-10">
              <h2 className="title-65 lg:max-w-[1000px]">
                {title}
              </h2>
              
              {tipsData.map((tip) => (
                    <div
                      key={tip.no}
                      className=""
                    >
                      {/* Tip Header (Number and Title) */}
                      <div className="flex items-start mt-[40px] mb-[20px]">
                        <span className="text-30  mr-4 ">
                          {tip.no}.
                        </span>
                        <h3 className="text-30">
                          {tip.tip}
                        </h3>
                      </div>
                      
                      {/* Image (Conditional Rendering) */}
                      {tip.image && (
                        <div className="w-full mb-[20px] ">
                            <Image 
                              src={tip.image} 
                              alt={tip.tip} 
                              width={600} 
                              height={350} 
                             
                              className="w-full h-full object-cover"
                            />
                        </div>
                      )}
                      
                      {/* Key Details - Conditional Rendering for List or Paragraph/Grid */}
                      <div className="">
                          
                          {/* 1. Show keyDetails as a paragraph (Introductory text for the section) */}
                          {tip.keyDetails && tip.keyDetails.length > 0 && (
                            <p className="mb-3 text-font19 text-[#77787B] font-regular">{tip.keyDetails}</p>
                          )}

                          {/* 2. Show the DYNAMIC GRID (using keyDetailsList2 for Tip 4) */}
                          {tip.keyDetailsList2 && tip.keyDetailsList2.length > 0 && (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-5'>
                                {/* MAPPING: Directly use the structured object data */}
                                {tip.keyDetailsList2.map((data, index) => (
                                    <div key={index} className='flex flex-col '>
                                        <div className='flex items-center gap-[20px]'>
                                            {/* Icon is now a direct property of the data object */}
                                            <Image src={data.icon} alt={data.platform} width={40} height={40} />
                                            <p className='text-[25px] '>{data.platform}</p>
                                        </div>
                                        <div className='border-b border-gray-200 dark:border-gray-700 my-3'></div>
                                        <p className='text-font19 text-[#77787B] font-regular'>{data.duration}</p>
                                    </div>
                                ))}
                            </div>
                          )}

                          {/* 3. Show the bulleted list (using keyDetailsList for Tip 10) */}
                          {tip.keyDetailsList && tip.keyDetailsList.length > 0 ? (
                            <ul className="list-disc list-inside space-y-2 mt-3">
                              {tip.keyDetailsList.map((detail, index) => (
                                <li className='text-font19 text-[#77787B] font-regular'  
                                  key={index} 
                                  dangerouslySetInnerHTML={{ __html: detail.replace(/\*\*(.*?)\*\*/g, '') }} 
                                />
                              ))}
                            </ul>
                            
                          ) : null}
                          {tip.keyDetailsList3 && tip.keyDetailsList3.length > 0 ? (
                            <p className='text-font19 text-[#77787B] font-regular mt-[30px]'>{tip.keyDetailsList3}</p>
                          ) : null}
                      </div>
                    </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
};

export default VideoTipsSection;