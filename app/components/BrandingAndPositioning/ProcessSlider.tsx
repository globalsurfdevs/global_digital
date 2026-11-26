
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ServiceItem } from "@/app/(user)/(services)/[slug]/type";

import { motion } from "framer-motion";
import { moveUp } from "../animations/motionVariants";

const MIN_SLIDES_FOR_LOOP = 7;

const ProcessSlider = ({
  data,
  variant,
}: {
  data: ServiceItem["sixthSection"];
  variant?: "dark" | "light";
}) => {
  const { items, subTitle, title } = data;
  const isDark = variant === "dark";

  // Server HTML contains ONE copy of each step. The padding clones (and
  // loop mode) are only added after hydration, so view-source is clean.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const slides = useMemo(() => {
    const n = items.length;
    if (n === 0) return [];
    const copies = ready ? Math.ceil(MIN_SLIDES_FOR_LOOP / n) : 1;
    return Array.from({ length: copies }, (_, copy) =>
      items.map((item, i) => ({
        key: `${copy}-${i}`,
        title: item.title,
        description: item.description,
        num: String(i + 1).padStart(2, "0"),
        clone: copy > 0,
      })),
    ).flat();
  }, [items, ready]);


  if (slides.length === 0) return null;

  return (
    <section className={`py-120 ${isDark ? "bg-black" : "bg-[#F6F6F6]"}`}>
      <div className="container">
        <div className="mb-4 xl:mb-8 xxl:mb-[50px]">
          <div className="mb-4 flex items-center gap-3 md:mb-6 xl:mb-8 xxl:mb-12">
            <motion.p
              variants={moveUp(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-18 uppercase leading-[1] tracking-[-0.025em] text-muted"
            >
              {title}
            </motion.p>
            <div className="h-4 w-4 bg-primary"></div>
          </div>
          <motion.h2
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`title-60 text-[length:var(--text-60-sm)] ${isDark ? "text-white" : ""}`}
            dangerouslySetInnerHTML={{ __html: subTitle }}
          ></motion.h2>
        </div>

        {/* No aria-hidden here: the real <h3>s live inside the slider.
          Only the clone shells are aria-hidden (set per slide below). */}

        <div
      
          className=" process-slider-bleed overflow-hidden"
        
        >
          <Swiper
            key={ready ? "loop" : "static"}
            modules={[Autoplay, Pagination]}
            spaceBetween={32}
            slidesPerView={1.15}
            loop={ready}
            speed={1000}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1.8, spaceBetween: 32 },
              1024: { slidesPerView: 2.1, spaceBetween: 40 },
              1280: { slidesPerView: 3.4, spaceBetween: 48 },
            }}
            pagination={{
              el: ".process-pagination",
              clickable: true,
            }}
            className="!overflow-visible [&_.swiper-slide]:!h-auto [&_.swiper-wrapper]:!items-stretch"
          >
            {slides.map(
              ({ key, title: stepTitle, description, num, clone }) => (
                <SwiperSlide key={key}>
                  {() => {
                    const shell = clone;

                    return (
                      <div
                        className="h-full border-l border-black/20 pb-6 pl-6 md:pb-8 md:pl-8 xl:pb-10 xl:pl-10 xxl:pb-[70px]"
                        aria-hidden={shell || undefined}
                      >
                        <div className="flex gap-3 xl:gap-[20px]">
                          <div className="mb-6 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[7px] border border-[#E63E311F] bg-[#E63E310D] xl:h-20 xl:w-20">
                            <span
                              className="text-28 font-normal text-primary"
                              {...(shell ? { "data-text": num } : {})}
                            >
                              {shell ? null : num}
                            </span>
                          </div>

                          {shell ? (
                            <p
                              className={`clone-text text-28 mb-4 flex max-w-[14ch] items-center leading-[1.2142] tracking-[-0.025em] ${isDark ? "text-white" : ""}`}
                              data-text={stepTitle}
                            />
                          ) : (
                            <h3
                              className={`text-28 mb-4 flex max-w-[14ch] items-center leading-[1.2142] tracking-[-0.025em] ${isDark ? "text-white" : ""}`}
                            >
                              {stepTitle}
                            </h3>
                          )}
                        </div>

                        {shell ? (
                          <p
                            className="clone-text text-14 md:text-16 xxl:text-20 font-lexend leading-[1.444444444444444] text-[#77787B] xl:text-[length:var(--text-18-sm)]"
                            data-text={description}
                          />
                        ) : (
                          <p className="text-14 md:text-16 xxl:text-20 font-lexend leading-[1.444444444444444] text-[#77787B] xl:text-[length:var(--text-18-sm)]">
                            {description}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </SwiperSlide>
              ),
            )}
          </Swiper>
        </div>

        {/* Pagination */}

        <div className="process-pagination mt-10 flex gap-2 md:hidden [&_.swiper-pagination-bullet-active]:bg-primary [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-black/15" />
      </div>
    </section>
  );
};

export default ProcessSlider;
