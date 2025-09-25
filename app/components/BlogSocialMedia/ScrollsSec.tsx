'use client'
import React from 'react';
import Image, { StaticImageData } from 'next/image';

export interface ScrollSectionProps {
  title: string;
  paragraphs?: string[];
  image?: StaticImageData;
  imageAlt?: string;
  
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
  title,
  paragraphs = [],
  image,
  imageAlt = '',
}) => {
  return (
    <section>
      <div className="container mx-auto pt-[50px] lg:pt-[140px]">
        <div className="grid grid-cols-1 xl:grid-cols-7">
          <div className="col-span-2 mb-5 xl:mb-0"></div>
          <div className="col-span-5 w-full">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
              <div className="flex-1 justify-between">
                <h2 className="title-65 mb-[40px] leading-[1.3]">{title}</h2>
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="text-[#77787B] mb-2 text-font19 le">
                    {p}
                  </p>
                ))}
               
              </div>
              {image && (
                <div className="flex-1 lg:h-[553px]">
                  <Image src={image} alt={imageAlt} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollSection;
