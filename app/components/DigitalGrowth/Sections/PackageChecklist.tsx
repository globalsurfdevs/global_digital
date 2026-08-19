"use client";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";

type ChecklistItem = {
  _id: string;
  title: string;
  subText: string;
};

type ChecklistColumn = {
  _id: string;
  heading: string;
  items: ChecklistItem[];
};

type Props = {
  title: string;
  description: string;
  columns: ChecklistColumn[];
};

const PackageChecklist = ({ data }: { data: Props }) => {
  return (
    <section className="bg-white py-16 md:py-20 xl:py-[90px]">
      <div className="container">
        {/* Header */}

        <motion.h2
          initial="hidden"
          whileInView="show"
          variants={moveUp(0)}
          viewport={{ once: true }}
          className="title-65 md:max-w-[666px] "
        >
          {data.title}
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="show"
          variants={moveUp(0.1)}
          viewport={{ once: true }}
          className="text-18 fnt-lexend pb-[60px] pt-[40px] leading-[1.6] text-muted md:max-w-[340px] xl:max-w-[657px] "
        >
          {data.description}
        </motion.p>

        {/* Columns */}
        <div className="-mx-[7px] flex flex-wrap items-stretch xl:-mx-[15px]">
          {data.columns.map((col, colIndex) => (
            <motion.div
              key={col._id}
              initial="hidden"
              whileInView="show"
              variants={moveUp(colIndex * 0.1)}
              viewport={{ once: true }}
              className="mb-6 flex w-full flex-col px-[7px] sm:w-1/2 lg:mb-0 lg:w-1/4 xl:px-[15px]"
            >
              {/* Column header */}
              <div className="mb-3 rounded-[8px] border border-primary/10 bg-gradient-to-r from-[#e63e310f] to-transparent px-4 py-4 xl:mb-4 xl:px-6 xl:py-[22px]">
                <h3 className="text-28 tracking-[-0.02em] text-black">
                  {col.heading}
                </h3>
              </div>

              {/* Column body */}
              <div className="flex-1 rounded-[10px] border border-[#000000]/10 bg-[#f6f6f6] px-4 py-2 xl:px-6 xl:py-4">
                {col.items.map((item, itemIndex) => (
                  <div
                    key={item._id}
                    className={`flex items-start gap-2.5 py-3 xl:gap-3 xl:py-[18px] ${
                      itemIndex < col.items.length - 1
                        ? "border-b border-black/10"
                        : ""
                    }`}
                  >
                    <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] bg-primary">
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-18 leading-[26px] text-black">
                        {item.title}
                      </p>
                      <p className="text-18 mt-0.5 leading-[26px] text-muted">
                        {item.subText}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackageChecklist;
