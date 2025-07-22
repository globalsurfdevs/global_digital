"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css"; 
interface LogoSwiperProps {
  logoSwiper?: {
    icon: string;
    alt: string;
    text: string;
    width: string;
    height: string;
  }[];
}
const LogoSwiper = ({ logoSwiper }: LogoSwiperProps) => { 
  console.log(logoSwiper);
  return (
    <div className="perf-slide">
        <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        freeMode={false}
        speed={5000} // Slide transition duration (500ms)
        slidesPerView={5}
        loop={true} // Enable infinite looping
        breakpoints={{
          320: { slidesPerView: 2,
            spaceBetween: 15 },
          400: { slidesPerView: 2,
            spaceBetween: 15 },
          640: { slidesPerView: 3,
            spaceBetween: 20 },
          768: { slidesPerView: 3,
            spaceBetween: 20 },
          992: {
            slidesPerView: 5,
            spaceBetween: 120
          },
        }}
      >
        {logoSwiper?.map((item, index) => (
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

export default LogoSwiper;
