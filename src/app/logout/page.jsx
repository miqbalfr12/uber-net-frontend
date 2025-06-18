"use client";

import {signOut} from "next-auth/react";
import {useEffect} from "react";

export default function Home() {
 useEffect(() => {
  signOut({callbackUrl: "/"});
 });
 return (
  <div className="flex items-center justify-center w-full h-screen bg-white">
   <span className="loader"></span>
  </div>
 );
}
