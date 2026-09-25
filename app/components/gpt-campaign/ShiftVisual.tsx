export default function ShiftVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <div className="absolute inset-0 animate-spin rounded-full border border-black/10 [animation-duration:40s]" />
      <div className="absolute inset-[14%] animate-spin rounded-full border border-[#E63E31]/25 [animation-direction:reverse] [animation-duration:30s]" />
      <div className="absolute inset-[28%] rounded-full border border-dashed border-black/10" />
      <div className="absolute inset-[38%] flex items-center justify-center rounded-full bg-[#E63E31] shadow-[0_20px_50px_-14px_rgba(230,62,49,0.6)]">
        <svg
          viewBox="0 0 24 24"
          className="h-[42%] w-[42%] fill-none stroke-white"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </div>
      <div className="absolute left-1/2 top-[2%] flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-xl border border-black/10 bg-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)]">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-none stroke-[#0a0a0a]"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </div>
      <div className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-black/10 bg-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)]">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-none stroke-[#0a0a0a]"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12h18M12 3v18" />
        </svg>
      </div>
      <div className="absolute bottom-[2%] left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-xl border border-black/10 bg-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)]">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-none stroke-[#0a0a0a]"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <div className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-black/10 bg-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)]">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-none stroke-[#0a0a0a]"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
    </div>
  );
}
