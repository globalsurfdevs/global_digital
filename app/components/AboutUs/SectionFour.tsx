"use client";
import React from "react";
import { motion } from "framer-motion";
import { About } from "@/app/types/about";
const SectionFour = ({ data }: { data: About["fourthSection"] }) => {
  return (
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
          <div className=" gap-xl-0 grid grid-cols-1 gap-5 pb-[60px] pt-[50px] lg:gap-10 lg:pb-[150px] lg:pt-[140px] xl:grid-cols-7">
            <div className="col-span-2 text-5xl">
              <h2 className="title-65 pb-2">{data.title}</h2>
            </div>

            <div className="serv-mn col-span-5 w-full ps-0 text-font30 xl:ps-12">
              <motion.div
                className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-0 "
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
                {[
                  // {
                  //   title: "Pursuit of Excellence",
                  //   content:
                  //     "We aim for excellence in all that we do, delivering top-quality work, innovative strategies, and impactful results. Our team is dedicated to continuous improvement, staying ahead of industry trends, and maintaining high standards to achieve exceptional outcomes in digital marketing.",
                  // },
                  // {
                  //   title: "Commitment to Integrity",
                  //   content:
                  //     "We operate with honesty, transparency, and ethical values in all our interactions. Building trust is at the core of our work, and we foster long-term relationships rooted in respect, reliability, and accountability with clients, partners, and colleagues.",
                  // },
                  // {
                  //   title: "Fostering Diversity, Equity & Inclusion",
                  //   content:
                  //     "We are committed to creating an inclusive workplace that values diverse perspectives and experiences. We actively promote equal opportunities, challenge systemic barriers, and nurture an environment where every voice is respected and empowered to make meaningful contributions.",
                  // },
                  // {
                  //   title: "Creating Lasting Impact",
                  //   content:
                  //     "We are motivated by the opportunity to create meaningful change. By empowering purpose-driven brands to share their messages and achieve their goals, we focus on driving positive outcomes for our clients, their audiences, and the communities they impact.",
                  // },
                  ...data.items.map((item) => ({
                    content: item.description,
                    ...item,
                  })),
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bdrsm group flex  flex-col border border-gray1  p-5 transition-all duration-500 lg:px-[60px] lg:py-[80px]"
                    style={{
                      borderBottom: index < 2 ? "none" : "1px solid #77787B", // Add bottom border only for first two rows
                      borderRight:
                        index % 2 === 0 ? "none" : "1px solid #77787B", // Add right border for items on the left column
                    }}
                  >
                    <div className="flex gap-3 ">
                      <div className="relative top-1 h-[29px] min-w-[29px] bg-primary"></div>
                      <p className="text-30 text-black">{item.title}</p>
                    </div>
                    <div>
                      <p className="text-19 fnt-lexend pt-5 text-gray1">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionFour;
