"use client";
import React, {useEffect} from "react";

import Table from "@/components/table";
import {useSession} from "next-auth/react";
import ModalTambahUser from "@/components/modal/modalTambahUser";
import ModalSendAnnouncePelanggan from "@/components/modal/modalSendAnnouncePelanggan";

const header = [
 "no",
 "nik",
 "user_id",
 "name",
 "number",
 "alamat",
 "paket",
 "aksi",
];

const Page = () => {
 const {data: session} = useSession();
 const [open, setOpen] = React.useState(false);
 const [data, setData] = React.useState([]);
 const getData = async () => {
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
      paket: paket.speed,
      status: lastOrder?.status
       ? lastOrder?.status
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
       : "-",
      password: undefined,
     };
    });
    console.log(flatUsers);

    setData(flatUsers);
   }
  });
 };

 const refreshData = () => {
  getData();
 };

 useEffect(() => {
  getData();
 }, []);

 const handleModal = (type) => {
  if (type) setOpen(type);
  else setOpen(false);
 };

 return (
  <>
   <div className="relative text-black">
    <div className="h-[250px] bg-[#2D95CA] p-8 text-white  pt-16 flex justify-between">
     <p className="text-3xl font-semibold">Pelanggan</p>
     <div className="flex gap-4">
      <button
       onClick={() => handleModal("pengumuman")}
       className="text-[#2D95CA] text-xl bg-white rounded-md h-fit p-2 px-4">
       Buat Pengumuman
      </button>
      <button
       onClick={() => handleModal("tambah")}
       className="text-[#2D95CA] text-xl bg-white rounded-md h-fit p-2 px-4">
       Tambah Pelanggan
      </button>
     </div>
    </div>
    <div className="absolute flex flex-col w-full gap-8 p-8 top-1/2">
     <Table
      data={data}
      header={header}
      handleRefresh={refreshData}
      color="blue"
     />
    </div>
   </div>
   <ModalTambahUser
    open={open === "tambah"}
    handler={handleModal}
    refreshData={refreshData}
    color="blue"
   />
   <ModalSendAnnouncePelanggan
    open={open === "pengumuman"}
    handler={handleModal}
    color="blue"
   />
  </>
 );
};

export default Page;
