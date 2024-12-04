"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { logos } from "@/public/assets/assets";

const LogoSwiper = () => {
  console.log(logos);
  return (
    <div className="bg-bglight py-3">
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}>
        {logos.map((logo, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center">
              <img src={logo.src} alt={logo.alt} className="mx-auto object-contain" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LogoSwiper;
