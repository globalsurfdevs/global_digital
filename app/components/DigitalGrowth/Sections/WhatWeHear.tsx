"use client";
import * as React from "react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";
import Button from "../../common/buttons/PrimaryButton";
import { scrollToContact } from "../../HomePage/HeaderWithoutMenu";

gsap.registerPlugin(ScrollTrigger);

interface FrameworkItem {
  id: number;
  title: string;
  desc?: string;
  link?: string;
}

interface ServicesSectionProps {
  title: string;
  colcount?: number;
  description?: string;
  hrcontent?: boolean;
  data: FrameworkItem[];
}


const ArrowIcon = ({ clipId }: { clipId: string }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="group-hover:scale-105"
  >
    <g clipPath={`url(#${clipId})`}>
      <path
        d="M8.88346 1.26172L1.13281 8.8624"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M1.13281 1.26172H8.88346V8.71245"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </g>
    <defs>
      <clipPath id={clipId}>
        <rect width="10" height="10" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const WhatWeHear: React.FC<ServicesSectionProps> = ({
  title,
  colcount = 4,
  description,
  data,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // Group items into rows of 2
  const rows: FrameworkItem[][] = [];
  for (let i = 0; i < data.length; i += 2) {
    rows.push(data.slice(i, i + 2));
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1200px)", () => {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          endTrigger: rightRef.current,
          end: "bottom bottom",
          pin: leftRef.current,
          pinSpacing: false,
          // markers: true, // enable while debugging
        });

        return () => st.kill();
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#F6F6F6] py-[50px] lg:py-[90px]" ref={sectionRef}>
      <div className="container">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_2fr] xl:gap-[100px] 3xl:grid-cols-[658px_859px]">
          {/* LEFT — pinned via GSAP */}
          <div ref={leftRef}>
            <motion.h2
              variants={moveUp(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="title-60 text-[length:var(--text-60-sm)] pb-2"
            >
              {title}
            </motion.h2>
            {description && (
              <motion.p
                variants={moveUp(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-[length:var(--text-18-sm)] fnt-lexend mb-10 pt-4 text-[#77787B] md:pt-6 lg:mb-[60px] xl:pt-14"
              >
                {description}
              </motion.p>
            )}

            <button
              type="button"
              onClick={scrollToContact}
              className="group mt-[40px] flex items-center space-x-2 rounded-full border border-primary px-6 py-2 text-black transition duration-300 ease-in hover:shadow-lg"
            >
              <span className="fnt-lexend text-[14px] uppercase duration-300 ease-in md:text-[16px]">
                Click to fix your marketing challenges
              </span>
              <div className="bg-primary p-1">
                <ArrowIcon clipId="clip-book-call" />
              </div>
            </button>
          </div>

          {/* RIGHT — scrolls, defines pin end */}
          <div ref={rightRef}>
            <div className="flex flex-col">
              {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="group/row relative">
                  <div
                    className={
                      rowIndex === rows.length - 1
                        ? "grid grid-cols-1   pb-0 sm:grid-cols-2"
                        : "grid grid-cols-1  sm:grid-cols-2 "
                    }
                  >
                    {row.map((framework, index) => (
                      <motion.div
                        key={framework.id}
                        variants={moveUp(index * 0.11)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="group relative flex flex-col overflow-hidden rounded-[10px] border border-black/10 pb-[60px] pl-[36px] pr-[36px] pt-[40px]"
                      >
                        <div className="">
                          <h3 className="text-25 pb-3 leading-[34px] text-black lg:pb-[40px]">
                            {framework.title}
                          </h3>
                        </div>
                        <div>
                          <p className="fnt-lexend text-[length:var(--text-18-sm)] font-medium text-gray1">
                            {framework.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeHear;
