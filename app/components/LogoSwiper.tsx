"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { logos } from "@/public/assets/assets";
import { inherits } from "util";

const LogoSwiper = () => {
  console.log(logos);
  return (
    <div className="bg-bglight py-3 overflow-hidden">
      <div className="container ">
        <Swiper className="overflow-inherit" 
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
