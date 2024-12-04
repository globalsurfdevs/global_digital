import React from "react";
import { tours } from "../data/tours";
const Tours = () => {
  return (
    <div className="container px-4 mx-auto">
      <div className="py-24 flex flex-col gap-10 border-b">
        <h1 className="text-4xl">Featured Tours</h1>
        <div className="grid grid-cols-2 gap-8">
          {tours.map((tour) => (
            <div className="relative">
              <img src={tour.image} alt={tour.name} />
              <div className="absolute bottom-5 left-5">
                <h3 className="text-white text-font30 leading-lh1p66">{tour.name}</h3>
                <div className="flex gap-2">
                  {tour.services.map((service) => (
                    <h4 className="text-primary">{service}</h4>
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
