import Reveal from "./Reveal";

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5 fill-none stroke-[#E63E31]"
    strokeWidth={2.4}
  >
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
    <section className="relative overflow-hidden bg-[#0a0a0a] text-white after:pointer-events-none after:absolute after:-right-[160px] after:-top-[200px] after:z-0 after:h-[620px] after:w-[620px] after:bg-[radial-gradient(circle,rgba(230,62,49,0.14),transparent_68%)] after:blur-[30px]">
      <div className="relative z-[1] mx-auto w-full max-w-[1100px] px-8">
        <Reveal as="h2" delay={1}>
          Here&apos;s where we{" "}
          <span className="text-[#E63E31]">actually stand.</span>
        </Reveal>
        <Reveal
          as="p"
          delay={2}
          className="mt-[22px] max-w-[60ch] text-[17.5px] text-white/[0.78]"
        >
          We&apos;re a digital marketing agency already running live ChatGPT ad
          tests: the setup, the targeting, the tracking, and how a first
          campaign should be structured. We&apos;re treating it as a proper test
          environment, learning what works as the platform evolves.
        </Reveal>
        <ul className="mt-[30px] grid max-w-[640px] list-none gap-4">
          {points.map((text, i) => (
            <Reveal
              as="li"
              delay={(i + 1) as 1 | 2 | 3}
              className="flex items-start gap-4 text-[16.5px] text-white/[0.86]"
              key={text}
            >
              <span className="mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E63E31]/[0.14]">
                <CheckIcon />
              </span>
              <span>{text}</span>
            </Reveal>
          ))}
        </ul>
        <Reveal
          as="p"
          delay={0}
          className="mt-[26px] max-w-[60ch] text-[15px] italic text-white/[0.55]"
        >
          No one has this fully figured out yet. It&apos;s too new. But
          we&apos;re further in than most, and we&apos;ll share what we&apos;re
          seeing.
        </Reveal>
      </div>
    </section>
  );
}
