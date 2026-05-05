'use client'
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";


export interface StatItem {
    value: string;
    unit: string;
    description: string;
}

export interface SubSection {
    sectionSubtitle?: string;
    paragraphs?: string[];
    listItems?: { label: string; description?: string }[];
    paragraphs2?: string[];
    imagesecond?: StaticImageData;
    imagealt?: string;
    calloutText?: string;
    paragraphs1?: string[];
}

export interface ContentSectionData {
    title: string;
    isTOC?: boolean;
    image?: StaticImageData;
    imagesecond?: StaticImageData;
    imagealt?: string;
    paragraphs3?: string[];
    paragraphs1?: string[];
    sectionSubtitle?: string;
    paragraphs?: string[];
    dividerAfterIndex?: number; /** If true, renders a horizontal divider between every paragraph  */
    listItems?: { label: string; description?: string }[];
    paragraphs2?: string[];
    subSections?: SubSection[];
    calloutText?: string;
    stats?: StatItem[];
}

type ContentSectionProps = {
    sections: ContentSectionData[];
};

const titleToId = (title: string) =>
    title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

const extractTOCLink = (
    paragraph: string,
    sections: ContentSectionData[]
): string | null => {
    const match = paragraph.match(/^\d+[\.\s]\s*(.*)/);
    if (!match) return null;

    const tocText = match[1].trim().toLowerCase().replace(/[^a-z0-9\s]/g, "");

    for (const section of sections) {
        const sectionText = section.title.toLowerCase().replace(/[^a-z0-9\s]/g, "");
        if (
            sectionText.includes(tocText.slice(0, 20)) ||
            tocText.includes(sectionText.slice(0, 20))
        ) {
            return titleToId(section.title);
        }
    }
    return null;
};

