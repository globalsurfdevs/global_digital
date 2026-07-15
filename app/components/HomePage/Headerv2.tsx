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
import { serviceData } from "./ServiceDropdown";

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
    [],
  );

  // derive all service links from serviceData
  const allServiceLinks = Object.values(serviceData).flatMap((category) => {
    const { titleurl, categoryText, ...services } = category;
    const categoryLink = titleurl ? [{ url: titleurl, label: "" }] : [];
    const serviceLinks = Object.values(services).map((s) => ({
      url: (s as { url?: string }).url ?? "#",
      label: "",
    }));
    return [...categoryLink, ...serviceLinks];
  });

  // ─── Mobile layout ────────────────────────────────────────────────────────
  if (mobileMenu) {
    if (modalOpen) return null;
    return (
      <div className="fixed left-0 right-0 top-0 z-20 flex animate-[headerSlideDown_0.8s_forwards] items-center bg-white p-4 align-middle shadow-[0_2px_10px_0_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out">
        {/*
          Logo: width/height match the actual rendered size (100px on mobile).
          No `unoptimized` — let Next.js optimise the SVG.
        */}
        <Link href="/">
          <Image
            src="/gs-digital-logo.svg"
            alt="GS Digital"
            width={100}
            height={32}
            priority
          />
        </Link>
        <div className="flex w-full items-center justify-end gap-3">
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
        <div className="fixed inset-0 z-[1000] overflow-y-auto bg-white">
          <LetsTalk onClose={closeModal} />
        </div>
      )}

      <header ref={parentRef}>
        <div
          ref={headerRef}
          className={`header relative z-[999] py-4 pb-4 transition-transform
            duration-300 ease-in-out lg:py-[22px]
            ${isSticky ? "translate-y-0" : "-translate-y-full"}
            ${isShadow ? "shado" : "shadowss"}`}
        >
          <div className="container relative z-20 flex items-center justify-between">
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
                alt="GS Digital Logo"
                width={200}
                height={50}
                priority
                fetchPriority="high"
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
              lg:static lg:flex lg:w-auto lg:space-x-5 lg:bg-transparent xl:space-x-8`}
            >
              {/* ABOUT — plain div, hover handled by Tailwind CSS */}
              <div className="flex flex-col justify-center">
                <Link
                  href="about-us"
                  className="large-screen-menu-item relative block px-4 text-black after:absolute after:bottom-0
                    after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all
                    after:duration-300 hover:text-primary hover:after:w-full lg:px-0"
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
                  href="industry"
                  className="large-screen-menu-item relative block px-4 text-black after:absolute after:bottom-0
                    after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all
                    after:duration-300 hover:text-primary hover:after:w-full lg:px-0"
                >
                  INDUSTRIES
                </Link>
              </div>

              {/* PORTFOLIO */}
              <div className="flex flex-col justify-center">
                <Link
                  href="portfolio"
                  className="large-screen-menu-item relative block px-4 text-black after:absolute after:bottom-0
                    after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all
                    after:duration-300 hover:text-primary hover:after:w-full lg:px-0"
                >
                  PORTFOLIO
                </Link>
              </div>

              {/* INSIGHT — CSS-only dropdown, no JS state needed */}
              <div className="flex flex-col justify-center">
                <div className="group relative">
                  <div className="large-screen-menu-item block cursor-pointer px-4 text-black hover:text-primary lg:px-0">
                    INSIGHT
                  </div>
                  <div
                    className="invisible absolute left-0 top-full z-20 mt-4 min-w-[200px]
                      translate-y-2 rounded-md bg-white p-4 opacity-0 shadow-lg
                      transition-all duration-200
                      group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <Link
                      href="blogs"
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
                      href="case-study"
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
                  href="careers"
                  className="large-screen-menu-item relative block px-4 text-black after:absolute after:bottom-0
                    after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all
                    after:duration-300 hover:text-primary hover:after:w-full lg:px-0"
                >
                  CAREERS
                </Link>
              </div>

              {/* CONTACT US */}
              <Link
                href="contact-us"
                className="hover:bg-prtext-primary group hidden items-center space-x-2 rounded-full
                  border border-primary px-6 py-2 text-primary transition duration-300 ease-in
                  hover:text-black hover:shadow-lg lg:flex"
              >
                <span className="uppercase duration-300 ease-in group-hover:text-black">
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
              {pathname === "free-digital-marketing-audit" && (
                <Link
                  href="#requestst"
                  scroll={true}
                  className="w-fit items-center gap-3 rounded-[5px] border border-transparent
                    bg-primary px-3 py-2 md:flex"
                >
                  <p className="text-sm font-medium uppercase text-white duration-200 ease-in-out md:text-[16px]">
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


        {/* SEO: static service links for crawlers */}
        <nav aria-label="Services sitemap" className="sr-only">
          {allServiceLinks
            .filter(({ url }) => url && url !== "#")
            .map(({ url }) => {
              const label = url
                .replace(/^\//, "")           // strip leading slash
                .replace(/-/g, " ")           // hyphens to spaces
                .replace(/[<>]/g, "")         // ← strip any stray angle brackets
                .trim();
              return label ? (
                <Link key={url} href={url}>
                  {label}
                </Link>
              ) : null;
            })}
        </nav>
      </header>
    </>
  );
};

export default Header;
