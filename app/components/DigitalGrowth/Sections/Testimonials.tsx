"use client";
import React from "react";
import TestimonialsSwiper from "../../../components/HomePage/TestimonialsSwiper";
import { motion } from "framer-motion";
import { HomeType } from "@/app/types/home";

interface TestimonialsSectionProps {
  bgcolor?: string;
  bordertop?: boolean;
  data?: HomeType["testimonialSection"];
  topTitle?: string;
  bottomText?: boolean;
  reviews?: boolean;
  page?: string;
}

const Testimonials: React.FC<TestimonialsSectionProps> = ({
  bgcolor,
  bordertop,
  data,
  topTitle,
  bottomText = false,
  reviews = true,
  page
}) => {
  return (
    <div className={` ${bgcolor === "white" ? "bg-white" : "bg-bglight"}`}>
      <div
        className={`container mx-auto px-4  ${bordertop ? " border-t" : ""}`}
      >
        <div className="ptwhite py-16 md:py-20 xl:py-[90px]">
          {topTitle && (
            <div className="mb-4 flex items-center gap-3 md:mb-6 xl:mb-8 xxl:mb-[60px]">
              <div className="h-4 w-4 bg-primary"></div>
              <h3 className="text-28
               uppercase leading-[1] tracking-[-0.025em]  text-muted">
                {topTitle}
              </h3>

            </div>
          )}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
            variants={{
              hidden: { y: 50 }, // Start below and invisible
              visible: { y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
            }}
            className="items-center justify-between gap-3  xl:flex"
          >
            <h2 className="title-60">
              {data?.title ? data.title : "Hear From Our Partners"}
            </h2>
            {reviews && (
              <div className="lg-mt-0 mt-3 flex items-center gap-3">

                <p className="text-19 fnt-lexend font-400 text-[#77787B] lg:w-[700px]">
                  {" "}
                  {data?.starText ? data.starText : "4.9 on Google Reviews"}
                </p>
              </div>
            )}
          </motion.div>

          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
              variants={{
                hidden: { y: 50 }, // Start below and invisible
                visible: {
                  y: 0,
                  transition: { duration: 1.2, ease: "easeOut" },
                }, // Slide up and fade in
              }}
            >
              <TestimonialsSwiper data={data?.items} />
              {bottomText && (
                <div>
                  {!data?.bottomText ? (
                    <p className="font-400   text-font30 text-black">
                      Trusted by{" "}
                      <span className="text-primary">140+ brands</span> across
                      UAE & beyond
                    </p>
                  ) : (
                    <p
                      className="font-400  text-font30 text-black"
                      dangerouslySetInnerHTML={{ __html: data?.bottomText }}
                    ></p>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
