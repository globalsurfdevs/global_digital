'use client'
import React from "react";
import Image, { StaticImageData } from "next/image";

// Extended support allowing <br/> and <strong> inside content strings using React's dangerouslySetInnerHTML
// You must provide sanitized HTML strings in paragraphs, list descriptions, etc.

export interface ContentSectionData {
  title: string;
    subdesc?: string;
  image?: StaticImageData;
  paragraphs?: string[];        // supports HTML including <br /> and <strong>
  listItems?: { label: string; description?: string }[]; // label & description support HTML
  paragraphs2?: string[];  
       // supports HTML
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
                {data.subdesc && (
                    <p className="text-font19 text-[#77787B] mb-[40px]">{data.subdesc}</p>
                )}

                {data.image && (
                  <Image src={data.image} alt={data.title} className="my-[40px]" />
                )}

                {/* Render paragraphs with HTML support */}
                {data.paragraphs?.map((p, index) => (
                  <p
                    key={index}
                    className="text-font19 text-[#77787B] mb-[16px]"
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                ))}

                {/* List items with HTML support */}
                {data.listItems?.length ? (
                  <ul className="list-disc pl-10 mt-3">
                    {data.listItems.map((item, index) => (
                      <li
                        key={index}
                        className="text-font19 mb-2 text-[#77787B]"
                      >
                        <span
                          dangerouslySetInnerHTML={{ __html: item.label }}
                        />
                        {item.description && (
                          <span
                            className="text-[#77787B]"
                            dangerouslySetInnerHTML={{ __html: item.description }}
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* Second paragraph group with HTML */}
                {data.paragraphs2?.map((p, index) => (
                  <p
                    key={index}
                    className="text-font19 text-[#77787B] mt-4 "
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
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