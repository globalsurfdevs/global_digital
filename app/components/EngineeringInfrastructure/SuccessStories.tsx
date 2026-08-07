"use client";

import { Lexend } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface SuccessStoriesProps {
  data: {
    title: string;
    items: {
      id: string;
      topTitle: string;
      stat: string;
      statLabel: string;
      title: string;
      description: string;
      logo: string;
      image: string;
      slug: string;
      accent: "primary" | "dark";
    }[];
  };
}

const SuccessStories = ({ data }: SuccessStoriesProps) => {
  return (
    <section className="py-120">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="title-60 mb-8 xl:mb-12"
        >
          {data.title}
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {data.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="group relative overflow-hidden bg-black text-white"
            >
              {/* Top */}
              <div
                className={`p-7 xl:p-8 ${item.accent === "primary" ? "bg-primary" : "bg-[#4A4A4A]"
                  }`}
              >
                <p
                  className={`mb-3 text-18 ${lexend.className}`}
                >
                  {item.topTitle}
                </p>

                <h3 className="mb-2 text-[56px] leading-none font-light">
                  {item.stat}
                </h3>

                <p className={`text-18 ${lexend.className}`}>
                  {item.statLabel}
                </p>
              </div>

              {/* Bottom */}
              <div className="flex min-h-[220px] flex-col p-7 xl:p-8">
                <h3 className="mb-6 text-32 leading-tight">
                  {item.title}
                </h3>

                <p
                  className={`text-17 leading-[1.6] text-[#B7B7B7] ${lexend.className}`}
                >
                  {item.description}
                </p>
              </div>

              <Link
                href={`/case-study/${item.slug}`}
                className="absolute inset-0"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;