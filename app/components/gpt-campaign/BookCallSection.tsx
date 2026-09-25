import styles from "../css/campaign.module.css";
import Reveal from "./Reveal";
import BookCallPanel from "./BookCallPanel";

export default function BookCallSection() {
  return (
    <section className={styles.secDark} id="book">
      <div className={styles.wrap}>
        <Reveal as="div" className={styles.bookPanel}>
          <div className={styles.bookLeft}>
            <h2>
              Book a call and find out if this channel is{" "}
              <span className={styles.accent}>worth your while.</span>
            </h2>
            <ul className={styles.bookPoints}>
              <li>
                <span className={styles.bpIc}>
                  <svg
                    viewBox="0 0 24 24"
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <span>Thirty minutes, no pressure.</span>
              </li>
              <li>
                <span className={styles.bpIc}>
                  <svg
                    viewBox="0 0 24 24"
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span>A clear read on whether it fits your business.</span>
              </li>
              <li>
                <span className={styles.bpIc}>
                  <svg
                    viewBox="0 0 24 24"
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8l7.9 5.3a2 2 0 0 0 2.2 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                  </svg>
                </span>
                <span>We&apos;ll reply within one business day.</span>
              </li>
            </ul>
          </div>
          <BookCallPanel />
        </Reveal>
      </div>
    </section>
  );
}
