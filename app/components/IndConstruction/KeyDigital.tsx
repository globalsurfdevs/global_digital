"use client";
import * as React from "react";
import { motion } from "framer-motion";

interface FrameworkItem {
  id: number;
  title: string;
  desc?: string; // Fixed typo from `dec` to `desc`
}

interface ServicesSectionProps {
  title: string;
  colcount?: number;
  description?: string;
  hrcontent?: boolean;
  data: FrameworkItem[]; // Added missing `data` prop
}

const KeyServices: React.FC<ServicesSectionProps> = ({
  title,
  colcount = 4,
  description,
  data,
}) => {
  return (
    <div className="container mx-auto py-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" },
          },
        }}
      >
        <div
          className={`grid grid-cols-1 gap-5 pb-[60px] pt-[50px] lg:gap-10 lg:pb-[150px] lg:pt-[140px] xl:grid-cols-${colcount}`}
        >
          <div className="col-span-2 text-5xl">
            <h2 className="title-65 pb-2">{title}</h2>
            {description && (
              <p className="text-19 fnt-lexend max-w-[38ch] pt-4 text-[#77787B] md:pt-6 xl:pt-14">
                {description}
              </p>
            )}
          </div>

          <div
            className={`w-full xl:ps-12 col-span-${Math.max(colcount - 2, 1)}`}
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xxl:grid-cols-2">
              {data.map((framework) => (
                <div
                  key={framework.id}
                  className="group relative flex flex-col overflow-hidden"
                >
                  {/* Animated Red Border */}
                  <div className="relative h-[1px] overflow-hidden rounded-xl bg-black">
                    <div className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"></div>
                  </div>
                  <div className="mb-4 mt-6 flex h-[50px] w-[50px] items-center justify-center bg-primary transition-transform duration-500 lg:mb-8 lg:mt-10">
                    <p className="text-30 text-white transition-transform duration-500">
                      {String(framework.id).padStart(2, "0")}
                    </p>
                  </div>
                  <div className="text-2xl">
                    <h3 className="text-30 pb-3 text-black lg:pb-6">
                      {framework.title}
                    </h3>
                  </div>
                  <div>
                    <p className="fnt-lexend text-19 font-medium text-gray1">
                      {framework.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default KeyServices;
