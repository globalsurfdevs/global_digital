'use client'
import React from "react";
import Image, { StaticImageData } from "next/image";


export interface ContentSectionData {
  title: string;
  image?: StaticImageData;
  paragraphs?: string[];
  listItems?: { label: string; description?: string }[];
  paragraphs2?: string[];
}

type ContentSectionProps = {
  sections: ContentSectionData[];
};

const ContentSection: React.FC<ContentSectionProps> = ({ sections }) => {
  return (
    <>
      {sections.map((data, idx) => (
        <section key={idx}>
          <div className="container mx-auto pt-[50px] lg:pt-[140px]">
            <div className="grid grid-cols-1 xl:grid-cols-7 gap-4">
              <div className="col-span-2 mb-5 xl:mb-0"></div>
              <div className="col-span-5 w-full">
                <h2 className="title-65 mb-[40px]">{data.title}</h2>

                {data.image && (
                  <Image src={data.image} alt={data.title} className="my-[40px]" />
                )}

                {data.paragraphs?.map((p, index) => (
                  <p
                    key={index}
                    className="text-font19 text-[#77787B] mb-[16px]"
                  >
                    {p}
                  </p>
                ))}

                {data.listItems?.length ? (
                  <ul className="list-disc pl-10 mt-3">
                    {data.listItems.map((item, index) => (
                      <li key={index} className="text-font19 mb-2">
                        {item.label}{" "}
                        {item.description && (
                          <span className="text-[#77787B]">{item.description}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : null}
                  {data.paragraphs2?.map((p, index) => (
                  <p
                    key={index}
                    className="text-font19 text-[#77787B] mt-4"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default ContentSection;
