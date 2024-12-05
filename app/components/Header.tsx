"use client";
import { useEffect, useRef, useState } from "react";
import { assets } from "@/public/assets/assets";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  
  return (
    <header className="border-b py-4">
      
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
          <a href="#" className="block px-4 py-2 lg:px-0 text-black hover:text-primary">
            ABOUT
          </a>

          {/* Dropdown for SERVICES */}
          {/* <div className="relative group" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}> */}
          <div className="relative group" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
            <button className="block px-4 py-2 lg:px-0 text-black hover:text-primary flex items-center">
              SERVICES <span className="text-primary ml-1">+</span>
            </button>
            {(isDropdownOpen || isMenuOpen) && (
              <div className="absolute left-0 bg-transparent">
                <div className="pt-2 w-48 bg-white shadow-lg border rounded-md lg:group-hover:block">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Service 1
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Service 2
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Service 3
                  </a>
                </div>
              </div>
            )}
          </div>
          <a href="#" className="block px-4 py-2 lg:px-0 text-black hover:text-primary"> PORTFOLIO </a>
          <a href="#" className="block px-4 py-2 lg:px-0 text-black hover:text-primary">  CAREERS </a>
          <a href="#" className="block px-4 py-2 lg:px-0 text-black hover:text-primary"> BLOGS </a>
          <a href="#" className="hidden lg:flex items-center space-x-2 px-6 py-2 border border-primary rounded-full text-primary hover:bg-prtext-primary hover:text-primary transition">
            <span>LET’S TALK</span>
            <div className="bg-primary p-1">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
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
};

export default Header;
