"use client";

import { useRef, useState } from "react";
import styles from "../css/campaign.module.css";
import Reveal from "./Reveal";
// import { faqItems } from "./faqData";

const ChevronIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  return (
    <section>
      <div className={styles.wrap}>
        <Reveal as="h2" delay={1}>
          Questions you might <span className={styles.accent}>be asking.</span>
        </Reveal>
        {/* <Reveal as="div" delay={2} className={styles.faq}>
          {faqItems.map((item, i) => {
            const open = openIndex === i;
            return (
              <div className={styles.faqItem} key={item.question}>
                <button
                  type="button"
                  className={styles.faqQ}
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span>{item.question}</span>
                  <span className={styles.faqIc}>
                    <ChevronIcon />
                  </span>
                </button>
                <div
                  ref={(el) => {
                    panelRefs.current[i] = el;
                  }}
                  className={styles.faqA}
                  style={{
                    maxHeight: open
                      ? `${panelRefs.current[i]?.scrollHeight ?? 1000}px`
                      : "0px",
                  }}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </Reveal> */}
      </div>
    </section>
  );
}
