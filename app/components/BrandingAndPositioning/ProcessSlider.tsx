"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { ServiceItem } from "@/app/(user)/[slug]/type";

import { motion } from "framer-motion";
import { moveUp } from "../animations/motionVariants";


// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------

// export const processSliderData = {
//   subtitle: 'Our Process',
//   title: 'Our Strategic Brand Development Process',
//   items: [
//     {
//       id: '1',
//       number: '01',
//       title: 'Discovery & brand audit',
//       description:
//         "We understand your business, your market, your competitors and your current brand — what's working, what isn't, and where the positioning opportunity sits.",
//     },
//     {
//       id: '2',
//       number: '02',
//       title: 'Positioning strategy',
//       description:
//         'We develop your brand positioning — the territory your brand will occupy, the audience it speaks to most directly, and the key messages that differentiate it.',
//     },
//     {
//       id: '3',
//       number: '03',
//       title: 'Concept development',
//       description:
//         'We develop two to three distinct brand identity concepts, each grounded in the positioning strategy and presented with a written rationale.',
//     },
//     {
//       id: '4',
//       number: '04',
//       title: 'Design execution',
//       description:
//         'The chosen concept is developed into a complete visual identity system — logo variations, colour palette, typography, supporting graphic elements and initial collateral.',
//     },
//     {
//       id: '5',
//       number: '05',
//       title: 'Lorem ipsum dolor',
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
//     },
//     {
//       id: '6',
//       number: '06',
//       title: 'Consectetur adipiscing',
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     },
//     {
//       id: '7',
//       number: '07',
//       title: 'Tempor incididunt',
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
//     },
//     {
//       id: '8',
//       number: '08',
//       title: 'Excepteur sint occaecat',
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     },
//   ],
// };

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

const ProcessSlider = ({ data }: { data: ServiceItem["sixthSection"] }) => {
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
    <section className="py-120 bg-[#F6F6F6]">
      {/* Header */}
      <div className="container" ref={containerRef}>
        <div className="mb-4 xl:mb-8 xxl:mb-12">
          <div className="mb-4 flex items-center gap-2 md:mb-6 xl:mb-8 xxl:mb-12">
            <motion.h3
              variants={moveUp(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-28 uppercase leading-[1] tracking-[-0.025em] text-muted"
            >
              {title}
            </motion.h3>
            <div className="h-5 w-5 bg-primary"></div>
          </div>
          <motion.h2
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="title-60"
            dangerouslySetInnerHTML={{ __html: subTitle }}
          ></motion.h2>
        </div>
      </div>

      {/* Slider */}
      <div
        className="overflow-hidden px-3"
        style={{
          marginLeft: `${containerLeft}px`,
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
          spaceBetween={32}
          slidesPerView={1.15}
          loop={false}
          rewind
          speed={700}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.8,
              spaceBetween: 32,
            },
            1024: {
              slidesPerView: 2.6,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 3.4,
              spaceBetween: 48,
            },
          }}
          pagination={{
            el: ".process-pagination",
            clickable: true,
          }}
          className="!overflow-visible"
        >
          {items.map((item, i) => (
            <SwiperSlide key={i} className="h-auto">
              <div
                className={`h-full ${i === leftIndex ? "" : ""} border-l border-black/20 pl-6  md:pl-8 xl:pl-10`}
              >
                <div className="flex gap-3 xl:gap-[20px]">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-[7px] border border-[#E63E311F] bg-[#E63E310D] xl:h-20 xl:w-20">
                    <span className="text-28 font-normal text-primary">
                      {i < 10 ? `0${i + 1}` : i + 1}
                    </span>
                  </div>

                  <h3 className="mb-4 max-w-[12ch] text-xl font-medium leading-snug md:text-[22px]">
                    {item.title}
                  </h3>
                </div>

                <p className="text-18 font-lexend leading-[1.444444444444444]  text-muted">
                  {item.description}
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

export default ProcessSlider;
