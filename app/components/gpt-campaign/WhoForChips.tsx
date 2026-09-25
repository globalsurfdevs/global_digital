import styles from "../css/campaign.module.css";
import Reveal from "./Reveal";

const chips = [
  {
    text: "You're curious about reaching customers through AI, not just Google and Meta.",
    delay: 1 as const,
    icon: (
      <svg
        viewBox="0 0 24 24"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  },
  {
    text: "You're open to testing a new channel while it's still early.",
    delay: 2 as const,
    icon: (
      <svg
        viewBox="0 0 24 24"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    text: "You'd rather have an expert walk you through it than figure it out alone.",
    delay: 1 as const,
    icon: (
      <svg
        viewBox="0 0 24 24"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      </svg>
    ),
  },
];

export default function WhoForChips() {
  return (
    <section>
      <div className={styles.wrap}>
        <Reveal as="h2" delay={1}>
          This is for you if…
        </Reveal>
        <div className={styles.whoFor}>
          {chips.map((chip) => (
            <Reveal
              as="div"
              delay={chip.delay}
              className={styles.chip}
              key={chip.text}
            >
              <span className={styles.ci}>{chip.icon}</span>
              <span className={styles.tx}>{chip.text}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
