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
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { submitBooking } from "@/app/actions/submitBooking";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { Clientsdata } from "@/app/data/Clientsdata";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";
import { scrollToContact } from "../HomePage/HeaderWithoutMenu";
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
      "(prefers-reduced-motion: reduce)",
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
      { threshold: 0.12, rootMargin: "0px 0px -60px" },
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
    <Component
      ref={ref}
      style={style}
      className={`${revealClass} ${className}`}
    >
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
      className="linear pointer-events-none fixed left-0 top-0 z-[100] h-[2px] bg-[#E63E31] transition-[width] duration-100"
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
      className={`mb-5 inline-flex items-center gap-2.5 ${
        center ? "mx-auto" : ""
      }`}
    >
      <i className="block h-2 w-2 flex-none bg-[#E63E31]" />
      <span
        className={`text-[11px] font-medium uppercase tracking-[0.12em] ${
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
  disabled,
}: {
  href?: string;
  children: ReactNode;
  variant?: "solid" | "line" | "pale";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2.5 font-medium text-sm px-7 py-4 rounded-[10px] border transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
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
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}

function Marquee({
  children,
  durationSec = 42,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  durationSec?: number;
  reverse?: boolean;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const dragState = useRef<{ startX: number; startOffset: number } | null>(
    null,
  );
  const [manualOffset, setManualOffset] = useState(0);

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    dragState.current = { startX: e.clientX, startOffset: manualOffset };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    setManualOffset(dragState.current.startOffset + dx);
  };

  const endDrag = () => {
    setDragging(false);
    dragState.current = null;
  };

  const isPaused = dragging || hovered;

  return (
    <div
      className={`marquee-viewport  select-none ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // style={{ cursor: dragging ? "grabbing" : "grab", touchAction: "pan-y" }}
    >
      <style jsx>{`
        @keyframes marqueeScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          animation-name: marqueeScroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
      <div
        ref={trackRef}
        className="marquee-track flex w-max gap-3.5"
        style={{
          animationDuration: `${durationSec}s`,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: isPaused ? "paused" : "running",
          transform: dragging ? `translateX(${manualOffset}px)` : undefined,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   01 · HERO
   ============================================================ */
function Hero() {
  // const clientNames = [
  //   "ASGC",
  //   "SOBHA",
  //   "GULF CRYO",
  //   "BAFCO",
  //   "BUKHATIR",
  //   "CONMIX",
  //   "INNOVO",
  //   "ASSENT STEEL",
  //   "BEC ARABIA",
  //   "PRESTIGE",
  // ];

  const loop = [...Clientsdata, ...Clientsdata];

  const offers = [
    { n: "01", label: "Get Found" },
    { n: "02", label: "Look Credible" },
    { n: "03", label: "Stay Ahead" },
    { n: "04", label: "Keep Improving" },
  ];

  return (
    <section className="relative overflow-hidden bg-black  pt-16 text-white  md:pt-20  lg:pt-[92px]">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -right-56 -top-80 h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(230,62,49,.18)_0%,rgba(230,62,49,0)_63%)]" />
      <div className="pointer-events-none absolute -bottom-80 -left-64 h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(230,62,49,.08)_0%,rgba(230,62,49,0)_66%)]" />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid min-h-[520px] grid-cols-1 items-stretch gap-9 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
          <Reveal className="flex flex-col justify-center">
            <Kick label="Growth Partnership" dark />
            <h1 className="max-w-[17ch] text-[34px] font-normal leading-[1.16] text-white sm:text-5xl lg:text-[62px]">
              Everything your digital marketing needs,{" "}
              <span className="text-[#E63E31]">in one package</span>
            </h1>
            <p className="mt-6 max-w-[46ch] text-base leading-normal text-white/60 lg:text-lg">
              Fourteen coordinated services under one senior team. Built for the
              UAE companies that build, make, supply and develop.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Btn onClick={scrollToContact}>Get Started</Btn>
            </div>

            <div className="mt-11 grid grid-cols-4 border-t border-white/[0.16]">
              {offers.map((o, i) => (
                <div
                  key={o.n}
                  className={`px-4 pt-5 first:border-l-0 first:pl-0 ${
                    i > 0 ? "border-l border-white/[0.16]" : ""
                  }`}
                >
                  <b className="mb-2.5 block text-[9px] font-semibold tracking-[0.12em] text-[#E63E31]">
                    {o.n}
                  </b>
                  <strong className="block text-base font-medium leading-tight text-white">
                    {o.label}
                  </strong>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={140}
            className="relative flex items-stretch justify-start lg:justify-end"
          >
            <div className="relative aspect-[4/5] h-auto w-full max-w-[430px] overflow-hidden rounded-[18px] border border-white/10 bg-[#0A0A0C] lg:h-full lg:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-team.jpg"
                alt="Engineers and designers reviewing drawings, material samples and site plans"
                className="block h-full w-full object-contain"
              />
            </div>
            <div className="static mt-3.5 max-w-none rounded-[13px] border border-white/[0.14] bg-[#101012] px-[14px] py-3.5 text-white shadow-none lg:absolute lg:-left-6 lg:bottom-6 lg:mt-0 lg:max-w-[196px] lg:shadow-[0_24px_58px_rgba(0,0,0,.68)]">
              <div className="flex items-baseline gap-1">
                <b className="text-[23px] font-normal">
                  12
                  <em className="align-super text-lg not-italic text-[#E63E31]">
                    +
                  </em>
                </b>

                <span className="text-[16px]">years in the UAE</span>
              </div>

              <span className="mt-1 block text-[12px] leading-normal text-white/[0.60]">
                50+ Passionate Professionals
                <br />
                140+ Successful Client Partnerships
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-11 w-full border-t bg-white pb-7 pt-7 md:mt-14 lg:mt-[74px]">
        <div className="mb-5 text-center text-[10px] uppercase tracking-[0.14em] text-black">
          Trusted by Built Environment leaders
        </div>
        <div className="group relative overflow-hidden">
          {/* `<div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-24 bg-gradient-to-r from-black to-transparent sm:w-[150px]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-24 bg-gradient-to-l from-black to-transparent sm:w-[150px]" />` */}
          <Marquee durationSec={42}>
            {loop.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex h-14 w-[170px] flex-none items-center justify-center rounded-[10px] border border-dashed border-white/[0.15] bg-white/[0.035] px-4 text-[10px] font-medium tracking-[0.1em] text-white/40 transition-colors duration-300 hover:border-[#E63E31] hover:bg-[#E63E31]/[0.07] hover:text-[#E63E31]"
              >
                <div className="relative h-16 w-full">
                  <Image
                    src={name.image}
                    alt={name.alt}
                    fill
                    sizes="270px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
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
    <section className="relative bg-[#EFEAE0] py-16 md:py-24 lg:py-[124px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_400px_at_85%_-10%,rgba(230,62,49,.09),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="mt-7 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <Reveal className="flex flex-col justify-between gap-8">
            <div>
              <Kick label="02 · Who it is for" />
              <h2 className="max-w-[18ch] text-[30px] font-normal  !leading-[1.02]  sm:text-4xl lg:text-[52px] ">
                Built for the sectors we know the best.
              </h2>
            </div>
            <div className="relative isolate max-w-[440px] overflow-hidden rounded-[18px] bg-[#0A0A0A] p-6 text-white lg:max-w-none">
              <div className="pointer-events-none absolute -right-[70px] -top-[90px] h-[230px] w-[230px] rounded-full bg-[radial-gradient(circle,rgba(230,62,49,.3),transparent_68%)]" />
              <div className="relative z-[1]">
                <p className="max-w-[20ch] text-lg font-normal leading-[1.24] sm:text-xl">
                  See what the package would do for your name.
                </p>
                <Btn
                  onClick={scrollToContact}
                  // href={"#book"}
                  variant="pale"
                  className="mt-5 w-full"
                >
                  Find out in 30 minutes
                </Btn>
              </div>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div className="isolate flex flex-col border-t border-black/[0.16]">
              {SECTORS.map((s, i) => (
                <div
                  key={s.name}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                  className="relative isolate flex flex-1 overflow-hidden border-b border-black/[0.11] transition-[background,box-shadow] duration-300 hover:z-[3] hover:bg-white hover:shadow-[0_14px_30px_-22px_rgba(10,10,10,.3)]"
                >
                  <div className="group grid flex-1 grid-cols-[24px_minmax(0,1fr)] content-center gap-5 py-2.5 pr-6 transition-[padding] duration-300">
                    <span className="self-start pt-1.5 text-[10px] font-semibold tracking-[0.14em] text-[#E63E31]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-lg font-medium leading-[1.2] sm:text-xl lg:text-[22px]">
                        {s.name}
                      </span>
                      <span className="mt-1.5 block whitespace-normal text-[13.5px] leading-snug text-[#77787B] sm:whitespace-nowrap">
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
          <Reveal className="mb-5 flex items-center gap-3">
            <i className="block h-2 w-2 flex-none bg-[#E63E31]" />
            <span className="text-[15px] font-normal sm:text-lg">
              What we usually hear in the first meeting.
            </span>
          </Reveal>
          <Reveal
            delay={70}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {QUOTES.map(([quote, tag], i) => {
              const isUniversal = i === QUOTES.length - 1;
              const isHighlighted = hovered === i;
              return (
                <div
                  key={tag}
                  className={`rounded-[18px] border p-6 text-[15px] leading-[1.42] transition-all duration-300 ${
                    isUniversal
                      ? "border-transparent bg-[#0A0A0A] text-white"
                      : "border-black/[0.11] bg-white shadow-[0_1px_2px_rgba(10,10,10,.03),0_8px_24px_-18px_rgba(10,10,10,.10)]"
                  } ${
                    isHighlighted
                      ? "-translate-y-1 border-[#E63E31] shadow-[0_2px_4px_rgba(10,10,10,.04),0_22px_44px_-26px_rgba(10,10,10,.24)]"
                      : ""
                  }`}
                >
                  {quote}
                  <em
                    className={`mt-3 block text-[9px] font-semibold uppercase not-italic tracking-[0.12em] ${
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
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal className="mx-auto max-w-none text-center">
          <Kick label="03 · What you get" center />
          <h2 className="mb-4 text-[27px] leading-[1.15] sm:text-4xl lg:text-[45px]">
            Everything in the package.
          </h2>
          <p className="mx-auto max-w-[64ch] text-base text-[#77787B] lg:text-lg">
            Fourteen services, every month, with one senior person in charge of
            all of them.
          </p>
        </Reveal>

        <div className="lg:mt-13 mt-10 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((g, i) => (
            <Reveal
              key={g.title}
              delay={i * 70}
              className="flex flex-col rounded-[18px] border border-black/[0.11] bg-white p-6 shadow-[0_1px_2px_rgba(10,10,10,.03),0_8px_24px_-18px_rgba(10,10,10,.10)] transition-all duration-300 hover:-translate-y-1 hover:border-black/[0.24] hover:shadow-[0_2px_4px_rgba(10,10,10,.04),0_22px_44px_-26px_rgba(10,10,10,.24)]"
            >
              <div className="mb-1 border-b border-black/[0.11] pb-4">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E63E31]">
                  {g.title}
                </h3>
              </div>
              <ul>
                {g.items.map((item, idx) => (
                  <li
                    key={item.name}
                    className={`flex items-start gap-2.5 py-3 text-[15px] ${
                      idx !== g.items.length - 1
                        ? "border-b border-black/[0.065]"
                        : ""
                    }`}
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-sm bg-[#E63E31]" />
                    <span>
                      {item.name}
                      <em className="mt-1 block text-xs not-italic text-[#77787B]">
                        {item.note}
                      </em>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="my-14 flex justify-center md:my-16 lg:my-[76px]">
          <span className="relative isolate inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#0A0A0A] px-6 py-3 sm:px-7">
            <span className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[radial-gradient(120%_180%_at_12%_0%,rgba(230,62,49,.34),transparent_62%)]" />
            <i className="block h-2 w-2 flex-none bg-[#E63E31]" />
            <span className="whitespace-normal text-center text-[10px] font-medium uppercase tracking-[0.12em] text-[#FCFBF9] sm:whitespace-nowrap sm:text-[11px]">
              Why this team? Not another agency
            </span>
          </span>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 text-left lg:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal
              key={w.tag}
              delay={i * 70}
              className="group rounded-[18px] border border-transparent bg-[#F6F3EC] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-[#0A0A0A] hover:shadow-[0_20px_44px_-26px_rgba(10,10,10,.5)]"
            >
              <b className="mb-3 block text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[#E63E31]">
                {w.tag}
              </b>
              <strong className="block text-[17px] font-medium transition-colors duration-300 group-hover:text-[#FCFBF9]">
                {w.title}
              </strong>
              <p className="mt-2.5 text-sm leading-[1.45] text-[#77787B] transition-colors duration-300 group-hover:text-[#FCFBF9]/70">
                {w.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={210}
          className="relative isolate mt-3 flex flex-col flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[18px] bg-[#0A0A0A] px-6 py-6 text-[#FCFBF9] sm:flex-row sm:px-8 sm:py-7 lg:px-11 lg:py-9"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_150%_at_6%_0%,rgba(230,62,49,.26),transparent_62%)]" />
          <h3 className="text-center text-[19px] font-normal leading-tight text-white sm:text-left sm:text-2xl lg:text-[26px]">
            See how this would look for your name.
          </h3>
          <Btn
            onClick={scrollToContact}
            variant="pale"
            className="w-full flex-none sm:w-auto"
          >
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
    <section
      className="relative bg-[#EFEAE0] py-16 md:py-24 lg:py-[124px]"
      id="proof"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_400px_at_85%_-10%,rgba(230,62,49,.09),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1200px] px-6 text-center md:px-10">
        <Reveal>
          <Kick label="04 · Results you can expect" center />
          <h2 className="text-[30px] leading-[1.12] sm:text-4xl lg:text-[52px]">
            What changes in six months.
          </h2>
        </Reveal>

        <div className="lg:mt-13 mt-10 grid grid-cols-1 items-stretch gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((o, i) => (
            <Reveal
              key={o.num}
              delay={i * 70}
              className="group relative overflow-hidden rounded-[18px] border border-black/[0.11] bg-white p-7 shadow-[0_1px_2px_rgba(10,10,10,.03),0_8px_24px_-18px_rgba(10,10,10,.10)] transition-all duration-300 hover:-translate-y-1 hover:border-black/[0.24] hover:shadow-[0_2px_4px_rgba(10,10,10,.04),0_22px_44px_-26px_rgba(10,10,10,.24)]"
            >
              <b className="mb-3.5 block text-[44px] font-normal leading-none tracking-[-0.02em] text-[#E63E31]/[0.16] transition-colors duration-300 group-hover:text-[#E63E31]/30">
                {o.num}
              </b>
              <strong className="block text-lg font-medium sm:text-xl">
                {o.title}
              </strong>
              <p className="mt-2.5 text-[14.5px] leading-normal text-[#77787B]">
                {o.body}
              </p>
              {o.disclaimer && (
                <span className="mt-3 block text-[11px] font-medium text-[#E63E31]">
                  {o.disclaimer}
                </span>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-8 max-w-[64ch] text-base text-[#77787B] md:mt-10 lg:mt-11 lg:text-lg">
          “Pick a moment and see what happens once all fourteen services are
          running together.”
        </Reveal>

        <Reveal delay={70}>
          <div
            role="tablist"
            className="mt-10 inline-flex max-w-full gap-0.5 overflow-x-auto rounded-full border border-black/[0.11] bg-white p-1.5 shadow-[0_1px_2px_rgba(10,10,10,.03),0_8px_24px_-18px_rgba(10,10,10,.10)] md:mt-12 lg:mt-[58px]"
          >
            {["A Google search", "Asking an AI", "Your monthly report"].map(
              (label, i) => (
                <button
                  key={label}
                  role="tab"
                  aria-selected={tab === i}
                  onClick={() => setTab(i)}
                  className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[12.5px] font-medium transition-colors duration-200 ${
                    tab === i
                      ? "bg-[#0A0A0A] text-white"
                      : "text-[#77787B] hover:text-[#0A0A0A]"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
        </Reveal>

        <Reveal
          delay={140}
          className="mt-8 overflow-hidden rounded-[18px] border border-black/[0.11] bg-white text-left shadow-[0_34px_76px_-46px_rgba(10,10,10,.32)]"
        >
          <div className="flex items-center gap-2.5 border-b border-black/[0.065] bg-[#F6F4EF] px-5 py-3.5 sm:px-6">
            <i className="block h-[7px] w-[7px] flex-none bg-[#E63E31]" />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[11.5px] text-[#77787B]">
              {active.url}
            </span>
            <em className="ml-auto flex-none rounded-full border border-[#E63E31]/30 px-2.5 py-1 text-[9px] uppercase not-italic tracking-[0.12em] text-[#E63E31]">
              Illustrative
            </em>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2" key={tab}>
            <div className="p-6 sm:p-8">
              <b className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#77787B]">
                <span className="h-[7px] w-[7px] flex-none bg-current" />
                What they find today
              </b>
              {active.before.map((line, i) => (
                <div
                  key={line}
                  style={{ animationDelay: `${i * 55}ms` }}
                  className="animate-rowIn flex items-start gap-3 border-b border-black/[0.065] py-3.5 last:border-0"
                >
                  <i className="mt-2 h-1.5 w-1.5 flex-none rounded-sm bg-[#D5D6D6]" />
                  <p className="text-base leading-normal">{line}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-black/[0.065] bg-gradient-to-b from-[#E63E31]/[0.028] to-transparent p-6 sm:p-8 md:border-l md:border-t-0">
              <b className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#E63E31]">
                <span className="h-[7px] w-[7px] flex-none bg-current" />
                After six months with us
              </b>
              {active.after.map((line, i) => (
                <div
                  key={line}
                  style={{ animationDelay: `${i * 55}ms` }}
                  className="animate-rowIn flex items-start gap-3 border-b border-black/[0.065] py-3.5  last:border-0"
                >
                  <i className="mt-2 h-1.5 w-1.5 flex-none rounded-sm bg-[#E63E31]" />
                  <p className="text-base leading-normal">{line}</p>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="flex flex-wrap gap-2.5 border-t border-black/[0.065] bg-[#F6F4EF] p-5">
            {active.metrics.map(([label, source]) => (
              <span
                key={label}
                className="rounded-full border border-black/[0.11] bg-white px-4 py-2 text-xs text-[#77787B]"
              >
                <b className="text-xs font-semibold text-[#0A0A0A]">{label}</b>{" "}
                · {source}
              </span>
            ))}
          </div> */}
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   05 · THE TOOLS  (CDN attempt → local /public/logos → placeholder)
   ============================================================ */

// Turns a tool name into a filename-safe slug for its local logo file,
// e.g. "Schema.org" -> "schema-org", "Google Tag Manager" -> "google-tag-manager".
function toFileSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type Tool = {
  name: string;
  // Simple Icons CDN slug to try if the local file is missing.
  slug: string;
  // Optional explicit path under /public if the auto-derived filename
  // doesn't match what you saved, e.g. "/logos/gpt.svg".
  localFallback?: string;
};

const TOOL_SETS: Record<string, Tool[]> = {
  a: [
    { name: "Google Analytics 4", slug: "googleanalytics" },
    { name: "Google Search Console", slug: "googlesearchconsole" },
    { name: "Looker Studio", slug: "looker" },
    { name: "LinkedIn Analytics", slug: "" },
    { name: "Zoho CRM", slug: "zoho" },
    { name: "Google Business Profile", slug: "google" },
  ],
  b: [
    { name: "Ahrefs", slug: "" },
    { name: "Semrush", slug: "semrush" },
    { name: "Screaming Frog", slug: "" },
    { name: "Schema.org", slug: "" },
    { name: "PageSpeed Insights", slug: "googlechrome" },
    { name: "Google Tag Manager", slug: "googletagmanager" },
  ],
  c: [
    { name: "ChatGPT", slug: "" },
    { name: "Google AI Overviews", slug: "google" },
    { name: "Perplexity", slug: "perplexity" },
    { name: "Gemini", slug: "googlegemini" },
    { name: "Claude", slug: "claude" },
    { name: "Microsoft Copilot", slug: "" },
  ],
};

// Renders a tool's brand mark: try the local file under /public/logos
// first (either `localFallback` if given, or an auto-derived path
// `/logos/{tool-name-as-slug}.svg`). If that file is missing, fall back to
// the Simple Icons CDN. If that also fails, show the dashed placeholder.
function ToolIcon({ tool }: { tool: Tool }) {
  const sources = useMemo(() => {
    const cdnSource = tool.slug
      ? `https://cdn.simpleicons.org/${tool.slug}/ffffff`
      : undefined;
    const localSource = cdnSource ?? `/logos/${toFileSlug(tool.name)}.svg`;

    // CDN first, local as fallback. If a tool has no slug (e.g. ChatGPT),
    // there's no CDN entry to try — .filter(Boolean) drops the `undefined`
    // so it goes straight to local instead of rendering a src-less <img>
    // that would never fire onError and never fall through.
    return [cdnSource, localSource].filter(Boolean) as string[];
  }, [tool]);

  const [sourceIndex, setSourceIndex] = useState(0);

  if (sourceIndex >= sources.length) {
    return (
      <i className="block h-[22px] w-[22px] flex-none rounded-md border border-dashed border-white/[0.18] bg-white/[0.06]" />
    );
  }

  return (
    <img
      key={sources[sourceIndex]}
      src={sources[sourceIndex]}
      alt={`${tool.name} logo`}
      width={18}
      height={18}
      loading="lazy"
      className="block h-[18px] w-[18px] flex-none object-contain opacity-90"
      onError={() => setSourceIndex((i) => i + 1)}
    />
  );
}

function ToolRow({
  toolSet,
  reverse = false,
  durationSec = 38,
}: {
  toolSet: Tool[];
  reverse?: boolean;
  durationSec?: number;
}) {
  const loop = [...toolSet, ...toolSet, ...toolSet];
  return (
    <div className="group overflow-hidden py-2">
      <div
        className="animate-marquee flex w-max gap-2.5 group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${durationSec}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <Marquee durationSec={durationSec} reverse={reverse}>
          {loop.map((tool, i) => (
            <span
              key={`${tool.name}-${i}`}
              className="inline-flex flex-none items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.045] py-3 pl-3.5 pr-5 text-[15px] text-white/[0.82] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E63E31] hover:bg-[#E63E31]/10 hover:text-white"
            >
              <ToolIcon tool={tool} />
              {tool.name}
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

function Tools() {
  return (
    <section className="relative overflow-hidden bg-[#131317] py-16 text-white md:py-24 lg:py-[124px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_12%_0%,rgba(230,62,49,.14),transparent_66%)]" />
      <div className="relative mx-auto max-w-[1200px] px-6 text-center md:px-10">
        <Reveal>
          <Kick label="05 · The tools we work in" dark center />
          <h2 className="text-[30px] leading-[1.12] sm:text-4xl lg:text-[52px]">
            The tools we work in on your behalf.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={70} className="relative mt-10 md:mt-12 lg:mt-[60px]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[3] w-[60px] bg-gradient-to-r from-[#131317] to-transparent sm:w-[170px]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[3] w-[60px] bg-gradient-to-l from-[#131317] to-transparent sm:w-[170px]" />
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
type PricingFeature = { title: string; note: string };

const GROWTH_FEATURES: PricingFeature[] = [
  { title: "SEO", note: "Google ranking for the terms buyers actually search" },
  { title: "GEO", note: "Named correctly when a buyer asks an AI tool" },
  {
    title: "Social Media",
    note: "Named correctly when a buyer asks an AI tool",
  },
  // { title: "Social Media", note: "LinkedIn, eight to ten posts a month" },
  { title: "Content Production", note: "One shoot day a month at your site" },
  {
    title: "Executive Visibility",
    note: "Four posts a month for one senior leader",
  },
  {
    title: "Website and Technical SEO",
    note: "Safe, fast, and checked every month",
  },
  {
    title: "Analytics, CRO and Reporting",
    note: "Signed baseline, monthly report, quarterly audit",
  },
  {
    title: "Strategy and Benchmarking",
    note: "One senior strategist, three competitors tracked",
  },
];

const PLUS_FEATURES: PricingFeature[] = [
  {
    title: "Multi entity coverage",
    note: "Several companies, brands or countries",
  },
  {
    title: "Executive Visibility, expanded",
    note: "Posts for multiple leaders",
  },
  {
    title: "Content Production, extended",
    note: "More shoot days and more social output",
  },
  {
    title: "Competitive Intelligence, expanded",
    note: "A wider competitor set",
  },
];

const PRICING_INFO_CARDS = [
  {
    icon: assets.gurantee,
    title: "The guarantee",
    body: "If targets are substantially missed on our side, you get a term extension at no fee, or a documented scope reset. Not a discount. Accountability.",
  },
  {
    icon: assets.capacity2,
    title: "Capacity is capped",
    body: "We intentionally hold a limited number of built environment partners. Senior attention doesn't scale post a certain point, so we don't pretend it does.",
  },
];

function CheckDot({ dark }: { dark: boolean }) {
  return (
    <span
      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] ${
        dark ? "bg-[#E63E31]" : "bg-[#77787B]/20"
      }`}
    >
      <svg
        width="9"
        height="7"
        viewBox="0 0 9 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 3.4L3.2 5.6L8 1"
          stroke={dark ? "#fff" : "#77787B"}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function PricingArrow({ dark }: { dark: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.88346 1.26172L1.13281 8.8624"
        stroke={dark ? "#fff" : "#fff"}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M1.13281 1.26172H8.88346V8.71245"
        stroke={dark ? "#fff" : "#fff"}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

function PricingCta({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      // href="#book"
      onClick={scrollToContact}
      className={`group flex w-full items-center justify-center gap-2.5 rounded-full border border-[#E63E31] px-6 py-3 text-[13px] font-medium uppercase tracking-[0.08em] transition-colors duration-200 ${className}`}
    >
      <span>{children}</span>
      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#E63E31] transition-transform duration-300 group-hover:translate-x-0.5">
        <PricingArrow dark />
      </span>
    </a>
  );
}

function Pricing() {
  return (
    <section className="py-16 md:py-24 lg:py-[124px]" id="pricing">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Kick label="06 · Pricing" />
            <h2 className="max-w-[20ch] text-[27px] leading-[1.08] sm:text-4xl sm:leading-[1.08] lg:text-[45px] lg:leading-[1.08]">
              Find the structure that fits your roadmap.
            </h2>
            <p className="mt-4 max-w-[58ch] text-base text-[#77787B] lg:text-lg">
              Both senior-led. Both measured against a baseline signed in week
              two. The difference is coverage, not who works on your account.
            </p>
          </Reveal>

          <Reveal
            delay={70}
            className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0"
          >
            <button
              type="button"
              onClick={scrollToContact}
              className="group flex items-center justify-center gap-2.5 rounded-full border border-[#E63E31] px-6 py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-[#0A0A0A] transition-colors duration-200 hover:bg-[#0A0A0A] hover:text-white"
            >
              Book your 30-minute call
              <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#E63E31]">
                <PricingArrow dark />
              </span>
            </button>

            {/* <a
              href="#book"
              className="group flex items-center justify-center gap-2.5 rounded-full border border-[#E63E31] px-6 py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-[#0A0A0A] transition-colors duration-200 hover:bg-[#0A0A0A] hover:text-white"
            >
              Talk to sales
              <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#E63E31]">
                <PricingArrow dark />
              </span>
            </a> */}
          </Reveal>
        </div>

        {/* Cards */}
        <div className="lg:mt-13 mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Growth card */}
          <Reveal
            delay={70}
            className="relative rounded-[18px] bg-[#0A0A0A] p-6 text-white shadow-[0_26px_60px_-46px_rgba(10,10,10,.34)] md:p-10"
          >
            <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#E63E31] px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white">
              What most firms take
            </span>

            {/* <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
              Growth
            </span> */}

            <h3 className="mt-3 text-xl font-medium md:text-2xl">
              Growth Partnership
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-[34px] font-normal leading-none md:text-[42px]">
                AED 10,000
              </span>
              <span className="text-sm text-white/50">a month, from</span>
            </div>
            <p className="mt-2 text-sm text-white/50">
              Eight disciplines, one senior team, one monthly figure.
            </p>

            <PricingCta className="mt-6 bg-transparent text-white hover:bg-[#E63E31] md:mt-8">
              Book your 30-minute call
            </PricingCta>

            <div className="mt-8 border-t border-white/10 pt-6 md:mt-10 md:pt-8">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
                What runs every month
              </span>
              <ul className="mt-4 space-y-4 md:mt-5 md:space-y-5">
                {GROWTH_FEATURES.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckDot dark />
                    <div>
                      <p className="text-sm font-medium md:text-[15px]">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[13px] text-white/50">
                        {item.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 border-t border-white/10 pt-6 text-[13px] leading-[1.5] text-white/50 md:mt-10 md:pt-8">
              12 months. Google ranking work has a 6 month minimum. VAT not
              included.
            </p>
          </Reveal>

          {/* Plus card */}
          <Reveal
            delay={140}
            className="rounded-[18px] border border-black/[0.11] bg-[#F6F3EC] p-6 md:p-10"
          >
            {/* <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#77787B]">
              Plus
            </span> */}

            <h3 className="mt-3 text-xl font-medium text-[#0A0A0A] md:text-2xl">
              Plus
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-[34px] font-normal leading-none text-[#0A0A0A] md:text-[42px]">
                Custom
              </span>
              <span className="text-sm text-[#77787B]">priced with you</span>
            </div>
            <p className="mt-2 text-sm text-[#77787B]">
              For groups running several companies, brands or countries at once
            </p>

            <PricingCta className="mt-6 bg-transparent text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white md:mt-8">
              Ask about Plus
            </PricingCta>

            <div className="mt-8 border-t border-black/[0.11] pt-6 md:mt-10 md:pt-8">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#77787B]">
                What runs every month
              </span>
              <ul className="mt-4 space-y-4 md:mt-5 md:space-y-5">
                {PLUS_FEATURES.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckDot dark={false} />
                    <div>
                      <p className="text-sm font-medium text-[#0A0A0A] md:text-[15px]">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[13px] text-[#77787B]">
                        {item.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 border-t border-black/[0.11] pt-6 text-[13px] leading-[1.5] text-[#77787B] md:mt-10 md:pt-8">
              Set with you, always in a written proposal.
            </p>
          </Reveal>
        </div>

        {/* Info cards */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PRICING_INFO_CARDS.map((card, i) => (
            <Reveal
              key={card.title}
              delay={210 + i * 70}
              className={`rounded-[18px] border border-black/[0.11] p-6 md:p-8 ${
                i === 1 ? "bg-[#F6F3EC]" : "bg-white"
              }`}
            >
              <span className="border-primary/12 flex h-[60px] w-[60px] items-center justify-center rounded-[7px] border bg-primary/5">
                <Image
                  src={card.icon}
                  alt={card.title}
                  className="h-full w-full object-contain p-[10px]"
                />
              </span>
              <h3 className="mt-5 text-lg font-medium text-[#0A0A0A] md:text-xl">
                {card.title}
              </h3>
              <p className="mt-2.5 text-sm leading-[1.5] text-[#77787B]">
                {card.body}
              </p>
            </Reveal>
          ))}
        </div>
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
  image: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Global Surf proved to be a talented group that delivered their project in excellent manner. They are responsive, and we trusted them day by day with more tasks and they continue to prove their capabilities.",
    name: "Karim El Shennawy",
    role: "Business Development Director · ASGC",
    initials: "KE",
    image: "/assets/testimonials/karim.jpeg",
  },
  {
    quote:
      "Caring team, looks out for what you want and makes sure to give you the outcome you want, quick. You will find them next to you in critical moments.",
    name: "Alissar Nasrallah",
    role: "Regional Marcomms Manager · Gulf Cryo",
    initials: "AN",
    image: "/assets/testimonials/alissar.jpeg",
  },
  {
    quote:
      "Working with Global Surf was an exceptional experience. Their customer support was outstanding, making the entire process smooth and efficient. I highly recommend Global Surf for their expertise, dedication, and ability to bring a brand's digital presence to life.",
    name: "Jad Farah",
    role: "Group Marketing Manager · ECC LLC",
    initials: "JF",
    image: "/assets/testimonials/jadfarah.jpeg",
  },
  {
    quote:
      "Because of the way that Global Surf encourages collaboration, working with the team has been a pleasure. Their staff welcomes our input and fosters open communication, which has led to a website that reflects our brand and serves our particular demands.",
    name: "Hesham Abdeen",
    role: "Head of Accreditation and Evaluations · Educap",
    initials: "HA",
    image: "/assets/testimonials/heshamabdeen.png",
  },
  {
    quote:
      "We have a very good relationship and experience with your professional company. Not to mention the extra care we get from your team. We would like this relationship to continue for the success of both of us.",
    name: "Omar M. Bin Dhaher Almheiri",
    role: "President · Prestige",
    initials: "OA",
    image: "/assets/testimonials/dummy-user.png",
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
        className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-black/[0.11] bg-white text-[#77787B] transition-all duration-200 hover:scale-105 hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white"
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Next testimonial"
        onClick={onNext}
        className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-black/[0.11] bg-white text-[#77787B] transition-all duration-200 hover:scale-105 hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white"
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
    <section className="relative bg-[#EFEAE0] py-16 md:py-24 lg:py-[124px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_400px_at_85%_-10%,rgba(230,62,49,.09),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1200px] px-6 text-center md:px-10">
        <Reveal>
          <Kick label="07 · Testimonials" center />
          <h2 className="text-[30px] leading-[1.12] sm:text-4xl lg:text-[52px]">
            See what our clients have to say about us.
          </h2>
        </Reveal>

        <Reveal
          delay={70}
          className="lg:mt-13 mx-auto mt-10 hidden w-fit max-w-full grid-cols-[auto_minmax(0,760px)_auto] items-center justify-center gap-[18px] sm:grid"
        >
          <TestimonialNav
            onPrev={() => go(index - 1)}
            onNext={() => go(index + 1)}
          />
        </Reveal>

        <Reveal delay={70} className="lg:mt-13 mt-10">
          <div className="flex items-center justify-center gap-[18px]">
            <div className="hidden sm:block">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(index - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.11] bg-white text-[#77787B] transition-all duration-200 hover:scale-105 hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white"
              >
                ←
              </button>
            </div>

            <figure className="w-full max-w-[760px] rounded-[18px] border border-black/[0.11] bg-white p-7 text-left shadow-[0_1px_2px_rgba(10,10,10,.03),0_8px_24px_-18px_rgba(10,10,10,.10)] sm:p-9 lg:p-11">
              <div className="mb-[18px] text-xs tracking-[5px] text-[#E63E31]">
                ★★★★★
              </div>
              <blockquote
                className={`min-h-[112px] text-lg font-normal leading-[1.45] transition-opacity duration-300 sm:text-xl lg:text-2xl ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
              >
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-[26px] flex items-center gap-3.5 border-t border-black/[0.065] pt-[22px]">
                <span className="relative flex h-[46px] w-[46px] flex-none items-center justify-center overflow-hidden rounded-full border border-dashed border-black/[0.18] bg-[#EFEAE0] text-sm font-medium text-[#B4B3AF]">
                  <Image
                    src={t.image}
                    alt={t.name}
                    className="absolute object-cover"
                    fill
                  />
                </span>
                <span>
                  <b className="block text-[14.5px] font-medium">{t.name}</b>
                  <span className="mt-0.5 block text-xs text-[#77787B]">
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
                className="flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.11] bg-white text-[#77787B] transition-all duration-200 hover:scale-105 hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white"
              >
                →
              </button>
            </div>
          </div>

          <div className="mt-[22px] flex justify-center gap-3.5 sm:hidden">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => go(index - 1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.11] bg-white text-[#77787B]"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => go(index + 1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.11] bg-white text-[#77787B]"
            >
              →
            </button>
          </div>
        </Reveal>

        <Reveal delay={140} className="mt-6 flex justify-center gap-1.5">
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

        {/* <Reveal delay={140} className="mt-6">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-black/[0.11] bg-white px-[18px] py-2.5 text-[12.5px] text-[#77787B]">
            <b className="text-[13px] font-semibold text-[#0A0A0A]">4.9</b> on
            Google Reviews · Trusted by 125+ brands across the UAE
          </span>
        </Reveal> */}
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
    defaultOpenIndex ?? null,
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
              className="relative w-full cursor-pointer py-6 pr-11 text-left text-[17px] font-medium transition-colors duration-200 hover:text-[#E63E31] sm:text-xl"
            >
              {item.q}
              <span
                className={`absolute right-1.5 top-1/2 h-[1.5px] w-[13px] -translate-y-1/2 bg-[#E63E31] transition-transform duration-300 ${
                  isOpen ? "rotate-0" : ""
                }`}
              />
              <span
                className={`absolute right-[11.7px] top-1/2 h-[13px] w-[1.5px] -translate-y-1/2 bg-[#E63E31] transition-all duration-300 ${
                  isOpen ? "rotate-90 opacity-0" : "opacity-100"
                }`}
              />
            </button>
            {isOpen && (
              <p className="animate-[fadeIn_.35s_ease] pb-6 pr-10 text-base leading-[1.55] text-[#77787B]">
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
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal className="mx-auto max-w-none text-center">
          <Kick label="08 · Questions" center />
          <h2 className="text-[27px] leading-[1.15] sm:text-4xl lg:text-[45px]">
            Everything you need to know before we begin.
          </h2>
        </Reveal>

        <div className="lg:mt-13 mt-10 grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-x-14">
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

const TIME_SLOT_OPTIONS = [
  "9:00 AM – 9:30 AM",
  "9:30 AM – 10:00 AM",
  "10:00 AM – 10:30 AM",
  "10:30 AM – 11:00 AM",
  "11:00 AM – 11:30 AM",
  "11:30 AM – 12:00 PM",
  "2:00 PM – 2:30 PM",
  "2:30 PM – 3:00 PM",
  "3:00 PM – 3:30 PM",
  "3:30 PM – 4:00 PM",
  "4:00 PM – 4:30 PM",
  "4:30 PM – 5:00 PM",
  "5:00 PM – 5:30 PM",
];

type FormErrors = Partial<
  Record<
    "name" | "company" | "email" | "phone" | "sector" | "date" | "timeSlot",
    string
  >
>;

const NAME_REGEX = /^[A-Za-z][A-Za-z\s.'-]{1,49}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Accepts optional leading +, then 7–15 digits, allowing spaces/dashes/parens in between
const PHONE_REGEX = /^\+?[0-9\s().-]{7,20}$/;

function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function validateField(name: string, value: string): string | undefined {
  const v = value.trim();

  switch (name) {
    case "name":
      if (!v) return "Please enter your name.";
      if (v.length < 2) return "Name looks too short.";
      if (!NAME_REGEX.test(v)) return "Name can only contain letters.";
      return undefined;

    case "company":
      if (!v) return "Please enter your company name.";
      if (v.length < 2) return "Company name looks too short.";
      return undefined;

    case "email":
      if (!v) return "Please enter your work email.";
      if (!EMAIL_REGEX.test(v)) return "Enter a valid email address.";
      return undefined;

    case "phone": {
      if (!v) {
        return "Please enter your phone number.";
      }

      // Keep only digits for validation.
      // This allows:
      // +971 50 123 4567
      // +1 (202) 555-0123
      // +44 20 7946 0958
      // etc.
      const digitsOnly = v.replace(/\D/g, "");

      // International phone numbers generally won't need fewer than 7
      // digits or more than 15 digits.
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        return "Enter a valid phone number.";
      }

      // Reject numbers made entirely of zeros.
      if (/^0+$/.test(digitsOnly)) {
        return "Enter a valid phone number.";
      }

      // Reject obvious fake numbers such as:
      // 1111111111
      // 2222222222
      // 9999999999
      if (/^(\d)\1+$/.test(digitsOnly)) {
        return "Enter a valid phone number.";
      }

      // Validate the characters the user is allowed to enter.
      // Allows digits, spaces, +, -, (, and ).
      if (!/^[+\d\s().-]+$/.test(v)) {
        return "Enter a valid phone number.";
      }

      return undefined;
    }

    case "sector":
      if (!v) return "Please select a sector.";
      return undefined;

    case "date": {
      if (!v) return "Please pick a date.";

      const picked = new Date(`${v}T00:00:00`);

      if (isNaN(picked.getTime())) {
        return "Enter a valid date.";
      }

      // Cannot book today or any past date
      const tomorrow = new Date();
      tomorrow.setHours(0, 0, 0, 0);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (picked < tomorrow) {
        return "Please select a date from tomorrow onward.";
      }

      // Saturday = 6, Sunday = 0
      const day = picked.getDay();

      if (day === 0 || day === 6) {
        return "Bookings are not available on Saturdays and Sundays.";
      }

      return undefined;
    }

    case "timeSlot":
      if (!v) return "Please pick a time slot.";
      return undefined;

    default:
      return undefined;
  }
}

function FinalCta() {
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState("");
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    placement: "top" | "bottom";
  } | null>(null);
  const runValidation = (form: HTMLFormElement): FormErrors => {
    const data = new FormData(form);
    const fields: (keyof FormErrors)[] = [
      "name",
      "company",
      "email",
      "phone",
      "sector",
      "date",
      "timeSlot",
    ];
    const nextErrors: FormErrors = {};

    for (const field of fields) {
      const value = (data.get(field) as string) ?? "";
      const error = validateField(field, value);
      if (error) nextErrors[field] = error;
    }

    return nextErrors;
  };

  const handleFieldBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name } = e.target;
    // clear the error for this field as soon as the user starts fixing it
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const nextErrors = runValidation(form);
    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      setNote("Please fix the highlighted fields.");
      return;
    }

    setNote("");
    const formData = new FormData(form);
    formData.set("date", date);
    startTransition(async () => {
      const result = await submitBooking(formData);

      setNote(
        result.message ??
          (result.success ? "Thank you." : "Something went wrong."),
      );
      if (result.success) {
        form.reset();
        window.location.replace("/growth-thank-you");
        setErrors({});
      }
    });
  };

  function getTomorrow(): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 1);
    return d;
  }
  function formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`; // "2026-09-04"
  }

  useLayoutEffect(() => {
    if (!datePickerOpen || !triggerRef.current) return;

    const updatePosition = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const estimatedHeight = popoverRef.current?.offsetHeight ?? 360;

      const placement =
        spaceBelow < estimatedHeight && spaceAbove > spaceBelow
          ? "top"
          : "bottom";

      setCoords({
        left: rect.left,
        top: placement === "top" ? rect.top - 8 : rect.bottom + 8,
        placement,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [datePickerOpen]);
  return (
    <section className="relative overflow-hidden bg-black text-white" id="book">
      <div className="pointer-events-none absolute -left-40 -top-52 h-[700px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(230,62,49,.17),transparent_66%)]" />
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-9 py-16 md:py-24 lg:grid-cols-2 lg:gap-[72px] lg:py-[110px]">
          {/* <Reveal>
            <Kick label="09 · Next step" dark /> */}
          {/* <h2 className="max-w-[16ch] text-[30px] leading-[1.12] text-white sm:text-4xl lg:text-[52px] overflow: visible !important;"> */}
          {/* Start with a 30 minute call. */}
          {/* Get Your Free Brand & Digital Audit
            </h2> */}
          {/* <h2
              className="max-w-[16ch] text-[30px] leading-[1.2] text-white sm:text-4xl lg:text-[52px] lg:leading-[1.18]"
              style={{ overflow: "visible" }}
            >
              Get Your Free Brand &amp; Digital Audit
            </h2>
            <p className="mt-[18px] max-w-[46ch] text-base text-white/60 lg:text-lg">
              Tell us what you build. We will tell you whether this package
              fits, and what we would do first.
            </p>
          </Reveal> */}
          <div className="overflow-hidden">
            <Reveal delay={0}>
              <Kick label="09 · Next step" dark />
              <h2 className="max-w-[16ch] pb-1 text-[30px] leading-[1.2] text-white sm:text-4xl lg:text-[52px] lg:leading-[1.18]">
                {/* Get Your Free Brand  Digital Audit */}
                Get Your Free Brand Visibility Audit
              </h2>
              <p className="mt-[18px] max-w-[46ch] text-base text-white/60 lg:text-lg">
                Tell us what you build. We will tell you whether this package
                fits, and what we would do first.
              </p>
            </Reveal>
          </div>
          <Reveal delay={70}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="rounded-[18px] border border-white/[0.13] bg-white/[0.035] p-7 backdrop-blur-[6px]"
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field
                  label="Name"
                  id="n"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  error={errors.name}
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                />
                <Field
                  label="Company"
                  id="c"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  required
                  error={errors.company}
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field
                  label="Work email"
                  id="e"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  error={errors.email}
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                />
                <Field
                  label="Phone"
                  id="p"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  error={errors.phone}
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="mb-3 mt-3">
                <label
                  htmlFor="s"
                  className="mb-2 block text-[9.5px] font-medium uppercase tracking-[0.12em] text-white/[0.42]"
                >
                  Which sector are you in?
                </label>
                <select
                  id="s"
                  name="sector"
                  required
                  defaultValue=""
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                  className={`w-full appearance-none rounded-[10px] border bg-black/40 bg-[right_19px_center] bg-no-repeat px-4 py-3.5 text-base text-white outline-none transition-colors duration-200 focus:bg-black/[0.62] ${
                    errors.sector
                      ? "border-[#E63E31]"
                      : "border-white/[0.13] focus:border-[#E63E31]"
                  }`}
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
                {errors.sector && (
                  <p className="mt-1.5 text-[11px] text-[#E63E31]">
                    {errors.sector}
                  </p>
                )}
              </div>

              <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="relative">
                  <input type="hidden" name="date" value={date} />
                  <label
                    htmlFor="preferred-date"
                    className="mb-2 block text-[9.5px] font-medium uppercase tracking-[0.12em] text-white/[0.42]"
                  >
                    Preferred date <span className="text-[#E63E31]">*</span>
                  </label>

                  <button
                    id="preferred-date"
                    ref={triggerRef}
                    type="button"
                    onClick={() => setDatePickerOpen((prev) => !prev)}
                    aria-haspopup="dialog"
                    aria-expanded={datePickerOpen}
                    className={`flex w-full items-center justify-between rounded-[10px] border bg-black/40 px-4 py-3.5 text-left text-base text-white outline-none transition-colors duration-200 focus:bg-black/[0.62] ${
                      errors.date
                        ? "border-[#E63E31]"
                        : "border-white/[0.13] focus:border-[#E63E31]"
                    }`}
                  >
                    <span className={date ? "text-white" : "text-white/40"}>
                      {date
                        ? date.split("-").reverse().join("-")
                        : "Select date"}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-white/60 transition-transform ${
                        datePickerOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {datePickerOpen &&
                    coords &&
                    createPortal(
                      <div
                        ref={popoverRef}
                        style={{
                          position: "fixed",
                          top: coords.top,
                          left: coords.left,
                          transform:
                            coords.placement === "top"
                              ? "translateY(-100%)"
                              : undefined,
                        }}
                        className="dark z-[9999] max-h-[80vh] overflow-y-auto rounded-lg border border-white/10 bg-neutral-900 p-3 text-white shadow-xl"
                      >
                        <DayPicker
                          mode="single"
                          selected={
                            date ? new Date(`${date}T00:00:00`) : undefined
                          }
                          defaultMonth={getTomorrow()}
                          disabled={[
                            { before: getTomorrow() },
                            { dayOfWeek: [0, 6] },
                          ]}
                          onSelect={(selectedDate) => {
                            if (!selectedDate) return;
                            const formattedDate = formatDate(selectedDate);
                            setDate(formattedDate);
                            const error = validateField("date", formattedDate);
                            setErrors((prev) => ({ ...prev, date: error }));
                            setDatePickerOpen(false);
                          }}
                        />
                      </div>,
                      document.body,
                    )}

                  {errors.date && (
                    <p className="mt-1.5 text-[11px] text-[#E63E31]">
                      {errors.date}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="ts"
                    className="mb-2 block text-[9.5px] font-medium uppercase tracking-[0.12em] text-white/[0.42]"
                  >
                    Time slot <span className="text-[#E63E31]">*</span>
                  </label>
                  <select
                    id="ts"
                    name="timeSlot"
                    required
                    defaultValue=""
                    onBlur={handleFieldBlur}
                    onChange={handleFieldChange}
                    className={`w-full appearance-none rounded-[10px] border bg-black/40 bg-[right_19px_center] bg-no-repeat px-4 py-3.5 text-base text-white outline-none transition-colors duration-200 focus:bg-black/[0.62] ${
                      errors.timeSlot
                        ? "border-[#E63E31]"
                        : "border-white/[0.13] focus:border-[#E63E31]"
                    }`}
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg,transparent 50%,rgba(255,255,255,.4) 50%),linear-gradient(135deg,rgba(255,255,255,.4) 50%,transparent 50%)",
                      backgroundPosition:
                        "calc(100% - 19px) 50%, calc(100% - 14px) 50%",
                      backgroundSize: "5px 5px, 5px 5px",
                    }}
                  >
                    <option value="">Select one</option>
                    {TIME_SLOT_OPTIONS.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.timeSlot && (
                    <p className="mt-1.5 text-[11px] text-[#E63E31]">
                      {errors.timeSlot}
                    </p>
                  )}
                </div>
              </div>

              <Btn type="submit" className="mt-2 w-full" disabled={isPending}>
                {isPending
                  ? "Sending..."
                  : "Book a 30-minute growth strategy call"}
              </Btn>
              <p className="mt-3.5 min-h-[16px] text-center text-[11.5px] text-[#E63E31]">
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
  name,
  type,
  autoComplete,
  required,
  error,
  onBlur,
  onChange,
}: {
  label: string;
  id: string;
  name: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[9.5px] font-medium uppercase tracking-[0.12em] text-white/[0.42]"
      >
        {label} {required && <span className="text-[#E63E31]">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        onBlur={onBlur}
        onChange={onChange}
        aria-invalid={!!error}
        className={`w-full rounded-[10px] border bg-black/40 px-4 py-3.5 text-base text-white outline-none transition-colors duration-200 focus:bg-black/[0.62] ${
          error
            ? "border-[#E63E31]"
            : "border-white/[0.13] focus:border-[#E63E31]"
        }`}
      />
      {error && <p className="mt-1.5 text-[11px] text-[#E63E31]">{error}</p>}
    </div>
  );
}

/* ============================================================
   Root component
   ============================================================ */
export default function GrowthPartnershipLanding() {
  return (
    <main className="overflow-x-hidden bg-[#FCFBF9] text-[#0A0A0A] antialiased selection:bg-[#E63E31] selection:text-white">
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
