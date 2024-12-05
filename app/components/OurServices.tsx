"use client";
import React from "react";
import { services } from "../data/services";

const OurServices = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 flex flex-col gap-5 xl:gap-16">
        <div className="xl:mb-8 flex gap-2 items-center">
          <h2 className="text-3xl font-[400]">OUR SERVICES</h2>
          <div className="bg-primary size-5"></div>
        </div>

        {services.map((service) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-16" key={service.id}>
            <div className="h-full border-b-gray-400 md:order-2">
              <img src={service.image} alt={service.title} className="h-full object-cover" />
            </div>
            <div className="flex justify-between flex-col border-b pb-2">
              <div className="flex flex-col gap-5">
                <h3 className="text-font65 max-w-[14ch] leading-lh1p07">{service.title}</h3>
                <div className="flex flex-col gap-5">
                  <p className="mb-2 text-font25 leading-lh1p4">{service.description}</p>
                  {/* <button className="border-b-primary border w-fit p-0 pb-3 mb-5 flex gap-1 items-center border-t-0 border-l-0 border-r-0 flex gap-3 ">
                    <h5 className="text-font16 font-bold">ABOUT GS.DIGITAL</h5>
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_65_58)">
                        <path d="M18.7892 1.2749L0.699219 19.0149" stroke="#E53F30" strokeWidth="3" strokeMiterlimit="10" />
                        <path d="M0.699219 1.2749H18.7892V18.6649" stroke="#E53F30" strokeWidth="3" strokeMiterlimit="10" />
                      </g>
                      <defs>
                        <clipPath id="clip0_65_58">
                          <rect width="19.79" height="19.45" fill="white" transform="translate(0 0.274902)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button> */}
                  <div className="flex flex-wrap gap-2 mb-5 xl:mb-[4em]">
                    {service.buttonTexts.map((item, index) => (
                      <button className="px-3 py-2 border text-gray-500 rounded-full text-sm font-[500] hover:border-primary hover:text-black ease-in duration-200" key={index}>
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex mb-3">
                <span>0{service.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OurServices;
