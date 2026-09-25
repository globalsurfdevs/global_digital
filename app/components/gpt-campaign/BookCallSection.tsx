import Reveal from "./Reveal";
import BookCallPanel from "./BookCallPanel";

export default function BookCallSection() {
  return (
    <section
      className="relative overflow-hidden bg-black text-white"
      id="book"
    >
      <div className="relative z-[1] mx-auto w-full max-w-[1100px] px-8">
        <Reveal
          as="div"
          className="grid overflow-hidden rounded-3xl border border-white/[0.14] bg-white/[0.04] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)] min-[821px]:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="relative flex flex-col justify-center p-[48px_44px] max-[520px]:p-[38px_28px]">
            <h2 className="relative z-[1] mb-[30px] max-w-[16ch] text-[clamp(28px,4vw,44px)] font-medium leading-[1.08] tracking-[-0.025em]">
              Book a call and find out if this channel is{" "}
              <span className="text-[#E63E31]">worth your while.</span>
            </h2>
            <ul className="relative z-[1] grid list-none gap-4">
              <li className="flex items-center gap-[13px] text-[15.5px] text-white/[0.82]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#E63E31]/[0.16] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-none [&_svg]:stroke-[#E63E31]">
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
              <li className="flex items-center gap-[13px] text-[15.5px] text-white/[0.82]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#E63E31]/[0.16] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-none [&_svg]:stroke-[#E63E31]">
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
              <li className="flex items-center gap-[13px] text-[15.5px] text-white/[0.82]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#E63E31]/[0.16] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-none [&_svg]:stroke-[#E63E31]">
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
