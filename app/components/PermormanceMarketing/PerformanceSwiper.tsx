"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { logos } from "@/public/assets/assets";
import { performance } from "../../data/performance";

const PerformanceSwiper = () => {
  console.log(logos);
  return (
    <div className="perf-slide">
        <Swiper
        className="!overflow-visible "
        modules={[Autoplay]}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        freeMode={true}
        speed={5000} // Slide transition duration (500ms)
        slidesPerView="auto"
        loop={true} // Enable infinite looping
        breakpoints={{
          320: { slidesPerView: 2,
            spaceBetween: 15 },
          400: { slidesPerView: 3,
            spaceBetween: 15 },
          640: { slidesPerView: 4,
            spaceBetween: 20 },
          768: { slidesPerView: 4,
            spaceBetween: 20 },
          1024: {
            slidesPerView: 4,
            spaceBetween: 120
          },
        }}
      >
        {performance.map((item, index) => (
          <SwiperSlide key={index}>
              <div className=" ">
                <img
                  src={item.icon}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className=" "
                />
              </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PerformanceSwiper;