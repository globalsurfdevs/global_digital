"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { ServiceItem } from "@/app/(user)/engineering-and-infrastructure/type";

import { motion } from "framer-motion";
import { moveUp } from "../animations/motionVariants";
import { toSentenceCase } from "@/app/helpers/maintainProperWordings";



// -----------------------------------------------------------------------------
// Slides-per-view helper
// -----------------------------------------------------------------------------

const BREAKPOINTS: [number, number][] = [
  [0, 1.15],
  [640, 1.8],
  [1024, 2.6],
  [1280, 3.5],
];

function getSlidesPerView(width: number) {
  let value = BREAKPOINTS[0][1];

  for (const [minWidth, spv] of BREAKPOINTS) {
    if (width >= minWidth) value = spv;
  }

  return value;
}

const HowWeDo = ({ data }: { data: ServiceItem["howWeDo"] }) => {
  const { items, subTitle, title } = data;

  const [previewIndex, setPreviewIndex] = useState(items.length - 1);
  const [leftIndex, setLeftIndex] = useState(0);
  const [containerLeft, setContainerLeft] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateContainerLeft = () => {
      if (!containerRef.current) return;

      setContainerLeft(containerRef.current.getBoundingClientRect().left);
    };

    updateContainerLeft();

    window.addEventListener("resize", updateContainerLeft);

    return () => {
      window.removeEventListener("resize", updateContainerLeft);
    };
  }, []);

  const updatePreview = (swiper: SwiperType) => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1280;
    const spv = getSlidesPerView(width);

    const nextIndex = Math.ceil(swiper.realIndex + spv - 1) % items.length;

    setPreviewIndex(nextIndex);
    setLeftIndex(swiper.realIndex);
  };

  return (
    <section className="py-120">
      {/* Header */}
      <div className="container" ref={containerRef}>
        <div className="mb-4 xl:mb-8 xxl:mb-[50px]">
          <div className="mb-4 flex items-center gap-3 md:mb-6 xl:mb-8 xxl:mb-12">
            <motion.h3
              variants={moveUp(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-18 uppercase leading-[1] tracking-[-0.025em] text-muted"
            >
              {title}
            </motion.h3>
            <div className="h-4 w-4 bg-primary"></div>
          </div>
          <motion.h2
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="title-60 text-[length:var(--text-60-sm)] max-w-[33ch] mb-4 md:mb-6 xl:mb-8 xxl:mb-10"
            dangerouslySetInnerHTML={{ __html: subTitle }}
          ></motion.h2>
          <p className="text-[length:var(--text-18-sm)] fnt-lexend leading-[1.444444444444444] text-muted mb-4 lg:mb-5 xl:mb-6 xxl:mb-60 max-w-[110ch]">
            {data.description}
          </p>
        </div>
      </div>

      {/* Slider */}
      <div
        className="overflow-hidden pr-3"
        style={{
          marginLeft: `${containerLeft + 15}px`,
        }}
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updatePreview(swiper);
          }}
          onSlideChange={updatePreview}
          onResize={updatePreview}
          spaceBetween={0}
          slidesPerView={1.15}
          loop={true}
          rewind
          speed={1000}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.8,
              // spaceBetween: 32,
            },
            1024: {
              slidesPerView: 2.1,
              // spaceBetween: 40,
            },
            1280: {
              slidesPerView: 3.4,
              // spaceBetween: 48,
            },
          }}
          pagination={{
            el: ".process-pagination",
            clickable: true,
          }}
          className="!overflow-visible [&_.swiper-slide]:!h-auto [&_.swiper-wrapper]:!items-stretch"
        >
          {[...items, ...items].map((item, i) => (
            <SwiperSlide key={i} className="h-auto">
              <div className={`h-full ${i === leftIndex ? "" : ""} border border-black/20 rounded-[10px] p-4 xl:p-8 xxl:p-10 -mr-px`} >
                <div className="flex gap-3 xl:gap-[20px]">
                  <div className="mb-6 xl:mb-[30px] inline-flex h-14 w-14 items-center justify-center rounded-[7px] border border-[#E63E311F] bg-[#E63E310D] xl:h-20 xl:w-20 xxl:h-25 xxl:w-25">
                    {/* <span className="text-28 font-normal text-primary">
                      {i < 10 ? `0${i + 1}` : i + 1}
                    </span> */}
                    <Image src={item.image} alt={item.imageAlt} width={100} height={100} className="object-contain w-6 h-6 xl:h-10 xl:w-10 xxl:h-[60px] xxl:w-[60px]" />
                  </div>
                  <h3 className="text-28 mb-4 max-w-[18ch] leading-[1.2142] tracking-[-0.025em]">
                    {item.title}
                  </h3>
                </div>

                <p className="text-14 md:text-16 xl:text-[length:var(--text-18-sm)] xxl:text-20 fnt-lexend leading-[1.444444444444444] text-[#77787B]">
                  {toSentenceCase(item.description)}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Pagination */}
      <div className="container">
        <div className="process-pagination mt-10 flex gap-2 md:hidden [&_.swiper-pagination-bullet-active]:bg-primary [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-black/15" />
      </div>
    </section>
  );
};

export default HowWeDo;
