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
              navigation={{
                nextEl: ".custom-next",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
              }}
              className="portfolio-swiper"
            >
              {data?.portfolio?.resultImage1 && (
                <SwiperSlide>
                  <div>
                    <Image
                      src={data.portfolio.resultImage1}
                      alt="image"
                      width={900}
                      height={746}
                      className="h-auto w-full"
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
                      className="h-auto w-full"
                    />
                  </div>
                </SwiperSlide>
              )}

              {data?.portfolio?.resultImage1 && (
                <SwiperSlide>
                  <div>
                    <Image
                      src={"/assets/portfolio/slide3.jpg"}
                      alt="image"
                      width={900}
                      height={746}
                      className="h-auto w-full"
                    />
                  </div>
                </SwiperSlide>
              )}
              {data?.portfolio?.resultImage2 && (
                <SwiperSlide>
                  <div>
                    <Image
                      src={"/assets/portfolio/slide4.jpg"}
                      alt="image"
                      width={900}
                      height={746}
                      className="h-auto w-full"
                    />
                  </div>
                </SwiperSlide>
              )}
            </Swiper>

            {/* CENTER NEXT BUTTON */}
            <button
              className="custom-next md:text-md absolute bottom-0 left-1/2 top-auto 
          z-10 flex h-[50px] 
          w-[50px] -translate-x-1/2 
          -translate-y-1/2 items-center justify-center rounded-full 
          bg-primary text-[13px] 
          text-white 
          shadow-lg transition-all duration-500 
          ease-out

          hover:scale-105 hover:tracking-wider hover:opacity-90
          hover:shadow-[0_0_40px_rgba(0,0,0,0.25)]
          md:top-1/2
          md:h-[105px]
          md:w-[105px]
          "
            >
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
            className="container mx-auto "
          >
            <div className="mt-[20px] h-[300px] lg:h-[70vh] lg:h-max">
              <Image
                src={data?.portfolio.section2BannerImage || ""}
                alt="web-mockup"
                width={1500}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      ) : null}
    </>
  );
};

export default ResultDetails;
