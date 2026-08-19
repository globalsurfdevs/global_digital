"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/components/HomePage/Headerv2";
import HeaderWithoutMenu from "@/app/components/HomePage/HeaderWithoutMenu";

export default function HeaderSwitcher() {
  const pathname = usePathname();

  const noMenuRoutes = ["/digital-growth-landing-page", "/growth-partnership"];

  const useMinimalHeader = noMenuRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  return useMinimalHeader ? <HeaderWithoutMenu /> : <Header />;
}
