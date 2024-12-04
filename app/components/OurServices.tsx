"use client";
import React from "react";
import { services } from "../data/services";

const OurServices = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 flex flex-col gap-16">
        <div className="mb-8 flex gap-2 items-center">
          <h2 className="text-2xl font-bold">OUR SERVICES</h2>
          <div className="bg-orange-600 size-5"></div>
          </div>

        {services.map((service,index)=>(
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16" key={index}>
            <div className="flex justify-between flex-col border-b pb-2">
            <div className="flex flex-col gap-5">
              <h3 className="text-4xl">{service.title}</h3>
  
              <div className="flex flex-col gap-5">
                <p className="mb-2">
                {service.description}
  
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.buttonTexts.map((item,index)=>(
                      <button className="px-3 py-2 border text-gray-700 rounded-full text-sm" key={index}>
                      {item.title}
                    </button>
                  ))}
                </div>   
              
              </div>
            </div>
  
            <div className="flex">
                <span>0{index+1}</span>
              </div>
  
            </div>
            
  
            {/* Placeholder for the right-hand side content */}
            <div className="bg-black h-96 border-b-gray-400"></div>
          </div>

        ))}
        
      </div>
    </>
  );
};

export default OurServices;
