"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import garden from "../../../public/images/digital-serv/graden-con-digi.png";
import { StaticImageData } from "next/image";
interface ClientsformsItem {
  id: number;
  image: string | StaticImageData;
  title: string;
  description?: string;
  linkText?: string;
  linkUrl?: string;
  subdesc?: string;
}

interface ClientsformsSectionProps {
  Clientsformsdata: ClientsformsItem[];
  padding?: string; // New padding prop
  title1?: string;
  pt?: string; // New padding-top prop
  pb?: string; // New padding-bottom prop
  subdesc?: string;
}

const Slider: React.FC<ClientsformsSectionProps> = ({
  Clientsformsdata,
  subdesc,

  title1, // Added title1 to destructured props
}) => {
  return (
    <div>
      <div className="container mx-auto pb-[50px] pt-[50px] lg:pb-[100px] lg:pt-[140px]">
        <div className=" ">
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
            <div className="mb-4 mt-6 grid lg:mb-[75px] lg:mt-0">
              {title1 && (
                <h2
                  className="title-65"
                  dangerouslySetInnerHTML={{ __html: title1 }}
                ></h2>
              )}
              <p className="text-19 fnt-lexend mt-6 max-w-[74ch] text-gray1 transition-colors duration-300 group-hover:text-gray-700 lg:mt-[25px]">
                {" "}
                {subdesc}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
          variants={{
            hidden: { opacity: 0, y: 50 }, // Start below and invisible
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.3, ease: "easeOut" },
            }, // Slide up and fade in
          }}
        >
          {Clientsformsdata.map((item) => (
            <div
              key={item.id}
              className="mb-6 flex flex-col items-center gap-7 md:mb-[40px] md:flex-row lg:mb-[75px] lg:gap-12"
            >
              <div className="md:col-6 col-12 mb-4 md:mb-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full"
                />
              </div>
              <div className="md:col-6 col-12">
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-[25px] leading-[28px] lg:max-w-[690px] lg:leading-[38px] xxl:text-[30px]">
                      {item.title}
                    </h3>
                    <p className="fnt-lexend text-19 py-[10px] text-gray1 lg:max-w-[690px] lg:py-[40px]">
                      {item.description}
                    </p>
                  </div>
                  <a
                    href={item.linkUrl}
                    className="group relative z-10 flex w-fit items-center gap-3 border-b-0 border-transparent pb-3
      before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-black before:transition-all before:duration-300
      before:ease-in-out after:absolute after:bottom-0 after:right-0 after:h-[1px] after:w-full after:bg-orange-500 after:transition-all after:duration-300
      after:ease-in-out hover:border-b-white hover:after:w-0"
                  >
                    <p className="text-sm  uppercase   font-medium duration-200 ease-in-out group-hover:text-primary md:text-[16px]">
                      {item.linkText}
                    </p>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="duration-200 ease-in-out group-hover:scale-125"
                    >
                      <g clipPath="url(#clip0_65_58)">
                        <path
                          d="M18.7892 1.2749L0.699219 19.0149"
                          stroke="#E53F30"
                          strokeWidth="3"
                          strokeMiterlimit="10"
                          className="group-hover:stroke-black"
                        />
                        <path
                          d="M0.699219 1.2749H18.7892V18.6649"
                          stroke="#E53F30"
                          strokeWidth="3"
                          strokeMiterlimit="10"
                          className="group-hover:stroke-black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_65_58">
                          <rect
                            width="19.79"
                            height="19.45"
                            fill="white"
                            transform="translate(0 0.274902)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Slider;
