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
    <section className="bg-[#f6f3ec]">
      <div className="mx-auto w-full max-w-[1100px] px-8">
        <Reveal as="h2" delay={1}>
          What a first test{" "}
          <span className="text-[#E63E31]">actually looks like.</span>
        </Reveal>
        <div className="mt-11 grid grid-cols-1 gap-5 min-[821px]:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal
              as="div"
              delay={(i + 1) as 1 | 2 | 3}
              className="relative overflow-hidden rounded-[18px] border border-black/10 bg-[#fcfaf6] p-[34px_28px_30px] transition duration-300 hover:-translate-y-1.5 hover:border-[#E63E31]/40 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.18)]"
              key={card.title}
            >
              <span className="mb-[22px] inline-flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-black/10 bg-white [&_svg]:h-[23px] [&_svg]:w-[23px] [&_svg]:fill-none [&_svg]:stroke-[#0a0a0a]">
                {card.icon}
              </span>
              <h3 className="mb-2 text-[18.5px] font-semibold">{card.title}</h3>
              <p className="text-[14.5px] leading-[1.55] text-[#77787B]">
                {card.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
