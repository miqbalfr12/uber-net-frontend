"use client";
import {useSession} from "next-auth/react";
import React, {useEffect} from "react";
import Modal from "..";
import {X} from "lucide-react";
import Input from "@/components/input";
import ModalSuccess from "../modalSuccess";
import ModalFailed from "../modalFailed";

const ModalEditUser = ({open, handler, color, refreshData, data}) => {
 const {data: session} = useSession();
 const [loading, setLoading] = React.useState(false);
 const [openSub, setOpenSub] = React.useState(false);
 const [failMsg, setFailMsg] = React.useState("Buat Akun User Gagal Disimpan");
 const handleSub = async (e) => {
  e.preventDefault();
  if (loading) {
   return;
  }
  setLoading(true);
  const formData = new FormData(e.target);
  const dataObj = {
   ...data,
  };
  formData.forEach((value, key) => {
   if (value) dataObj[key] = value;
  });
  const editUser = await fetch(`/api/v1.0.0/user`, {
   method: "PUT",
   headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${session.user.token}`,
   },
   cache: "no-store",
   body: JSON.stringify(dataObj),
  });
  if (editUser.ok) {
   setOpenSub("Success");
   refreshData();
  } else {
   const err = await editUser.json();
   console.log(err);
   setOpenSub("Failed");
   setFailMsg(err.message);
  }
  setLoading(false);
 };

 const [listPaket, setListPaket] = React.useState([]);

 const getData = async () => {
  console.log("get data");
  await fetch("/api/v1.0.0/isp", {
   method: "GET",
   headers: {
    authorization: `Bearer ${session.user.token}`,
   },
   cache: "no-store",
  }).then(async (res) => {
   if (res.ok) {
    const resJson = await res.json();
    setListPaket(
     resJson.map((item) => {
      return {
       value: item.isp_id,
       item:
        item.speed +
        " - Rp." +
        item.harga.toLocaleString("id-ID") +
        " - " +
        item.deskripsi,
      };
     })
    );
   } else {
    console.log(await res.text());
   }
  });
 };

 useEffect(() => {
  getData();
 }, []);

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
      <p className="text-xl font-semibold">
       EDIT USER {data.role === "admin" ? "ADMIN" : "PELANGGAN"}
      </p>
      <button
       type="button"
       onClick={handler}>
       <X />
      </button>
     </div>
     <div className="flex flex-col gap-4 mb-4">
      <div>
       <p className="text-xl font-semibold">
        Informasi {data.role === "admin" ? "Admin" : "Pelanggan"}
       </p>
       <p>Lengkapi Informasi {data.role === "admin" ? "Admin" : "Pelanggan"}</p>
      </div>
      <div className="flex flex-wrap w-full gap-2 md:flex-nowrap">
       <Input
        label="Nama Lengkap"
        name="name"
        value={data?.name}
        color={color}
        type="text"
       />
      </div>
      <div className="flex flex-wrap w-full gap-2 md:flex-nowrap">
       <Input
        label="NIK"
        name="nik"
        value={data?.nik}
        color={color}
        type="text"
       />
       <Input
        label="Email"
        name="email"
        value={data?.email}
        color={color}
        type="email"
       />
       <Input
        label="No. WhatsApp"
        name="number"
        value={data?.number}
        color={color}
        type="text"
       />
      </div>
      <div className="flex flex-wrap w-full gap-2 md:flex-nowrap">
       <Input
        label="Alamat"
        name="alamat"
        value={data?.alamat}
        color={color}
        type="text"
       />
      </div>
      <div className="flex flex-wrap w-full gap-2 md:flex-nowrap">
       <Input
        label="Username"
        name="username"
        value={data?.username}
        color={color}
        type="text"
       />
       <Input
        label="Password"
        name="password"
        color={color}
        type="password"
       />
      </div>
     </div>
     {data.role === "pelanggan" && (
      <div className="flex flex-col gap-4 mb-4">
       <div>
        <p className="text-xl font-semibold">Informasi Layanan</p>
        <p>Silahkan isi Informasi Layanan dibawah ini.</p>
       </div>
       <div className="flex flex-wrap w-full gap-2 md:flex-nowrap">
        <Input
         label="Paket"
         name="paket"
         value={
          data?.orders && data?.orders[0] ? data?.orders[0]?.isp_id : null
         }
         color={color}
         type="select"
         selectData={listPaket}
        />
       </div>
      </div>
     )}
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
       {loading ? "Loading" : "Simpan"}
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
    Buat Akun User Berhasilan Disimpan
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

export default ModalEditUser;
