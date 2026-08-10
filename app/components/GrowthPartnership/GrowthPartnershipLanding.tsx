"use client";

/**
 * GS Digital — Growth Partnership landing page
 * Converted from a static HTML/CSS/vanilla-JS build to React + Next.js + TypeScript + Tailwind CSS.
 *
 * SETUP REQUIRED
 * 1) Font: this design uses "Space Grotesk" (weights 300–700) as both display and body face.
 *    Add it via next/font in your root layout, e.g.:
 *      import { Space_Grotesk } from "next/font/google";
 *      const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300","400","500","600","700"] });
 *      // then add spaceGrotesk.className to <body>
 *
 * 2) Marquee animation: add this to your tailwind.config.(js|ts) under theme.extend:
 *      keyframes: {
 *        marquee: { to: { transform: "translateX(-50%)" } },
 *        rowIn: { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
 *      },
 *      animation: {
 *        marquee: "marquee 42s linear infinite",
 *        rowIn: "rowIn 0.45s cubic-bezier(.22,.61,.36,1) forwards",
 *      },
 *
 * 3) Image: place the extracted hero photo at /public/images/hero-team.jpg
 *    (provided alongside this component).
 *
 * All copy, structure, and behavior are preserved from the original design:
 * scroll-progress bar, scroll-reveal animations, an auto-generated client-logo
 * marquee, a hover-linked sector/quote panel, a tabbed before/after proof
 * section, three tool marquees, a pricing matrix, a testimonial carousel,
 * a single-open-per-column FAQ accordion, and a lead capture form.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ============================================================
   Shared design tokens (Tailwind arbitrary values reference these)
   red        #E63E31   red-dk   #C9332A
   ink        #0A0A0A   deep     #131317
   paper      #FCFBF9   sand     #EFEAE0   sand-2  #F6F3EC
   gray       #77787B   gray-2   #A0A1A4
   ============================================================ */

const EASE = "cubic-bezier(.22,.61,.36,1)";

/* ============================================================
   useReveal — scroll-triggered fade/slide-up reveal
   ============================================================ */
function useReveal<T extends HTMLElement>(delayMs = 0) {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = { transitionDelay: `${delayMs}ms` };
  const className = `transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)] ${
    revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;

  return { ref, className, style };
}

/* ============================================================
   Reveal — small wrapper component for the hook above
   ============================================================ */
function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
}: {
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const { ref, className: revealClass, style } = useReveal<HTMLElement>(delay);
  const Component = Tag as any;
  return (
    <Component ref={ref} style={style} className={`${revealClass} ${className}`}>
      {children}
    </Component>
  );
}

/* ============================================================
   Scroll progress bar
   ============================================================ */
function ScrollProgress() {
  const [width, setWidth] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHide(true);
      return;
    }
    let ticking = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(h > 0 ? Math.min(window.scrollY / h, 1) * 100 : 0);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (hide) return null;
  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 h-[2px] bg-[#E63E31] z-[100] pointer-events-none transition-[width] duration-100 linear"
      style={{ width: `${width}%` }}
    />
  );
}

/* ============================================================
   Reusable primitives
   ============================================================ */
function Kick({
  label,
  dark = false,
  center = false,
}: {
  label: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 mb-5 ${
        center ? "mx-auto" : ""
      }`}
    >
      <i className="w-2 h-2 bg-[#E63E31] block flex-none" />
      <span
        className={`font-medium text-[11px] tracking-[0.12em] uppercase ${
          dark ? "text-white/50" : "text-[#77787B]"
        }`}
      >
        {label}
      </span>
    </span>
  );
}

