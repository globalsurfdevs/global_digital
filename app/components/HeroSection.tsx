import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-black text-white h-screen flex items-center">
    <div className="container mx-auto px-4">
  
      <h1 className="text-4xl md:text-6xl font-bold leading-tight">
        Performance Focused <br /> Digital Marketing rahees
      </h1>

        <div className="mt-6">
          <a href="#" className="inline-flex items-center text-primary border-b-2 border-primary pb-1 hover:text-white hover:border-white transition">
            SUCCESS STORIES
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
