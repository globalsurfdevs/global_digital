import styles from "../css/campaign.module.css";

export default function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.wrap}>
        <a href="#" className={styles.logo}>
          GS<span className={styles.dot}>.</span>Digital
        </a>
        <a href="#book" className={styles.pill}>
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
  );
}
