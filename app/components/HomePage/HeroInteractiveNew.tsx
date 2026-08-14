"use client";
import { useCallback, useRef } from "react";

const CONTENT_ARRAY = [
  "Digital Marketing",
  "Web Design",
  "Web Development",
  "Data Analytics",
  "Strategy Consulting",
  "Marketing Automation",
];

const HeroInteractive = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndexRef = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const handleMouseEnter = useCallback(() => {
    const video = document.getElementById("hero-video") as HTMLVideoElement;
    const overlay = document.getElementById("hero-overlay");

    if (video) {
      video.style.opacity = "1";
      video.play().catch(() => {});
    }
    if (overlay) {
      overlay.style.opacity = "1";
    }
    if (headingRef.current) {
      headingRef.current.classList.remove("text-black");
      headingRef.current.classList.add("text-white");
    }

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      currentIndexRef.current =
        (currentIndexRef.current + 1) % CONTENT_ARRAY.length;
      const span = document.getElementById("hero-span");
      if (span) span.textContent = CONTENT_ARRAY[currentIndexRef.current];
    }, 1000);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const video = document.getElementById("hero-video") as HTMLVideoElement;
    const overlay = document.getElementById("hero-overlay");

    if (video) {
      video.style.opacity = "0";
      video.pause();
      video.currentTime = 0;
    }
    if (overlay) {
      overlay.style.opacity = "0";
    }
    if (headingRef.current) {
      headingRef.current.classList.remove("text-white");
      headingRef.current.classList.add("text-black");
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return (
    <h2
      ref={headingRef}
      className="title-120 inline-block cursor-pointer font-[400] text-black transition-colors duration-300"
      id="triggerSection"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Performance Focused <br />
      <span
        id="hero-span"
        className="linbsx relative inline-block min-w-[320px] text-primary underline"
      >
        Digital Marketing
      </span>
    </h2>
  );
};

export default HeroInteractive;