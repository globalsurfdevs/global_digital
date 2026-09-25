import styles from "../css/campaign.module.css";
import Reveal from "./Reveal";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const points = [
  "Give you a clear, honest read on whether ChatGPT ads fit your business.",
  "If they do, show you what a controlled first test looks like, so you learn rather than guess.",
  "If they don't, tell you plainly. We'd rather you trust us than waste your budget.",
];

export default function WhyItMatters() {
  return (
    <section className={styles.secDark}>
      <div className={styles.wrap}>
        <Reveal as="h2" delay={1}>
          Here&apos;s where we{" "}
          <span className={styles.accent}>actually stand.</span>
        </Reveal>
        <Reveal as="p" delay={2} className={styles.lead}>
          We&apos;re a digital marketing agency already running live ChatGPT ad
          tests: the setup, the targeting, the tracking, and how a first
          campaign should be structured. We&apos;re treating it as a proper test
          environment, learning what works as the platform evolves.
        </Reveal>
        <ul className={styles.checklist}>
          {points.map((text, i) => (
            <Reveal as="li" delay={(i + 1) as 1 | 2 | 3} key={text}>
              <span className={styles.cm}>
                <CheckIcon />
              </span>
              <span>{text}</span>
            </Reveal>
          ))}
        </ul>
        <Reveal as="p" delay={0} className={styles.note}>
          No one has this fully figured out yet. It&apos;s too new. But
          we&apos;re further in than most, and we&apos;ll share what we&apos;re
          seeing.
        </Reveal>
      </div>
    </section>
  );
}
