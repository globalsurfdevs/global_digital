"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import aboutbnnr from "@/public/assets/aboutus/banner-aboutus.jpg";

const SectionTwo = () => {
  return (
    <>
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
        {/* <Image src={aboutbnnr} alt="about" className="w-full" /> */}
        <video
          className="  h-[350px] w-full object-cover xl:h-[750px]  "
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/Globalsurf_About_Banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
      <div className="bg-dgray">
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
            <div className="pb-[50px] pt-[50px]  lg:pb-[150px] lg:pt-[139px]">
              <div>
                <h2 className="title-65 mb-3 lg:mb-5 ">Behind the Brand</h2>
              </div>
              <div>
                <p className="fnt-lexend text-19 max-w-[87ch] text-gray1">
                  We are a dedicated team of creative thinkers, strategists, and
                  problem solvers, committed to being your digital growth
                  partner. We believe every purpose-driven brand has a unique
                  story and impactful ideas to share. Our mission is to empower
                  ambitious brands with strategies and expertise to share their
                  vision, connect deeply with their audiences, and drive
                  meaningful change. 
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SectionTwo;
