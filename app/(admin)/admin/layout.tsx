"use client"

import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/app/components/css/satoshi.css";
import "../../components/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/app/components/common/Loader";
import { SessionProvider } from "next-auth/react"
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <SessionProvider>
          <Toaster />
          {loading ? <Loader /> : children}
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}