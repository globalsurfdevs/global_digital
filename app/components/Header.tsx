"use client";
import { useState } from "react";
import { assets } from "@/public/assets/assets";
import Image from "next/image";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <header className="border-b py-4">
      <div className="container flex items-center justify-between">
        <div className="logo-s">
          <Image
            src={assets.logo}
            className="w-[200px]"
            alt=""
            width={100}
            height={100}
          />
        </div>
        <button
          className="lg:hidden text-black"
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
        } absolute z-10 top-16 left-0 w-full bg-white lg:static lg:flex lg:w-auto lg:space-x-8 lg:bg-transparent text-sm font-medium`}
      >
        <a href="#" className="block px-4 py-2 lg:px-0 text-black hover:text-primary">
          ABOUT
        </a>

        {/* Dropdown for SERVICES */}
        <div
          className="relative group"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button className="block px-4 py-2 lg:px-0 text-black hover:text-primary flex items-center">
            SERVICES <span className="text-primary ml-1">+</span>
          </button>
          {(isDropdownOpen || isMenuOpen) && (
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-md lg:group-hover:block">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Service 1
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Service 2
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Service 3
              </a>
            </div>
          )}
        </div>

        <a href="#" className="block px-4 py-2 lg:px-0 text-black hover:text-primary">
          PORTFOLIO
        </a>
        <a href="#" className="block px-4 py-2 lg:px-0 text-black hover:text-primary">
          CAREERS
        </a>
        <a href="#" className="block px-4 py-2 lg:px-0 text-black hover:text-primary">
          BLOGS
        </a>
        <a
        href="#"
        className="hidden lg:flex items-center space-x-2 px-6 py-2 border border-prtext-primary rounded-full text-primary hover:bg-prtext-primary hover:text-white transition"
      >
        <span>LET’S TALK</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
      </nav>
     
      </div>
    </header>
  );
};

export default Header;
