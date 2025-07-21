"use client";
import React, {useEffect} from "react";

import Table from "@/components/table";
import {useSession} from "next-auth/react";
import ModalTambahAdmin from "@/components/modal/modalTambahAdmin";

const header = ["no", "nik", "email", "name", "alamat", "aksi"];

const Page = () => {
 const {data: session} = useSession();
 const [open, setOpen] = React.useState(false);
 const [data, setData] = React.useState([]);
 const getData = async () => {
  await fetch("/api/v1.0.0/users?keperluan=admin", {
   method: "GET",
   headers: {
    authorization: `Bearer ${session.user.token}`,
   },
   cache: "no-store",
  }).then(async (res) => {
   if (res.ok) {
    const resJson = await res.json();
    console.log(resJson);

    setData(resJson);
   }
  });
 };

 const refreshData = () => {
  getData();
 };

 useEffect(() => {
  getData();
 }, []);

 const handleModal = () => {
  setOpen((prev) => !prev);
 };

 const [filter, setFilter] = React.useState("");

 return (
  <>
   <div className="relative text-black">
    <div className="h-[250px] bg-[#E28839] p-8 text-white  pt-16 flex justify-between">
     <p className="text-3xl font-semibold">Admin</p>
     <div className="flex gap-4">
      {/* <button
       onClick={() => handleModal()}
       className="text-[#E28839] text-xl bg-white rounded-md h-fit p-2 px-4">
       Buat Pengumuman
      </button> */}{" "}
      <input
       className="bg-white text-[#E28839] text-xl rounded-md h-fit p-2 px-4"
       type="text"
       onChange={(e) => setFilter(e.target.value)}
       placeholder="Cari Pelanggan"
      />
      <button
       onClick={() => handleModal()}
       className="text-[#E28839] text-xl bg-white rounded-md h-fit p-2 px-4">
       Tambah Admin
      </button>
     </div>
    </div>
    <div className="absolute flex flex-col w-full gap-8 p-8 top-1/2">
     <Table
      filter={filter}
      data={data}
      header={header}
      handleRefresh={refreshData}
      color="yellow"
     />
    </div>
   </div>
   <ModalTambahAdmin
    open={open}
    handler={handleModal}
    refreshData={refreshData}
    color="yellow"
   />
  </>
 );
};

export default Page;
