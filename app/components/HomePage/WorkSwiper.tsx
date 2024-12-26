"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { workSvgs } from "../../data/works";

const WorkSwiper = () => {
  return (
    <div className="mnic">
      <Swiper
        className="!overflow-visible"
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
          320: { slidesPerView: 2, spaceBetween: 10 },
          400: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 25 },
          1600: { slidesPerView: 4.6, spaceBetween: 60 },
        }}
      >
        {workSvgs.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="home-st   flex items-center">
              <div className="group me-1 flex min-h-[30px] w-fit min-w-[30px] items-center justify-center bg-white duration-200 ease-linear hover:bg-[#E63E31] lg:me-2 lg:min-h-[50px] lg:min-w-[50px]">
                <img
                  src={item.icon}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="w-[18px] duration-200 ease-linear group-hover:invert lg:w-auto"
                />
              </div>
              <h3 className="textslide-30 ">{item.text}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WorkSwiper;
