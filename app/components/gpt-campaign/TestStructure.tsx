import styles from "../css/campaign.module.css";
import Reveal from "./Reveal";

const cards = [
  {
    title: "Start small",
    body: "A modest test budget, not a big commitment. Enough to learn from.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Runs alongside your ads",
    body: "It sits next to your Google and Meta activity. It doesn't replace anything that's already working.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: "A clear read, quickly",
    body: "Within a few weeks you'll know whether it's worth continuing, from real numbers.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 3 3 5-6" />
      </svg>
    ),
  },
];

export default function TestStructure() {
  return (
    <section className={styles.secCream}>
      <div className={styles.wrap}>
        <Reveal as="h2" delay={1}>
          What a first test{" "}
          <span className={styles.accent}>actually looks like.</span>
        </Reveal>
        <div className={styles.cards}>
          {cards.map((card, i) => (
            <Reveal
              as="div"
              delay={(i + 1) as 1 | 2 | 3}
              className={styles.card}
              key={card.title}
            >
              <span className={styles.cnum}>{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
