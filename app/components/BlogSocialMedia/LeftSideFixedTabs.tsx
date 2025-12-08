"use client";

import React, { useEffect, useState } from "react";

const SECTIONS = [
  { id: "silent-shift", label: "The Silent Shift Happening Right Now" },
  { id: "how-llms-work", label: "How LLMs Work (In Simple Terms)" },
  { id: "invisible-llms", label: "Why You Might Be Invisible in LLMs" },
  { id: "ai-visibility-framework", label: "The 5-Step AI Visibility Framework" },
  { id: "content-llms-read", label: "Content That LLMs Actually Read" },
  { id: "rules-visibility", label: "The New Rules of Visibility" },
  { id: "impact-b2b-b2c", label: "How This Impacts B2B and B2C" },
  { id: "takeaway", label: "The Takeaway" },
  { id: "brand-visibility", label: "Ready to See How Visible Your Brand Is?" },
];

const LeftSideScrollBar = () => {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(
    SECTIONS[0].id
  );

  useEffect(() => {
    const hero = document.getElementById("hero-section");
    const brandVisibility = document.getElementById("brand-visibility");

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollPosition = scrollY + 120; // offset for header

      let showSidebar = true;

      // 1) Hide while still in hero
      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        if (scrollY <= heroBottom - 80) {
          showSidebar = false;
        }
      }

   
      if (brandVisibility) {
        const brandBottom =
          brandVisibility.offsetTop + brandVisibility.offsetHeight;

        // when we reach the author block (which comes right after this),
        // sidebar disappears
        if (scrollPosition >= brandBottom) {
          showSidebar = false;
        }
      }

      setVisible(showSidebar);

      // --- active section logic ---
      let currentId = SECTIONS[0].id;

      SECTIONS.forEach((sec) => {
        const element = document.getElementById(sec.id);
        if (!element) return;

        const sectionTop = element.offsetTop;
        if (sectionTop <= scrollPosition) {
          currentId = sec.id; // last matched wins
        }
      });

      const isBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 2;

      if (isBottom) {
        currentId = SECTIONS[SECTIONS.length - 1].id;
      }

      setActiveSection(currentId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div
      className={`fixed left-[60px] top-[15%] z-[1000]
      transition-all duration-300
      ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      hidden xl:flex flex-col items-start gap-10 max-w-[364px]`}
    >
      <h3 className="text-[30px] font-semibold">Table of Contents</h3>

      <div className="flex flex-col gap-3">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;

          return (
            <p
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`
                text-font19 cursor-pointer transition-all duration-200
                ${
                  isActive
                    ? "border-b-[1px] border-[#E63E31] pb-1"
                    : "text-[#77787B]"
                }
              `}
            >
              {sec.label}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSideScrollBar;
