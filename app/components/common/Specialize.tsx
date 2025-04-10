"use client";
import React from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { assets } from "@/public/assets/assets";
interface FrameworkItem {
  id: number;
  title: string;
  icon?: string | StaticImageData;
}

interface FrameworkSectionProps {
  title: string;
  bgcolor?: string;
  description?: string;
  colcount?: number;
  data: FrameworkItem[];
}

const Specialize: React.FC<FrameworkSectionProps> = ({
  title,
  data,
  description,
  bgcolor,
  colcount,
}) => {
  return (
    <div className={` ${bgcolor ? `${bgcolor}` : "bg-dgray"}`}>
      <div className="container mx-auto py-4">
        <div className="flex flex-col py-[50px] lg:py-[111px] ">
          <div className="text-4xl">
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
              <div>
                <h2 className="title-65 pb-6 text-white lg:pb-[60px] ">
                  {title}
                </h2>
                <div
                  className={`grid grid-cols-1 gap-6 text-white  md:grid-cols-2 lg:gap-10 xl:grid-cols-${colcount ? `${colcount}` : "3"}`}
                >

                  {data.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-[#191919] p-5 lg:p-10 group cursor-pointer">
                      <Image
                        src={item.icon || assets.seo}
                        alt="SEO"
                        className="brightness-0 invert-[1] group-hover:brightness-[1] group-hover:invert-[0] transition-all duration-300"
                      />
                      <p className="text-30 group-hover:text-primary transition-all duration-300">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialize;
