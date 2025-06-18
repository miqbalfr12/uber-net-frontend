"use client";
import React from "react";
import Modal from "..";
import {X} from "lucide-react";
import Input from "@/components/input";
import ModalSuccess from "../modalSuccess";
import ModalFailed from "../modalFailed";

const ModalLupaPassword = ({open, handler, color}) => {
 const [openSub, setOpenSub] = React.useState(false);
 const [loading, setLoading] = React.useState(false);
 const [failMsg, setFailMsg] = React.useState("Buat Akun User Gagal Disimpan");
 const handleSub = async (e) => {
  e.preventDefault();
  if (loading) {
   return;
  }
  setLoading(true);
  const formData = new FormData(e.target);
  const dataObj = {};
  formData.forEach((value, key) => {
   if (value) dataObj[key] = value;
  });
  const createUser = await fetch(`/api/v1.0.0/auth/reset`, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   cache: "no-store",
   body: JSON.stringify(dataObj),
  });
  if (createUser.ok) {
   setOpenSub("Success");
  } else {
   const err = await createUser.json();
   setOpenSub("Failed");
   setFailMsg(err.message);
  }

  setLoading(false);
 };

 return (
  <>
   <Modal
    open={open}
    handler={handler}>
    <form
     onSubmit={handleSub}
     className="px-8">
     <div
      className={`flex justify-between w-full pb-2 border-b-2 ${
       color === "blue"
        ? "border-[#2D95CA]"
        : color === "green"
        ? "border-[#76B445]"
        : color === "yellow"
        ? "border-[#E28839]"
        : "border-black"
      } mb-4 `}>
      <p className="text-xl font-semibold">Lupa Password</p>
      <button
       type="button"
       onClick={handler}>
       <X />
      </button>
     </div>
     <div className="flex flex-col gap-4 mb-4">
      <div>
       <p className="text-xl font-semibold">Informasi User</p>
       <p>Lengkapi Informasi User</p>
      </div>
      <div className="flex flex-wrap w-full gap-2 md:flex-nowrap">
       <Input
        label="NIK"
        name="nik"
        required
        color={color}
        type="text"
       />
       <Input
        label="Email"
        name="email"
        required
        color={color}
        type="email"
       />
      </div>
     </div>
     <div
      className={`pt-2 border-t-2 flex justify-end ${
       color === "blue"
        ? "border-[#2D95CA]"
        : color === "green"
        ? "border-[#76B445]"
        : color === "yellow"
        ? "border-[#E28839]"
        : "border-black"
      } mt-4`}>
      <button
       onClick={handler}
       type="button"
       className="px-4 py-2">
       Tutup
      </button>
      <button
       type="submit"
       className={`px-4 py-2 rounded-lg text-white ${
        color === "blue"
         ? "bg-[#2D95CA]"
         : color === "green"
         ? "bg-[#76B445]"
         : color === "yellow"
         ? "bg-[#E28839]"
         : "bg-black"
       } `}>
       {loading ? "Loading" : "Reset"}
      </button>
     </div>
    </form>
   </Modal>
   <ModalSuccess
    open={openSub === "Success"}
    handler={() => {
     setOpenSub(false);
     handler();
    }}>
    Akun User Berhasilan Direset, dan dikirim via Email/Whatsaapp
   </ModalSuccess>
   <ModalFailed
    open={openSub === "Failed"}
    handler={() => {
     setOpenSub(false);
     handler();
    }}>
    {failMsg}
   </ModalFailed>
  </>
 );
};

export default ModalLupaPassword;
