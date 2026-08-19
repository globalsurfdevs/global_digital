"use client";

import { StaticImageData } from "next/image";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";
import { toSentenceCase } from "@/app/helpers/maintainProperWordings";
import Link from "next/link";
import Button from "../../common/buttons/PrimaryButton";

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

const ServicesSec = ({ title, description, items }: ServicesSecProps) => {
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

  return (
    <section className="py-120" ref={sectionRef}>
      <div className="container">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_2fr] 3xl:grid-cols-[520px_auto] 3xl:gap-[30px]">
          {/* LEFT — pinned via GSAP */}
          <div ref={leftRef} className="lg:w-3/5">
            <motion.h2
              variants={moveUp(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="title-60 pb-2 text-[length:var(--text-60-sm)]  tracking-[-0.025em]"
            >
              {title}
            </motion.h2>
            {description && (
              <p className="text-19 fnt-lexend pt-4 text-[#77787B] md:pt-6 xl:pt-14">
                {description}
              </p>
            )}
            <div className="flex flex-wrap gap-4 pt-6 lg:pt-[60px]">
              <Button
                className="max-h-[50px] w-[465px]"
                variant="outline"
                href="/contact"
              >
                Click to fix your marketing challenges
              </Button>
            </div>
          </div>

          {/* RIGHT — scrolls, defines pin end */}
          <div ref={rightRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {items.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={moveUp(index * 0.11)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="-mb-px -mr-px rounded-[10px] border border-black/20 p-4 md:p-5 xl:p-8 xxl:p-10 xxl:pb-[70px]"
                >
                  <div className="mb-3 flex items-center gap-2 md:mb-4 xl:mb-5 xl:gap-4 xxl:mb-[30px] 3xl:gap-[26px]">
                    <div className="border-primary/12 w-50 h-50 flex shrink-0 items-center justify-center rounded-[7px] border bg-primary/5 p-3 p-3 xl:h-[100px] xl:w-[100px]">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        width={70}
                        height={70}
                        className="h-10 w-10 object-contain xl:h-auto xl:w-auto xxl:h-[70px] xxl:w-[70px]"
                      />
                    </div>
                    {service.link ? (
                      <Link href={service.link}>
                        <h3 className="text-28 cursor-pointer leading-[1.2142] tracking-[-0.025em]">
                          {service.title}
                        </h3>
                      </Link>
                    ) : (
                      <h3 className="text-28 cursor-default leading-[1.2142] tracking-[-0.025em]">
                        {service.title}
                      </h3>
                    )}
                  </div>
                  <p className="text-14 md:text-16 xl:text-18 xxl:text-20 fnt-lexend leading-[1.444444444444444] text-[#77787B]">
                    {toSentenceCase(service.description)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSec;
