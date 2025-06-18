"use client";
import {Inter} from "next/font/google";
import "./globals.css";
import {SessionProvider} from "next-auth/react";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}) {
 return (
  <html lang="en">
   <SessionProvider>
    <head>
     <script
      src="https://app.sandbox.midtrans.com/snap/snap.js"
      data-client-key={process.env.NEXT_PUBLIC_CLIENT}></script>
    </head>
    <body className={inter.className}>{children}</body>
   </SessionProvider>
  </html>
 );
}