const renderSubSection = (data: SubSection, idx: number) => (
    <div key={idx}>
        {data.sectionSubtitle && (
            <h3 className="text-30 mt-[30px] mb-3">{data.sectionSubtitle}</h3>
        )}
        {data.imagesecond && (
            <Image
                src={data.imagesecond}
                alt={data.imagealt || data.sectionSubtitle || "Subsection image"}
                className="my-[20px]"
            />
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
        {data.calloutText && (
            <div className="my-4 bg-[#F2F2F2] p-[30px]">
                <div className="flex gap-2 ">
                    <div className="bg-primary w-[14px] h-[14px] mt-3 "></div>
                    <h3 className="text-30 mt-0 ml-3 lg:ml-[40px]" dangerouslySetInnerHTML={{ __html: data.calloutText }}></h3>
                </div>
            </div>
        )}
        {data.paragraphs2?.map((p, index) => (
            <p
                key={index}
                className={`text-font19 text-[#77787B] ${p?.includes("<br") ? "" : "mt-4"}`}
                dangerouslySetInnerHTML={{ __html: p }}
            />
        ))}
    </div>
);

const ContentSection: React.FC<ContentSectionProps> = ({ sections }) => {
    React.useEffect(() => {
        document.documentElement.style.scrollBehavior = "smooth";
        return () => {
            document.documentElement.style.scrollBehavior = "";
        };
    }, []);

    return (
        <>
            {sections.map((data, idx) => {
                const headingId = titleToId(data.title);

                return (
                    <section key={idx}>
                        <div className="container mx-auto pt-[50px] lg:pt-[140px]">
                            <div className="grid grid-cols-1 xl:grid-cols-7 gap-4">
                                <div className="col-span-2 mb-5 xl:mb-0" />
                                <div className="col-span-5 w-full" id={headingId}>
                                    <h2 className="title-65 mb-[40px]">
                                        {data.title}
                                    </h2>
                                    {data.paragraphs1?.map((p, index) => (
                                        <p
                                            key={index}
                                            className={`text-font19 text-[#77787B] ${p?.includes("<br") ? "" : "mt-4"}`}
                                            dangerouslySetInnerHTML={{ __html: p }}
                                        />
                                    ))}
                                    {data.stats?.length ? (
                                        <div className="bg-[#F2F2F2] p-[30px] mt-[40px]">
                                            <div className="grid grid-cols-3">
                                                {data.stats.map((stat, statIdx) => (
                                                    <div
                                                        key={statIdx}
                                                        className={`
                        ${statIdx === 0 ? "pr-6 border-r border-[#D0D0D0]" : ""}
                        ${statIdx > 0 && statIdx < data.stats!.length - 1 ? "px-6 border-r border-[#D0D0D0]" : ""}
                        ${statIdx === data.stats!.length - 1 ? "pl-6" : ""}
                    `}
                                                    >
                                                        <h3 className="title-65">
                                                            <span dangerouslySetInnerHTML={{ __html: stat.value }} />
                                                            <span className="text-[#E43D30] text-2xl" dangerouslySetInnerHTML={{ __html: stat.unit }} />
                                                        </h3>
                                                        <p
                                                            className="text-font19 text-[#77787B]"
                                                            dangerouslySetInnerHTML={{ __html: stat.description }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : null}
                                    {data.image && (
                                        <Image
                                            src={data.image}
                                            alt={data.title}
                                            className="my-[40px]"
                                        />
                                    )}

                                    {data.paragraphs3?.map((p, index) => (
                                        <p
                                            key={index}
                                            className={`text-font19 text-[#77787B] ${p?.includes("<br") ? "" : "mt-4"}`}
                                            dangerouslySetInnerHTML={{ __html: p }}
                                        />
                                    ))}
                                    {data.imagesecond && (
                                        <Image
                                            src={data.imagesecond}
                                            alt={data.imagealt || ""}
                                            className="my-[40px]"
                                        />
                                    )}

                                    {(data.sectionSubtitle ||
                                        data.paragraphs ||
                                        data.listItems ||
                                        data.paragraphs2) && (
                                            <>
                                                {data.sectionSubtitle && (
                                                    <h3 className="text-30 mt-[30px] mb-3">
                                                        {data.sectionSubtitle}
                                                    </h3>
                                                )}

                                                {data.paragraphs?.map((p, index) => {
                                                    if (data.isTOC) {
                                                        const targetId = extractTOCLink(p, sections);
                                                        if (targetId) {
                                                            return (
                                                                <p key={index} className="text-font19 text-[#77787B] mb-[16px]">
                                                                    <Link href={`#${targetId}`} className="hover:underline hover:text-black transition-colors duration-150">
                                                                        <span dangerouslySetInnerHTML={{ __html: p }} />
                                                                    </Link>
                                                                </p>
                                                            );
                                                        }
                                                    }
                                                    return (
                                                        <React.Fragment key={index}>
                                                            {data.dividerAfterIndex === index && (
                                                                <hr className="border-t border-[#b1aaaab0] my-[25px] lg:my-[50px]" /> 
                                                            //    dividerAfterIndex: draws a horizontal rule before the paragraph at that index
                                                            //    e.g. dividerAfterIndex: 8 draws a line before the 9th paragraph (index 8),
                                                            //    visually separating TOC links from intro paragraphs
                                                            )}
                                                            <p
                                                                className="text-font19 text-[#77787B] mb-[16px]"
                                                                dangerouslySetInnerHTML={{ __html: p }}
                                                            />
                                                        </React.Fragment>
                                                    );
                                                })}

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
                                                        className={`text-font19 text-[#77787B] ${p?.includes("<br") ? "" : "mt-4"}`}
                                                        dangerouslySetInnerHTML={{ __html: p }}
                                                    />
                                                ))}
                                            </>
                                        )}

                                    {data.subSections?.map((sub, subIdx) =>
                                        renderSubSection(sub, subIdx)
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                );
            })}
        </>
    );
};

export default ContentSection;