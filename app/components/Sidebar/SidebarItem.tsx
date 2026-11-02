import React, { useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import SidebarDropdown from "@/app/components/Sidebar/SidebarDropdown";

const SidebarItem = ({ item, pageName, setPageName, activeRoute }: any) => {
  const key = item.label.toLowerCase();
  const hasChildren = Boolean(item.children);
  const isOpen = pageName === key;

  const handleClick = () => {
    const updatedPageName = pageName !== key ? key : "";
    return setPageName(updatedPageName);
  };

  const isItemActive = hasChildren
    ? item.children.some((child: any) => child.route === activeRoute)
    : item.route === activeRoute;

  // Open the group that contains the current page after navigating or reloading.
  // Runs only when the route changes, so a group the user collapses stays collapsed.
  useEffect(() => {
    if (hasChildren && isItemActive && pageName !== key) setPageName(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRoute]);

  const rowClass = `group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
    isItemActive
      ? hasChildren
        ? "font-semibold text-white"
        : "bg-white/10 font-semibold text-white"
      : "font-medium text-slate-400 hover:bg-white/5 hover:text-white"
  }`;

  const content = (
    <>
      {isItemActive && !hasChildren && (
        <span
          className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-primary"
          aria-hidden
        />
      )}
      <span
        className={`flex size-5 shrink-0 items-center justify-center text-lg [&>svg]:size-[18px] ${
          isItemActive ? "text-primary" : ""
        }`}
      >
        {item.icon}
      </span>
      <span className="flex-1 truncate">{item.label}</span>
      {hasChildren && (
        <ChevronDown
          className={`size-4 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      )}
    </>
  );

  return (
    <li>
      {hasChildren ? (
        <button
          type="button"
          onClick={handleClick}
          aria-expanded={isOpen}
          className={rowClass}
        >
          {content}
        </button>
      ) : (
        <Link
          href={item.route}
          onClick={handleClick}
          aria-current={isItemActive ? "page" : undefined}
          className={rowClass}
        >
          {content}
        </Link>
      )}

      {hasChildren && (
        // Animates height smoothly by transitioning the grid row from 0fr to 1fr.
        <div
          className={`grid transition-[grid-template-rows,visibility] duration-300 ease-in-out ${
            isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <SidebarDropdown item={item.children} activeRoute={activeRoute} />
          </div>
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
