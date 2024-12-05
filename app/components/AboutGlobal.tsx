import React from "react";

const AboutGlobal = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col gap-8 py-6 md:py-24 border-b  mb-5">
        <h1 className="text-4xl md:text-6xl leading-tight">
          Hello<span className="text-red-600">!</span>
        </h1>
        <h3 className="text-xl max-w-[30ch]">We’re Global Surf Digital, a full-service digital marketing agency in Dubai, specializing in data-driven strategies, creative innovation, and business-focused solutions.</h3>
        <button
          className="relative border-transparent border w-fit p-0 pb-3 flex gap-1 items-center border-t-0 border-l-0 border-r-0 flex gap-3 hover:border-b-white group
        before:absolute before:bottom-0 before:left-0 before:h-[1px] before:bg-black before:w-full before:transition-all before:duration-300 before:ease-in-out z-2 
          after:absolute after:bottom-0 after:right-0 after:h-[1px] after:bg-orange-500 after:w-full after:transition-all after:duration-300 after:ease-in-out hover:after:w-0 z-1
        ">
          <h5 className="text-sm font-bold group-hover:text-primary ease-in-out duration-200">ABOUT GS.DIGITAL</h5>
          <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-125 ease-in-out duration-200 ">
            <g clipPath="url(#clip0_65_58)">
              <path d="M18.7892 1.2749L0.699219 19.0149" stroke="#E53F30" strokeWidth="3" strokeMiterlimit="10" className="group-hover:stroke-black" />
              <path d="M0.699219 1.2749H18.7892V18.6649" stroke="#E53F30" strokeWidth="3" strokeMiterlimit="10" className="group-hover:stroke-black" />
            </g>
            <defs>
              <clipPath id="clip0_65_58">
                <rect width="19.79" height="19.45" fill="white" transform="translate(0 0.274902)" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AboutGlobal;
