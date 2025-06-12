import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItemv2";

import LetsTalk from "@/app/components/common/LetsConnect";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { menuItems as rawMenuItems } from "@/app/data/menuv2";

const menuItems: MenuItemType[] = rawMenuItems;

interface MenuToggleProps {
  onHide: () => void;
  toggle: () => void;
}

interface MenuChild {
  item: string;
  svg?: any;
  url: string;
  children?: MenuChild[];
}

interface MenuItemType {
  item: string;
  svg?: any;
  url: string;
  children?: MenuChild[];
}

export const Navigation: React.FC<MenuToggleProps> = ({ toggle, onHide }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
  const [openSubSubmenus, setOpenSubSubmenus] = useState<{ [key: string]: boolean }>({});

  const handleSubmenuToggle = (submenuKey: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [submenuKey]: !prev[submenuKey],
    }));
  };

  const handleSubSubmenuToggle = (submenuKey: string) => {
    setOpenSubSubmenus((prev) => ({
      ...prev,
      [submenuKey]: !prev[submenuKey],
    }));
  };

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
const dropdownVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  visible: {
    opacity: 1,
    height: "fit-content",
    overflow: "hidden",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};
  return (
    <div className="">
      {modalOpen && (
        <div className="fixed left-0 top-13 lg:top-0  z-[1000] w-screen overflow-y-auto bg-white ">
          <LetsTalk onClose={() => { setModalOpen(false); onHide(); }} />
        </div>
      )}

      <motion.ul className="mobile-menu-ul mb-5">
        {menuItems.map((menuItem, index) => (
          <li key={index} className="w-full">
            <MenuItem item={menuItem.item} Links={menuItem.url} toggle={toggle}>
              {menuItem.children &&
                menuItem.children.map((child, childIndex) => {
                  const submenuKey = `${index}-${childIndex}`;
                  const hasSubmenu = child.children && child.children.length > 0;

                  return (
                    <li
                      key={childIndex}
                      className="flex flex-col items-start border-b last:border-none w-full"
                    >
                      <div
                        className="flex items-center w-full cursor-pointer py-4"
                        onClick={(e) => {
                          if (hasSubmenu) {
                            e.stopPropagation();
                            handleSubmenuToggle(submenuKey);
                          }
                        }}
                      >
                        <Link
                          href={child.url}
                          className="flex items-center gap-2 flex-1 uppercase text-sm"
                          onClick={(e) => {
    if (hasSubmenu) {
      e.preventDefault();
    } else {
      toggle(); // ✅ Close menu
    }
  }}
                          
                        >
                          {child.item}
                        </Link>
                        {hasSubmenu && (
                          <span className="mr-2">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className={`transition-transform duration-200 ${openSubmenus[submenuKey] ? "rotate-180" : ""}`}
                            >
                              <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </span>
                        )}
                      </div>

                      {hasSubmenu && (
                        <motion.ul
  className="ml-2 space-y-1"
  variants={dropdownVariants}
  initial="hidden"
  animate={openSubmenus[submenuKey] ? "visible" : "hidden"}
  exit="exit"
>

                          {child.children?.map((subChild, subChildIndex) => {
                            const subSubmenuKey = `${submenuKey}-${subChildIndex}`;
                            const hasSubSubmenu = subChild.children && subChild.children.length > 0;

                            return (
                              <li key={subChildIndex} className="flex flex-col">
                                <div
                                  className="flex items-center w-full cursor-pointer py-1 px-2"
                                  onClick={(e) => {
                                    if (hasSubSubmenu) {
                                      e.stopPropagation();
                                      handleSubSubmenuToggle(subSubmenuKey);
                                    }
                                  }}
                                >
                                  <Link
                                    href={subChild.url}
                                    className={`flex items-center gap-2 flex-1 text-sm no-underline uppercase ${subChildIndex === (child.children?.length ?? 0) - 1 ? "pb-4" : ""}`}
                                   onClick={(e) => {
    if (hasSubSubmenu) {
      e.preventDefault();
    } else {
      toggle(); // ✅ Close menu
    }
  }}
                                  >
                                    <div className="bg-primary size-[6px]"></div>
                                    {subChild.svg && (
                                      <Image
                                        src={subChild.svg}
                                        alt={subChild.item}
                                        className="h-4 w-4"
                                        width={16}
                                        height={16}
                                      />
                                    )}
                                    {subChild.item}
                                  </Link>
                                  {hasSubSubmenu && (
                                    <span className="ml-2">
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`transition-transform duration-200 ${openSubSubmenus[subSubmenuKey] ? "rotate-180" : ""}`}
                                      >
                                        <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                      </svg>
                                    </span>
                                  )}
                                </div>

                                {hasSubSubmenu && (
                                  <motion.ul
  className="ml-2 space-y-1"
  variants={dropdownVariants}
  initial="hidden"
  animate={openSubSubmenus[subSubmenuKey] ? "visible" : "hidden"}
  exit="exit"
>


                                    {subChild.children?.map((subSubChild, subSubChildIndex) => (
                                      <li key={subSubChildIndex}>
                                        <Link href={subSubChild.url} className="py-1 px-2 flex items-center gap-2 text-xs hover:underline">
                                          {subSubChild.svg && (
                                            <Image
                                              src={subSubChild.svg}
                                              alt={subSubChild.item}
                                              className="h-3 w-3"
                                              width={12}
                                              height={12}
                                            />
                                          )}
                                          {subSubChild.item}
                                        </Link>
                                      </li>
                                    ))}
                                  </motion.ul>
                                )}
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </li>
                  );
                })}
            </MenuItem>
          </li>
        ))}
      </motion.ul>

      <div className="w-fit px-6 mb-6 ">
        <button
          onClick={() => {
            setModalOpen(true);
            onHide();
          }}
          className="hover:bg-prtext-primary group flex items-center space-x-2 rounded-full border border-primary px-6 py-2 text-primary transition duration-300 ease-in hover:text-black hover:shadow-lg"
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
