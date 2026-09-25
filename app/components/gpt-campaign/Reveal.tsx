"use client";

import {
  createElement,
  useEffect,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import styles from "../css/campaign.module.css";

type RevealProps = {
  /** Host element to render — defaults to 'div', use 'li' inside lists, 'h2' for headings, etc. */
  as?: ElementType;
  /** Matches the original d1/d2/d3 stagger classes (0 = no extra delay). */
  delay?: 0 | 1 | 2 | 3;
  className?: string;
  children: ReactNode;
};

export default function Reveal({
  as = "div",
  delay = 0,
  className = "",
  children,
}: RevealProps) {
  const [node, setNode] = useState<Element | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!node) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  const delayClass = delay ? styles[`d${delay}`] : "";
  const classes = [
    styles.reveal,
    visible ? styles.in : "",
    delayClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createElement(as, { ref: setNode, className: classes }, children);
}
