"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/components/HomePage/Headerv2";
import HeaderWithoutMenu from "@/app/components/HomePage/HeaderWithoutMenu";
import type { HeaderNavigationPillar } from "@/app/lib/services/get-nav-services";

export default function HeaderSwitcher({
  navigation,
}: {
  navigation: HeaderNavigationPillar[];
}) {
  const pathname = usePathname();

  const noMenuRoutes = ["/digital-growth-landing-page", "/growth-partnership"];

  const useMinimalHeader = noMenuRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  return useMinimalHeader ? (
    <HeaderWithoutMenu navigation={navigation} />
  ) : (
    <Header navigation={navigation} />
  );
}
