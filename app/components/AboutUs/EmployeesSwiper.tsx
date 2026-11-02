"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import { Employees } from "../../data/employees";
import Image from "next/image";
import { Autoplay } from "swiper/modules";

const EmployeesSwiper = ({
  data,
}: {
  data: {
    name: string;
    designation: string;
    image: string;
    imageAlt: string;
  }[];
}) => {
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
        const totalWidth = containerRect.width + marginLeft - 15;

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
      <div className="container " ref={nextContainerRef}></div>
      <div
        style={{ width: isSmallScreen ? "" : divWidth }}
        className={`${isSmallScreen ? "container mx-auto py-2" : ""} custom-class ml-auto`}
      >
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
            {data.map((item, index) => (
              <SwiperSlide key={index} className=" ">
                <div>
                  <div className="group w-fit bg-dgray duration-300 ease-in-out hover:bg-primary">
                    <div className="absolute mb-3 p-4 md:px-[40px] md:py-[22px]">
                      <p className="text-30 text-black duration-300  ease-in-out group-hover:text-white">
                        {item.name}
                      </p>
                      <p className="text-19 text-gray1 duration-300  ease-in-out group-hover:text-white">
                        {item.designation}
                      </p>
                    </div>
                    <div className="">
                      <div className="relative top-9 lg:top-7">
                        <Image
                          src={item.image}
                          alt="image"
                          width={600}
                          height={928}
                          className="w-100 h-100"
                        />
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
