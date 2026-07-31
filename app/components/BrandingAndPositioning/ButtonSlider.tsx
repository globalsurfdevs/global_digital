"use client"
import { useEffect, useRef, useState } from "react";
import { industriesData } from "@/app/data/services/branding-and-positioning-agency-in-dubai/data";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from "next/image";
const ButtonSlider = ({data}:any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerLeft, setContainerLeft] = useState(0);
  useEffect(() => {
    const updateContainerLeft = () => {
      if (!containerRef.current) return;

      setContainerLeft(containerRef.current.getBoundingClientRect().left);
    };

    updateContainerLeft();

    window.addEventListener('resize', updateContainerLeft);

    return () => {
      window.removeEventListener('resize', updateContainerLeft);
    };
  }, []);
  return (
   <div>
      <div className="container" ref={containerRef}></div>
      <div style={{ marginLeft: containerLeft }} className="flex flex-wrap items-center gap-6 xl:gap-10 xxl:gap-20 3xl:gap-[100px] px-3">
        {/* Heading */}
        <div className="shrink-0 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <h3 className="text-28 leading-[1] uppercase tracking-[-0.025em] text-muted">
              {data.title}
            </h3>
            <div className="h-5 w-5 bg-primary"></div>
          </div>
        </div>

        {/* Slider */}
        <div className="flex-1 overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={20}
            className="!overflow-visible"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                spaceBetween: 24,
              },
              1280: {
                spaceBetween: 28,
              },
            }}
          >
            {data.items.map((item,index) => (
              <SwiperSlide
                key={index}
                className="!w-auto"
              >
                <button className="px-4 lg:px-6 xl:px-10 py-2 lg:py-4 xl:py-8  rounded-full border border-black/10 whitespace-nowrap flex items-center gap-3">
                  <Image src={item.image} alt={item.imageAlt} width={36} height={36} className="w-5 h-auto xl:w-[36px] object-contain" />
                  <span className="text-28 leading-[1.214285714285714]">{item.title}</span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default ButtonSlider;