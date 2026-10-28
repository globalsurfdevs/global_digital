"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, UserCog } from "lucide-react";
import { signOut } from "next-auth/react";

/** Account actions pinned to the bottom of the sidebar (moved here from the header dropdown). */
const SidebarAccount = () => {
  const pathname = usePathname();
  const handleSignOut = async () => {
    try {
      await signOut({ redirectTo: "/auth/signin" });
    } catch (error) {
      console.log("Error in signout:", error);
    }
  };

  const isSettingsActive = pathname === "/admin/settings";
  const rowClass =
    "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-200";

  return (
    <div className="shrink-0 border-t border-white/20 px-3 py-3">
      <ul className="flex flex-col gap-1">
        <li>
          <Link
            href="/admin/settings"
            aria-current={isSettingsActive ? "page" : undefined}
            className={`${rowClass} ${
              isSettingsActive
                ? "bg-white/10 font-semibold text-white"
                : "font-medium text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {isSettingsActive && (
              <span
                className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-primary"
                aria-hidden
              />
            )}
            <UserCog
              className={`size-[18px] shrink-0 ${isSettingsActive ? "text-primary" : ""}`}
              aria-hidden
            />
            Account Settings
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={handleSignOut}
            className={`${rowClass} font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400`}
          >
            <LogOut className="size-[18px] shrink-0" aria-hidden />
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAccount;
