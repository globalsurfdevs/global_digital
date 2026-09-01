"use client";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";
import Image from "next/image";
import { scrollToContact } from "../../HomePage/HeaderWithoutMenu";

type StatItem = {
  _id: string;
  value: string;
  label: string;
};

type Props = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  stats: StatItem[];
};

const ArrowIcon = ({ clipId }: { clipId: string }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="group-hover:scale-105"
  >
    <g clipPath={`url(#${clipId})`}>
      <path
        d="M8.88346 1.26172L1.13281 8.8624"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M1.13281 1.26172H8.88346V8.71245"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </g>
    <defs>
      <clipPath id={clipId}>
        <rect width="10" height="10" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
const CredibilityStats = ({ data }: { data: Props }) => {
  return (
    <section className="overflow-hidden bg-black py-16 text-white md:py-20 xl:py-[90px]">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-6 lg:gap-20 xl:gap-32">
          {/* Left */}
          <div className="lg:col-span-3">
            <motion.h2
              initial="hidden"
              whileInView="show"
              variants={moveUp(0)}
              viewport={{ once: true }}
              className="title-60 text-[length:var(--text-60-sm)]"
            >
              {data.title}
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="show"
              variants={moveUp(0.1)}
              viewport={{ once: true }}
              className="text-25 mt-10 text-white md:mt-[30px] xl:mt-[60px]"
            >
              {data.description}
            </motion.p>
            <button
              type="button"
              onClick={scrollToContact}
              className="group mt-[40px] flex items-center space-x-2 rounded-full border border-primary px-6 py-2 text-white transition duration-300 ease-in hover:shadow-lg"
            >
              <span className="fnt-lexend uppercase duration-300 ease-in">
                Request a Free Audit
              </span>
              <div className="bg-primary p-1">
                <ArrowIcon clipId="clip-book-call" />
              </div>
            </button>
          </div>

          {/* Right - Stats grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 ">
              {data.stats.map((stat, index) => (
                <motion.div
                  key={stat._id}
                  initial="hidden"
                  whileInView="show"
                  variants={moveUp(index * 0.08)}
                  viewport={{ once: true }}
                  className={`pb-[40px] ${
                    index < data.stats.length - 2
                      ? "border-b border-[#77787B] "
                      : ""
                  }`}
                >
                  <span className="text-60 text-[length:var(--text-60-sm)] block text-primary">
                    {stat.value}
                  </span>
                  <p className="text-18 text-[length:var(--text-18-sm)] fnt-lexend mt-2 uppercase text-white max-w-[20ch]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilityStats;
