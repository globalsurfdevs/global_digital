"use client";

import { useEffect, useRef, useState } from "react";
import { useSpring, useInView } from "framer-motion";
type SeoCounterProps = {
  value: number;
  label: string;
  duration?: number;
};
export default function SeoCounter({
  value,
  label,
  duration = 2000,
}: SeoCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
 
  const [count, setCount] = useState(value);

  const spring = useSpring(0, {
    bounce: 0,
    duration,
  });
 
  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      setCount(Math.round(v));
    });

    return () => unsub();
  }, []);
 
  useEffect(() => {
    if (isInView) {
      setCount(0);        
      spring.set(value);
    }
  }, [isInView, value]);

  return (
    <p
      ref={ref}
      className="mt-4 text-font65 font-[400] leading-lh1p07"
    >
      {/* SEO + screen reader value */}
      <span className="sr-only">{value}</span>

      {/* Animated visual value */}
      <span aria-hidden="true">{count}</span>{" "}

      {label}
    </p>
  );
}