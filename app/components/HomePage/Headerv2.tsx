"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { Example } from "../MobileMenu/ExampleV2";
import { AnimatePresence, motion } from "framer-motion";
import ServicesMegaMenu from "./ServiceDropdown";
import Link from "next/link";
import LetsTalk from "@/app/components/common/LetsConnect";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const [isShadow, setIsShadow] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // ─── Close mega menu on outside click ────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) return;
      setIsServicesHovered(false);
      setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ─── Single ResizeObserver replaces 2 separate resize listeners ──────────
  useEffect(() => {
    const checkMobile = () => setMobileMenu(window.innerWidth < 1024);
    checkMobile();

    // Use ResizeObserver for header height — more accurate than resize event
    const ro = new ResizeObserver((entries) => {
      const height = entries[0]?.contentRect.height ?? 0;
      if (parentRef.current) {
        parentRef.current.style.paddingTop = `${height}px`;
      }
      // Also re-check breakpoint on resize
      checkMobile();
    });

    if (headerRef.current) ro.observe(headerRef.current);
    return () => ro.disconnect();
  }, []);

  // ─── Scroll handler with rAF throttle + passive listener ─────────────────
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY <= 0) {
          setIsSticky(true);
          setIsShadow(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsSticky(false);
          setIsShadow(true);
        } else {
          setIsSticky(true);
          setIsShadow(false);
        }
        lastScrollY = currentScrollY;
        ticking = false;
      });
    };

    // passive: true tells the browser this handler never calls preventDefault,
    // allowing it to scroll immediately without waiting for JS.
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set correct state on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Modal body-overflow lock (single source of truth) ───────────────────
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    document.documentElement.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [modalOpen]);

  // ─── Stable callbacks to avoid inline function re-creation ───────────────
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const showServices = useCallback(() => setIsServicesHovered(true), []);
  const hideServices = useCallback(() => setIsServicesHovered(false), []);
  const toggleServices = useCallback(
    () => setIsServicesHovered((prev) => !prev),
    []
  );

  // ─── Mobile layout ────────────────────────────────────────────────────────
  if (mobileMenu) {
    if (modalOpen) return null;
    return (
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center p-4 align-middle bg-white shadow-[0_2px_10px_0_rgba(0,0,0,0.1)] animate-[headerSlideDown_0.8s_forwards] transition-all duration-500 ease-in-out">
        {/*
          Logo: width/height match the actual rendered size (100px on mobile).
          No `unoptimized` — let Next.js optimise the SVG.
        */}
        <Link href="/">
          <Image
            src="/gs-digital-logo.svg"
            alt="Global Surf Digital"
            width={100}
            height={32}
            priority
          />
        </Link>
        <div className="flex justify-end items-center w-full gap-3">
          <a
            href="tel:+97145821133"
            className="flex items-center text-black hover:text-primary"
          >
            <Image
              className="mt-2"
              src={assets.menuphoneicon}
              alt="Call us"
              width={23}
              height={23}
            />
          </a>
          <Example />
        </div>
      </div>
    );
  }

  // ─── Desktop layout ───────────────────────────────────────────────────────
  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 z-[1000] bg-white overflow-y-auto">
          <LetsTalk onClose={closeModal} />
        </div>
      )}

      <header ref={parentRef}>
        <div
          ref={headerRef}
          className={`py-4 pb-4 lg:py-[22px] z-[999] header relative
            transition-transform duration-300 ease-in-out
            ${isSticky ? "translate-y-0" : "-translate-y-full"}
            ${isShadow ? "shado" : "shadowss"}`}
        >
          <div className="container flex items-center justify-between relative z-20">
            {/* ── Logo ── */}
            <div className="logo-s relative">
              {/*
                Correct intrinsic dimensions (200×50) match the CSS width so
                the browser can reserve the right amount of space before the
                image loads, eliminating Cumulative Layout Shift.
                `priority` triggers <link rel="preload"> in the <head>.
                No `unoptimized` — SVGs are still processed by Next Image.
              */}
              <Image
                src="/gs-digital-logo.svg"
                className="w-[200px]"
                alt="Global Surf Digital Logo"
                width={200}
                height={50}
                priority
              />
              <Link href="/" className="absolute top-0 h-full w-full" />
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="text-black lg:hidden"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* ── Nav ── */}
            <nav
              className={`${isMenuOpen ? "block" : "hidden"
                } absolute left-0 top-16 z-10 w-full bg-white text-sm font-medium
              lg:static lg:flex lg:w-auto lg:space-x-5 xl:space-x-8 lg:bg-transparent`}
            >
              {/* ABOUT — plain div, hover handled by Tailwind CSS */}
              <div className="flex flex-col justify-center">
                <Link
                  href="/about-us"
                  className="relative large-screen-menu-item block px-4 text-black hover:text-primary lg:px-0
                    after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
                    after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  ABOUT
                </Link>
              </div>

              {/* SERVICES — mega menu trigger */}
              <div
                className="relative flex flex-col justify-center"
                onMouseEnter={showServices}
                onMouseLeave={hideServices}
              >
                <button
                  className="large-screen-menu-item block px-4 text-black hover:text-primary lg:px-0"
                  onClick={toggleServices}
                  aria-expanded={isServicesHovered}
                  aria-haspopup="true"
                  type="button"
                >
                  SERVICES +
                </button>
              </div>

              {/* INDUSTRIES */}
              <div className="flex flex-col justify-center">
                <Link
                  href="/industry"
                  className="relative large-screen-menu-item block px-4 text-black hover:text-primary lg:px-0
                    after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
                    after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  INDUSTRIES
                </Link>
              </div>

              {/* PORTFOLIO */}
              <div className="flex flex-col justify-center">
                <Link
                  href="/portfolio"
                  className="relative large-screen-menu-item block px-4 text-black hover:text-primary lg:px-0
                    after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
                    after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  PORTFOLIO
                </Link>
              </div>

              {/* INSIGHT — CSS-only dropdown, no JS state needed */}
              <div className="flex flex-col justify-center">
                <div className="group relative">
                  <div className="large-screen-menu-item block px-4 text-black hover:text-primary lg:px-0 cursor-pointer">
                    INSIGHT
                  </div>
                  <div
                    className="mt-4 invisible absolute left-0 top-full z-20 min-w-[200px]
                      rounded-md bg-white p-4 shadow-lg opacity-0 translate-y-2
                      transition-all duration-200
                      group-hover:visible group-hover:opacity-100 group-hover:translate-y-0"
                  >
                    <Link
                      href="/blogs"
                      className="flex items-center gap-3 rounded-md px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      <Image
                        src={assets.blog}
                        alt=""
                        className="h-6 w-6 object-contain"
                        width={24}
                        height={24}
                      />
                      <span>Blogs</span>
                    </Link>
                    <Link
                      href="/case-study"
                      className="flex items-center gap-3 rounded-md px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      <Image
                        src={assets.casestudy}
                        alt=""
                        className="h-6 w-6 object-contain"
                        width={24}
                        height={24}
                      />
                      <span>Case Studies</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* CAREERS */}
              <div className="flex flex-col justify-center">
                <Link
                  href="/careers"
                  className="relative large-screen-menu-item block px-4 text-black hover:text-primary lg:px-0
                    after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
                    after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  CAREERS
                </Link>
              </div>

              {/* CONTACT US */}
              <Link
                href="/contact-us"
                className="hover:bg-prtext-primary group hidden items-center space-x-2 rounded-full
                  border border-primary px-6 py-2 text-primary transition duration-300 ease-in
                  hover:text-black hover:shadow-lg lg:flex"
              >
                <span className="duration-300 ease-in group-hover:text-black uppercase">
                  Contact Us
                </span>
                <div className="bg-primary p-1">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_65_39)">
                      <path
                        d="M8.88346 1.26172L1.13281 8.8624"
                        stroke="white"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                      />
                      <path
                        d="M1.13281 1.26172H8.88346V8.71245"
                        stroke="white"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_65_39">
                        <rect width="10" height="10" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </Link>

              {/* GET AUDIT — only on audit landing page */}
              {pathname === "/free-digital-marketing-audit" && (
                <Link
                  href="#requestst"
                  scroll={true}
                  className="md:flex w-fit items-center gap-3 border border-transparent
                    px-3 py-2 bg-primary rounded-[5px]"
                >
                  <p className="duration-200 text-sm font-medium uppercase ease-in-out text-white md:text-[16px]">
                    GET AUDIT
                  </p>
                </Link>
              )}
            </nav>
          </div>

          {/* ── Mega menu — rendered outside container so it spans full width ── */}
          <AnimatePresence>
            {isServicesHovered && (
              <motion.div
                className="absolute left-0 z-50 w-full bg-white shadow-lg"
                onMouseEnter={showServices}
                onMouseLeave={hideServices}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <ServicesMegaMenu />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
};

export default Header;