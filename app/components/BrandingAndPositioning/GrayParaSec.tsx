"use client";

import { ServiceItem } from "@/app/(user)/[slug]/type";
import { motion } from "framer-motion";
import { moveUp } from "../animations/motionVariants";
import { toSentenceCase } from "@/app/helpers/maintainProperWordings";

const GrayParaSec = ({ data }: { data: ServiceItem["fourthSection"] }) => {
  return (
    <section className="py-120 bg-[#F6F6F6]">
      <div className="container">
        <div>
          <motion.div
            variants={moveUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-4 flex items-center gap-3 md:mb-6 xl:mb-8 xxl:mb-12"
          >
            <h3 className="text-18 uppercase leading-[1] tracking-[-0.025em] text-muted">
              {data.title}
            </h3>
            <div className="h-4 w-4 bg-primary"></div>
          </motion.div>
          <motion.h2
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="title-60 text-[length:var(--text-60-sm)] mb-4 max-w-[30ch] md:mb-6 xl:mb-8 xxl:mb-12"
          >
            {data.subTitle}
          </motion.h2>
          {data.description.split("\n").map((item, index) => (
            <motion.p
              key={index}
              variants={moveUp(0.2 + index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-19 fnt-lexend mb-4 xxl:mb-6 text-muted last:mb-0"
              dangerouslySetInnerHTML={{ __html: toSentenceCase(item) }}
            >
              {/* {toSentenceCase(item)} */}
            </motion.p>
          ))}
          {/* <p className="text-19 mb-4 last:mb-0 fnt-lexend text-muted">The UAE is a highly visually competitive market. Across construction, real estate, retail and professional services, brands compete for attention from a sophisticated, multi-cultural audience that has been exposed to global brand standards and expects the same from local businesses. In this environment, a generic logo and a basic colour palette don't constitute a brand — they constitute an absence of one.</p>
          <p className="text-19 mb-4 last:mb-0 fnt-lexend text-muted">
            Brand investment in the UAE also serves a commercial function beyond aesthetics. For construction and engineering firms, a professionally positioned brand is a pre-qualification credibility signal before a tender is opened; for real estate developers, it's the visual and verbal system that communicates project quality before a buyer visits a showroom; for retail and fashion brands, it's the difference between being discovered and being scrolled past. A brand system also keeps a business looking and sounding the same across its website, tender documents, LinkedIn profile and office reception — consistency that compounds into recognition over time.
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default GrayParaSec;
