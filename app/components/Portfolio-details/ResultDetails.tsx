"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { SuccessStoriesPortfolio } from "../SuccessStories/SuccessStoriesPortfolio";
import { Portfolio } from "@/app/types/Portfolio";
import parse from "html-react-parser";
import LetsTalk from "@/app/components/common/LetsConnect";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const ResultDetails = ({
  data,
}: {
  data: {
    portfolio: Portfolio;
  } | null;
}) => {
 
  return (
    <>
      

     <div className="container mx-auto py-4">

      {data?.portfolio.resultImage1 || data?.portfolio.resultImage2 ? (

      <motion.div
        className="relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.3, ease: "easeOut" },
          },
        }}
      >

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        loop={true}
        slidesPerView={2}
        navigation={{
          nextEl: ".custom-next",
        }}
        className="portfolio-swiper "
      >

      {data?.portfolio?.resultImage1 && (
        <SwiperSlide>
          <div>
            <Image
              src={data.portfolio.resultImage1}
              alt="image"
              width={900}
              height={746}
              className="w-full h-auto"
            />
          </div>
        </SwiperSlide>
      )}

      {data?.portfolio?.resultImage2 && (
        <SwiperSlide>
          <div>
            <Image
              src={data.portfolio.resultImage2}
              alt="image"
              width={900}
              height={746}
              className="w-full h-auto"
            />
          </div>
        </SwiperSlide>
      )}

      {data?.portfolio?.resultImage1 && (
        <SwiperSlide>
          <div>
            <Image
              src={data.portfolio.resultImage1}
              alt="image"
              width={900}
              height={746}
              className="w-full h-auto"
            />
          </div>
        </SwiperSlide>
      )}
      {data?.portfolio?.resultImage2 && (
        <SwiperSlide>
          <div>
            <Image
              src={data.portfolio.resultImage2}
              alt="image"
              width={900}
              height={746}
              className="w-full h-auto"
            />
          </div>
        </SwiperSlide>
      )}

      </Swiper>

      {/* CENTER NEXT BUTTON */}
      <button className="custom-next absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-primary text-white w-[105px] h-[105px] text-md rounded-full flex items-center justify-center shadow-lg">
        NEXT
      </button>

      </motion.div>

      ) : null}

    </div>
 {data?.portfolio.section2BannerImage ? (
              <div className="">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                  variants={{
                    hidden: { opacity: 0, y: 100 }, // Start below and invisible
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 1, ease: "easeOut" },
                    }, // Slide up and fade in
                  }}
                  className="container mx-auto ">
                    <div className="h-[70vh] lg:h-max mt-[20px]">
              <Image src={data?.portfolio.section2BannerImage || ""} alt="web-mockup" width={1500} height={900} className="h-full w-full object-cover" />
                   </div>
                  </motion.div>
              </div>
            ) : null}
      
      
    </>
  );
};

export default ResultDetails;
