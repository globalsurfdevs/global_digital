import styles from "../css/campaign.module.css";
import Reveal from "./Reveal";

const cards = [
  {
    title: "A clear recommendation",
    body: "Yes, no, or not-yet, for your business specifically.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: "A sketched test structure",
    body: "Rough budget range, targeting approach, and how we'd measure success, if it's worth pursuing.",
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
  {
    title: "A simple decision framework",
    body: "Yours to keep and use, even if you decide not to work with us.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
];

export default function WalkAwayCards() {
  return (
    <section className={styles.secCream}>
      <div className={styles.wrap}>
        <Reveal as="h2" delay={1}>
          Book a call, and here&apos;s what you&apos;ll{" "}
          <span className={styles.accent}>walk away with.</span>
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
        <Reveal as="p" delay={0} className={`${styles.note} ${styles.noteRed}`}>
          No commitment, no hard sell. If it&apos;s not right for you,
          we&apos;ll say so, and you&apos;ll still leave with something useful.
        </Reveal>
      </div>
    </section>
  );
}
