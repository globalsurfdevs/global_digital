"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination"
import { testimonials } from "../data/testimonials";
import Image from "next/image";

const TestimonialsSwiper = () => {
  return (
    <div className="">
      <Swiper
        spaceBetween={90}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{
          clickable: true
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}>
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:h-[450px] xl:h-[350px]">
              <div className="flex flex-col gap-4 border-b border-black py-8">
                <Image src={item.image} alt="image" className="w-20 h-20 bg-white p-1"></Image>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <h5 className="text-sm text-gray-500 flex gap-1">
                  {item.position} - <p className="font-bold">{item.company}</p>
                </h5>
              </div>
              <div className="h-1/2 flex justify-center items-center">
                <p className="text-gray-500">{item.message}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialsSwiper;
