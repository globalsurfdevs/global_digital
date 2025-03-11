"use client";

import React, { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import { Platformsdata } from "../../data/services/ppc-advertising/platforms";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
interface PlatformsItem {
  id: number;
  image: string;
}

interface PlatformsSectionProps {
  Platformsdata: PlatformsItem[];
}

const PlatformSwiper: React.FC<PlatformsSectionProps> = ({ Platformsdata}) => {

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
       <div className=" testimonialswiper tesmnialswiper">
       <Swiper
            className="align-center"
          loop={true}
                  freeMode={true}

                  cssMode={false}
                  slidesPerView="auto"
                  speed={5000}
                  grabCursor={true}
                  // loopAdditionalSlides={2}

        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            spaceBetween: 30,
          },
          768: {
            spaceBetween: 70,
          },
          1024: {
            spaceBetween: 80,
          },
          1366: {
            spaceBetween: 130,
          }
        }}
      >
        {Platformsdata.map((item, index) => (
         <SwiperSlide key={index} className="">
         <div className="">
           <Image src={item.image} alt="image" className="" />
         </div>
       </SwiperSlide>
        ))}
      </Swiper>

      </div>
      </div>
      </>
  );
};

export default PlatformSwiper;
