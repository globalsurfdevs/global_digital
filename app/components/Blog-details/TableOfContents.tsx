"use client";

import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { moveUp } from "../animations/motionVariants";

interface TableOfContentsItem {
  title: string;
  _id: string;
}

interface TableOfContentsProps {
  content: string;
  items: TableOfContentsItem[];
  hasFaq?: boolean; // ✅ new prop — passed from BlogDetails when faqData.length > 0
}

const FAQ_ANCHOR = "frequently-asked-questions";

const scrollToAnchor = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
  const target = document.getElementById(id);
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
};

const TableOfContents = ({ content, items, hasFaq }: TableOfContentsProps) => {
  return (
    <section className="blog-toc-section container mx-auto">
      <div className={`${!content ? "blog-toc-bottom-border border-b border-[#b1aaaab0]" : ""}`}>
        <motion.h2
          variants={moveUp(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="title-65 mb-[40px]"
        >
          Table of Contents
        </motion.h2>

        <div className="flex flex-col gap-[20px]">
          {items.map((item, index) => (
            <motion.div
              variants={moveUp(index * 0.11)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={item._id}
            >
              <a
                href={`#${item._id}`}
                onClick={(event) => scrollToAnchor(event, item._id)}
                className="text-font19 text-[#77787B] transition-colors duration-200 hover:text-black"
              >
                {index + 1}. {item.title}
              </a>
            </motion.div>
          ))}

          {/* ✅ FAQ as last TOC entry */}
          {hasFaq && (
            <motion.div
              variants={moveUp(items.length * 0.11)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <a
                href={`#${FAQ_ANCHOR}`}
                onClick={(event) => scrollToAnchor(event, FAQ_ANCHOR)}
                className="text-font19 text-[#77787B] transition-colors duration-200 hover:text-black"
              >
                {items.length + 1}. Frequently Asked Questions
              </a>
            </motion.div>
          )}
        </div>

        {content && (
          <>
            <motion.hr
              variants={moveUp(0.15)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="blog-toc-divider border-t border-[#b1aaaab0]"
            />
            <motion.div
              variants={moveUp(0.18)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-font19 text-[#77787B] [&>p]:mb-[16px]"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default TableOfContents;
export { FAQ_ANCHOR };
