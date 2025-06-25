"use client";

import React, { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Employees } from "../../data/employees";
import Image from "next/image";
import { Autoplay } from "swiper/modules";


const EmployeesSwiper = () => {
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
    <div className='container ' ref={nextContainerRef}></div>
   <div style={{ width: isSmallScreen ? '' : divWidth }}    className={`${isSmallScreen ? "container mx-auto py-2" : ""} custom-class ml-auto`} >
       <div className=" testimonialswiper">
      <Swiper
        spaceBetween={5}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.3,
          },
          640: {
            slidesPerView: 2.4,
          },
          992: {
            slidesPerView: 2.6,
          },
          1200: {
            slidesPerView: 3.4,
          },
          1400: {
            slidesPerView: 4.4,
          },
        }}
      >
        {Employees.map((item, index) => (
          <SwiperSlide key={index} className=" ">

            <div>
              <div className="bg-dgray w-fit group hover:bg-primary ease-in-out duration-300">
                <div className="mb-3 p-4 md:px-[40px] md:py-[22px] absolute">
                  <p className="text-black text-30 group-hover:text-white  ease-in-out duration-300">
                  {item.name}
                  </p>
                  <p className="text-19 text-gray1 group-hover:text-white  ease-in-out duration-300">
                  {item.designation}
                  </p>
                </div>
                <div className="">
                <div className="relative lg:top-7 top-9" >
                  <Image src={item.image} alt="image"/>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
      </div>
      </>
  );
};

export default EmployeesSwiper;
