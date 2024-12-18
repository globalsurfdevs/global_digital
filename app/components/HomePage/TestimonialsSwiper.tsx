"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination"
import { testimonials } from "../../data/testimonials";
import Image from "next/image";
import {Lexend} from "next/font/google";
const lexend = Lexend({subsets: ['latin'] ,weight:["300","400","500","600","700"] });

const TestimonialsSwiper = () => {
  return (
    <div className=" testimonialswiper">
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
          <SwiperSlide key={index}
          className="mb-2  md:mb-4  lg:mb-8" >
            <div className={`flex flex-col  ${lexend.className}`}>
              <div className="flex flex-col   border-b border-black pt-[20px] lg:pt-[65px] mb-[41px]">
                <Image src={item.image} alt="image" className="w-20 h-20 bg-white p-1 mb-[30px]"></Image>
                <h3 className="mb-[5px]  text-30">{item.name}</h3>
                <h5 className="text-font16 text-gray1 leading-lh2p3 flex gap-1 mb-2">
                  {item.position} - <p className="font-bold">{item.company}</p>
                </h5>
                <Image src={item.logo} alt="image" className="mb-[26px]"  ></Image>
              </div>
              <div className=" flex justify-center items-center">
                <p className="text-gray-400 text-19">{item.message}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialsSwiper;
