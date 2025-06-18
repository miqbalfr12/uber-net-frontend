"use client";
import Image from "next/image";
import {signIn, useSession} from "next-auth/react";
import ModalFailed from "@/components/modal/modalFailed";
import {useState} from "react";
import ModalLupaPassword from "@/components/modal/modalLupaPassword";

export default function Home() {
 const {data: session} = useSession();

 const [openSub, setOpenSub] = useState(false);
 const onHandlerSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  try {
   const ress = await signIn("credentials", {
    redirect: false,
    username: formData.get("username"),
    password: formData.get("password"),
    callbackUrl: "/pelanggan",
   });
   if (ress.error) {
    setOpenSub(ress.error);
   }
   if (ress.ok) {
    window.location.href = ress.url;
   }
  } catch (error) {
   setOpenSub(error);
  }
 };

 //  check session
 if (session) {
  window.location.href = "/pelanggan";
 }

 return (
  <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
   <div className="fixed top-0 bottom-0 left-0 w-full h-full bg-gray-50 dark:bg-gray-900 lg:bottom-0 lg:h-auto lg:w-full">
    <div className="absolute inset-0 lg:bg-[#00000066] "> </div>
    <img
     src="https://tco.am/blog/wp-content/uploads/2018/02/servers.jpg"
     alt=""
     className="object-cover w-full h-full"
    />
   </div>
   <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
     <div className="max-w-md mx-auto">
      <div className="mb-5">
       <img
        src="/img/logo.png"
        alt="Logo ITG"
        className="w-1/2 h-1/2 mx-auto mb-8"
       />
       <h1 className="text-2xl text-center text-black">UBER NET</h1>
      </div>
      <div className="divide-y divide-gray-200">
       <form
        onSubmit={onHandlerSubmit}
        className="pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        <div className="relative">
         <input
          autocomplete="off"
          id="username"
          name="username"
          type="text"
          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
          placeholder="Username"
         />
         <label
          for="username"
          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
          ID/Email/Username
         </label>
        </div>
        <div className="relative">
         <input
          autocomplete="off"
          id="password"
          type="password"
          name="password"
          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
          placeholder="Password"
         />
         <label
          for="password"
          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
          Password
         </label>
        </div>
        <div className="flex flex-col text-center gap-y-2">
         <button
          type="submit"
          className="bg-green-500 text-white rounded-md w-full py-1">
          Login
         </button>
        </div>
       </form>
      </div>
     </div>
    </div>
   </div>
   <ModalLupaPassword
    open={openSub === "lupa password" ? true : false}
    handler={() => {
     setOpenSub(false);
    }}
    color={"green"}></ModalLupaPassword>
   <ModalFailed
    open={openSub !== "lupa password" && openSub ? true : false}
    handler={() => {
     setOpenSub(false);
    }}>
    {openSub}
   </ModalFailed>
  </div>
 );
}
