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
    <section className="bg-[#f6f3ec]">
      <div className="mx-auto w-full max-w-[1100px] px-8">
        <Reveal as="h2" delay={1}>
          Book a call, and here&apos;s what you&apos;ll{" "}
          <span className="text-[#E63E31]">walk away with.</span>
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
        <Reveal
          as="p"
          delay={0}
          className="mt-[26px] max-w-[60ch] text-[15px] italic text-[#E63E31]"
        >
          No commitment, no hard sell. If it&apos;s not right for you,
          we&apos;ll say so, and you&apos;ll still leave with something useful.
        </Reveal>
      </div>
    </section>
  );
}
