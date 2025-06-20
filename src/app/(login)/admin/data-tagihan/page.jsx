"use client";
import React, {useEffect} from "react";

import Table from "@/components/table";
import {useSession} from "next-auth/react";
import ModalTambahUser from "@/components/modal/modalTambahUser";
import ModalTambahTagihan from "@/components/modal/modalTambahTagihan";
import ModalSendTagihanPelanggan from "@/components/modal/modalSendTagihanPelanggan";

const header = [
 "no",
 "tanggal",
 "order_id",
 "name",
 "alamat",
 "paket",
 "status",
 "aksi",
];

const Page = () => {
 const {data: session} = useSession();
 const [open, setOpen] = React.useState(false);
 const [data, setData] = React.useState([]);
 const getData = async () => {
  await fetch("/api/v1.0.0/users/tagihan", {
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
     return {
      ...user,
      no: index + 1,
      detailPaket: user.paket,
      name: user.pelanggan.name,
      alamat: user.pelanggan.alamat,
      paket: user.speed,
      status: user?.status
       .split("_")
       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
       .join(" "),
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
    <div className="h-[250px] bg-[#E28839] p-8 text-white  pt-16 flex justify-between">
     <p className="text-3xl font-semibold">Tagihan</p>
     <div className="flex gap-4">
      <button
       onClick={() => handleModal("kirim-tagihan")}
       className="text-[#E28839] text-xl bg-white rounded-md h-fit p-2 px-4">
       Kirim Tagihan
      </button>
      <button
       onClick={() => handleModal("tagihan")}
       className="text-[#E28839] text-xl bg-white rounded-md h-fit p-2 px-4">
       Buat Tagihan
      </button>
     </div>
    </div>
    <div className="absolute flex flex-col w-full gap-8 p-8 top-1/2">
     <Table
      data={data}
      header={header}
      handleRefresh={refreshData}
      color="yellow"
     />
    </div>
   </div>
   <ModalSendTagihanPelanggan
    open={open === "kirim-tagihan"}
    handler={handleModal}
    color="yellow"
   />
   <ModalTambahTagihan
    open={open === "tagihan"}
    handler={handleModal}
    refreshData={refreshData}
    color="yellow"
   />
  </>
 );
};

export default Page;
