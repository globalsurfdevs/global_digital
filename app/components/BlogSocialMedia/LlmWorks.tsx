'use client'
import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface PlatformDetail {
    platform: string;
    duration: string;
    icon: StaticImageData;
    title?: string;
    description?: string;
}

interface Tip {
  no: number;
  tip: string;
  keyDetails: string;
  image?: StaticImageData;
  keyDetailsList?: string[];
  keyDetailsList2?: PlatformDetail[];
  keyDetailsList3?: string[];
}

interface VideoTipsSectionProps {
  title: string;
  description?: string;
  columnTitles: string[];
  data: Array<Record<string, string>>;
}

const LlmWorks: React.FC<VideoTipsSectionProps> = ({ title, description, columnTitles, data }) => {
  return (
    <section>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-7 pt-[50px] lg:pt-[140px]">
          {/* Empty Left Space */}
          <div className="col-span-2"></div>

          {/* Content Area */}
          <div className="col-span-5 w-full space-y-10">
            <h2 className="title-65 ">{title}</h2>
            <p className="text-font19 text-[#77787B]">Think of a search engine as a map - it shows roads, routes, and destinations. <br></br>But an LLM works more like a brain - it reads, learns, and communicates in human language. </p>

            {/* SEARCH ENGINE SECTION */}
            <div className="mt-[40px]">
              <h3 className="text-30">Search Engine:</h3>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li className="text-font19 text-[#77787B]">
                  Crawls the web → Finds your site → Lists it on a page.
                </li>
                <li className="text-font19 text-[#77787B]">
                  You compete with SEO, backlinks, and keywords.
                </li>
              </ul>
            </div>

            {/* LLM SECTION */}
            <div className="mt-[40px]">
              <h3 className="text-30">LLM (Like ChatGPT)</h3>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li className="text-font19 text-[#77787B]">
                  Reads your entire digital footprint.
                </li>
                <li className="text-font19 text-[#77787B]">
                  Learns how others describe your brand.
                </li>
                <li className="text-font19 text-[#77787B]">
                  It doesn’t list links — it summarizes what it believes is true.
                </li>
              </ul>
              <p className="text-font19 text-[#000000] mt-4"><strong>That means: </strong></p>
              <p className="text-font19 text-[#77787B]">If your brand isn’t part of the data these models trust, you simply don’t exist in their world. </p>
            </div>

            {/* TABLE SECTION */}
            <div className="border border-gray-200 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#F2F2F2]">
                  <tr>
                    {columnTitles.map((colTitle: string, i: number) => (
                      <th
                        key={i}
                        className={`px-6 py-3 text-left text-font19 font-medium text-dark capitalize tracking-wider ${
                          i < columnTitles.length - 1 ? "border-r border-gray-200" : ""
                        }`}
                      >
                        {colTitle.replace(/_/g, " ")}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((row: Record<string, string>, rowIndex: number) => (
                    <tr key={rowIndex}>
                      {columnTitles.map((col: string, colIndex: number) => (
                        <td
                          key={colIndex}
                          className={`px-6 py-4 ${
                            colIndex < columnTitles.length - 1 ? "border-r border-gray-200" : ""
                          }`}
                        >
                          <div className="text-font19 text-[#77787B] capitalize">
                            {row[col]}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* END TABLE */}
            <p className="text-font19 text-[#77787B]">Think of Google as a map that shows you routes. 
            <br></br>Think of LLMs as guides that interpret the map and tell you what’s best. </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LlmWorks;
