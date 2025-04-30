"use client";

import React, { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Matslogo } from "./data";
import Image from "next/image";
import { Autoplay } from "swiper/modules";


const LogoSwiper = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
     // Ref for the next container (HTMLDivElement type)
      const nextContainerRef = useRef<HTMLDivElement | null>(null);
      const [divWidth, setDivWidth] = useState("100%");
    useEffect(() => {
        const updateDivWidth = () => {
          if (nextContainerRef.current) {
            // Get the bounding rectangle of the next container
            const containerRect = nextContainerRef.current.getBoundingClientRect();

            // Get the computed style of the next container to retrieve margin values
            const computedStyle = window.getComputedStyle(nextContainerRef.current);

            // Calculate the total width including margins (left + width + right)
            const marginLeft = parseFloat(computedStyle.marginLeft);
              const totalWidth = containerRect.width + marginLeft - 15

            setDivWidth(`${totalWidth}px`);
          }
        };
        // Initial width calculation
        updateDivWidth();

        // Recalculate on window resize
        window.addEventListener("resize", updateDivWidth);

        // Cleanup event listener on unmount
        return () => {
          window.removeEventListener("resize", updateDivWidth);
        };
    }, []); // Empty dependency array ensures this runs once on mount
     const checkWidth = () => {
        if (window.innerWidth < 992) {
          setIsSmallScreen(true);
        } else {
          setIsSmallScreen(false);
        }
      };

      // Run on mount and on resize
      useEffect(() => {
        checkWidth(); // Check width on initial render
        window.addEventListener("resize", checkWidth); // Add event listener

        // Clean up the event listener on unmount
        return () => window.removeEventListener("resize", checkWidth);
      }, []);
  return (
    <>
      <div className='container ' ref={nextContainerRef}>
      <div className="mb-4 mt-6 grid lg:mb-[75px] lg:mt-0"><h2 className="title-65">Marketing Automation Technology Stack</h2></div></div>
   <div style={{ width: isSmallScreen ? '' : divWidth }}    className={`${isSmallScreen ? "container mx-auto py-2" : ""} custom-class ml-auto overflow-hidden`} >
       <div className="swpcs testimonialswiper">
          <Swiper
             className="!overflow-visible logo-swiper"

        loop={true}
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}

        cssMode={false}
        speed={5000}
        grabCursor={true}
        loopAdditionalSlides={2}
        modules={[Autoplay]}
        simulateTouch={false}
            allowTouchMove={false}

        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 2.4,
            spaceBetween: 30
          },
          992: {
            slidesPerView: 2.6,
            spaceBetween: 30
          },
          1200: {
            slidesPerView: 3.4,
            spaceBetween: 80
          },
          1400: {
            slidesPerView: 6.5,
            spaceBetween: 130
          },
        }}
      >
        {Matslogo.map((item, index) => (
          <SwiperSlide key={index} className=" ">
          <div>
                  <Image src={item.src} alt="image" height={50} />
                  </div>

          </SwiperSlide>
        ))}
      </Swiper>
      </div>
      </div>
      </>
  );
};

export default LogoSwiper;


