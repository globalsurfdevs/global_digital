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
          <div className="lg:grid lg:grid-cols-8 items-center border-b lg:pt-[130px] sm:pt-[50px] pt-[20px] pb-[50px] flex flex-col gap-4">
            <div className="text-font80 lg:col-span-8   lg:text-left w-full h-full">
              <h1 className="title-80">About Us</h1>
            </div>
          </div>

          <div className="pb-[50px] lg:pb-[141px]  lg:pt-[139px] pt-[50px] flex flex-col gap-4 lg:gap-[30px]">
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
                <h2 className="title-65 mb-3 lg:mb-5">
                  Dominate the Digital Landscape
                </h2>
              </div>
              <div>
                <p className="text-small-30 text-gray1 max-w-[48ch]">
                  Subheading: Bridging Creativity and Strategy to Enhance Your
                  Brand's Digital Potential 
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default HeroSection;
