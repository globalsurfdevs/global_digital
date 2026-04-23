'use client'
import React from "react";
import Image, { StaticImageData } from "next/image";

export interface SubSection {
  sectionSubtitle?: string;
  paragraphs?: string[];
  listItems?: { label: string; description?: string }[];
  paragraphs2?: string[];
  imagesecond?: StaticImageData;
  imagealt?: string;
}

export interface ContentSectionData {
  title: string;
  image?: StaticImageData;
  imagesecond?: StaticImageData;
  imagealt?: string;
  paragraphs3?: string[];
  // top-level single sub-section fields (backward compatible)
  sectionSubtitle?: string;
  paragraphs?: string[];
  listItems?: { label: string; description?: string }[];
  paragraphs2?: string[];
  // repeatable sub-sections
  subSections?: SubSection[];
}

type ContentSectionProps = {
  sections: ContentSectionData[];
};

const renderSubSection = (data: SubSection, idx: number) => (
  <div key={idx}>
    {data.sectionSubtitle && (
      <h3 className="text-30 mt-[30px] mb-3">{data.sectionSubtitle}</h3>
    )}
    {data.imagesecond && (
      <Image src={data.imagesecond} alt={data.imagealt || data.sectionSubtitle || 'Subsection image'} className="my-[20px]" />
    )}

    {data.paragraphs?.map((p, index) => (
      <p
        key={index}
        className="text-font19 text-[#77787B] mb-[16px]"
        dangerouslySetInnerHTML={{ __html: p }}
      />
    ))}

    {data.listItems?.length ? (
      <ul className="list-disc pl-10 mt-3">
        {data.listItems.map((item, index) => (
          <li key={index} className="text-font19 mb-2">
            <span dangerouslySetInnerHTML={{ __html: item.label }} />
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

    {data.paragraphs2?.map((p, index) => (
      <p
        key={index}
        className={`text-font19 text-[#77787B] ${p?.includes('<br') ? '' : 'mt-4'}`}
        dangerouslySetInnerHTML={{ __html: p }}
      />
    ))}
  </div>
);

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

                {data.paragraphs3?.map((p, index) => (
                  <p
                    key={index}
                    className={`text-font19 text-[#77787B] ${p?.includes('<br') ? '' : 'mt-4'}`}
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                ))}

                {/* Backward compatible: render top-level single sub-section */}
                {(data.sectionSubtitle || data.paragraphs || data.listItems || data.paragraphs2) &&
                  renderSubSection({
                    sectionSubtitle: data.sectionSubtitle,
                    paragraphs: data.paragraphs,
                    listItems: data.listItems,
                    paragraphs2: data.paragraphs2,
                  }, -1)
                }

                {/* Repeatable sub-sections */}
                {data.subSections?.map((sub, subIdx) => renderSubSection(sub, subIdx))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default ContentSection;