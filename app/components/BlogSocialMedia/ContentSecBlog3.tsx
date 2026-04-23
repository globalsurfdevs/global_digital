'use client'
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

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
    isTOC?: boolean;
    image?: StaticImageData;
    imagesecond?: StaticImageData;
    imagealt?: string;
    paragraphs3?: string[];
    sectionSubtitle?: string;
    paragraphs?: string[];
    listItems?: { label: string; description?: string }[];
    paragraphs2?: string[];
    subSections?: SubSection[];
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
                                                                    <Link
                                                                        href={`#${targetId}`}
                                                                        className="hover:underline hover:text-black transition-colors duration-150"
                                                                    >
                                                                        <span dangerouslySetInnerHTML={{ __html: p }} />
                                                                    </Link>
                                                                </p>
                                                            );
                                                        }
                                                    }
                                                    return (
                                                        <p
                                                            key={index}
                                                            className="text-font19 text-[#77787B] mb-[16px]"
                                                            dangerouslySetInnerHTML={{ __html: p }}
                                                        />
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