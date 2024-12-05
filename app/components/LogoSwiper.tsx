"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { logos } from "@/public/assets/assets";
import { inherits } from "util";

const LogoSwiper = () => {
  console.log(logos);
  return (
    <div className="bg-bglight py-3 overflow-hidden">
      <div className="container !overflow-visible">
        <Swiper
          className="!overflow-visible"
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={3}
          speed={3000} // Smooth transition speed
          autoplay={{
            delay: 0, // No delay between slides
            disableOnInteraction: false,
            reverseDirection: false, // Slide in one direction
            stopOnLastSlide: false, // Continuous scrolling
          }}
          loop={true}
          freeMode={{
            enabled: true,
            momentum: false,
          }}
          simulateTouch={false}
          allowTouchMove={false}
          watchSlidesProgress={true}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 8,
            },
          }}>
          {logos.map((logo, index) => (
            <SwiperSlide key={index}>
              <div className="">
                <img src={logo.src} alt={logo.alt} className="object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LogoSwiper;
