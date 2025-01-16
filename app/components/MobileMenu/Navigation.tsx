import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { menuItems } from "@/app/data/menuItems";
import Link from 'next/link';

import Image from "next/image";

export const Navigation = ({toggle}:{
  toggle:()=>void
}) => (
  <div className="">
  <motion.ul className="mobile-menu-ul  ">
  {menuItems.map((menuItem, index) => (
     <div key={index}>
    <MenuItem  item={menuItem.item} Links={menuItem.url} toggle={toggle}>
      {menuItem.children &&
        menuItem.children.map((child, childIndex) => (
          <li
            key={childIndex}
            className="flex items-center gap-2 hover:bg-gray-100 border-b last:border-none"

          >
            <Link href={child.url} className=" py-2 px-4 w-full">
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
  <Link
    href="/lets-talk"
    className="  group  flex items-center space-x-2 px-6 py-2 border border-primary rounded-full text-primary hover:bg-prtext-primary hover:text-primary
     hover:text-black hover:shadow-lg ease-in duration-300 transition"
  >
    <span className="group-hover:text-black ease-in duration-300">
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
  </Link>
</div>
  </div>

);
