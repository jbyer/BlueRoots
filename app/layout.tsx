"use client";
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ReduxProvider from "@/provider/ReduxProvider";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getAuthToken } from "@/lib/auth";


const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "BlueRoots - Democratic Fundraising Platform",
//   description:
//     "Support Democratic candidates and causes through secure, transparent fundraising.",
//   generator: "v0.dev",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const [token, setToken] = useState<string | null | undefined>(null);
    useEffect(() => {
      const token = getAuthToken();
      setToken(token);
    }, []);
  
  
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* {!token && <Navbar />} */}

        {/* <ReduxProvider> */}
        <main className="min-h-screen">{children}</main>
        {/* </ReduxProvider> */}

        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#4BB543",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ff3333",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
