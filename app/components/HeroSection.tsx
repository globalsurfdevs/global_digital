import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-black text-white py-24 lg:h-[60vh] xl:h-screen flex items-center">
      <div className="container mx-auto px-4">
        <h1 className="text-font80 leading-lh1p18 font-[400] leading-tight"> Performance Focused <br /> Digital Marketing test </h1>
        <div className="mt-6 ">
          <a href="#"
            className="relative group flex gap-3 w-fit items-center text-white border-b-2 border-transparent pb-[0.5em] hover:text-white hover:border-black transition
          before:absolute before:bottom-0 before:left-0 before:h-[2px] before:bg-white before:w-full before:transition-all before:duration-300 before:ease-in-out z-2 
          after:absolute after:bottom-0 after:right-0 after:h-[2px] after:bg-primary after:w-full after:transition-all after:duration-300 after:ease-in-out hover:after:w-0 z-1">
            SUCCESS STORIES
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-75 group-hover:scale-90 group-hover:translate-y-[-2px] group-hover:translate-x-[2px] ease-in-out duration-300">
              <g clipPath="url(#clip0_65_58)">
                <path d="M18.7892 1.2749L0.699219 19.0149" stroke="#E53F30" strokeWidth="2" strokeMiterlimit="10" />
                <path d="M0.699219 1.2749H18.7892V18.6649" stroke="#E53F30" strokeWidth="2" strokeMiterlimit="10" />
              </g>
              <defs>
                <clipPath id="clip0_65_58">
                  <rect width="19.79" height="19.45" fill="white" transform="translate(0 0.274902)" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
