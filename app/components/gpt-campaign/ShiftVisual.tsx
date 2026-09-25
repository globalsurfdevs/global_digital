import styles from "../css/campaign.module.css";

export default function ShiftVisual() {
  return (
    <div className={styles.shiftVisual}>
      <div className={`${styles.ring} ${styles.ringSpin}`} />
      <div
        className={`${styles.ring} ${styles.ringR2} ${styles.ringSpin} ${styles.rev}`}
      />
      <div className={`${styles.ring} ${styles.ringR3}`} />
      <div className={styles.ringCore}>
        <svg
          viewBox="0 0 24 24"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </div>
      <div className={`${styles.node} ${styles.n1} ${styles.nodePulse}`}>
        <svg
          viewBox="0 0 24 24"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </div>
      <div
        className={`${styles.node} ${styles.n2} ${styles.nodePulse} ${styles.pd1}`}
      >
        <svg
          viewBox="0 0 24 24"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12h18M12 3v18" />
        </svg>
      </div>
      <div
        className={`${styles.node} ${styles.n3} ${styles.nodePulse} ${styles.pd2}`}
      >
        <svg
          viewBox="0 0 24 24"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <div
        className={`${styles.node} ${styles.n4} ${styles.nodePulse} ${styles.pd3}`}
      >
        <svg
          viewBox="0 0 24 24"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
    </div>
  );
}
