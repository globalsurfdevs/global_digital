import React from "react";
import Link from "next/link";

const SidebarDropdown = ({ item, activeRoute }: any) => {
  return (
    <ul className="ml-[21px] mt-1 flex flex-col gap-0.5 border-l border-white/10 pb-2 pl-3">
      {item.map((item: any, index: number) => {
        const isActive = item.route === activeRoute;
        return (
          <li key={index}>
            <Link
              href={item.route}
              aria-current={isActive ? "page" : undefined}
              className={`relative block rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                isActive
                  ? "bg-white/10 font-semibold text-white"
                  : "font-medium text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {isActive && (
                // Marker sits on the guide line to show which sub-page is open.
                <span
                  className="absolute -left-[14px] top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-primary"
                  aria-hidden
                />
              )}
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarDropdown;
