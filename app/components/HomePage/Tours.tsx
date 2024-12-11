import React from "react";
import { tours } from "../../data/tours";
import {Lexend} from "next/font/google";
const lexend = Lexend({subsets: ['latin'] ,weight:["300","400","500","600","700"] });

const Tours = () => {
  return (
    <div className="container px-4 mx-auto">
      <div className="py-6 lg:py-12 xl:py-24 flex flex-col gap-10 border-b">
        <h1 className="text-font65">Featured Tours</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {tours.map((tour) => (
            <div className="relative tour-card" key={tour.id}>
              <img src={tour.image} alt={tour.name} className="ease-linear duration-300 w-[100] h-[100]" />
              <div className="absolute bottom-5 left-5 z-10">
                <h3 className="text-white text-font30 leading-lh1p66">{tour.name}</h3>
                <div className="flex gap-2">
                  {tour.services.map((service,index) => (
                    <h4 className={`text-primary ${lexend.className}`} key={index}>{service}</h4>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center">
          <button className="border py-3 px-24 rounded-full">VIEW ALL</button>
        </div>
      </div>
    </div>
  );
};

export default Tours;
