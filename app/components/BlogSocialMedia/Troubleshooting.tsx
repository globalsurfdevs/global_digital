"use client";
import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

type Issue = {
image?: string | StaticImageData;
icon?: string | StaticImageData;
  title: string;
  description: string;
  title2?: string;
};

type TroubleshootingProps = {
  title: string;
  title2?: string;
  intro?: string[];
  outro?: string;
  gridCols?: number;
  issues: Issue[];
};

const Troubleshooting: React.FC<TroubleshootingProps> = ({
  title,
  intro,
  outro,
  gridCols = 3,
  issues,
}) => {
  return (
    <section>
      <div className="container mx-auto">
        <div className="grid grid-cols-1  xl:grid-cols-7">
          {/* Left column (currently empty, but could be props later) */}
          <div className="col-span-2 mb-5 xl:mb-0"></div>

          <div className="col-span-5 w-full">
            {/* Section Title */}
            <h2 className="title-65 mb-[40px]">{title}</h2>

            {/* Intro Paragraphs */}
            {intro?.map((text, i) => (
              <p key={i} className="mb-2 text-font19 text-[#77787B]">
                {text}
              </p>
            ))}

            {/* Dynamic Grid */}
            <div className={`grid md:grid-cols-2 lg:grid-cols-${gridCols} gap-[60px]`}>
              {issues.map((issue, index) => (
                <div key={index} className="flex flex-col">
                  <div>
                    {issue.image && (
                    <Image
                      src={issue.image}
                      className="w-full h-full"
                      alt={issue.title}
                    />
                  )}
                    </div>
                  {issue.icon && (
                    <div className="bg-primary w-[50px] h-[50px] p-5" >
                    <Image
                      src={issue.icon}
                      className="w-full h-full"
                      alt={issue.title}
                    />
                    </div>
                  )}
                  <h3 className="text-30 mt-[30px]">
  {issue.title.split("\n").map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < issue.title.split("\n").length - 1 && <br />}
    </React.Fragment>
  ))}
</h3>
                  <div className="border-b border-dark my-[20px]"></div>
                  {issue.title2?.trim() && <h3 className="text-30">{issue.title2}</h3>}
                  <p className="text-font19 text-[#77787B]">
                    {issue.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Outro */}
            <p className="text-font19 text-[#77787B] mt-6">{outro}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Troubleshooting;
