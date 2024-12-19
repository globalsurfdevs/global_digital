"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { logos } from "@/public/assets/assets";
import { workSvgs } from "../../data/works";

const WorkSwiper = () => {
  console.log(logos);
  return (
    <div className="mnic">
        <Swiper
        className="!overflow-visible"
        modules={[Autoplay]}
        // autoplay={{
        //   delay: 0,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // }}
        freeMode={true}
        speed={5000} // Slide transition duration (500ms)
        slidesPerView="auto"
        loop={true} // Enable infinite looping
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          400: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 25 },
          1600: { slidesPerView: 4.6, spaceBetween: 60 },
        }}
      >
        {workSvgs.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center group home-st">
              <div className="bg-white me-2 w-fit ease-linear duration-200 min-w-[50px] min-h-[50px] flex items-center justify-center ">
                <img
                  src={item.icon}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="ease-linear duration-200"
                />
              </div>
              <h3 className="text-30 ">{item.text}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WorkSwiper;
