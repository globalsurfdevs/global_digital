'use client'
import React from "react";
import Image, { StaticImageData } from "next/image";

// Extended support allowing <br/> and <strong> inside content strings using React's dangerouslySetInnerHTML
// You must provide sanitized HTML strings in paragraphs, list descriptions, etc.

export interface CalloutBlock {
  label: string;
  text: string;
}
export interface RuleItem {
  heading: string;
  kicker?: string;
  description?: string; // supports HTML now
  bullets?: string[];   // supports HTML optionally
  calloutBlock?: CalloutBlock;
}

export interface RulesData {
  title: string;
  intro?: string;
  sections: RuleItem[];
  calloutBlock?: CalloutBlock;
}

type NewRulesProps = {
  rules: RulesData;
  pt?: string; // custom top padding, e.g. "pt-[80px] lg:pt-[200px]"
  pb?: string; // custom bottom padding, e.g. "pb-[80px] lg:pb-[200px]"
};

const NewRules: React.FC<NewRulesProps> = ({ rules, pt, pb }) => {
  // Build vertical padding class:
  // - If both pt and pb are provided, use them individually (no py)
  // - If only pt is provided, use pt + default bottom
  // - If only pb is provided, use default top + pb
  // - If neither, use default py
  const paddingClass = (() => {
    if (pt && pb) return `${pt} ${pb}`;
    if (pt) return `${pt} pb-[50px] lg:pb-[100px]`;
    if (pb) return `pt-[50px] lg:pt-[100px] ${pb}`;
    return "py-[50px] lg:py-[100px]";
  })();

  return (
    <section>
      <div className={`container mx-auto `}>
        <div className={`grid grid-cols-1 gap-4 ${paddingClass}`}>
          

          <div className="w-full">
            <h2 className="title-65 mb-[40px]">
              {rules.title}
            </h2>

            {rules.intro && (
              <p
                className="text-font19 text-[#77787B]  mb-8"
                dangerouslySetInnerHTML={{ __html: rules.intro }}
              />
            )}

            <div className="space-y-8">
              {rules.sections.map((s, i) => (
                <div key={i}>
                  <div className="flex gap-6 items-start">
                    {/* red square */}
                    <div className="bg-primary w-[14px] h-[14px] mt-4"></div>

                    {/* content */}
                    <div className="flex-1">
                      <h3 className="text-[30px] mb-2">{s.heading}</h3>

                      {/* DESCRIPTION with HTML SUPPORT */}
                      {s.description && (
                        <p
                          className="text-font19 text-[#77787B] mb-3 "
                          dangerouslySetInnerHTML={{ __html: s.description }}
                        />
                      )}

                      {s.kicker && (
                        <p className="text-sm font-medium mb-2">{s.kicker}</p>
                      )}

                      {/* BULLETS with HTML support */}
                      {s.bullets && s.bullets.length > 0 && (
                        <ul className="list-disc pl-6 text-font19 text-[#77787B] space-y-2">
                          {s.bullets.map((b, idx) => (
                            <li
                              key={idx}
                              dangerouslySetInnerHTML={{ __html: b }}
                            />
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* separator except last */}
                  {i !== rules.sections.length - 1 && (
                    <div className="mt-[40px] mb-[40px]">
                      <hr className="border-t border-gray-200" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {rules.calloutBlock && (
              <div className="mt-[40px] bg-[#000000] p-[30px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-primary 
                w-[14px] h-[14px] 
                ">
                  </div>
                  <p
                    className="text-[#77787B] text-font19"
                    dangerouslySetInnerHTML={{ __html: rules.calloutBlock.label }}
                  />
                </div>
                <p
                  className="text-white text-30 leading-[40px] mt-3 lg:mt-[37px]"
                  dangerouslySetInnerHTML={{ __html: rules.calloutBlock.text }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewRules;