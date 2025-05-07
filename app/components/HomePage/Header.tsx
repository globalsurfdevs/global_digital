"use client";
import { useEffect, useRef, useState } from "react";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { Example } from "../MobileMenu/Example";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems } from "../../data/menuItems";
import Link from "next/link";
import LetsTalk from "@/app/components/common/LetsConnect";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        console.log("Not contains");
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mouseover", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleMobileMenuToggle = () => {
      if (window.innerWidth < 1024) {
        setMobileMenu(true);
      } else {
        setMobileMenu(false);
      }
    };

    // Initial check
    handleMobileMenuToggle();
    console.log(mobileMenu);

    // Add event listener
    window.addEventListener("resize", handleMobileMenuToggle);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleMobileMenuToggle);
    };
  }, []);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const testVariants = {
    initial: {
      opacity: 0,
      scaleX: 0,
      backgroundColor: "black",
    },
    hover: {
      opacity: 1,
      scaleX: 1,
      backgroundColor: [
        "black", // At the start
        "black", // Remain black until 50%
        "red", // Transition to red after 50%
      ],
      transition: {
        scaleX: {
          duration: 0.5, // Duration of the scaling animation
          ease: "easeInOut",
        },
        backgroundColor: {
          duration: 1, // Duration of the color animation
          ease: "easeInOut",
          times: [0, 0.7, 1],
        },
      },
    },
  };

  const [openDropdownIndex, setOpenDropdownIndex] = useState<null | number>(
    null,
  );

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      // disables scroll
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto"; // resets to default
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  if (mobileMenu) {
    return (
      <div className="flex items-center p-4 align-middle">
        <Link href="/">
          <Image src={assets.logo} alt="logo" />
        </Link>
        <Example />
      </div>
    );
  } else {
    return (
      <>
        {modalOpen && (
          <div className="fixed left-0 top-0 z-[1000] w-screen overflow-y-auto bg-white">
            <LetsTalk onClose={() => setModalOpen(false)} />
          </div>
        )}
        <header
          className={`py-4 pb-4 lg:py-[22px] ${isSticky ? "header" : ""}`}
        >
          <div className="container flex items-center justify-between">
            <div className="logo-s relative">
              <Image
                src={assets.logo}
                className="w-[200px]"
                alt="Global Surf Digital Logo"
                width={100}
                height={100}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <nav
              className={`${
                isMenuOpen ? "block" : "hidden"
              } absolute left-0 top-16 z-10 w-full bg-white text-sm font-medium lg:static lg:flex lg:w-auto lg:space-x-8 lg:bg-transparent`}
            >
              {menuItems.map((item, index) =>
                item.children ? (
                  <div key={index}>
                    <div
                      className="group relative"
                      onMouseEnter={() => setOpenDropdownIndex(index)}
                      onMouseLeave={() => setOpenDropdownIndex(null)}
                    >
                      <button className="large-screen-menu-item flex items-center px-4 py-2 text-black hover:text-primary lg:px-0">
                        {item.item} <span className="ml-1 text-primary"></span>
                      </button>
                    </div>

                    <AnimatePresence>
                      {openDropdownIndex == index && (
                        <motion.div
                          className="items-star absolute z-50 flex flex-col rounded-lg bg-white p-4 shadow-lg transition-all duration-100 ease-in-out"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 5 }}
                          exit={{ opacity: 0, y: -5 }}
                          onMouseEnter={() => setOpenDropdownIndex(index)}
                          onMouseLeave={() => setOpenDropdownIndex(null)}
                        >
                          {item.children.map((childItem, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Link
                                href={childItem.url}
                                className="flex items-center gap-3 rounded-md px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                              >
                                <Image
                                  src={childItem.svg}
                                  alt="image"
                                  className="h-6 w-6 object-contain"
                                />
                                <span>{childItem.item}</span>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    className="flex flex-col justify-center"
                    whileHover="hover"
                    initial="initial"
                    key={index}
                  >
                    <Link
                      href={item.url}
                      className="large-screen-menu-item block px-4 text-black hover:text-primary lg:px-0"
                    >
                      {item.item}
                    </Link>
                    <motion.div
                      className="h-0.5 w-full origin-left bg-primary transition-transform duration-200"
                      variants={testVariants}
                    ></motion.div>
                  </motion.div>
                ),
              )}

              <button
                onClick={() => {
                  setModalOpen(true);
                  document.body.style.overflow = "hidden";
                }}
                className="hover:bg-prtext-primary group hidden items-center space-x-2 rounded-full border border-primary px-6 py-2 text-primary transition duration-300
               ease-in hover:text-black   hover:shadow-lg lg:flex"
              >
                <span className="duration-300 ease-in group-hover:text-black">
                  LET’S TALK
                </span>
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
              </button>
            </nav>
          </div>
        </header>
      </>
    );
  }
};

export default Header;
