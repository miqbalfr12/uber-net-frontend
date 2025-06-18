"use client";
import {useSession} from "next-auth/react";
import iconMap from "@/components/icon";
import {ChevronDown, ChevronUp, MenuIcon, X} from "lucide-react";
import Link from "next/link";
import React, {useState} from "react";
import {
 menuOwner,
 menuAdmin,
 menuPelanggan,
} from "../api/auth/[...nextauth]/routes";
import {usePathname} from "next/navigation";

const Layout = ({children}) => {
 const {data: session} = useSession();

 const pathname = usePathname();

 //  const session = {
 //   user: {
 //    role:
 //     pathname.split("/")[1] === "owner"
 //      ? "Owner"
 //      : pathname.split("/")[1] === "admin"
 //      ? "Admin"
 //      : "Pelanggaan",
 //    color: "#005B8A",
 //    name:
 //     pathname.split("/")[1] === "owner"
 //      ? "Owner"
 //      : pathname.split("/")[1] === "admin"
 //      ? "Admin"
 //      : "Pelanggaan",
 //    username:
 //     pathname.split("/")[1] === "owner"
 //      ? "Owner"
 //      : pathname.split("/")[1] === "admin"
 //      ? "Admin"
 //      : "Pelanggaan",
 //    menuItems:
 //     pathname.split("/")[1] === "owner"
 //      ? menuOwner
 //      : pathname.split("/")[1] === "admin"
 //      ? menuAdmin
 //      : menuPelanggan,
 //   },
 //  };

 const [isAsideVisible, setIsAsideVisible] = useState(true);

 const toggleAside = () => {
  setIsAsideVisible(!isAsideVisible);
 };

 const [openIndexes, setOpenIndexes] = useState({});

 const toggleDropdown = (index) => {
  setOpenIndexes((prevState) => ({
   ...prevState,
   [index]: !prevState[index],
  }));
 };

 if (session)
  return (
   <div
    className={`flex w-full h-screen overflow-hidden ${
     session?.user?.color === "#005B8A"
      ? "bg-[#005B8A]"
      : session?.user?.color === "#9B4900"
      ? "bg-[#9B4900]"
      : session?.user?.color === "#2B6100"
      ? "bg-[#2B6100]"
      : "bg-[#000000]"
    }`}>
    <aside
     className={`bg-[${
      session?.user?.color
     }] fixed overflow-y-auto z-40 transition-all duration-300 ease-in-out ${
      isAsideVisible
       ? "w-full top-0 left-0 h-dvh translate-y-0"
       : " h-0 -translate-y-full"
     } ${
      isAsideVisible
       ? "lg:w-[350px] lg:translate-x-0"
       : "w-0 lg:-translate-x-full"
     }`}>
     <div className="h-[87px] flex items-center justify-between px-8">
      <p className="text-2xl font-bold">UBER NET</p>
      <button onClick={toggleAside}>
       <X />
      </button>
     </div>
     <ul className="flex flex-col gap-8 px-8 mb-20">
      {session?.user?.menuItems.map((item, index) => {
       const IconComponent = iconMap[item.icon];
       if (item.type === "link") {
        return (
         <li
          key={index}
          onClick={toggleAside}>
          <Link
           href={item.href}
           className="flex gap-2">
           {IconComponent} {item.content}
          </Link>
         </li>
        );
       }
       if (item.type === "text") {
        return (
         <li
          key={index}
          onClick={toggleAside}>
          <p className="ml-4 text-lg font-bold opacity-50">{item.content}</p>
         </li>
        );
       }
       if (item.type === "dropdown") {
        const isOpen = openIndexes[index];
        return (
         <li key={index}>
          <button
           className="flex justify-between w-full"
           onClick={() => toggleDropdown(index)}>
           <span className="flex gap-2">
            {iconMap[item.icon]} {item.content}
           </span>
           {isOpen ? <ChevronUp /> : <ChevronDown />}
          </button>
          <ul
           className={`flex flex-col gap-6 mt-6 ${
            isOpen ? "block" : "hidden"
           }`}>
           {item.items.map((subItem, subIndex) => (
            <li
             key={subIndex}
             onClick={toggleAside}>
             <Link
              href={subItem.href}
              className="flex gap-2 ml-8">
              {subItem.content}
             </Link>
            </li>
           ))}
          </ul>
         </li>
        );
       }
       return null;
      })}
     </ul>
    </aside>
    <div
     className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
      isAsideVisible ? "lg:ml-[350px]" : "lg:ml-0"
     }`}>
     <header className="h-[87px] w-full text-black bg-white flex-shrink-0 shadow-sm px-8">
      <nav className="flex items-center justify-end h-full">
       <button
        onClick={toggleAside}
        className={`${isAsideVisible ? "lg:hidden" : "lg:block"}`}>
        <MenuIcon />
       </button>
       <div className="flex items-center justify-end gap-4 grow">
        <div className="flex flex-col items-end">
         <p className="text-lg font-semibold">{session?.user?.name}</p>
         <p>{session?.user?.role}</p>
        </div>
       </div>
      </nav>
     </header>
     <main className="flex-1 overflow-y-auto bg-[#ebebeb]">{children}</main>
    </div>
   </div>
  );
 else
  return (
   <div className="flex items-center justify-center w-full h-screen bg-white">
    <span className="loader"></span>
   </div>
  );
};

export default Layout;
