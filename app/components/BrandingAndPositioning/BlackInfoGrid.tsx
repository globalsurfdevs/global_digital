"use client";
import { toSentenceCase } from "@/app/helpers/maintainProperWordings";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
interface FrameworkItem {
  id: number;
  title: string;
  title1?: string;
  icn?: string | StaticImageData;
  dec: string;
  urllink?: string;
}

interface FrameworkSectionProps {
  title1?: string;
  title: string;
  bgcolor?: string;
  description?: string;
  colcount?: number;
  maxchwidth?: number;
  data: FrameworkItem[];
  subTitle: string;
  page?: string;
}

const BlackInfoGrid: React.FC<FrameworkSectionProps> = ({
  title,
  title1,
  data,
  description,
  bgcolor,
  colcount,
  maxchwidth,
  subTitle,
  page,
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const columns = width >= 1280 ? colcount || 4 : width >= 768 ? 2 : 1;

  const rows = [];

  for (let i = 0; i < data.length; i += columns) {
    rows.push(data.slice(i, i + columns));
  }

  return (
    <div className={` ${bgcolor ? `${bgcolor}` : "bg-dgray"}`}>
      <div className="container mx-auto py-4">
        <div className="pd-cus flex flex-col pb-4 pt-8 xl:pb-6 xl:pt-12 xxl:pb-60 xxl:pt-[120px]">
          <div className="mb-4 flex items-center gap-3 md:mb-6 xl:mb-8 xxl:mb-12">
            <h2 className={` ${page === "service" ? "text-18" : "text-30"} uppercase leading-[1.5] text-[#A3A3A3]`}>
              {title}
            </h2>
            <div className={`${page === "service" ? "h-4 w-4" : "h-5 w-5"} bg-primary`}></div>
          </div>
          <div className="grid grid-cols-1 xl:justify-between xl:grid-cols-2">
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
              {title1 && (
                <Link href="">
                  <h2 className="mb-6 border-l-2 border-[#DC0000] pl-5 text-[20px] uppercase text-[#77787B] lg:mb-[79px]">
                    {title1}
                  </h2>
                </Link>
              )}
              {/* {description && (
                <div>
                  <p className="fnt-lexend pb-6 text-font19 font-[500] leading-[1.2] text-gray1 lg:pb-[58px]">
                    {description}
                  </p>
                </div>
              )} */}
              
                <div style={{ maxWidth: `${maxchwidth}ch` }}>
                  <h2
                    className={`${bgcolor === "bg-black" ? "text-white" : "text-black"} title-60 text-[length:var(--text-60-sm)] pb-6 lg:pb-[58px]`}
                  >
                    {subTitle}
                  </h2>
                </div>
              
            </motion.div>
          </div>
          {description && <div className="">
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
              
                <div className="flex xl:justify-end">
                  <p className="pb-6 text-18 leading-[26px] text-[#A3A3A3] lg:pb-[58px] font-normal fnt-lexend  xl:max-w-[50ch] 2xl:max-w-[60ch]">
                    {description}
                  </p>
                </div>
              
            </motion.div>
          </div>}
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
                transition: { duration: 1.2, ease: "easeOut" },
              }, // Slide up and fade in
            }}
          >
            <div className="flex flex-col">
              {rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`border-t ${bgcolor === "bg-black" ? "border-[#77787B]" : "border-black"
                    }`}
                >
                  <div
                    className={`grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-${colcount || 4
                      }`}
                  >
                    {row.map((framework) => (
                      <div
                        key={framework.id}
                        className="group relative flex flex-col overflow-hidden pb-4 xl:pb-8 xxl:pb-60"
                      >
                        {!framework.icn && (
                          <div className="mb-4 mt-6 flex h-[50px] w-[50px] xxl:h-[60px] xxl:w-[60px] items-center justify-center rounded-[7px] bg-[#2E0C0A] transition-transform duration-500 lg:mb-[30px] lg:mt-10">
                            <p className="text-28 text-[#E63E31] transition-transform duration-500">
                              {String(framework.id).padStart(2, "0")}
                            </p>
                          </div>
                        )}

                        {framework.icn && (
                          <div className="mb-4 mt-6 flex h-[50px] w-[50px] items-center justify-center bg-primary lg:mb-8 lg:mt-10">
                            <Image
                              src={framework.icn}
                              alt="icon"
                              className="object-cover brightness-0 invert"
                            />
                          </div>
                        )}

                        <div className="pr-6 xl:pr-60">
                          <div className="relative w-fit text-2xl">
                            <h3
                              className={`${bgcolor === "bg-black"
                                  ? "text-white"
                                  : "text-black"
                                } text-28 pb-3 leading-[1.214285714285714] lg:pb-5`}
                              dangerouslySetInnerHTML={{
                                __html: framework.title,
                              }}
                            />

                            {framework.urllink && (
                              <Link
                                href={framework.urllink}
                                className="absolute inset-0"
                              />
                            )}
                          </div>

                          <p className="fnt-lexend text-18 font-normal leading-[1.444444444444444] text-[#a3a3a3]">
                            {toSentenceCase(framework.dec)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlackInfoGrid;
