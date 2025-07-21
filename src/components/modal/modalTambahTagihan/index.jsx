"use client";
import {useSession} from "next-auth/react";
import React, {useEffect, useState} from "react";
import Modal from "..";
import {X} from "lucide-react";
import Input from "@/components/input";
import ModalSuccess from "../modalSuccess";
import ModalFailed from "../modalFailed";

const ModalTambahTagihan = ({open, handler, color, refreshData}) => {
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
  const dataObj = {};
  formData.forEach((value, key) => {
   console.log(value);
   if (value) dataObj[key] = value;
  });
  const buatTagihan = await fetch(`/api/v1.0.0/transaksi/tagihan`, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${session.user.token}`,
   },
   cache: "no-store",
   body: JSON.stringify(dataObj),
  });
  if (buatTagihan.ok) {
   setOpenSub("Success");
   refreshData();
  } else {
   const err = await buatTagihan.json();
   console.log(err);
   setOpenSub("Failed");
   setFailMsg(err.message);
  }
  setLoading(false);
 };

 const [listPaket, setListPaket] = React.useState([]);
 const [listUsers, setListUsers] = React.useState([]);

 const [selectedUser, setSelectedUser] = React.useState(null);
 const [selectedPaket, setSelectedPaket] = React.useState("");

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

  await fetch("/api/v1.0.0/users?keperluan=pelanggan", {
   method: "GET",
   headers: {
    authorization: `Bearer ${session.user.token}`,
   },
   cache: "no-store",
  }).then(async (res) => {
   if (res.ok) {
    const resJson = await res.json();
    console.log(resJson);
    const flatUsers = resJson.map((user, index) => {
     const lastOrder = user.orders?.[0] || {};
     const paket = lastOrder.paket || {};
     console.log(lastOrder);

     return {
      ...user,
      value: user.user_id,
      item: `${user.user_id} - ${user.name} - ${user.alamat}`,
      paket: paket.isp_id,
     };
    });
    setSelectedPaket(flatUsers[0].paket);
    console.log(flatUsers);

    setListUsers(flatUsers);
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
      <p className="text-xl font-semibold">BUAT TAGIHAN</p>
      <button
       type="button"
       onClick={() => handler(false)}>
       <X />
      </button>
     </div>
     <DropdownWithSearch listUsers={listUsers} />

     <div className="flex flex-col gap-4 mb-4">
      <div>
       <p className="text-xl font-semibold">Layanan</p>
      </div>
      <div className="flex flex-wrap w-full gap-2 md:flex-nowrap">
       <select
        name="isp_id"
        id="isp_id"
        value={selectedPaket}
        onChange={(e) => setSelectedPaket(e.target.value)}
        className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-[#2D95CA] focus:outline-none">
        {listPaket.map((item, index) => (
         <option
          key={index}
          value={item.value}>
          {item.item}
         </option>
        ))}
       </select>
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
    Buat Tagihan Berhasila
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

const DropdownWithSearch = ({listUsers}) => {
 const [searchTerm, setSearchTerm] = useState("");
 const [selectedUser, setSelectedUser] = useState(null);
 const [selectedPaket, setSelectedPaket] = useState("");

 const filteredUsers = listUsers.filter((user) =>
  user.item.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
  <div className="flex flex-col gap-4 mb-4">
   <div>
    <p className="text-xl font-semibold">Pilih Pelanggan</p>
   </div>
   <div className="flex flex-col w-full gap-2">
    <input
     type="text"
     className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-[#2D95CA] focus:outline-none"
     placeholder="Cari Pelanggan..."
     value={searchTerm}
     onChange={(e) => setSearchTerm(e.target.value)}
    />
    <select
     name="user_id"
     id="user_id"
     onChange={(e) => {
      const index = e.target.selectedIndex;
      const selected = listUsers[index];
      setSelectedUser(selected);
      setSelectedPaket(selected?.paket || "");
     }}
     className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-[#2D95CA] focus:outline-none">
     {filteredUsers.map((item, index) => (
      <option
       key={index}
       value={item.value}>
       {item.item}
      </option>
     ))}
    </select>
   </div>
  </div>
 );
};

export default ModalTambahTagihan;
