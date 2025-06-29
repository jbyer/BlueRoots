"use client";
import type React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";

// Update the metadata
// export const metadata: Metadata = {
//   title: "Admin Dashboard - BlueRoot",
//   description: "Manage your fundraising campaigns and account settings",
// };

export default function DonateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
