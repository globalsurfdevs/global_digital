export default function Topbar() {
  return (
    <div className="sticky top-0 z-50 border-b border-black/10 bg-white/[0.86] backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] w-full max-w-[1100px] items-center justify-between px-8">
        <a
          href="#"
          className="text-[22px] font-bold tracking-[-0.02em] text-[#0a0a0a]"
        >
          GS<span className="text-[#E63E31]">.</span>Digital
        </a>
        <a
          href="#book"
          className="inline-flex items-center gap-[11px] rounded-full border border-[#0a0a0a] bg-transparent py-[11px] pl-[22px] pr-3 text-[13px] font-medium uppercase tracking-[0.06em] text-[#0a0a0a] transition hover:bg-[#0a0a0a] hover:text-white"
        >
          Book a call
          <span className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-md bg-[#E63E31]">
            <svg viewBox="0 0 10 10" fill="none">
              <path
                className="fill-none stroke-white"
                d="M2 8L8 2M8 2H3M8 2V7"
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
}
