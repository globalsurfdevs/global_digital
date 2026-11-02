"use client";
import { motion } from "framer-motion";
import { moveUp } from "../../animations/motionVariants";

type RoadmapItem = {
  _id: string;
  badge: string;
  description: string;
  highlighted?: boolean;
};

type Props = {
  title: string;
  items: RoadmapItem[];
};

const ExecutionRoadmap = ({ data }: { data: Props }) => {
  return (
    <section className="overflow-hidden bg-white pb-16 text-black md:pb-20 xl:pb-[90px]">
      <div className="container">
        <motion.h2
          initial="hidden"
          whileInView="show"
          variants={moveUp(0)}
          viewport={{ once: true }}
          className="title-60 text-[length:var(--text-60-sm)]"
        >
          {data.title}
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-0 lg:overflow-hidden xxl:grid-cols-5">
          {data.items.map((item, index) => (
            <motion.div
              key={item._id}
              initial="hidden"
              whileInView="show"
              variants={moveUp(index * 0.08)}
              viewport={{ once: true }}
              className="group flex flex-col gap-4 rounded-[15px] border border-black/10 bg-white px-[26px] pb-[40px] pt-[20px] transition-colors duration-300 hover:bg-[#E53E31]/15 lg:border lg:border-black/10"
            >
              <span className="text-18 text-[length:var(--text-18-sm)] inline-flex w-fit items-center rounded-full border border-primary px-[15px] py-[10px] uppercase text-muted transition-colors duration-300 group-hover:bg-primary group-hover:!text-white">
                {item.badge}
              </span>
              <h4 className="text-25 mt-[68px] leading-snug text-black">
                {item.description}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutionRoadmap;
