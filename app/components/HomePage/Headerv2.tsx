"use client";
import { useEffect, useState, useRef } from "react";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { Example } from "../MobileMenu/ExampleV2";
import { motion, AnimatePresence } from "framer-motion";
import ServicesMegaMenu from "./ServiceDropdown";
import Link from "next/link";
import LetsTalk from "@/app/components/common/LetsConnect";
import { usePathname } from "next/navigation"; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Track hover on SERVICES button and mega menu container
  const [isServicesHovered, setIsServicesHovered] = useState(false);
 
  // Ref to SERVICES button to position mega menu
  const servicesButtonRef = useRef<HTMLButtonElement>(null);

  // Position of mega menu
  const [megaMenuPos, setMegaMenuPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const pathname = usePathname();
  // Sticky header
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) return;
      setIsServicesHovered(false);
      setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleMobileMenuToggle = () => {
      setMobileMenu(window.innerWidth < 1024);
    };
    handleMobileMenuToggle();
    window.addEventListener("resize", handleMobileMenuToggle);
    return () => window.removeEventListener("resize", handleMobileMenuToggle);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [modalOpen]);

  // Update mega menu position when hover starts
  useEffect(() => {
    if (isServicesHovered && servicesButtonRef.current) {
      const rect = servicesButtonRef.current.getBoundingClientRect();
      setMegaMenuPos({
        left: rect.left,
        top: rect.bottom + window.scrollY, // To position below button, accounting for scroll
      });
    }
  }, [isServicesHovered]);

  if (mobileMenu) {
    // Hide mobile header when Let's Talk modal is open
    if (modalOpen) return null;

    return (
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center p-4 align-middle bg-white shadow-[0_2px_10px_0_rgba(0,0,0,0.1)] animate-[headerSlideDown_0.8s_forwards] transition-all duration-500 ease-in-out" >
        <Link href="/">
          <Image src="/gs-digital-logo.svg"  width={100}
              height={100} alt="logo" />
        </Link>
        <div className="flex justify-end items-center w-full gap-3">
          <a href="tel:+97145821133" className="flex items-center text-black hover:text-primary">
            <Image
              className="mt-2"
              src={assets.menuphoneicon}
              alt="Menu Icon"
              width={23}
              height={23}
            />
          </a>
          <Example />
        </div>
      </div>
    );
  }

  return (
    <>
      {modalOpen && (
          <div className="fixed inset-0 z-[1000] bg-white overflow-y-auto">
          <LetsTalk onClose={() => setModalOpen(false)} />
        </div>
      )}

      <header className={`py-4 pb-4 lg:py-[22px] z-[999] ${isSticky ? "header" : ""} relative`}>
        <div className="container flex items-center justify-between relative z-20">
          <div className="logo-s relative">
            <Image
              src="/gs-digital-logo.svg"
              className="w-[200px]"
              alt="Global Surf Digital Logo"
              width={100}
              height={100}
              priority
  unoptimized
            />
            <Link href="/" className="absolute top-0 h-full w-full"></Link>
          </div>

          <button
            className="text-black lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute left-0 top-16 z-10 w-full bg-white text-sm font-medium lg:static lg:flex lg:w-auto lg:space-x-8 lg:bg-transparent`}
          >
            {/* ABOUT */}
            <motion.div className="flex flex-col justify-center" whileHover="hover" initial="initial">
  <Link
    href="/about-us"
    className="relative large-screen-menu-item block px-4 text-black hover:text-primary lg:px-0 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
  >
    ABOUT
  </Link>
</motion.div>


            {/* SERVICES */}
            <motion.div
              className="relative flex flex-col justify-center"
              onMouseEnter={() => setIsServicesHovered(true)}
              onMouseLeave={() => setIsServicesHovered(false)}
            >
              <button
                ref={servicesButtonRef}
                className="large-screen-menu-item block px-4 text-black hover:text-primary lg:px-0"
                onClick={() => setIsServicesHovered((prev) => !prev)}
                aria-expanded={isServicesHovered}
                aria-haspopup="true"
                type="button"
              >
                SERVICES +
              </button>
            </motion.div>

          <motion.div className="flex flex-col justify-center" whileHover="hover" initial="initial">
              <Link href="/industry" className="relative large-screen-menu-item block px-4 text-black hover:text-primary lg:px-0 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
  >
                INDUSTRIES
              </Link>
            </motion.div>
            {/* PORTFOLIO */}
          <motion.div className="flex flex-col justify-center" whileHover="hover" initial="initial">
              <Link href="/portfolio" className="relative large-screen-menu-item block px-4 text-black hover:text-primary lg:px-0 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
  >
                PORTFOLIO
              </Link>
            </motion.div>

            {/* INSIGHT */}
            <motion.div className="flex flex-col justify-center" whileHover="hover" initial="initial">
                <div className="group relative">
                <div  className="large-screen-menu-item block px-4 text-black hover:text-primary lg:px-0 cursor-pointer" >
                  INSIGHT
                </div>
                <div className="mt-4 invisible absolute left-0 top-full z-20 min-w-[200px] rounded-md bg-white p-4 shadow-lg opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                  <Link
                  href="/blogs"
                  className="flex items-center gap-3 rounded-md px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                  >
                  <Image
                    src={assets.blog}
                    alt="image"
                    className="h-6 w-6 object-contain"
                  />
                  <span>Blogs</span>
                  </Link>
                  <Link
                  href="/case-study"
                  className="flex items-center gap-3 rounded-md px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                  >
                  <Image
                    src={assets.casestudy}
                    alt="image"
                    className="h-6 w-6 object-contain"
                  />
                  <span>Case Studies</span>
                  </Link>
                </div>
                </div>
            </motion.div>

            {/* CAREERS */}
           <motion.div className="flex flex-col justify-center" whileHover="hover" initial="initial">
              <Link href="/careers" className="relative large-screen-menu-item block px-4 text-black hover:text-primary lg:px-0 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
  >
                CAREERS
              </Link>
            </motion.div>

            {/* LET'S TALK */}
            <button
              onClick={() => {
                setModalOpen(true);
                document.body.style.overflow = "hidden";
              }}
              className="hover:bg-prtext-primary group hidden items-center space-x-2 rounded-full border border-primary px-6 py-2 text-primary transition duration-300 ease-in hover:text-black hover:shadow-lg lg:flex"
            >
              <span className="duration-300 ease-in group-hover:text-black">LET’S TALK</span>
              <div className="bg-primary p-1">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:scale-105"
                >
                  <g clipPath="url(#clip0_65_39)">
                    <path d="M8.88346 1.26172L1.13281 8.8624" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                    <path d="M1.13281 1.26172H8.88346V8.71245" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                  </g>
                  <defs>
                    <clipPath id="clip0_65_39">
                      <rect width="10" height="10" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </button>
            {/*  GET AUDIT button only for /free-digital-marketing-audit */}
            {pathname === "/free-digital-marketing-audit" && (
  <Link
    href="#requestst"
    scroll={true}
    className=" md:flex w-fit items-center gap-3 border border-l-0 border-r-0 border-t-0 border-transparent px-3 py-2 bg-primary  rounded-[5px]" >
    <div className="relative">
    <p className="duration-200 text-sm font-medium uppercase ease-in-out text-white md:text-[16px]">
        GET AUDIT
      </p>
    </div>

  </Link>
)}
          </nav>

          {/* -- End of container -- */}
        </div>

        {/* ServicesMegaMenu rendered OUTSIDE container, but inside header */}
        <AnimatePresence>
          {isServicesHovered && (
            <motion.div
  className="absolute left-0  z-50 w-full bg-white shadow-lg"
  onMouseEnter={() => setIsServicesHovered(true)}
  onMouseLeave={() => setIsServicesHovered(false)}
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
>

    <ServicesMegaMenu />

</motion.div>

          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
