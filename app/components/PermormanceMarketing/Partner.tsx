"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
type PartnerDataType = {
  item: string;
};

type PartnerListProps = {
  data: PartnerDataType[];
};

const Partner: React.FC<PartnerListProps> = ({ data }) => {
  const [dataIndex, setDataIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataIndex((prev) => {
        const nextIndex = prev == data.length - 1 ? 0 : prev + 1;
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-[50px] bg-dgray  lg:mt-20 ">
      <div className="container mx-auto py-4">
        <div className="flex flex-col gap-[20px] pb-[50px] pt-[50px] lg:gap-[94px] lg:pb-[115px] lg:pt-[110px]">
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
            <div className="border-b border-gray-500 pb-6   lg:pb-8">
              <h2 className="title-65">Why Partner With Us</h2>
            </div>
          </motion.div>
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
            <div className="sm:title-65 relative overflow-hidden text-[1.3rem] font-medium   leading-[1.6] lg:leading-[120px]">
              {/* We turn Data into <span className='text-primary'>Insights</span> */}
              We turn <br className="  md:hidden "></br>
              <span className="text-gray1">
                {data[dataIndex].item
                  .split(" ")
                  .slice(0, data[dataIndex].item.split(" ").length - 1)
                  .toString()
                  .replace(",", " ") + " "}
              </span>
              <AnimatePresence>
                <motion.span
                  key={data[dataIndex].item} // Add a key to make sure the element is treated as a unique component
                  whileInView={{ y: 0 }}
                  exit={{ y: "100%" }}
                  initial={{ y: "-100%" }}
                  className="absolute ml-3 text-primary"
                >
                  {data[dataIndex].item
                    .split(" ")
                    .slice(data[dataIndex].item.split(" ").length - 1)
                    .toString()}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
