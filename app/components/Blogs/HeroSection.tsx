"use client";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <>
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
          <div className="flex flex-col items-center gap-4 border-b pb-[80px] pt-[20px] sm:pt-[50px] lg:pt-[130px] xl:grid xl:grid-cols-8">
            <div className="h-full w-full text-font80 lg:col-span-2 lg:text-left xl:col-span-3">
              <h1 className="title-80">Blogs</h1>
            </div>
            <div className="flex h-full w-full   items-center pb-0 pt-4   lg:col-span-6 lg:py-4 xl:col-span-5">
              <p className="text-30 text-gray1">
                Perspectives on strategy, creativity, and technology — helping
                brands navigate change and drive measurable growth.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default HeroSection;
