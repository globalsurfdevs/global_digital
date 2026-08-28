"use client";

// import { servicesData } from "@/app/data/services/branding-and-positioning-agency-in-dubai/data";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";
import { toSentenceCase } from "@/app/helpers/maintainProperWordings";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface ServicesSecProps {
  title: string;
  description: string;
  items: {
    _id: string;
    title: string;
    image: string | StaticImageData;
    imageAlt: string;
    link: string;
  }[];
}

const WhatsIncluded = ({ title, description, items }: ServicesSecProps) => {
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
          <div ref={leftRef}>
            <div className="mb-4 flex items-center gap-3 md:mb-6 xl:mb-8 xxl:mb-12">
              <motion.p
                variants={moveUp(0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-18 flex items-center uppercase leading-[1.5] text-muted"
              >
                {title}
                <span className="ml-2 inline-block h-4 w-4  bg-primary" />
              </motion.p>
            </div>
            <motion.h2
              variants={moveUp(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="title-60 text-[length:var(--text-60-sm)] tracking-[-0.025em]"
            >
              {description}
            </motion.h2>
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
                  className="-mb-px -mr-px rounded-[10px] border border-black/20 hover:bg-primary/15"
                >
                  {service.link ? (
                    <Link
                      href={service.link}
                      className="block h-full w-full cursor-pointer p-4 md:p-5 xl:p-8 xxl:p-10"
                    >
                      <div className="flex items-center gap-2 xl:gap-4 3xl:gap-[26px]">
                        <div className="border-primary/12 w-50 h-50 flex shrink-0 items-center justify-center rounded-[7px] border bg-primary/5 p-3 xl:h-[100px] xl:w-[100px]">
                          <Image
                            src={service.image}
                            alt={service.imageAlt}
                            width={70}
                            height={70}
                            className="h-10 w-10 object-contain xl:h-auto xl:w-auto xxl:h-[70px] xxl:w-[70px]"
                          />
                        </div>
                        <h3 className="text-28 leading-[1.2142] tracking-[-0.025em]">
                          {service.title}
                        </h3>
                      </div>
                    </Link>
                  ) : (
                    <div className="p-4 md:p-5 xl:p-8 xxl:p-10 xxl:pb-[70px]">
                      <div className="mb-3 flex items-center gap-2 md:mb-4 xl:mb-5 xl:gap-4 xxl:mb-[30px] 3xl:gap-[26px]">
                        <div className="border-primary/12 w-50 h-50 flex shrink-0 items-center justify-center rounded-[7px] border bg-primary/5 p-3 xl:h-[100px] xl:w-[100px]">
                          <Image
                            src={service.image}
                            alt={service.imageAlt}
                            width={70}
                            height={70}
                            className="h-10 w-10 object-contain xl:h-auto xl:w-auto xxl:h-[70px] xxl:w-[70px]"
                          />
                        </div>
                        <h3 className="text-28 cursor-default leading-[1.2142] tracking-[-0.025em]">
                          {service.title}
                        </h3>
                      </div>
                      {/* <p className="text-14 md:text-16 xxl:text-20 fnt-lexend leading-[1.444444444444444] text-[#77787B] xl:text-[length:var(--text-18-sm)]">
                        {toSentenceCase(service.description)}
                      </p> */}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsIncluded;
