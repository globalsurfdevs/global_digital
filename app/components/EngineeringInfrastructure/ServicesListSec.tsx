"use client";

// import { servicesData } from "@/app/data/services/branding-and-positioning-agency-in-dubai/data";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { moveUp } from "../animations/motionVariants";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface ServicesSecProps {
  title: string;
  description: string;
  items: {
    title: string;
    description: string;
    id: string;
    icon: string | StaticImageData;
    link: string;
  }[];
}

const ServicesListSec = ({ title, description, items }: ServicesSecProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <section className="py-120 bg-[#F5F5F5]">
      <div className="container">
        <div className="">
          <div className="pb-4 md:pb-6 xl:pb-8 xxl:pb-12">
            <div className="mb-4 flex items-center gap-3 md:mb-3 xl:mb-4 xxl:mb-[30px]">
              <motion.p
                variants={moveUp(0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-18 leading-[1.5] text-muted"
              >
                {title}
              </motion.p>
              <div className="h-4 w-4 bg-primary"></div>
            </div>
            <motion.h2
              variants={moveUp(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="title-60 max-w-[20ch] text-[length:var(--text-60-sm)] tracking-[-0.025em]"
            >
              {description}
            </motion.h2>
          </div>

          <div>
            {items.map((service, index) => (
              // <motion.div
              //   key={service.id}
              //   variants={moveUp(index * 0.11)}
              //   initial="hidden"
              //   whileInView="show"
              //   viewport={{ once: true }}
              //   className="border-b border-[#77787B] p-4 md:p-5 xl:p-8 xxl:p-10 xxl:pb-[70px] grid grid-cols-1
              //   xl:grid-cols-[1fr_1.4fr] 3xl:grid-cols-[629px_765px] gap-x-4 3xl:gap-x-[167px]"
              // >
              <motion.div
                key={service.id}
                variants={moveUp(index * 0.11)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative grid grid-cols-1 gap-4 px-2 py-4 transition-colors 
                    duration-300 ease-in-out md:px-3 md:py-5 xl:grid-cols-[1fr_1.4fr] xl:gap-60 xl:py-8 xxl:px-[30px] xxl:py-8 3xl:grid-cols-[629px_765px] 3xl:gap-x-[167px] 3xl:py-[40px]
                  ${hoveredIndex === index ? "bg-[#A3A3A326]" : "bg-transparent"}
                  ${
                    index === 0
                      ? hoveredIndex === 0
                        ? "border-t border-t-transparent"
                        : "border-t border-t-[#77787B]"
                      : ""
                  }
                  ${hoveredIndex === index || hoveredIndex === index + 1 ? "border-b border-b-transparent" : "border-b border-b-[#77787B]"} `}
              >
                {/* <Link
                  href="#"
                  className="absolute inset-0 h-full w-full"
                /> */}

                <div className="flex gap-x-4 gap-y-4 3xl:gap-x-[166px]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[7px] border border-[#E63E311F] bg-primary/5 p-3 xl:h-[60px] xl:w-[60px]">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={40}
                      height={40}
                      className="h-10 w-10 object-contain xl:h-auto xl:w-auto xxl:h-[40px] xxl:w-[40px]"
                    />
                  </div>
                  <h3 className="text-28 leading-[1.2142] tracking-[-0.025em]">
                    {service.title}
                  </h3>
                </div>
                <div className="flex justify-between gap-x-10">
                  <p className="text-14 fnt md:text-16 xxl:text-20 fnt-lexend max-w-[45ch] leading-[1.444444444444444] text-[#77787B] xl:text-[length:var(--text-18-sm)]">
                    {service.description}
                  </p>
                  {/* <div>
                      <Image src="/assets/icons/top-right-arrow.svg" alt={service.title} width={40} height={40} 
                      className={` h-5 w-5 object-contain transition-all duration-300 ease-in-out ${hoveredIndex === index ? "h-[45px] w-auto" : "h-[20px] w-auto"} `} />
                  </div> */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesListSec;
