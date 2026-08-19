import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/app/components/css/satoshi.css";
import "../../components/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/app/components/common/Loader";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Global Surf Digital | Backend Console",
  description: "Global Surf Digital | Backend Console",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  const session = await auth();
  const role = (session?.user as any)?.role || null;

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <SessionProvider>
            <Toaster />
            <DefaultLayout role={role}>{children}</DefaultLayout>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
