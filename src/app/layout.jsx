"use client";
import {Inter} from "next/font/google";
import "./globals.css";
import {SessionProvider} from "next-auth/react";
import Script from "next/script";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}) {
 return (
  <html lang="en">
   <SessionProvider>
    <head>
     <Script
      src="https://app.sandbox.midtrans.com/snap/snap.js"
      data-client-key={process.env.NEXT_PUBLIC_CLIENT}></Script>
    </head>
    <body className={inter.className}>{children}</body>
   </SessionProvider>
  </html>
 );
}
