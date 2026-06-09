// HeroInteractive.tsx — Client Component
"use client";
import { useCallback, useRef, useState, useEffect } from "react";

const CONTENT_ARRAY = [
  "Digital Marketing",
  "Web Design", 
  "Web Development",
  "Data Analytics",
  "Strategy Consulting",
  "Marketing Automation",
];

const HeroInteractive = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndexRef = useRef(0);

  const handleMouseEnter = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.style.opacity = "1";
      video.play().catch(() => {});
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      currentIndexRef.current =
        (currentIndexRef.current + 1) % CONTENT_ARRAY.length;
      // update the span via DOM directly — no re-render
      const span = document.getElementById("hero-span");
      if (span) span.textContent = CONTENT_ARRAY[currentIndexRef.current];
    }, 1000);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.style.opacity = "0";
      video.pause();
      video.currentTime = 0;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover transition-opacity duration-300"
        style={{ opacity: 0 }}
        loop
        muted
        playsInline
        preload="none"
        poster="/assets/poster.png"
      >
        <source src="/assets/GS_Digital-banner.mp4" type="video/mp4" />
      </video>

      {/* invisible overlay to capture mouse events on the h1 */}
      <div
        className="absolute inset-0 z-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </>
  );
};

export default HeroInteractive;