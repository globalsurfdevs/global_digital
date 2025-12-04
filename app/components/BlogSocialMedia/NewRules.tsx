'use client'
import React from "react";
import Image, { StaticImageData } from "next/image";

// Extended support allowing <br/> and <strong> inside content strings using React's dangerouslySetInnerHTML
// You must provide sanitized HTML strings in paragraphs, list descriptions, etc.

export interface RuleItem {
  heading: string;
  kicker?: string;
  description?: string; // supports HTML now
  bullets?: string[];   // supports HTML optionally
}

export interface RulesData {
  title: string;
  intro?: string;
  sections: RuleItem[];
}

type NewRulesProps = {
  rules: RulesData;
};

const NewRules: React.FC<NewRulesProps> = ({ rules }) => {
  return (
    <section>
      <div className="container mx-auto py-[50px] lg:py-[140px]">
        <div className="grid grid-cols-1 xl:grid-cols-7 gap-4">
          <div className="col-span-2 mb-5 xl:mb-0"></div>

          <div className="col-span-5 w-full">
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
                          className="text-font19 text-[#77787B] mb-3 max-w-3xl"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewRules;
