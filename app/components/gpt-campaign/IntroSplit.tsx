import styles from "../css/campaign.module.css";
import Reveal from "./Reveal";
import ShiftVisual from "./ShiftVisual";

export default function IntroSplit() {
  return (
    <section>
      <div className={styles.wrap}>
        <div className={styles.split}>
          <div>
            <Reveal as="h2" delay={1}>
              Advertising is moving into the{" "}
              <span className={styles.accent}>conversation.</span>
            </Reveal>
            <Reveal as="p" delay={2} className={styles.bodyP}>
              <strong>Yes, this is real, and it&apos;s live now.</strong> More
              and more people start their research inside ChatGPT rather than a
              search bar. Where attention goes, advertising follows, and
              it&apos;s now genuinely possible to place your brand inside those
              conversations.
            </Reveal>
            <Reveal as="p" delay={2} className={styles.bodyP}>
              It&apos;s early. The businesses that understand this channel first
              will have an advantage while it&apos;s still uncrowded and
              inexpensive. But &ldquo;early&rdquo; also means unproven, which is
              exactly why it&apos;s worth understanding properly before you
              commit real budget.
            </Reveal>
          </div>
          <Reveal as="div" delay={1}>
            <ShiftVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
