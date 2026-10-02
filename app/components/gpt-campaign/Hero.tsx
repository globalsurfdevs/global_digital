import ChatMotif from "./ChatMotif";

export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-[#0a0a0a] px-0 py-24 text-white max-[640px]:py-[72px]">
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-50">
        <span className="absolute -right-20 -top-[120px] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,#E63E31,transparent_70%)] opacity-50 blur-[70px]" />
        <span className="absolute -bottom-[120px] -left-[60px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,#3a3a3a,transparent_70%)] opacity-50 blur-[70px]" />
      </div>
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <ChatMotif />
      <div className="relative z-[2] md:mt-[20px] mx-auto w-full max-w-[1100px] px-8">
        <span className="mb-[15px] md:mt-[15px] inline-flex items-center gap-2.5 text-[12.5px] font-medium uppercase tracking-[0.14em] text-white/70 before:inline-block before:h-[9px] before:w-[9px] before:bg-[#E63E31] before:content-['']">
          A new advertising channel
        </span>
        <h1 className="mb-9 max-w-[15ch] text-[clamp(38px,6.6vw,74px)] font-medium leading-[1.02] tracking-[-0.03em]">
          There&apos;s a new way to reach your customers,{" "}
          <span className="text-[#E63E31]">inside ChatGPT.</span>
        </h1>
        <p className="mb-10 max-w-[54ch] text-[clamp(17px,2vw,20px)] leading-[1.5] text-white/[0.82]">
          A real advertising channel has opened up inside the world&apos;s
          fastest-growing platform. The businesses that explore it early are the
          ones who&apos;ll understand it best.
        </p>
        <div className="flex flex-wrap items-center gap-[22px]">
          <a
            href="#book"
            className="focus-visible:outline-3 focus-visible:outline-offset-3 inline-flex items-center gap-[11px] rounded-full border border-white/[0.14] bg-transparent py-[11px] pl-[22px] pr-3 text-[13px] font-medium uppercase tracking-[0.06em] text-white transition hover:border-[#E63E31] hover:bg-[#E63E31] focus-visible:outline-[#E63E31]"
          >
            Book a call
            <span className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-md bg-[#E63E31]">
              {/* <svg viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 8L8 2M8 2H3M8 2V7"
                  strokeWidth={1.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}
              <svg
                viewBox="0 0 10 10"
                className="h-[11px] w-[11px] fill-none stroke-white"
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 8L8 2M8 2H3M8 2V7" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
