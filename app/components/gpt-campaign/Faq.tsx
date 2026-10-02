"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";
const faqItems = [
  {
    question: "Are ChatGPT ads actually available?",
    answer:
      "Yes. It's a real, live advertising channel inside ChatGPT. It's still early, which is exactly why it's worth understanding before the space fills up.",
  },
  {
    question: "How is this different from Google or Meta ads?",
    answer:
      "Instead of matching keywords or social interests, ChatGPT ads appear inside relevant conversations, when someone is actively asking about something related to your business. It reaches people mid-decision, in a place they already trust for answers.",
  },
  {
    question: "Do I need a big budget to try this?",
    answer:
      "No. A first test runs on a modest budget, enough to learn whether it works for you, without a big commitment upfront.",
  },
  {
    question: "Will this replace my current advertising?",
    answer:
      "No. It sits alongside your existing Google and Meta activity as an additional channel. Nothing that's already working gets switched off.",
  },
  {
    question: "How quickly will I know if it's working?",
    answer:
      "Within a few weeks you'll have real numbers to judge by, enough to tell whether it's worth continuing or not.",
  },
  {
    question: "What actually happens on the call?",
    answer:
      "A straightforward thirty-minute conversation. We'll look at whether ChatGPT ads fit your business, sketch what a first test could look like, and give you an honest recommendation. No pressure, no hard sell.",
  },
] as const;

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={`h-4 w-4 transition-colors duration-300 ${open ? "text-white" : "text-[#0a0a0a]"}`}
    stroke="currentColor"
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
      <div className="mx-auto w-full max-w-[1100px] px-8">
        <Reveal
          as="h2"
          delay={1}
          className="max-w-[20ch] text-[clamp(28px,4vw,44px)] font-medium leading-[1.08] tracking-[-0.025em] mb-10"
        >
          Questions you might <span className="text-[#E63E31]">be asking.</span>
        </Reveal>
        <Reveal
          as="div"
          delay={2}
          className="mt-2 border-t border-[rgba(10,10,10,0.1)]"
        >
          {faqItems.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                className="border-b border-[rgba(10,10,10,0.1)] py-6"
                key={item.question}
              >
                <h3 className="m-0 p-0">
                  <button
                    type="button"
                    className="group flex w-full items-center justify-between gap-5 border-0 bg-transparent px-1 py-2 text-left text-[18px] font-medium tracking-[-0.01em] text-[#0a0a0a] transition-colors duration-200 hover:text-[#E63E31] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63E31] max-[560px]:py-2 max-[560px]:text-base"
                    aria-expanded={open}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    <span className="min-w-0 flex-1 pr-4">{item.question}</span>
                    <span
                      className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] transition-[background,transform] duration-300 ${open ? "rotate-[135deg] bg-[#E63E31]" : "bg-[#f6f3ec]"}`}
                    >
                      <ChevronIcon open={open} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  aria-hidden={!open}
                  ref={(el) => {
                    panelRefs.current[i] = el;
                  }}
                  className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                  style={{
                    maxHeight: open
                      ? `${panelRefs.current[i]?.scrollHeight ?? 1000}px`
                      : "0px",
                  }}
                >
                  <p className="max-w-[60ch] px-[4px] py-[24px] text-[15.5px] leading-[1.6] text-[#77787B]">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
