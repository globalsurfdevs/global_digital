import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { menuItems } from "@/app/data/menuItems";
import LetsTalk from "@/app/components/common/LetsConnect";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
interface MenuToggleProps {
  onHide: () => void;
  toggle: () => void; // Explicitly typing 'toggle' as a function returning void+
}


  export const Navigation: React.FC<MenuToggleProps> = ({ toggle, onHide }) => {


  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <div className="">
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[1000] w-screen overflow-y-auto bg-white">
          <LetsTalk onClose={() => { setModalOpen(false);onHide() }} />
        </div>
      )}

      <motion.ul className="mobile-menu-ul">
        {menuItems.map((menuItem, index) => (
          <div key={index}>
            <MenuItem item={menuItem.item} Links={menuItem.url} toggle={toggle}>
              {menuItem.children &&
                menuItem.children.map((child, childIndex) => (
                  <li
                    key={childIndex}
                    className="flex items-center gap-2 hover:bg-gray-100 border-b last:border-none"
                  >
                    <Link href={child.url} className="py-2 px-4 w-full">
                      <Image
                        src={child.svg}
                        alt={child.item}
                        className="h-6 w-6"
                        width={24}
                        height={24}
                      />
                      {child.item}
                    </Link>
                  </li>
                ))}
            </MenuItem>
          </div>
        ))}
      </motion.ul>

      <div className="w-fit px-6 mb-5">
        <button
          onClick={() => {
            setModalOpen(true);
            onHide()
          }}
          className="hover:bg-prtext-primary group flex items-center space-x-2 rounded-full border border-primary px-6 py-2 text-primary transition duration-300 ease-in hover:text-black hover:shadow-lg lg:flex"
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
      </div>
    </div>
  );
};
