import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-black text-white h-screen flex items-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-[400] leading-tight">
          Performance Focused <br /> Digital Marketing
        </h1>

        <div className="mt-6 ">
          <a href="#" className="flex gap-3 w-fit items-center text-white border-b-2 border-primary pb-[0.5em] hover:text-white hover:border-white transition">
            SUCCESS STORIES
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
