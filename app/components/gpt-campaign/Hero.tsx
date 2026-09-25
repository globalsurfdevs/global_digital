import styles from "../css/campaign.module.css";
import ChatMotif from "./ChatMotif";

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroBg}>
        <span className={`${styles.orb} ${styles.orbA}`} />
        <span className={`${styles.orb} ${styles.orbB}`} />
      </div>
      <div className={styles.heroGrid} />
      <ChatMotif />
      <div className={styles.wrap}>
        <span className={`${styles.eyebrow} ${styles.light}`}>
          A new advertising channel
        </span>
        <h1>
          There&apos;s a new way to reach your customers,{" "}
          <span className={styles.accent}>inside ChatGPT.</span>
        </h1>
        <p className={styles.sub}>
          A real advertising channel has opened up inside the world&apos;s
          fastest-growing platform. The businesses that explore it early are the
          ones who&apos;ll understand it best.
        </p>
        <div className={styles.ctaRow}>
          <a href="#book" className={`${styles.pill} ${styles.onDark}`}>
            Book a call
            <span className={styles.ic}>
              <svg viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 8L8 2M8 2H3M8 2V7"
                  strokeWidth={1.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
