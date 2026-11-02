import "@/app/components/css/style.css";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html>
        <body>{children}</body>
      </html>
    </>
  );
}
