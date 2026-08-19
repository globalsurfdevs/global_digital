"use client";
import React from "react";
import { services } from "../../data/services";

const OurServices = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-5 px-4 py-8 lg:py-10 xl:gap-16">
        <div className="flex items-center gap-2 lg:mb-6 xl:mb-8">
          <h2 className="text-3xl font-[400]">OUR SERVICES</h2>
          <div className="size-5 bg-primary"></div>
        </div>

        {services.map((service) => (
          <div
            className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:gap-16"
            key={service.id}
          >
            <div className="h-full border-b-gray-400 lg:order-2">
              <img
                src={service.image}
                alt={service.title}
                className="object-contain md:h-60 lg:h-full xl:w-[100%] xl:object-cover"
              />
            </div>
            <div className="flex flex-col justify-between border-b pb-2">
              <div className="flex flex-col gap-5">
                <h3 className="max-w-[14ch] text-font65 leading-lh1p07">
                  {service.title}
                </h3>
                <div className="flex flex-col gap-5">
                  <p className="mb-2 text-font25 leading-lh1p4">
                    {service.description}
                  </p>
                  {/* <button className="border-b-primary border w-fit p-0 pb-3 mb-5 flex gap-1 items-center border-t-0 border-l-0 border-r-0 flex gap-3 ">
                    <h5 className="text-font16 font-bold">ABOUT GS DIGITAL</h5>
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
                  <div className="mb-5 flex flex-wrap gap-2 xl:mb-[4em]">
                    {service.buttonTexts.map((item, index) => (
                      <button
                        className="rounded-full border px-3 py-2 text-sm font-[500] text-gray-500 duration-200 ease-in hover:border-primary hover:text-black"
                        key={index}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-3 flex">
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
