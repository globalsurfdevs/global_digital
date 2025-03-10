"use client";
import React from "react";
import { motion } from "framer-motion";
interface ServicesItem {
  id: number;
  title: string;
}

interface ServicesSectionProps {
  title: string;
  colcount?: number;
  data: ServicesItem[];
}

const Services: React.FC<ServicesSectionProps> = ({ title, data, colcount }) => {
  return (
    <div className="container mx-auto py-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
        variants={{
          hidden: { opacity: 0, y: 50 }, // Start below and invisible
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" },
          }, // Slide up and fade in
        }}
      >
        <div className={`pt-[50px] lg:pt-[140px] pb-[60px] lg:pb-[150px] grid grid-cols-1  gap-5 lg:gap-10 gap-xl-0  ${colcount ? `xl:grid-cols-${colcount}` : 'xl:grid-cols-6'}`}>
          <div className="col-span-2 text-5xl">
            <h2 className="title-65 pb-2">{title}</h2>
          </div>

          <div className={`w-full  ps-0 xl:ps-12 text-font30 serv-mn ${colcount ? `col-span-${colcount-2}` : 'col-span-4'}`}>

              {data.map((service) => (
              <div key={service.id} className=" border-t last:border-b ">
                <div className="flex py-[15px] lg:py-[34px]  gap-4 md:gap-7  lg:gap-10 group items-center hover:translate-x-2 transition-all duration-300 ease-in-out">
                  <p className="text-gray1 transition-all duration-300 group-hover:text-primary">
                    {String(service.id ).padStart(2, "0")}
                  </p>
                  <div className="consu">
                    <p className="text-30 transition-all duration-300 group-hover:text-primary">
                      {service.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Services;
