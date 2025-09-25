'use client';
import React from 'react';

export interface ListingSectionData {
  title: string;
  subtitle?: string;
  bulletPoints?: string[];
  listItems?: string[];
  description?: string;
}

type ListingSectionProps = {
  data: ListingSectionData; // now required since you pass it explicitly
};

const ListingSection: React.FC<ListingSectionProps> = ({ data }) => {
  return (
    <section>
      <div className="container mx-auto pt-[50px] lg:pt-[140px]">
        <div className="grid grid-cols-1 xl:grid-cols-7">
          {/* Left column (empty for now, could accept image/text as prop later) */}
          <div className="col-span-2 mb-5 xl:mb-0"></div>

          <div className="col-span-5 w-full">
            {/* Section Title (required) */}
            <h2 className="title-65 mb-[40px]">{data.title}</h2>

            {/* Subtitle (optional) */}
            {data.subtitle && (
              <h3 className="text-30 mb-[40px] text-[#77787B]">{data.subtitle}</h3>
            )}

            {/* Bullet Points (optional) */}
            {data.bulletPoints && data.bulletPoints.length > 0 && (
  <div className="space-y-3">
    {data.bulletPoints.map((point, index) => (
      <div key={index} className="flex gap-3 items-center">
        <div className="h-[14px] w-[14px] bg-primary"></div>
        <p className="text-font19 text-[#77787B]">{point}</p>
      </div>
    ))}
  </div>
)}
{/* List Items (optional) */}
{data.listItems && data.listItems.length > 0 && (
  <ul className="list-disc list-inside space-y-2 mt-3">
    {data.listItems.map((item, index) => (
      <li key={index} className="text-font19 text-[#77787B]">{item}</li>
    ))}
  </ul>
)}


            {/* Description (optional) */}
            {data.description && (
              <p className="text-font19 text-[#77787B] mt-[30px]">{data.description}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingSection;
