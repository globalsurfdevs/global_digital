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
      <div className="mx-auto w-full max-w-[1100px] px-8">
        <Reveal as="h2" delay={1}>
          This is for you if…
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-[18px] min-[821px]:grid-cols-3">
          {chips.map((chip) => (
            <Reveal
              as="div"
              delay={chip.delay}
              className="flex flex-col items-start gap-4 rounded-2xl border border-black/10 bg-white p-[26px_24px] shadow-[0_10px_30px_-22px_rgba(0,0,0,0.35)] transition duration-200 hover:-translate-y-1 hover:border-[#E63E31] hover:shadow-[0_20px_44px_-24px_rgba(230,62,49,0.5)]"
              key={chip.text}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#E63E31] [&_svg]:h-[21px] [&_svg]:w-[21px] [&_svg]:fill-none [&_svg]:stroke-white">
                {chip.icon}
              </span>
              <span className="text-base leading-[1.5] text-[#2b2b2f]">
                {chip.text}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
