"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ExpertiseItem {
  id: number;
  icon?: string | StaticImageData;
  title: string;
  subttle?: string;
  desc?: string;
  url?: string;
  hoverImg?: string | StaticImageData;
  /** ✅ Force number instead of icon, even if icon exists */
  showNumberInsteadOfIcon?: boolean;
}

interface ExpertiseSectionProps {
  title: string;
  colnum?: number;
  maxchwidth?: number;
  data: ExpertiseItem[];
  subttle?: string;
}

/** ✅ Helper: allow <br> or \n in title/subttle */
const renderWithBreaks = (text?: string) => {
  if (!text) return null;

  const parts = text.split(/<br\s*\/?>|\n/);

  return parts.map((part, idx) => (
    <React.Fragment key={idx}>
      {part}
      {idx < parts.length - 1 && <br />}
    </React.Fragment>
  ));
};

const NumberHovImg: React.FC<ExpertiseSectionProps> = ({
  title,
  data,
  colnum,
  subttle,
  maxchwidth,
}) => {
  return (
    <section className="bg-[#F2F2F2]">
    <div className="container mx-auto py-4 ">
      <div className="padding0 flex flex-col pb-[50px] pt-[50px] lg:pb-[150px] lg:pt-[136px]">
        {/* Heading */}
        <div className="mb-5 lg:mb-[56px]">
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
            <h2
              className="title-65"
              style={{ maxWidth: maxchwidth ? `${maxchwidth}ch` : undefined }}
            >
              {renderWithBreaks(title)}
            </h2>
            {subttle && (
              <p className="text-19 fnt-lexend font-400 mt-6 text-[#77787B] lg:mt-[30px] lg:max-w-[96ch]">
                {renderWithBreaks(subttle)}
              </p>
            )}
          </motion.div>
        </div>

        {/* Grid */}
        <div>
          <motion.div
            className={`grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-0 ${
              colnum ? `xxl:grid-cols-${colnum}` : "xxl:grid-cols-4"
            }`}
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
            {data.map((expertise, index) => {
              const shouldShowNumber =
                expertise.showNumberInsteadOfIcon || !expertise.icon;

             const CardContent = (
  <div
    className={`group relative flex flex-col justify-between gap-3 overflow-hidden border p-5 transition-all duration-500 h-[200px] md:h-[300px] lg:h-[340px] lg:gap-0 lg:p-10 xl:h-[414px] ${
      expertise.url ? "cursor-pointer" : ""
    }`}
  >
    {/* Hover background image */}
    {expertise.hoverImg && (
      <Image
        src={expertise.hoverImg}
        alt="Hover Background"
        fill
        className="absolute left-0 top-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
      />
    )}

    {/* Default background */}
    <div className="absolute left-0 top-0 h-full w-full bg-[#F2F2F2] transition-colors duration-500 group-hover:bg-transparent z-0" />

    {/* Content wrapper – always on top */}
    <div className="relative z-10 flex h-full flex-col justify-between gap-3 lg:gap-0">
      {/* Icon / Number */}
      <div className="items-center flex h-[30px] w-[30px] md:h-[50px] md:w-[50px] justify-center bg-primary transition-colors duration-500 group-hover:bg-white">
        {shouldShowNumber ? (
          <p className="text-30 text-white group-hover:text-primary transition-transform duration-500 p-0 m-0 ">
            {index + 1 < 9 ? `0${index + 1}` : index + 1}
          </p>
        ) : (
          <Image
            src={expertise.icon as string | StaticImageData}
            alt={expertise.title}
            className="fltrcls transition duration-500 group-hover:invert-0"
          />
        )}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-30 titlesp transition-colors duration-300 group-hover:text-white">
          {expertise.title}
        </h3>

        <div className="overflow-hidden">
          <p
            className="text-19 fnt-lexend cntsmd hided-content max-h-0 w-[102%] overflow-hidden pt-2 text-white opacity-0
            transition-all duration-500 group-hover:max-h-[15rem] group-hover:opacity-100"
          >
            {expertise.desc}
          </p>
        </div>
      </div>
    </div>
  </div>
);


              return (
                <div key={expertise.id}>
                  {expertise.url ? (
                    <Link href={expertise.url}>{CardContent}</Link>
                  ) : (
                    CardContent
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default NumberHovImg;
