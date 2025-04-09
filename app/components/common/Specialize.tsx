"use client";
import React from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
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
                <h2 className="title-65 pb-6 text-white lg:pb-[25px]">
                  {title}
                </h2>
                <div
                  className={`grid grid-cols-1 gap-6 text-white  md:grid-cols-2 lg:gap-10 xl:grid-cols-${colcount ? `${colcount}` : "3"}`}
                >
                  <div className="bg-[#191919] p-8">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/images/solutions/seo.png"
                        alt="SEO"
                        width={50}
                        height={50}
                      />
                      <h3 className="text-[20px] font-bold">SEO</h3>
                    </div>
                  </div>
                  <div>sdsds</div>
                  <div>sdsds</div>
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
