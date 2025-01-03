import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { menuItems } from "@/app/data/menuItems";
import Link from 'next/link';

import Image from "next/image";

export const Navigation = ({toggle}:{
  toggle:()=>void
}) => (
  <motion.ul className="mobile-menu-ul  ">
  {menuItems.map((menuItem, index) => (
     <div key={index}>
    <MenuItem  item={menuItem.item} Links={menuItem.url} toggle={toggle}>
      {menuItem.children &&
        menuItem.children.map((child, childIndex) => (
          <li
            key={childIndex}
            className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 border-b last:border-none"
            
          >
            <Link href={child.url}>
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

);
