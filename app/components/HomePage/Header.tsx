"use client";
import { useEffect, useRef, useState } from "react";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { Example } from "../MobileMenu/Example";
import { motion, AnimatePresence } from 'framer-motion'
import { menuItems } from "../../data/menuItems";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false)
  const [visibleHeader, setVisibleHeader] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        console.log("Not contains")
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
    console.log(mobileMenu)

    // Add event listener
    window.addEventListener("resize", handleMobileMenuToggle);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleMobileMenuToggle);
    };
  }, []);

  useEffect(() => {

    const handleScroll = () => {
      const triggerSection = document.getElementById("triggerSection")
      if (triggerSection) {
        if (window.scrollY >= triggerSection?.offsetTop) {
          setVisibleHeader(true)
        } else {
          setVisibleHeader(false)
        }
      }

      console.log("Scrolling")

    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)

  }, [])

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
          duration: .5, // Duration of the scaling animation
          ease: "easeInOut",
        },
        backgroundColor: {
          duration: 1, // Duration of the color animation
          ease: "easeInOut",
          times: [0, 0.7, 1],
        }
      },

    }

  }


  if (mobileMenu) {
    return (
      <div className="flex items-center p-4">
        <Image src={assets.logo} alt="logo" />
        <Example />
      </div>
    )

  } else {
    return (
      <header className={` py-4 pb-4 lg:pb-[22px] ${visibleHeader ? "header" : ""}`}>
        <div className="container flex items-center justify-between">
          <div className="logo-s">
            <Image src={assets.logo} className="w-[200px]" alt="" width={100} height={100} />
          </div>
          <button className="lg:hidden text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav className={`${isMenuOpen ? "block" : "hidden"} absolute z-10 top-16 left-0 w-full bg-white lg:static lg:flex lg:w-auto lg:space-x-8 lg:bg-transparent text-sm font-medium`}>
            {menuItems.map((item, index) => (
              item.children ? (
                <div key={index}>
                <div className="relative group" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                    <button className="px-4 py-2 lg:px-0 text-black hover:text-primary flex items-center large-screen-menu-item">
                      SERVICES <span className="text-primary ml-1">+</span>
                    </button>

                  </div>

                <AnimatePresence>
                  {(isDropdownOpen || isMenuOpen) && (
                    <motion.div className="absolute bg-transparent flex flex-col items-center -translate-x-1/3"  onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                      <motion.div initial={{ y: 0 }} whileInView={{ y: 10 }} exit={{ y: 0 }} className="flex flex-col items-center">
                        <div className="">
                          <div className="h-5 w-5 rotate-45 bg-white relative border-t border-l border-2 border-b-0 border-r-0 -top-1 -z-10"></div>
                        </div>
                        <motion.div className="min-w-80 bg-white shadow-lg border rounded-md lg:group-hover:block -mt-4">

                          {item.children.map((childItem,index) => (
                            <motion.div initial="initial" whileHover="hover" key={index}>
                              <a href="#" className="px-4 py-2 text-sm text-gray-700 flex gap-2 items-center">
                                <Image src={childItem.svg} alt="image" className="h-6 w-6"></Image><p>{childItem.item}</p>
                              </a>
                              <motion.div className="w-full bg-red-400 h-0.5" variants={testVariants}></motion.div>
                            </motion.div>
                          ))}

                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
                </div>
              ) : (

                  <motion.div className="flex flex-col justify-center" whileHover="hover" initial="initial" key={index}>
                    <a href="#" className="block px-4 lg:px-0 text-black hover:text-primary large-screen-menu-item">
                      {item.item}
                    </a>
                    <motion.div className="w-full bg-red-400 h-0.5 origin-left" variants={testVariants}></motion.div>
                  </motion.div>

              )

            ))}



            <a href="#" className="hidden group lg:flex items-center space-x-2 px-6 py-2 border border-primary rounded-full text-primary hover:bg-prtext-primary hover:text-primary
               hover:text-black hover:shadow-lg ease-in duration-300 transition">
              <span className="group-hover:text-black ease-in duration-300">LET’S TALK</span>
              <div className="bg-primary p-1">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-105">
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
            </a>
          </nav>
        </div>
      </header>
    );
  }


};

export default Header;



