import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { menuItems } from "@/app/data/menuItems";

import Image from "next/image";

export const Navigation = () => (
  <motion.ul className="mobile-menu-ul">
    {menuItems.map((menuItem, index) => (
      <MenuItem key={index} item={menuItem.item}>
        {menuItem.children &&
          menuItem.children.map((child, childIndex) => (
            <li
              key={childIndex}
              className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 border-b last:border-none"
            >
              <Image
                src={child.svg}
                alt={child.item}
                className="h-6 w-6"
                width={24}
                height={24}
              />
              {child.item}
            </li>
          ))}
      </MenuItem>
    ))}
  </motion.ul>
);