function Btn({
  href,
  children,
  variant = "solid",
  className = "",
  onClick,
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: "solid" | "line" | "pale";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const base =
    "group inline-flex items-center justify-center gap-2.5 font-medium text-sm px-7 py-4 rounded-[10px] border transition-colors duration-200 cursor-pointer";
  const variants: Record<string, string> = {
    solid:
      "bg-[#E63E31] border-[#E63E31] text-white hover:bg-[#C9332A] hover:border-[#C9332A]",
    line: "bg-transparent border-black/10 text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A]",
    pale: "bg-white border-white text-[#0A0A0A] hover:bg-[#ECEAE6] hover:border-[#ECEAE6]",
  };
  const content = (
    <>
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );
  const classes = `${base} ${variants[variant]} active:translate-y-px ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

/* ============================================================
   01 · HERO
   ============================================================ */
function Hero() {
  const clientNames = [
    "ASGC",
    "SOBHA",
    "GULF CRYO",
    "BAFCO",
    "BUKHATIR",
    "CONMIX",
    "INNOVO",
    "ASSENT STEEL",
    "BEC ARABIA",
    "PRESTIGE",
  ];
  const loop = [...clientNames, ...clientNames];

  const offers = [
    { n: "01", label: "Get Found" },
    { n: "02", label: "Look Credible" },
    { n: "03", label: "Stay Ahead" },
    { n: "04", label: "Keep Improving" },
  ];

  return (
    <section className="bg-black text-white relative overflow-hidden pt-16 md:pt-20 lg:pt-[92px] pb-8 md:pb-10 lg:pb-11">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-80 -right-56 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(230,62,49,.18)_0%,rgba(230,62,49,0)_63%)]" />
      <div className="pointer-events-none absolute -left-64 -bottom-80 w-[720px] h-[720px] rounded-full bg-[radial-gradient(circle,rgba(230,62,49,.08)_0%,rgba(230,62,49,0)_66%)]" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.04fr_0.96fr] gap-9 lg:gap-16 items-stretch min-h-[520px]">
          <Reveal className="flex flex-col justify-center">
            <Kick label="Growth Partnership" dark />
            <h1 className="max-w-[17ch] text-white font-normal text-[34px] sm:text-5xl lg:text-[62px] leading-[1.16]">
              Everything your digital marketing needs,{" "}
              <span className="text-[#E63E31]">in one package</span>
            </h1>
            <p className="mt-6 max-w-[46ch] text-white/60 text-base lg:text-lg leading-normal">
              Fourteen coordinated services under one senior team. Built for
              the UAE companies that build, make, supply and develop.
            </p>
            <div className="mt-8 flex items-center gap-6 flex-wrap">
              <Btn href="#book">Get Started</Btn>
            </div>

            <div className="grid grid-cols-4 mt-11 border-t border-white/[0.16]">
              {offers.map((o, i) => (
                <div
                  key={o.n}
                  className={`pt-5 px-4 first:pl-0 first:border-l-0 ${
                    i > 0 ? "border-l border-white/[0.16]" : ""
                  }`}
                >
                  <b className="block mb-2.5 font-semibold text-[9px] tracking-[0.12em] text-[#E63E31]">
                    {o.n}
                  </b>
                  <strong className="block font-medium text-base text-white leading-tight">
                    {o.label}
                  </strong>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140} className="relative flex items-stretch justify-start lg:justify-end">
            <div className="relative h-auto lg:h-full w-full max-w-[430px] lg:max-w-none aspect-[4/5] rounded-[18px] overflow-hidden border border-white/10 bg-[#0A0A0C]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-team.jpg"
                alt="Engineers and designers reviewing drawings, material samples and site plans"
                className="w-full h-full object-contain block"
              />
            </div>
            <div className="static lg:absolute lg:-left-6 lg:bottom-6 mt-3.5 lg:mt-0 max-w-none lg:max-w-[196px] bg-[#101012] border border-white/[0.14] text-white rounded-[13px] px-[18px] py-3.5 shadow-none lg:shadow-[0_24px_58px_rgba(0,0,0,.68)]">
              <b className="block font-normal text-[23px]">
                12<em className="not-italic text-[#E63E31] text-xs align-super">+</em>
              </b>
              <span className="block mt-1 text-[10.5px] leading-normal text-white/[0.56]">
                years in the UAE. 250+ projects delivered.
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={210} className="mt-11 md:mt-14 lg:mt-[74px] border-t border-white/[0.14] pt-7 w-full">
        <div className="text-center text-[10px] tracking-[0.14em] uppercase text-white/[0.36] mb-5">
          Trusted by Built Environment leaders
        </div>
        <div className="relative overflow-hidden group">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-[150px] z-[2] bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-[150px] z-[2] bg-gradient-to-l from-black to-transparent" />
          <div className="flex gap-3.5 w-max animate-marquee group-hover:[animation-play-state:paused]">
            {loop.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="w-[170px] h-14 rounded-[10px] bg-white/[0.035] border border-dashed border-white/[0.15] flex items-center justify-center font-medium text-[10px] tracking-[0.1em] text-white/40 flex-none transition-colors duration-300 hover:border-[#E63E31] hover:text-[#E63E31] hover:bg-[#E63E31]/[0.07]"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================
   02 · WHO IT IS FOR
   ============================================================ */
const QUOTES: [string, string][] = [
  [
    "“Why aren't we getting shortlisted for tenders we're clearly qualified for?”",
    "Main contractor",
  ],
  [
    "“A smaller competitor looks more credible online than we do.”",
    "Engineering consultancy",
  ],
  [
    "“I don't know what a bank or JV partner sees when they check us out.”",
    "Developer",
  ],
  [
    "“We're invisible when someone asks ChatGPT who to call in our industry.”",
    "Manufacturer",
  ],
  [
    "“Our website doesn't reflect the scale of what we actually build.”",
    "Industrial group",
  ],
  [
    "“We were burned by an agency before and have nothing to show for it.”",
    "Heard in every sector",
  ],
];

const SECTORS = [
  {
    name: "Construction",
    sub: "Main contractors and subcontractors bidding for work",
  },
  {
    name: "Engineering & Infrastructure",
    sub: "Consultancies competing on technical authority",
  },
  {
    name: "Real Estate & Property Developers",
    sub: "Developers whose buyers check them first",
  },
  {
    name: "Manufacturing",
    sub: "Producers whose buyers research before they quote",
  },
  {
    name: "Industrial",
    sub: "Plants and services under constant scrutiny",
  },
];

function WhoItsFor() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 lg:py-[124px] relative bg-[#EFEAE0]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_400px_at_85%_-10%,rgba(230,62,49,.09),transparent_70%)]" />
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-8 lg:gap-16 items-stretch mt-7">
          <Reveal className="flex flex-col justify-between gap-8">
            <div>
              <Kick label="02 · Who it is for" />
              <h2 className="max-w-[18ch] font-normal text-[30px] sm:text-4xl lg:text-[52px] leading-[1.12]">
                Built for the sectors we know the best.
              </h2>
            </div>
            <div className="relative overflow-hidden isolate bg-[#0A0A0A] text-white rounded-[18px] p-6 max-w-[440px] lg:max-w-none">
              <div className="pointer-events-none absolute -right-[70px] -top-[90px] w-[230px] h-[230px] rounded-full bg-[radial-gradient(circle,rgba(230,62,49,.3),transparent_68%)]" />
              <div className="relative z-[1]">
                <p className="font-normal text-lg sm:text-xl max-w-[20ch] leading-[1.24]">
                  See what the package would do for your name.
                </p>
                <Btn href="#book" variant="pale" className="mt-5 w-full">
                  Find out in 30 minutes
                </Btn>
              </div>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div className="flex flex-col border-t border-black/[0.16] isolate">
              {SECTORS.map((s, i) => (
                <div
                  key={s.name}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                  className="flex-1 flex relative isolate overflow-hidden border-b border-black/[0.11] transition-[background,box-shadow] duration-300 hover:bg-white hover:z-[3] hover:shadow-[0_14px_30px_-22px_rgba(10,10,10,.3)]"
                >
                  <div className="flex-1 grid grid-cols-[24px_minmax(0,1fr)] gap-5 content-center py-2.5 pr-6 transition-[padding] duration-300 group">
                    <span className="font-semibold text-[10px] tracking-[0.14em] text-[#E63E31] self-start pt-1.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium text-lg sm:text-xl lg:text-[22px] leading-[1.2]">
                        {s.name}
                      </span>
                      <span className="block text-[13.5px] text-[#77787B] leading-snug mt-1.5 whitespace-normal sm:whitespace-nowrap">
                        {s.sub}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-10 md:mt-12 lg:mt-[60px]">
          <Reveal className="flex items-center gap-3 mb-5">
            <i className="w-2 h-2 bg-[#E63E31] block flex-none" />
            <span className="font-normal text-[15px] sm:text-lg">
              What we usually hear in the first meeting.
            </span>
          </Reveal>
          <Reveal delay={70} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {QUOTES.map(([quote, tag], i) => {
              const isUniversal = i === QUOTES.length - 1;
              const isHighlighted = hovered === i;
              return (
                <div
                  key={tag}
                  className={`rounded-[18px] p-6 text-[15px] leading-[1.42] transition-all duration-300 border ${
                    isUniversal
                      ? "bg-[#0A0A0A] text-white border-transparent"
                      : "bg-white border-black/[0.11] shadow-[0_1px_2px_rgba(10,10,10,.03),0_8px_24px_-18px_rgba(10,10,10,.10)]"
                  } ${
                    isHighlighted
                      ? "border-[#E63E31] -translate-y-1 shadow-[0_2px_4px_rgba(10,10,10,.04),0_22px_44px_-26px_rgba(10,10,10,.24)]"
                      : ""
                  }`}
                >
                  {quote}
                  <em
                    className={`not-italic block mt-3 font-semibold text-[9px] tracking-[0.12em] uppercase ${
                      isUniversal ? "text-white/40" : "text-[#A0A1A4]"
                    }`}
                  >
                    {tag}
                  </em>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   03 · WHAT YOU GET
   ============================================================ */
const GROUPS: { title: string; items: { name: string; note: string }[] }[] = [
  {
    title: "Foundations",
    items: [
      { name: "A written plan", note: "Reviewed every 3 months" },
      { name: "Website upkeep", note: "Safe, fast, online" },
    ],
  },
  {
    title: "Getting found",
    items: [
      { name: "Google ranking", note: "4 new pages a month" },
      { name: "Showing up in AI answers", note: "Ongoing" },
      { name: "AI visibility checks", note: "Every month" },
      { name: "LinkedIn posts", note: "12 a month" },
      { name: "Photo and video", note: "1 site visit a month" },
    ],
  },
  {
    title: "Proof it works",
    items: [
      { name: "Monthly report", note: "One page, five minutes" },
      { name: "Tracking set up properly", note: "Named sources" },
      { name: "Monthly call", note: "With a senior person" },
      { name: "Website improvements", note: "Every 3 months" },
      { name: "Technical checks", note: "Problems caught early" },
    ],
  },
  {
    title: "Extra edge",
    items: [
      { name: "Competitor comparison", note: "3 rivals, every 3 months" },
      { name: "Posts for your boss", note: "4 a month, in their voice" },
    ],
  },
];

const WHY = [
  {
    tag: "Senior led",
    title: "One senior strategist",
    body: "A senior strategist reviews your account every month. Not a rotating junior team.",
  },
  {
    tag: "Sector fluent",
    title: "We already speak your language",
    body: "Tenders, JV structures and procurement cycles, across all five sectors we serve.",
  },
  {
    tag: "Credibility first",
    title: "Nothing ships we would not defend",
    body: "If we would not be comfortable presenting it to your senior stakeholders, it does not go out.",
  },
];

function WhatYouGet() {
  return (
    <section className="py-16 md:py-24 lg:py-[124px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-none mx-auto">
          <Kick label="03 · What you get" center />
          <h2 className="text-[27px] sm:text-4xl lg:text-[45px] leading-[1.15] mb-4">
            Everything in the package.
          </h2>
          <p className="max-w-[64ch] mx-auto text-[#77787B] text-base lg:text-lg">
            Fourteen services, every month, with one senior person in charge
            of all of them.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-10 lg:mt-13 items-stretch">
          {GROUPS.map((g, i) => (
            <Reveal
              key={g.title}
              delay={i * 70}
              className="bg-white border border-black/[0.11] rounded-[18px] p-6 shadow-[0_1px_2px_rgba(10,10,10,.03),0_8px_24px_-18px_rgba(10,10,10,.10)] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(10,10,10,.04),0_22px_44px_-26px_rgba(10,10,10,.24)] hover:border-black/[0.24]"
            >
              <div className="pb-4 mb-1 border-b border-black/[0.11]">
                <h3 className="font-semibold text-[11px] tracking-[0.12em] uppercase text-[#E63E31]">
                  {g.title}
                </h3>
              </div>
              <ul>
                {g.items.map((item, idx) => (
                  <li
                    key={item.name}
                    className={`text-[15px] py-3 flex gap-2.5 items-start ${
                      idx !== g.items.length - 1
                        ? "border-b border-black/[0.065]"
                        : ""
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-sm bg-[#E63E31] flex-none mt-1.5" />
                    <span>
                      {item.name}
                      <em className="not-italic block text-xs text-[#77787B] mt-1">
                        {item.note}
                      </em>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex justify-center my-14 md:my-16 lg:my-[76px]">
          <span className="relative isolate overflow-hidden inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#0A0A0A]">
            <span className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[radial-gradient(120%_180%_at_12%_0%,rgba(230,62,49,.34),transparent_62%)]" />
            <i className="w-2 h-2 bg-[#E63E31] block flex-none" />
            <span className="font-medium text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-[#FCFBF9] whitespace-normal sm:whitespace-nowrap text-center">
              Why this team? Not another agency
            </span>
          </span>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-left">
          {WHY.map((w, i) => (
            <Reveal
              key={w.tag}
              delay={i * 70}
              className="bg-[#F6F3EC] border border-transparent rounded-[18px] p-7 transition-all duration-300 hover:bg-[#0A0A0A] hover:shadow-[0_20px_44px_-26px_rgba(10,10,10,.5)] hover:-translate-y-1 group"
            >
              <b className="block mb-3 font-semibold text-[9.5px] tracking-[0.12em] uppercase text-[#E63E31]">
                {w.tag}
              </b>
              <strong className="block font-medium text-[17px] transition-colors duration-300 group-hover:text-[#FCFBF9]">
                {w.title}
              </strong>
              <p className="mt-2.5 text-sm text-[#77787B] leading-[1.45] transition-colors duration-300 group-hover:text-[#FCFBF9]/70">
                {w.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={210}
          className="mt-3 relative isolate overflow-hidden bg-[#0A0A0A] text-[#FCFBF9] rounded-[18px] px-6 sm:px-8 lg:px-11 py-6 sm:py-7 lg:py-9 flex items-center justify-between gap-6 flex-wrap flex-col sm:flex-row"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_150%_at_6%_0%,rgba(230,62,49,.26),transparent_62%)]" />
          <h3 className="font-normal text-[19px] sm:text-2xl lg:text-[26px] leading-tight text-white text-center sm:text-left">
            See how this would look for your name.
          </h3>
          <Btn href="#book" variant="pale" className="w-full sm:w-auto flex-none">
            Book a 30 Minute Call
          </Btn>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   04 · RESULTS YOU CAN EXPECT
   ============================================================ */
const OUTCOMES = [
  {
    num: "01",
    title: "Brand visibility",
    body: "Found by the procurement teams, developers and project owners already searching in your sector.",
  },
  {
    num: "02",
    title: "Credibility",
    body: "Your website and content hold up the moment someone checks you out before signing.",
  },
  {
    num: "03",
    title: "Talent & referral",
    body: "A dated footprint quietly costs candidate interest and caps how far referrals alone can take you.",
    disclaimer: "Context only. Not a tracked or guaranteed metric.",
  },
];

type ProofData = {
  url: string;
  before: string[];
  after: string[];
  metrics: [string, string][];
};

const PROOF: ProofData[] = [
  {
    url: 'google.ae · "concrete contractors dubai"',
    before: [
      "An old listing from 2019",
      "A LinkedIn page nobody has touched in a year",
      "Your website on page three",
      "Nothing else on page one",
    ],
    after: [
      "Verified Google listing",
      "An active LinkedIn page with twelve posts a month",
      "Your work on page one",
      "Real projects, photographed on site",
    ],
    metrics: [
      ["Where you rank", "Google Search Console"],
      ["Visitors from search", "Google Search Console"],
      ["Enquiries", "Analytics and your CRM"],
    ],
  },
  {
    url: 'chatgpt.com · "good MEP contractors in the UAE?"',
    before: [
      "It names four competitors",
      "You are not mentioned",
      "The buyer never sees you",
    ],
    after: [
      "Your company, named",
      "Clear pages mentioned about your work",
      "A list of real questions",
    ],
    metrics: [
      ["How often AI names you", "Fixed list of questions"],
      ["Is the answer correct", "Checked every month"],
    ],
  },
  {
    url: "Your monthly report",
    before: [
      "Posts published",
      "No starting point to compare against",
      "No explanation when numbers move",
    ],
    after: [
      "Every number against its target",
      "Where every number came from",
      "Why every number moved",
    ],
    metrics: [
      ["Ready for your board", "By design"],
      ["Bigger review", "Every three months"],
    ],
  },
];

function Results() {
  const [tab, setTab] = useState(0);
  const active = PROOF[tab];

  return (
    <section className="py-16 md:py-24 lg:py-[124px] relative bg-[#EFEAE0]" id="proof">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_400px_at_85%_-10%,rgba(230,62,49,.09),transparent_70%)]" />
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center relative">
        <Reveal>
          <Kick label="04 · Results you can expect" center />
          <h2 className="text-[30px] sm:text-4xl lg:text-[52px] leading-[1.12]">
            What changes in six months.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 lg:mt-13 text-left items-stretch">
          {OUTCOMES.map((o, i) => (
            <Reveal
              key={o.num}
              delay={i * 70}
              className="bg-white border border-black/[0.11] rounded-[18px] p-7 relative overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,.03),0_8px_24px_-18px_rgba(10,10,10,.10)] transition-all duration-300 hover:-translate-y-1 hover:border-black/[0.24] hover:shadow-[0_2px_4px_rgba(10,10,10,.04),0_22px_44px_-26px_rgba(10,10,10,.24)] group"
            >
              <b className="block mb-3.5 font-normal text-[44px] leading-none tracking-[-0.02em] text-[#E63E31]/[0.16] transition-colors duration-300 group-hover:text-[#E63E31]/30">
                {o.num}
              </b>
              <strong className="block font-medium text-lg sm:text-xl">
                {o.title}
              </strong>
              <p className="mt-2.5 text-[14.5px] text-[#77787B] leading-normal">
                {o.body}
              </p>
              {o.disclaimer && (
                <span className="block mt-3 text-[11px] text-[#E63E31] font-medium">
                  {o.disclaimer}
                </span>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className="max-w-[64ch] mx-auto mt-8 md:mt-10 lg:mt-11 text-base lg:text-lg text-[#77787B]">
          “Pick a moment and see what happens once all fourteen services are
          running together.”
        </Reveal>

        <Reveal delay={70}>
          <div
            role="tablist"
            className="inline-flex bg-white border border-black/[0.11] rounded-full p-1.5 gap-0.5 mt-10 md:mt-12 lg:mt-[58px] shadow-[0_1px_2px_rgba(10,10,10,.03),0_8px_24px_-18px_rgba(10,10,10,.10)] max-w-full overflow-x-auto"
          >
            {["A Google search", "Asking an AI", "Your monthly report"].map(
              (label, i) => (
                <button
                  key={label}
                  role="tab"
                  aria-selected={tab === i}
                  onClick={() => setTab(i)}
                  className={`font-medium text-[12.5px] px-5 py-2.5 rounded-full whitespace-nowrap transition-colors duration-200 ${
                    tab === i
                      ? "bg-[#0A0A0A] text-white"
                      : "text-[#77787B] hover:text-[#0A0A0A]"
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>
        </Reveal>

        <Reveal delay={140} className="mt-8 rounded-[18px] overflow-hidden bg-white border border-black/[0.11] shadow-[0_34px_76px_-46px_rgba(10,10,10,.32)] text-left">
          <div className="flex items-center gap-2.5 px-5 sm:px-6 py-3.5 bg-[#F6F4EF] border-b border-black/[0.065]">
            <i className="w-[7px] h-[7px] bg-[#E63E31] block flex-none" />
            <span className="text-[11.5px] text-[#77787B] overflow-hidden text-ellipsis whitespace-nowrap">
              {active.url}
            </span>
            <em className="ml-auto not-italic text-[9px] tracking-[0.12em] uppercase text-[#E63E31] border border-[#E63E31]/30 rounded-full px-2.5 py-1 flex-none">
              Illustrative
            </em>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2" key={tab}>
            <div className="p-6 sm:p-8">
              <b className="flex items-center gap-2 mb-5 font-semibold text-[10px] tracking-[0.12em] uppercase text-[#77787B]">
                <span className="w-[7px] h-[7px] bg-current flex-none" />
                What they find today
              </b>
              {active.before.map((line, i) => (
                <div
                  key={line}
                  style={{ animationDelay: `${i * 55}ms` }}
                  className="py-3.5 border-b border-black/[0.065] last:border-0 flex gap-3 items-start opacity-0 animate-rowIn"
                >
                  <i className="w-1.5 h-1.5 rounded-sm bg-[#D5D6D6] flex-none mt-2" />
                  <p className="text-base leading-normal">{line}</p>
                </div>
              ))}
            </div>
            <div className="p-6 sm:p-8 border-t md:border-t-0 md:border-l border-black/[0.065] bg-gradient-to-b from-[#E63E31]/[0.028] to-transparent">
              <b className="flex items-center gap-2 mb-5 font-semibold text-[10px] tracking-[0.12em] uppercase text-[#E63E31]">
                <span className="w-[7px] h-[7px] bg-current flex-none" />
                After six months with us
              </b>
              {active.after.map((line, i) => (
                <div
                  key={line}
                  style={{ animationDelay: `${i * 55}ms` }}
                  className="py-3.5 border-b border-black/[0.065] last:border-0 flex gap-3 items-start opacity-0 animate-rowIn"
                >
                  <i className="w-1.5 h-1.5 rounded-sm bg-[#E63E31] flex-none mt-2" />
                  <p className="text-base leading-normal">{line}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2.5 p-5 bg-[#F6F4EF] border-t border-black/[0.065] flex-wrap">
            {active.metrics.map(([label, source]) => (
              <span
                key={label}
                className="bg-white border border-black/[0.11] rounded-full px-4 py-2 text-xs text-[#77787B]"
              >
                <b className="font-semibold text-[#0A0A0A] text-xs">
                  {label}
                </b>{" "}
                · {source}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   05 · THE TOOLS
   ============================================================ */
const TOOL_SETS: Record<string, string[]> = {
  a: [
    "Google Analytics 4",
    "Google Search Console",
    "Looker Studio",
    "LinkedIn Analytics",
    "Zoho CRM",
    "Google Business Profile",
  ],
  b: [
    "Ahrefs",
    "Semrush",
    "Screaming Frog",
    "Schema.org",
    "PageSpeed Insights",
    "Google Tag Manager",
  ],
  c: [
    "ChatGPT",
    "Google AI Overviews",
    "Perplexity",
    "Gemini",
    "Claude",
    "Microsoft Copilot",
  ],
};

function ToolRow({
  toolSet,
  reverse = false,
  durationSec = 38,
}: {
  toolSet: string[];
  reverse?: boolean;
  durationSec?: number;
}) {
  const loop = [...toolSet, ...toolSet, ...toolSet];
  return (
    <div className="overflow-hidden py-2 group">
      <div
        className="flex gap-2.5 w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${durationSec}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="inline-flex items-center gap-2.5 bg-white/[0.045] border border-white/[0.12] rounded-full pl-3.5 pr-5 py-3 text-[15px] text-white/[0.82] flex-none transition-all duration-200 hover:border-[#E63E31] hover:text-white hover:bg-[#E63E31]/10 hover:-translate-y-0.5"
          >
            <i className="w-[22px] h-[22px] rounded-md bg-white/[0.06] border border-dashed border-white/[0.18] block flex-none" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

function Tools() {
  return (
    <section className="py-16 md:py-24 lg:py-[124px] bg-[#131317] text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_12%_0%,rgba(230,62,49,.14),transparent_66%)]" />
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center relative">
        <Reveal>
          <Kick label="05 · The tools we work in" dark center />
          <h2 className="text-[30px] sm:text-4xl lg:text-[52px] leading-[1.12]">
            The tools we work in on your behalf.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={70} className="relative mt-10 md:mt-12 lg:mt-[60px]">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[60px] sm:w-[170px] z-[3] bg-gradient-to-r from-[#131317] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[60px] sm:w-[170px] z-[3] bg-gradient-to-l from-[#131317] to-transparent" />
        <ToolRow toolSet={TOOL_SETS.a} durationSec={38} />
        <ToolRow toolSet={TOOL_SETS.b} reverse durationSec={38} />
        <ToolRow toolSet={TOOL_SETS.c} durationSec={52} />
      </Reveal>
    </section>
  );
}

/* ============================================================
   06 · PRICING
   ============================================================ */
const PRICING_ROWS: { label: string; growth: boolean; plus: boolean }[] = [
  { label: "All 14 services", growth: true, plus: true },
  { label: "One senior strategist", growth: true, plus: true },
  { label: "Google ranking and AI answers", growth: true, plus: true },
  { label: "Website upkeep and monthly checks", growth: true, plus: true },
  {
    label: "LinkedIn posts and one shoot day a month",
    growth: true,
    plus: true,
  },
  { label: "Posts for one senior leader", growth: true, plus: true },
  { label: "Signed baseline in week two", growth: true, plus: true },
  { label: "Monthly report & senior call", growth: true, plus: true },
  {
    label: "Several companies, brands or countries",
    growth: false,
    plus: true,
  },
  { label: "Posts for multiple leaders", growth: false, plus: true },
  {
    label: "Extended content production & more social media output",
    growth: false,
    plus: true,
  },
  { label: "Expanded competitive intelligence", growth: false, plus: true },
];

function Dot({ yes }: { yes: boolean }) {
  return yes ? (
    <span className="inline-block w-2 h-2 rounded-sm bg-[#E63E31]" />
  ) : (
    <span className="inline-block w-2 h-2 rounded-sm border border-[#D6D2C8]" />
  );
}

function Pricing() {
  return (
    <section className="py-16 md:py-24 lg:py-[124px]" id="pricing">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-none mx-auto">
          <Kick label="06 · Pricing" center />
          <h2 className="text-[27px] sm:text-4xl lg:text-[45px] leading-[1.15] mb-4">
            One package, one price.
          </h2>
          <p className="max-w-[64ch] mx-auto text-[#77787B] text-base lg:text-lg">
            Almost every firm we work with takes the Growth Partnership. Plus
            exists for groups running several companies at once.
          </p>
        </Reveal>

        <Reveal
          delay={70}
          className="mt-10 lg:mt-13 bg-white border border-black/[0.11] rounded-[18px] overflow-hidden text-left shadow-[0_26px_60px_-46px_rgba(10,10,10,.34)]"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[660px]">
              <thead>
                <tr>
                  <th className="text-left align-bottom pt-5 pb-4 px-6 font-semibold text-[10.5px] tracking-[0.12em] uppercase text-[#77787B] border-b border-black/[0.065]" style={{ width: "56%" }}>
                    What you get
                  </th>
                  <th className="text-left align-bottom pt-5 pb-4 px-6 font-semibold text-[10.5px] tracking-[0.12em] uppercase text-[#77787B] border-b border-black/[0.065] bg-gradient-to-b from-[#E63E31]/[0.07] to-[#E63E31]/[0.02] shadow-[inset_0_2px_0_#E63E31]" style={{ width: "22%" }}>
                    What most firms take
                    <span className="block text-base normal-case text-[#E63E31] mt-1.5 font-medium">
                      Growth Partnership
                    </span>
                    <span className="block font-normal text-xs normal-case text-[#77787B] mt-0.5">
                      From AED 10,000 a month
                    </span>
                  </th>
                  <th className="text-left align-bottom pt-5 pb-4 px-6 font-semibold text-[10.5px] tracking-[0.12em] uppercase text-[#77787B] border-b border-black/[0.065]" style={{ width: "22%" }}>
                    Only if you run several companies
                    <span className="block text-base normal-case text-[#0A0A0A] mt-1.5 font-medium">
                      Plus
                    </span>
                    <span className="block font-normal text-xs normal-case text-[#77787B] mt-0.5">
                      Custom price
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRICING_ROWS.map((row) => (
                  <tr key={row.label} className="hover:bg-[#FCFBF9]">
                    <td className="px-6 py-4 text-[15px] border-b border-black/[0.065]">
                      {row.label}
                    </td>
                    <td className="px-6 py-4 text-center border-b border-black/[0.065] bg-[#E63E31]/[0.022]">
                      <Dot yes={row.growth} />
                    </td>
                    <td className="px-6 py-4 text-center border-b border-black/[0.065]">
                      <Dot yes={row.plus} />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="px-6 pt-[18px] pb-5 text-[13px] text-[#0A0A0A] align-top bg-[#FBFAF7]">
                    Term and billing
                  </td>
                  <td className="px-6 pt-[18px] pb-5 text-[13px] text-[#77787B] align-top bg-[#FBFAF7] text-center">
                    12 months. Google ranking work has a 6 month minimum. VAT
                    not included.
                  </td>
                  <td className="px-6 pt-[18px] pb-5 text-[13px] text-[#77787B] align-top bg-[#FBFAF7] text-center">
                    Set with you, always in a written proposal.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={140} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <Btn href="#book" className="w-full">
            Book a 30 Minute Call
          </Btn>
          <Btn href="#book" variant="line" className="w-full">
            Run several companies? Ask about Plus
          </Btn>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   07 · TESTIMONIALS
   ============================================================ */
type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Global Surf proved to be a talented group that delivered their project in excellent manner. They are responsive, and we trusted them day by day with more tasks and they continue to prove their capabilities.",
    name: "Karim El Shennawy",
    role: "Business Development Director · ASGC",
    initials: "KE",
  },
  {
    quote:
      "Caring team, looks out for what you want and makes sure to give you the outcome you want, quick. You will find them next to you in critical moments.",
    name: "Alissar Nasrallah",
    role: "Regional Marcomms Manager · Gulf Cryo",
    initials: "AN",
  },
  {
    quote:
      "Working with Global Surf was an exceptional experience. Their customer support was outstanding, making the entire process smooth and efficient. I highly recommend Global Surf for their expertise, dedication, and ability to bring a brand's digital presence to life.",
    name: "Jad Farah",
    role: "Group Marketing Manager · ECC LLC",
    initials: "JF",
  },
  {
    quote:
      "Because of the way that Global Surf encourages collaboration, working with the team has been a pleasure. Their staff welcomes our input and fosters open communication, which has led to a website that reflects our brand and serves our particular demands.",
    name: "Hesham Abdeen",
    role: "Head of Accreditation and Evaluations · Educap",
    initials: "HA",
  },
  {
    quote:
      "We have a very good relationship and experience with your professional company. Not to mention the extra care we get from your team. We would like this relationship to continue for the success of both of us.",
    name: "Omar M. Bin Dhaher Almheiri",
    role: "President · Prestige",
    initials: "OA",
  },
];

function TestimonialNav({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <button
        type="button"
        aria-label="Previous testimonial"
        onClick={onPrev}
        className="w-12 h-12 rounded-full border border-black/[0.11] bg-white text-[#77787B] flex items-center justify-center flex-none transition-all duration-200 hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] hover:scale-105"
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Next testimonial"
        onClick={onNext}
        className="w-12 h-12 rounded-full border border-black/[0.11] bg-white text-[#77787B] flex items-center justify-center flex-none transition-all duration-200 hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] hover:scale-105"
      >
        →
      </button>
    </>
  );
}

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const go = useCallback((next: number) => {
    setVisible(false);
    window.setTimeout(() => {
      setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
      setVisible(true);
    }, 150);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <section className="py-16 md:py-24 lg:py-[124px] relative bg-[#EFEAE0]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_400px_at_85%_-10%,rgba(230,62,49,.09),transparent_70%)]" />
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center relative">
        <Reveal>
          <Kick label="07 · Testimonials" center />
          <h2 className="text-[30px] sm:text-4xl lg:text-[52px] leading-[1.12]">
            See what our clients have to say about us.
          </h2>
        </Reveal>

        <Reveal delay={70} className="hidden sm:grid grid-cols-[auto_minmax(0,760px)_auto] gap-[18px] items-center justify-center mt-10 lg:mt-13 mx-auto w-fit max-w-full">
          <TestimonialNav onPrev={() => go(index - 1)} onNext={() => go(index + 1)} />
        </Reveal>

        <Reveal delay={70} className="mt-10 lg:mt-13">
          <div className="flex items-center justify-center gap-[18px]">
            <div className="hidden sm:block">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(index - 1)}
                className="w-12 h-12 rounded-full border border-black/[0.11] bg-white text-[#77787B] flex items-center justify-center transition-all duration-200 hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] hover:scale-105"
              >
                ←
              </button>
            </div>

            <figure className="bg-white border border-black/[0.11] rounded-[18px] p-7 sm:p-9 lg:p-11 text-left shadow-[0_1px_2px_rgba(10,10,10,.03),0_8px_24px_-18px_rgba(10,10,10,.10)] max-w-[760px] w-full">
              <div className="text-[#E63E31] tracking-[5px] text-xs mb-[18px]">
                ★★★★★
              </div>
              <blockquote
                className={`font-normal text-lg sm:text-xl lg:text-2xl leading-[1.45] min-h-[112px] transition-opacity duration-300 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
              >
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3.5 mt-[26px] pt-[22px] border-t border-black/[0.065]">
                <span className="w-[46px] h-[46px] rounded-full bg-[#EFEAE0] border border-dashed border-black/[0.18] flex-none flex items-center justify-center font-medium text-sm text-[#B4B3AF]">
                  {t.initials}
                </span>
                <span>
                  <b className="block font-medium text-[14.5px]">
                    {t.name}
                  </b>
                  <span className="block text-xs text-[#77787B] mt-0.5">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>

            <div className="hidden sm:block">
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(index + 1)}
                className="w-12 h-12 rounded-full border border-black/[0.11] bg-white text-[#77787B] flex items-center justify-center transition-all duration-200 hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] hover:scale-105"
              >
                →
              </button>
            </div>
          </div>

          <div className="sm:hidden flex justify-center gap-3.5 mt-[22px]">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => go(index - 1)}
              className="w-12 h-12 rounded-full border border-black/[0.11] bg-white text-[#77787B] flex items-center justify-center"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => go(index + 1)}
              className="w-12 h-12 rounded-full border border-black/[0.11] bg-white text-[#77787B] flex items-center justify-center"
            >
              →
            </button>
          </div>
        </Reveal>

        <Reveal delay={140} className="flex gap-1.5 justify-center mt-6">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => go(i)}
              className={`h-[7px] rounded-full transition-all duration-200 ${
                i === index ? "w-5 bg-[#E63E31]" : "w-[7px] bg-[#D3D4D5]"
              }`}
            />
          ))}
        </Reveal>

        <Reveal delay={140} className="mt-6">
          <span className="inline-flex items-center gap-2.5 bg-white border border-black/[0.11] rounded-full px-[18px] py-2.5 text-[12.5px] text-[#77787B]">
            <b className="font-semibold text-[#0A0A0A] text-[13px]">4.9</b> on
            Google Reviews · Trusted by 125+ brands across the UAE
          </span>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   08 · QUESTIONS (FAQ)
   ============================================================ */
type FaqItem = { q: string; a: string };

const FAQ_COL_1: FaqItem[] = [
  {
    q: "What is included?",
    a: "Fourteen services, one senior lead, and a monthly report. Everything in the list above runs every month for the same fee.",
  },
  {
    q: "What is not included?",
    a: "Your ad budget, a brand new website, a new logo and PR work. Those are separate jobs with separate prices, and we will say so on the first call rather than in month four.",
  },
  {
    q: "How does reporting work?",
    a: "Six numbers on one page, every month, plus a call with a senior person to walk through them. Every three months the review goes deeper.",
  },
];

const FAQ_COL_2: FaqItem[] = [
  {
    q: "How does the first month run?",
    a: "The first two weeks are spent writing down exactly where you stand today, and both sides sign it. Your first piece of work goes live within seven working days.",
  },
  {
    q: "Who works on our account?",
    a: "A senior specialist with more than ten years of experience reviews it every month. Junior staff do the production. Senior staff own the result.",
  },
  {
    q: "What if the targets are missed?",
    a: "You choose. We keep working at no extra cost, or we rewrite the plan at the same price.",
  },
];

function FaqColumn({
  items,
  defaultOpenIndex,
}: {
  items: FaqItem[];
  defaultOpenIndex?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex ?? null
  );

  return (
    <div className="border-t border-black/[0.11]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} className="border-b border-black/[0.11]">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full text-left cursor-pointer py-6 pr-11 font-medium text-[17px] sm:text-xl relative transition-colors duration-200 hover:text-[#E63E31]"
            >
              {item.q}
              <span
                className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-[13px] h-[1.5px] bg-[#E63E31] transition-transform duration-300 ${
                  isOpen ? "rotate-0" : ""
                }`}
              />
              <span
                className={`absolute right-[11.7px] top-1/2 -translate-y-1/2 w-[1.5px] h-[13px] bg-[#E63E31] transition-all duration-300 ${
                  isOpen ? "opacity-0 rotate-90" : "opacity-100"
                }`}
              />
            </button>
            {isOpen && (
              <p className="text-base leading-[1.55] text-[#77787B] pr-10 pb-6 animate-[fadeIn_.35s_ease]">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Faq() {
  return (
    <section className="py-16 md:py-24 lg:py-[124px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-none mx-auto">
          <Kick label="08 · Questions" center />
          <h2 className="text-[27px] sm:text-4xl lg:text-[45px] leading-[1.15]">
            Everything you need to know before we begin.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-x-14 mt-10 lg:mt-13">
          <Reveal>
            <FaqColumn items={FAQ_COL_1} defaultOpenIndex={0} />
          </Reveal>
          <Reveal delay={70}>
            <FaqColumn items={FAQ_COL_2} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   09 · NEXT STEP (Lead form)
   ============================================================ */
const SECTOR_OPTIONS = [
  "Construction",
  "Engineering & Infrastructure",
  "Real Estate & Property Developers",
  "Manufacturing",
  "Industrial",
  "Something else",
];

function FinalCta() {
  const [note, setNote] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = formRef.current?.checkValidity();
    setNote(
      valid
        ? "Demo only. Connect this form to your CRM before launch."
        : "Please complete the required fields."
    );
  };

  return (
    <section className="bg-black text-white relative overflow-hidden" id="book">
      <div className="pointer-events-none absolute -left-40 -top-52 w-[760px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(230,62,49,.17),transparent_66%)]" />
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-[72px] items-center py-16 md:py-24 lg:py-[110px]">
          <Reveal>
            <Kick label="09 · Next step" dark />
            <h2 className="text-white max-w-[16ch] text-[30px] sm:text-4xl lg:text-[52px] leading-[1.12]">
              Start with a 30 minute call.
            </h2>
            <p className="mt-[18px] text-white/60 text-base lg:text-lg max-w-[46ch]">
              Tell us what you build. We will tell you whether this package
              fits, and what we would do first.
            </p>
          </Reveal>

          <Reveal delay={70}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="bg-white/[0.035] border border-white/[0.13] rounded-[18px] p-7 backdrop-blur-[6px]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Name" id="n" type="text" autoComplete="name" required />
                <Field
                  label="Company"
                  id="c"
                  type="text"
                  autoComplete="organization"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <Field
                  label="Work email"
                  id="e"
                  type="email"
                  autoComplete="email"
                  required
                />
                <Field label="Phone" id="p" type="tel" autoComplete="tel" />
              </div>

              <div className="mb-3 mt-3">
                <label
                  htmlFor="s"
                  className="block font-medium text-[9.5px] tracking-[0.12em] uppercase text-white/[0.42] mb-2"
                >
                  Which sector are you in?
                </label>
                <select
                  id="s"
                  required
                  defaultValue=""
                  className="w-full bg-black/40 border border-white/[0.13] text-white text-base py-3.5 px-4 rounded-[10px] outline-none transition-colors duration-200 focus:border-[#E63E31] focus:bg-black/[0.62] appearance-none bg-[right_19px_center] bg-no-repeat"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg,transparent 50%,rgba(255,255,255,.4) 50%),linear-gradient(135deg,rgba(255,255,255,.4) 50%,transparent 50%)",
                    backgroundPosition:
                      "calc(100% - 19px) 50%, calc(100% - 14px) 50%",
                    backgroundSize: "5px 5px, 5px 5px",
                  }}
                >
                  <option value="">Select one</option>
                  {SECTOR_OPTIONS.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <Btn type="submit" className="w-full mt-2">
                Book a 30 Minute Call
              </Btn>
              <p className="text-[11.5px] text-[#E63E31] mt-3.5 text-center min-h-[16px]">
                {note}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  type,
  autoComplete,
  required,
}: {
  label: string;
  id: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-medium text-[9.5px] tracking-[0.12em] uppercase text-white/[0.42] mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full bg-black/40 border border-white/[0.13] text-white text-base py-3.5 px-4 rounded-[10px] outline-none transition-colors duration-200 focus:border-[#E63E31] focus:bg-black/[0.62]"
      />
    </div>
  );
}

/* ============================================================
   Root component
   ============================================================ */
export default function GrowthPartnershipLanding() {
  return (
    <main className="bg-[#FCFBF9] text-[#0A0A0A] font-sans antialiased selection:bg-[#E63E31] selection:text-white overflow-x-hidden">
      <ScrollProgress />
      <Hero />
      <WhoItsFor />
      <WhatYouGet />
      <Results />
      <Tools />
      <Pricing />
      <Testimonials />
      <Faq />
      <FinalCta />
    </main>
  );
}
