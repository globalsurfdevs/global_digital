"use client";
import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";

// ✅ FIX 1: Moved outside component — no re-creation on every render
const CONTENT_ARRAY = [
  "Digital Marketing",
  "Web Design",
  "Web Development",
  "Data Analytics",
  "Strategy Consulting",
  "Marketing Automation",
];

// ✅ FIX 2: Framer Motion variants defined outside — prevents new object on every render
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const headingVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndexRef = useRef(0);
  const [spanContent, setSpanContent] = useState(CONTENT_ARRAY[0]);

  // ✅ FIX 3: useCallback — stable reference, not recreated on every render
  const handleMouseEnter = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      // ✅ FIX 4: Use style directly — avoids classList thrashing & reflow
      video.style.opacity = "1";
      // ✅ FIX 5: play() returns a Promise — catch errors (e.g. autoplay policy)
      video.play().catch(() => { });
    }

    // ✅ FIX 6: Clear existing interval before starting a new one
    // (prevents stacking intervals if mouse enters rapidly)
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      currentIndexRef.current =
        (currentIndexRef.current + 1) % CONTENT_ARRAY.length;
      setSpanContent(CONTENT_ARRAY[currentIndexRef.current]);
    }, 1000); // ✅ FIX 7: Was 100ms — too fast, causes layout thrash. Use 1000ms
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
    <motion.section
      className="bnrnmn relative flex items-center py-24 text-black h-[70vh] xl:h-screen"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={sectionVariants}
    >
      <div className="absolute left-0 top-0 -z-20 h-full w-full bg-bglight" />

      {/* ✅ FIX 8: No autoPlay — video only plays on hover, not on page load.
           This alone saves your LCP score significantly on mobile.
           poster= gives browsers something to paint immediately (no blank flash). */}
      <video
        ref={videoRef}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover transition-opacity duration-300"
        style={{ opacity: 0 }}
        loop
        muted
        playsInline
        preload="none"         // ✅ FIX 9: Don't preload video data at all
        poster="/assets/poster.png" // ✅ FIX 10: Add a poster image (export a frame)
      >
        <source src="/assets/GS_Digital-banner.mp4" type="video/mp4" />
      </video>

      <div className="container mx-auto px-4">
        <motion.h1
          className="title-120 font-[400] cursor-pointer inline-block hover:text-white duration-100"
          id="triggerSection"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headingVariants}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Performance Focused <br />
          {/* ✅ FIX 11: min-w keeps layout stable — no CLS when text changes length */}
          <span className="text-primary relative linbsx underline inline-block min-w-[320px]">
            {spanContent}
          </span>
        </motion.h1>
      </div>
    </motion.section>
  );
};

export default HeroSection;