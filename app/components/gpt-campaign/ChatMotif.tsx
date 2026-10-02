"use client";

import { useEffect, useState } from "react";

export default function ChatMotif() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setPlay(true);
      return;
    }
    const timer = setTimeout(() => setPlay(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute right-[4%] top-1/2 z-[2] w-[288px] -translate-y-1/2 max-[1040px]:hidden">
      <div
        className={`relative mb-[15px] rounded-[16px_16px_16px_4px] border border-white/[0.14] bg-white/[0.06] px-[18px] py-[15px] text-[14.5px] text-white/[0.9] backdrop-blur-md transition-[opacity,transform] duration-500 ${play ? "opacity-100" : "translate-y-3 opacity-0"}`}
      >
        <span className="mb-[5px] block text-[10px] uppercase tracking-[0.1em] text-[#77787B]">
          Someone asks ChatGPT
        </span>
        &ldquo;Who&apos;s the best company for this near me?&rdquo;
      </div>
      <div
        className={`delay-[600ms] relative mb-[15px] ml-[30px] rounded-[16px_16px_4px_16px] border border-[#E63E31]/[0.45] bg-[#E63E31]/[0.16] px-[18px] py-[15px] text-[14.5px] text-white/[0.9] backdrop-blur-md transition-[opacity,transform] duration-500 ${play ? "opacity-100" : "translate-y-3 opacity-0"}`}
      >
        <span className="mb-[5px] block text-[10px] uppercase tracking-[0.1em] text-[#E63E31]">
          A brand appears in the answer
        </span>
        This is where your business could show up.
      </div>
      <div
        className={`delay-[1200ms] relative rounded-[16px_16px_16px_4px] border border-white/[0.14] bg-white/[0.06] px-[18px] py-[15px] text-[14.5px] text-white/[0.9] backdrop-blur-md transition-[opacity,transform] duration-500 ${play ? "opacity-100" : "translate-y-3 opacity-0"}`}
      >
        <span className="mb-[5px] block text-[10px] uppercase tracking-[0.1em] text-[#77787B]">
          A new front door
        </span>
        Attention is moving here.
      </div>
    </div>
  );
}
