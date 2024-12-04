"use client"

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { logos } from '@/public/assets/assets';
import { workSvgs } from '../data/works';


const WorkSwiper = () => {
    console.log(logos)
  return (
    <div className="">
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
      }}
    >
      {workSvgs.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="flex justify-center flex-col gap-4">
          <img src={item.icon} alt={item.alt} className="w-7 h-7 bg-white p-1" />
          <h3>{item.text}</h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  )
}

export default WorkSwiper