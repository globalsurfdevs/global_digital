"use client";
import React, { useEffect, useRef } from "react";
import { services } from "../data/services";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurServices = () => {
  const serviceRefs = useRef([]);

  useEffect(() => {
    serviceRefs.current.forEach((item) => {
      const srvImg = item.querySelector(".srv-im img");
      const cntntblc = item.querySelector(".cntntblc");

      gsap.fromTo(
        cntntblc,
        { opacity: 0, x: 50, skewX: 35 },
        {
          opacity: 1,
          x: 0,
          skewX: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom center",
            scrub: true,
            once: true,
          },
        }
      );

      gsap.fromTo(
        srvImg,
        { x: 200, opacity: 0.5 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: item,
            start: "top center",
            end: "bottom center",
            scrub: true,
            once: true,
          },
          duration: 1,
          delay: 1,
        }
      );
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-5 xl:gap-16">
      {/* Section Heading */}
      <div className="xl:mb-8 flex gap-2 items-center">
        <h2 className="text-3xl font-[400]">OUR SERVICES</h2>
        <div className="bg-primary size-5"></div>
      </div>

      {/* Services */}
      {services.map((service, index) => (
        <div 
          ref={el => serviceRefs.current[index] = el}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-16 srv-item" 
          key={service.id}
        >
          {/* Rest of your existing JSX */}
        </div>
      ))}
    </div>
  );
};

export default OurServices;