"use client";

import { useEffect, useState } from "react";
import styles from "../css/campaign.module.css";

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
    <div className={`${styles.chatMotif} ${play ? styles.play : ""}`}>
      <div className={styles.bubble}>
        <span className={styles.tag}>Someone asks ChatGPT</span>
        &ldquo;Who&apos;s the best company for this near me?&rdquo;
      </div>
      <div className={`${styles.bubble} ${styles.reply}`}>
        <span className={styles.tag}>A brand appears in the answer</span>
        This is where your business could show up.
      </div>
      <div className={styles.bubble}>
        <span className={styles.tag}>A new front door</span>
        Attention is moving here.
      </div>
    </div>
  );
}
